"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   5 POWER BI REPORT DASHBOARDS
   ═══════════════════════════════════════════════════════════════ */

interface Dashboard {
  id: string;
  title: string;
  icon: string;
  color: string;
  kpis: { label: string; value: string; sub: string; icon: string; color: string }[];
  linePoints: number[];
  bars: { label: string; value: number; color: string }[];
  donut: { pct: number; color: string; label: string }[];
}

const DASHBOARDS: Dashboard[] = [
  {
    id: "pipeline",
    title: "Pipeline Analytics",
    icon: "🔄",
    color: "#1e90ff",
    kpis: [
      { label: "Processing Time", value: "40%", sub: "Reduced", icon: "⚡", color: "#ff6b2b" },
      { label: "Cost Optimized", value: "30%", sub: "Saved", icon: "💰", color: "#1e90ff" },
      { label: "Pipeline Uptime", value: "99.9%", sub: "Reliable", icon: "🔄", color: "#00e5a0" },
      { label: "Query Speed", value: "50%", sub: "Faster", icon: "🚀", color: "#9333ea" },
    ],
    linePoints: [20, 35, 28, 50, 42, 65, 58, 78, 72, 88, 82, 95],
    bars: [
      { label: "Q1", value: 65, color: "#1e90ff" },
      { label: "Q2", value: 80, color: "#9333ea" },
      { label: "Q3", value: 72, color: "#ff6b2b" },
      { label: "Q4", value: 95, color: "#00e5a0" },
    ],
    donut: [
      { pct: 35, color: "#1e90ff", label: "Compute" },
      { pct: 25, color: "#9333ea", label: "Storage" },
      { pct: 22, color: "#ff6b2b", label: "Network" },
      { pct: 18, color: "#00e5a0", label: "Other" },
    ],
  },
  {
    id: "warehouse",
    title: "Warehouse Performance",
    icon: "🏗️",
    color: "#9333ea",
    kpis: [
      { label: "Query Latency", value: "1.2s", sub: "Avg", icon: "⏱️", color: "#9333ea" },
      { label: "Storage Used", value: "8.4TB", sub: "Compressed", icon: "💾", color: "#1e90ff" },
      { label: "Active Users", value: "340+", sub: "Daily", icon: "👥", color: "#00e5a0" },
      { label: "Tables", value: "1.2K", sub: "Managed", icon: "📋", color: "#ff6b2b" },
    ],
    linePoints: [40, 55, 48, 62, 58, 45, 52, 38, 42, 30, 35, 28],
    bars: [
      { label: "Bronze", value: 90, color: "#ff6b2b" },
      { label: "Silver", value: 75, color: "#1e90ff" },
      { label: "Gold", value: 60, color: "#9333ea" },
      { label: "Agg", value: 40, color: "#00e5a0" },
    ],
    donut: [
      { pct: 40, color: "#9333ea", label: "Snowflake" },
      { pct: 30, color: "#ff3621", label: "Databricks" },
      { pct: 20, color: "#1e90ff", label: "Delta" },
      { pct: 10, color: "#00e5a0", label: "Cache" },
    ],
  },
  {
    id: "etl",
    title: "ETL Monitoring",
    icon: "⚙️",
    color: "#ff6b2b",
    kpis: [
      { label: "Jobs/Day", value: "850+", sub: "Executed", icon: "📊", color: "#ff6b2b" },
      { label: "Success Rate", value: "99.7%", sub: "Reliable", icon: "✅", color: "#00e5a0" },
      { label: "Avg Duration", value: "4.2m", sub: "Per Job", icon: "⏳", color: "#1e90ff" },
      { label: "dbt Models", value: "200+", sub: "Active", icon: "🔧", color: "#9333ea" },
    ],
    linePoints: [85, 88, 82, 90, 87, 92, 89, 95, 93, 97, 94, 99],
    bars: [
      { label: "Ingest", value: 85, color: "#ff6b2b" },
      { label: "Clean", value: 70, color: "#1e90ff" },
      { label: "Transform", value: 90, color: "#9333ea" },
      { label: "Load", value: 75, color: "#00e5a0" },
    ],
    donut: [
      { pct: 45, color: "#ff6b2b", label: "Spark" },
      { pct: 30, color: "#1e90ff", label: "Airflow" },
      { pct: 15, color: "#ff694b", label: "dbt" },
      { pct: 10, color: "#00e5a0", label: "Custom" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Cost Intelligence",
    icon: "☁️",
    color: "#00e5a0",
    kpis: [
      { label: "Monthly Spend", value: "$12K", sub: "Optimized", icon: "💸", color: "#00e5a0" },
      { label: "Cost Saved", value: "30%", sub: "YoY", icon: "📉", color: "#1e90ff" },
      { label: "Resources", value: "128", sub: "Managed", icon: "🖥️", color: "#9333ea" },
      { label: "Auto-Scale", value: "98%", sub: "Efficient", icon: "📈", color: "#ff6b2b" },
    ],
    linePoints: [90, 85, 78, 72, 68, 65, 62, 58, 55, 52, 50, 48],
    bars: [
      { label: "Compute", value: 45, color: "#1e90ff" },
      { label: "Storage", value: 25, color: "#9333ea" },
      { label: "Network", value: 15, color: "#ff6b2b" },
      { label: "Other", value: 15, color: "#00e5a0" },
    ],
    donut: [
      { pct: 40, color: "#0078d4", label: "Azure" },
      { pct: 35, color: "#ff9900", label: "AWS" },
      { pct: 15, color: "#4285f4", label: "GCP" },
      { pct: 10, color: "#00e5a0", label: "On-prem" },
    ],
  },
  {
    id: "quality",
    title: "Data Quality Scorecard",
    icon: "🎯",
    color: "#1e90ff",
    kpis: [
      { label: "Quality Score", value: "96.8%", sub: "Overall", icon: "🎯", color: "#1e90ff" },
      { label: "Tests Passed", value: "2.4K", sub: "Daily", icon: "✅", color: "#00e5a0" },
      { label: "Anomalies", value: "0.3%", sub: "Detected", icon: "🔍", color: "#ff6b2b" },
      { label: "Freshness", value: "<5m", sub: "SLA Met", icon: "⏱️", color: "#9333ea" },
    ],
    linePoints: [88, 90, 89, 92, 91, 94, 93, 95, 94, 96, 95, 97],
    bars: [
      { label: "Complete", value: 98, color: "#00e5a0" },
      { label: "Accurate", value: 95, color: "#1e90ff" },
      { label: "Timely", value: 92, color: "#9333ea" },
      { label: "Unique", value: 99, color: "#ff6b2b" },
    ],
    donut: [
      { pct: 50, color: "#00e5a0", label: "Pass" },
      { pct: 35, color: "#1e90ff", label: "Warn" },
      { pct: 10, color: "#ff6b2b", label: "Fail" },
      { pct: 5, color: "#9333ea", label: "Skip" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   CHART HELPERS
   ═══════════════════════════════════════════════════════════════ */

const LINE_MAX = 100;
const LINE_W = 280;
const LINE_H = 80;

function lineToPath(points: number[]): string {
  const stepX = LINE_W / (points.length - 1);
  return points
    .map((p, i) => {
      const x = i * stepX;
      const y = LINE_H - (p / LINE_MAX) * LINE_H;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

function lineToArea(points: number[]): string {
  return `${lineToPath(points)} L${LINE_W},${LINE_H} L0,${LINE_H} Z`;
}

function DonutChart({ segments, id }: { segments: Dashboard["donut"]; id: string }) {
  const r = 32;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      {segments.map((seg, i) => {
        const dash = (seg.pct / 100) * c;
        const gap = c - dash;
        const currentOffset = offset;
        offset += dash;
        return (
          <motion.circle
            key={`${id}-${seg.label}`}
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth="6"
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-currentOffset}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
          />
        );
      })}
      <text x="40" y="44" textAnchor="middle" fill="#666" fontSize="7" fontFamily="monospace">
        {segments[0]?.label}
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD SCREEN — renders one dashboard's content
   ═══════════════════════════════════════════════════════════════ */

function DashboardScreen({ db, inView }: { db: Dashboard; inView: boolean }) {
  return (
    <motion.div
      key={db.id}
      className="p-4 space-y-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-2">
        {db.kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            className="rounded-lg p-2.5 text-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${kpi.color}08, ${kpi.color}04)`,
              border: `1px solid ${kpi.color}15`,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
          >
            <div className="text-[9px] mb-1" aria-hidden>{kpi.icon}</div>
            <div
              className="text-sm font-bold font-mono"
              style={{ color: kpi.color, textShadow: `0 0 12px ${kpi.color}30` }}
            >
              {kpi.value}
            </div>
            <div className="text-[7px] text-gray-500 font-mono mt-0.5">{kpi.label}</div>
            <div className="text-[6px] text-gray-600">{kpi.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="flex gap-3">
        {/* Line Chart */}
        <motion.div
          className="flex-1 rounded-lg p-3 relative"
          style={{
            background: "rgba(255,255,255,0.01)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="text-[8px] font-mono text-gray-500 mb-2">{db.title} Trend</div>
          <svg width="100%" viewBox={`0 0 ${LINE_W} ${LINE_H}`} preserveAspectRatio="none" className="overflow-visible">
            {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
              <line key={pct} x1="0" y1={LINE_H * pct} x2={LINE_W} y2={LINE_H * pct} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            ))}
            <defs>
              <linearGradient id={`areaFill-${db.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={db.color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={db.color} stopOpacity="0" />
              </linearGradient>
              <linearGradient id={`lineStroke-${db.id}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={db.color} />
                <stop offset="100%" stopColor={db.kpis[3]?.color || db.color} />
              </linearGradient>
            </defs>
            <motion.path
              d={lineToArea(db.linePoints)}
              fill={`url(#areaFill-${db.id})`}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
            <motion.path
              d={lineToPath(db.linePoints)}
              fill="none"
              stroke={`url(#lineStroke-${db.id})`}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
            />
            <motion.circle
              cx={LINE_W}
              cy={LINE_H - (db.linePoints[db.linePoints.length - 1] / LINE_MAX) * LINE_H}
              r="3"
              fill={db.color}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 1.8, type: "spring" }}
            />
          </svg>
        </motion.div>

        {/* Right column */}
        <div className="flex flex-col gap-3" style={{ width: 130 }}>
          {/* Bar chart */}
          <motion.div
            className="rounded-lg p-3"
            style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="text-[8px] font-mono text-gray-500 mb-2">Breakdown</div>
            <div className="flex items-end gap-1.5" style={{ height: 50 }}>
              {db.bars.map((bar, i) => (
                <div key={bar.label} className="flex-1 flex flex-col items-center gap-0.5">
                  <motion.div
                    className="w-full rounded-sm"
                    style={{
                      background: `linear-gradient(180deg, ${bar.color}, ${bar.color}60)`,
                      boxShadow: `0 0 6px ${bar.color}20`,
                    }}
                    initial={{ height: 0 }}
                    animate={inView ? { height: (bar.value / 100) * 45 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.08, ease: "easeOut" }}
                  />
                  <span className="text-[6px] text-gray-600 font-mono">{bar.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Donut */}
          <motion.div
            className="rounded-lg p-2 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <DonutChart segments={db.donut} id={db.id} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT — Tabbed 5-Dashboard Monitor
   ═══════════════════════════════════════════════════════════════ */

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeIdx, setActiveIdx] = useState(0);
  const activeDashboard = DASHBOARDS[activeIdx];

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 40, rotateY: -5, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0, scale: 1 } : {}}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Monitor frame */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(15,15,25,0.95), rgba(8,8,18,0.98))",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${activeDashboard.color}06, inset 0 1px 0 rgba(255,255,255,0.04)`,
          padding: 2,
        }}
      >
        {/* Neon edge glow */}
        <div
          className="absolute -inset-[1px] rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${activeDashboard.color}18, rgba(147,51,234,0.08), ${activeDashboard.color}08)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: 1,
            transition: "background 0.5s",
          }}
        />

        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[9px] font-mono text-gray-500">{activeDashboard.icon} {activeDashboard.title}</div>
            <motion.div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{ background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.2)" }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-1 h-1 rounded-full bg-[#00e5a0]" />
              <span className="text-[8px] font-mono text-[#00e5a0]">LIVE</span>
            </motion.div>
          </div>
          <div className="text-[8px] font-mono text-gray-600">Power BI</div>
        </div>

        {/* Tab bar — 5 dashboards */}
        <div
          className="flex items-center gap-0.5 px-3 py-1.5 overflow-x-auto"
          style={{ background: "rgba(255,255,255,0.01)", borderBottom: "1px solid rgba(255,255,255,0.03)" }}
        >
          {DASHBOARDS.map((db, i) => (
            <button
              key={db.id}
              onClick={() => setActiveIdx(i)}
              className="relative flex items-center gap-1 px-2.5 py-1 rounded-md text-[8px] font-mono whitespace-nowrap transition-all duration-300"
              style={{
                color: i === activeIdx ? db.color : "#555",
                background: i === activeIdx ? `${db.color}10` : "transparent",
                border: `1px solid ${i === activeIdx ? db.color + "30" : "transparent"}`,
              }}
            >
              <span>{db.icon}</span>
              <span className="hidden sm:inline">{db.title}</span>
              {i === activeIdx && (
                <motion.div
                  className="absolute bottom-0 left-2 right-2 h-[1px]"
                  style={{ background: db.color }}
                  layoutId="dashTab"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Dashboard content */}
        <AnimatePresence mode="wait">
          <DashboardScreen key={activeDashboard.id} db={activeDashboard} inView={inView} />
        </AnimatePresence>

        {/* Glass reflection */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: "linear-gradient(165deg, rgba(255,255,255,0.03) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.01) 100%)",
          }}
        />
      </div>

      {/* Monitor shadow */}
      <div
        className="absolute -bottom-3 left-[10%] right-[10%] h-6 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${activeDashboard.color}08 0%, transparent 70%)`,
          filter: "blur(8px)",
          transition: "background 0.5s",
        }}
      />

      {/* Floating badge */}
      <motion.div
        className="absolute -top-3 right-4 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-mono"
          style={{
            background: "rgba(30,144,255,0.1)",
            border: "1px solid rgba(30,144,255,0.2)",
            color: "#1e90ff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <span className="w-1 h-1 rounded-full bg-[#1e90ff] animate-pulse" />
          5 Live Dashboards
        </div>
      </motion.div>
    </motion.div>
  );
}

