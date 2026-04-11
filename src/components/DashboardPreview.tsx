"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   KPI DATA
   ═══════════════════════════════════════════════════════════════ */

const KPIS = [
  { label: "Processing Time", value: "40%", sub: "Reduced", color: "#ff6b2b", icon: "⚡" },
  { label: "Cost Optimized", value: "30%", sub: "Saved", color: "#1e90ff", icon: "💰" },
  { label: "Pipeline Uptime", value: "99.9%", sub: "Reliable", color: "#00e5a0", icon: "🔄" },
  { label: "Query Speed", value: "50%", sub: "Faster", color: "#9333ea", icon: "🚀" },
];

/* Line chart points (performance trend) */
const LINE_POINTS = [20, 35, 28, 50, 42, 65, 58, 78, 72, 88, 82, 95];
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

/* Bar chart data */
const BARS = [
  { label: "Q1", value: 65, color: "#1e90ff" },
  { label: "Q2", value: 80, color: "#9333ea" },
  { label: "Q3", value: 72, color: "#ff6b2b" },
  { label: "Q4", value: 95, color: "#00e5a0" },
  { label: "Q5", value: 88, color: "#1e90ff" },
];

/* Donut chart */
const DONUT_SEGMENTS = [
  { pct: 35, color: "#1e90ff", label: "Compute" },
  { pct: 25, color: "#9333ea", label: "Storage" },
  { pct: 22, color: "#ff6b2b", label: "Network" },
  { pct: 18, color: "#00e5a0", label: "Other" },
];

function DonutChart() {
  const r = 32;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      {DONUT_SEGMENTS.map((seg, i) => {
        const dash = (seg.pct / 100) * c;
        const gap = c - dash;
        const currentOffset = offset;
        offset += dash;
        return (
          <motion.circle
            key={seg.label}
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
            transition={{ duration: 0.5, delay: 1.6 + i * 0.12 }}
          />
        );
      })}
      <text x="40" y="38" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="monospace">
        Cost
      </text>
      <text x="40" y="50" textAnchor="middle" fill="#666" fontSize="7" fontFamily="monospace">
        Split
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 40, rotateY: -5, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0, scale: 1 } : {}}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Monitor outer frame */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(15,15,25,0.95), rgba(8,8,18,0.98))",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(30,144,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
          padding: 2,
        }}
      >
        {/* Neon edge glow */}
        <div
          className="absolute -inset-[1px] rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(30,144,255,0.12), rgba(147,51,234,0.08), rgba(30,144,255,0.06))",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: 1,
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
            <div className="text-[9px] font-mono text-gray-500">Pipeline Analytics</div>
            <motion.div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(0,229,160,0.1)",
                border: "1px solid rgba(0,229,160,0.2)",
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-1 h-1 rounded-full bg-[#00e5a0]" />
              <span className="text-[8px] font-mono text-[#00e5a0]">LIVE</span>
            </motion.div>
          </div>
          <div className="text-[8px] font-mono text-gray-600">Powered by Real Data</div>
        </div>

        {/* Screen content */}
        <div className="p-4 space-y-4">
          {/* KPI Row */}
          <div className="grid grid-cols-4 gap-2">
            {KPIS.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                className="rounded-lg p-2.5 text-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${kpi.color}08, ${kpi.color}04)`,
                  border: `1px solid ${kpi.color}15`,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
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
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="text-[8px] font-mono text-gray-500 mb-2">Performance Trend</div>
              <svg width="100%" viewBox={`0 0 ${LINE_W} ${LINE_H}`} preserveAspectRatio="none" className="overflow-visible">
                {/* Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
                  <line
                    key={pct}
                    x1="0"
                    y1={LINE_H * pct}
                    x2={LINE_W}
                    y2={LINE_H * pct}
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="0.5"
                  />
                ))}
                {/* Gradient fill */}
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e90ff" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={lineToArea(LINE_POINTS)}
                  fill="url(#lineGrad)"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 1.1 }}
                />
                <motion.path
                  d={lineToPath(LINE_POINTS)}
                  fill="none"
                  stroke="url(#lineStroke)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 1.1, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1e90ff" />
                    <stop offset="100%" stopColor="#9333ea" />
                  </linearGradient>
                </defs>
                {/* End dot */}
                <motion.circle
                  cx={LINE_W}
                  cy={LINE_H - (LINE_POINTS[LINE_POINTS.length - 1] / LINE_MAX) * LINE_H}
                  r="3"
                  fill="#9333ea"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 2.6, type: "spring" }}
                />
              </svg>
            </motion.div>

            {/* Right column: Bar + Donut */}
            <div className="flex flex-col gap-3" style={{ width: 130 }}>
              {/* Bar chart */}
              <motion.div
                className="rounded-lg p-3"
                style={{
                  background: "rgba(255,255,255,0.01)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                <div className="text-[8px] font-mono text-gray-500 mb-2">Data Volume</div>
                <div className="flex items-end gap-1.5" style={{ height: 50 }}>
                  {BARS.map((bar, i) => (
                    <div key={bar.label} className="flex-1 flex flex-col items-center gap-0.5">
                      <motion.div
                        className="w-full rounded-sm"
                        style={{
                          background: `linear-gradient(180deg, ${bar.color}, ${bar.color}60)`,
                          boxShadow: `0 0 6px ${bar.color}20`,
                        }}
                        initial={{ height: 0 }}
                        animate={inView ? { height: (bar.value / 100) * 45 } : {}}
                        transition={{ duration: 0.6, delay: 1.4 + i * 0.08, ease: "easeOut" }}
                      />
                      <span className="text-[6px] text-gray-600 font-mono">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Donut chart */}
              <motion.div
                className="rounded-lg p-2 flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.01)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <DonutChart />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Glass reflection overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: "linear-gradient(165deg, rgba(255,255,255,0.03) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.01) 100%)',",
          }}
        />
      </div>

      {/* Monitor shadow */}
      <div
        className="absolute -bottom-3 left-[10%] right-[10%] h-6 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(30,144,255,0.06) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* Floating badge */}
      <motion.div
        className="absolute -top-3 right-4 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2, duration: 0.5 }}
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
          Live Data Preview
        </div>
      </motion.div>
    </motion.div>
  );
}
