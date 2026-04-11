"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Types ─── */
interface MetricHighlight {
  label: string;
  value: number;
  suffix: string;
  color: string;
  icon: string;
  description: string;
}

const METRICS: MetricHighlight[] = [
  { label: "Processing Time", value: 40, suffix: "% Reduced", color: "#ff6b2b", icon: "⚡", description: "Reduced data processing time by optimizing ETL pipelines" },
  { label: "Cloud Cost", value: 30, suffix: "% Saved", color: "#9333ea", icon: "💰", description: "Achieved cloud infrastructure cost optimization" },
  { label: "Records Daily", value: 10, suffix: "M+", color: "#1e90ff", icon: "📊", description: "Scalable pipelines handling millions of records" },
  { label: "Pipeline Uptime", value: 99.9, suffix: "%", color: "#00e5a0", icon: "🛡️", description: "Improved data accuracy and reliability" },
  { label: "Query Latency", value: 50, suffix: "% Reduced", color: "#ff8c42", icon: "🏎️", description: "Faster query performance across the warehouse" },
  { label: "Decision Speed", value: 5, suffix: "x Faster", color: "#22d3ee", icon: "🎯", description: "Enabled faster business decision-making" },
];

/* ─── Animated Counter ─── */
function GlowingCounter({ value, suffix, color, inView }: { value: number; suffix: string; color: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
    const steps = 50;
    const inc = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.round(current * 10) / 10);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span
      className="text-3xl md:text-4xl font-bold font-mono tabular-nums"
      style={{
        color,
        textShadow: `0 0 20px ${color}60, 0 0 50px ${color}25`,
      }}
    >
      {count}
      <span className="text-lg md:text-xl opacity-80">{suffix}</span>
    </span>
  );
}

/* ─── Bar Chart ─── */
function BarChart({ inView }: { inView: boolean }) {
  const bars = [
    { label: "Q1", height: 65, color: "#ff6b2b" },
    { label: "Q2", height: 82, color: "#1e90ff" },
    { label: "Q3", height: 58, color: "#9333ea" },
    { label: "Q4", height: 93, color: "#00e5a0" },
  ];

  return (
    <div className="flex items-end gap-3 h-36">
      {bars.map((bar, i) => (
        <div key={bar.label} className="flex flex-col items-center gap-2 flex-1">
          <motion.div
            className="w-full rounded-t-lg relative overflow-hidden"
            style={{
              background: `linear-gradient(180deg, ${bar.color}, ${bar.color}30)`,
              boxShadow: `0 0 20px ${bar.color}25`,
            }}
            initial={{ height: 0 }}
            animate={inView ? { height: `${bar.height}%` } : { height: 0 }}
            transition={{ duration: 1.2, delay: i * 0.12, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{ background: "linear-gradient(180deg, transparent, white, transparent)" }}
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
            />
          </motion.div>
          <span className="text-[9px] font-mono text-gray-600">{bar.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Line Chart ─── */
function LineChart({ inView }: { inView: boolean }) {
  const pts = [[0, 70], [15, 55], [30, 68], [45, 38], [60, 48], [75, 28], [90, 18], [100, 12]];
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${100 - p[1]}`).join(" ");

  return (
    <svg viewBox="0 0 100 100" className="w-full h-28" preserveAspectRatio="none">
      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#ffffff06" strokeWidth="0.5" />
      ))}
      <motion.path
        d={`${path} L 100 100 L 0 100 Z`}
        fill="url(#areaFill)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.35 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="#1e90ff"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
      {pts.map((p, i) => (
        <motion.circle
          key={i}
          cx={p[0]}
          cy={100 - p[1]}
          r="1.5"
          fill="#1e90ff"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, delay: 0.6 + i * 0.12 }}
        />
      ))}
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e90ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1e90ff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Live Data Feed ─── */
function LiveDataFeed() {
  const [rows, setRows] = useState<{ id: number; source: string; status: string; time: string }[]>([]);

  useEffect(() => {
    const sources = ["SAP ERP", "Salesforce", "Kafka", "IoT Hub", "REST API", "S3"];
    const statuses = ["✓ Processed", "⟳ Loading", "✓ Stored", "✓ Validated"];
    const add = () =>
      setRows((prev) => [
        {
          id: Date.now(),
          source: sources[Math.floor(Math.random() * sources.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ].slice(0, 5));
    add();
    const iv = setInterval(add, 2200);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="space-y-1">
      {rows.map((r, i) => (
        <motion.div
          key={r.id}
          className="flex items-center justify-between text-[9px] font-mono px-2 py-1 rounded"
          style={{ background: "rgba(30,144,255,0.04)" }}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1 - i * 0.12, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          <span className="text-gray-600">{r.time}</span>
          <span className="text-blue-400">{r.source}</span>
          <span className="text-green-400">{r.status}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Main Dashboard Section ─── */
export default function DashboardSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section ref={ref} id="dashboard" className="relative min-h-screen py-28 px-6">
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Measurable Impact
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Real metrics from production data systems — animated counters showcasing
            the kind of measurable results I deliver.
          </p>
        </motion.div>

        {/* ── Metric Highlight Cards (CORE) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              className="metric-card glass p-5 relative overflow-hidden"
              style={{ "--accent": m.color, "--accent-dim": `${m.color}10` } as React.CSSProperties}
              initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{m.icon}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">{m.label}</span>
              </div>
              <GlowingCounter value={m.value} suffix={m.suffix} color={m.color} inView={inView} />
              <p className="text-[10px] text-gray-600 mt-2 leading-relaxed">{m.description}</p>

              {/* Subtle animated glow */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${m.color}15, transparent 70%)` }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <motion.div
            className="glass p-6 cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowDetails(!showDetails)}
          >
            <h4 className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-600 mb-4">
              Pipeline Throughput
            </h4>
            <BarChart inView={inView} />
            <p className="text-[9px] text-gray-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click for breakdown →
            </p>
          </motion.div>

          <motion.div
            className="glass p-6 cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowDetails(!showDetails)}
          >
            <h4 className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-600 mb-4">
              Error Rate Reduction
            </h4>
            <LineChart inView={inView} />
            <p className="text-[9px] text-gray-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click for details →
            </p>
          </motion.div>

          <motion.div
            className="glass p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <h4 className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-600 mb-4">
              Live Data Feed
            </h4>
            <LiveDataFeed />
          </motion.div>
        </div>

        {/* ── Expandable Detail ── */}
        <motion.div
          initial={false}
          animate={showDetails ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          {/* Case Study 1 */}
          <div className="glass p-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <h4 className="text-sm font-bold text-[#ff6b2b] mb-2">Business Problem</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Legacy batch processing caused 8-hour delays in reporting. Decision-makers needed real-time visibility into operations.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#9333ea] mb-2">Data Modeling Approach</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Implemented medallion architecture (Bronze → Silver → Gold) with streaming micro-batches and incremental materialization via dbt.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#00e5a0] mb-2">Outcome</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Reduced reporting latency from 8h to 5min. Saved $200K/year. Self-service analytics for 50+ users.
              </p>
            </div>
          </div>
          {/* Case Study 2 */}
          <div className="glass p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-bold text-[#1e90ff] mb-2">Business Problem</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Manual ETL processes led to inconsistent data and missed SLAs for a global sales dashboard.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#ff6b2b] mb-2">Solution</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Automated end-to-end data pipelines using Informatica IICS and Azure Data Factory, with robust error handling and alerting.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#9333ea] mb-2">Impact</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Increased data reliability to 99.99%, reduced manual effort by 90%, and enabled daily executive reporting with zero failures for 18 months.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
