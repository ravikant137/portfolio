"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface KPI {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const KPIS: KPI[] = [
  { label: "Pipeline Uptime", value: 99.9, suffix: "%", color: "#00d4ff" },
  { label: "Records/Day", value: 10, suffix: "M+", color: "#a855f7" },
  { label: "Cost Reduction", value: 40, suffix: "%", color: "#ec4899" },
  { label: "Query Speed", value: 3, suffix: "x faster", color: "#22d3ee" },
];

function AnimatedCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.round(current * 10) / 10);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span ref={ref} style={{ color }} className="text-3xl font-bold font-mono">
      {count}{suffix}
    </span>
  );
}

function BarChart({ inView }: { inView: boolean }) {
  const bars = [
    { label: "Q1", height: 65, color: "#00d4ff" },
    { label: "Q2", height: 80, color: "#22d3ee" },
    { label: "Q3", height: 55, color: "#a855f7" },
    { label: "Q4", height: 90, color: "#ec4899" },
  ];

  return (
    <div className="flex items-end gap-3 h-40">
      {bars.map((bar, i) => (
        <div key={bar.label} className="flex flex-col items-center gap-2 flex-1">
          <motion.div
            className="w-full rounded-t-lg relative overflow-hidden"
            style={{
              background: `linear-gradient(180deg, ${bar.color}, ${bar.color}40)`,
              boxShadow: `0 0 15px ${bar.color}30`,
            }}
            initial={{ height: 0 }}
            animate={inView ? { height: `${bar.height}%` } : { height: 0 }}
            transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(180deg, transparent, white, transparent)`,
              }}
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          </motion.div>
          <span className="text-[10px] font-mono text-gray-500">{bar.label}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ inView }: { inView: boolean }) {
  const points = [
    [0, 70], [15, 55], [30, 65], [45, 40], [60, 50], [75, 30], [90, 20], [100, 15],
  ];

  const pathData = points.map((p, i) =>
    `${i === 0 ? "M" : "L"} ${p[0]} ${100 - p[1]}`
  ).join(" ");

  return (
    <svg viewBox="0 0 100 100" className="w-full h-32" preserveAspectRatio="none">
      {/* Grid lines */}
      {[25, 50, 75].map(y => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#ffffff08" strokeWidth="0.5" />
      ))}

      {/* Area fill */}
      <motion.path
        d={`${pathData} L 100 100 L 0 100 Z`}
        fill="url(#lineGradient)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
      />

      {/* Line */}
      <motion.path
        d={pathData}
        fill="none"
        stroke="#a855f7"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p[0]}
          cy={100 - p[1]}
          r="1.5"
          fill="#a855f7"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + i * 0.15 }}
        />
      ))}

      <defs>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LiveDataFeed() {
  const [rows, setRows] = useState<Array<{ id: number; source: string; status: string; time: string }>>([]);

  useEffect(() => {
    const sources = ["SAP ERP", "Salesforce", "IoT Hub", "Kafka", "REST API", "S3 Bucket"];
    const statuses = ["✓ Processed", "⟳ Loading", "✓ Stored", "✓ Validated"];

    const addRow = () => {
      setRows(prev => {
        const newRow = {
          id: Date.now(),
          source: sources[Math.floor(Math.random() * sources.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          time: new Date().toLocaleTimeString(),
        };
        return [newRow, ...prev].slice(0, 5);
      });
    };

    addRow();
    const interval = setInterval(addRow, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-1">
      {rows.map((row, i) => (
        <motion.div
          key={row.id}
          className="flex items-center justify-between text-[10px] font-mono px-2 py-1 rounded"
          style={{ background: "rgba(0, 212, 255, 0.05)" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1 - i * 0.15, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-gray-500">{row.time}</span>
          <span className="text-cyan-400">{row.source}</span>
          <span className="text-green-400">{row.status}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function DashboardSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="dashboard"
      className="relative min-h-screen py-24 px-6"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Live Analytics Dashboard
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-time data pipeline monitoring — simulated metrics showcasing
            the kind of systems I build and maintain.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {KPIS.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              className="glass p-5 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <AnimatedCounter value={kpi.value} suffix={kpi.suffix} color={kpi.color} />
              <p className="text-xs text-gray-400 mt-2 font-mono">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {/* Bar Chart */}
          <motion.div
            className="glass p-6 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowDetails(!showDetails)}
          >
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
              Pipeline Throughput
            </h4>
            <BarChart inView={isInView} />
          </motion.div>

          {/* Line Chart */}
          <motion.div
            className="glass p-6 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowDetails(!showDetails)}
          >
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
              Error Rate Reduction
            </h4>
            <LineChart inView={isInView} />
          </motion.div>

          {/* Live Feed */}
          <motion.div
            className="glass p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
              Live Data Feed
            </h4>
            <LiveDataFeed />
          </motion.div>
        </div>

        {/* Detail panel on click */}
        <motion.div
          initial={false}
          animate={showDetails ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="glass p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-bold text-cyan-400 mb-2">Business Problem</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Legacy batch processing caused 8-hour delays in business reporting.
                Decision-makers needed real-time visibility into operations.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-purple-400 mb-2">Data Modeling Approach</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Implemented a medallion architecture (Bronze → Silver → Gold) with
                streaming micro-batches and incremental materialization using dbt.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-pink-400 mb-2">Outcome</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Reduced reporting latency from 8 hours to 5 minutes. Saved $200K/year
                in compute costs. Enabled self-service analytics for 50+ users.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
