"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const HIGHLIGHTS = [
  { icon: "❄️", label: "Snowflake", desc: "Cloud Data Platform, SnowPro Certified" },
  { icon: "🔄", label: "Informatica IICS", desc: "Enterprise ETL & Data Integration" },
  { icon: "☁️", label: "Azure / AWS", desc: "ADF, S3, Redshift, Data Lake" },
  { icon: "🐍", label: "Python & SQL", desc: "PySpark, dbt, Advanced Analytics" },
  { icon: "📡", label: "Apache Airflow", desc: "DAG Orchestration & Scheduling" },
  { icon: "📊", label: "Power BI / Looker", desc: "Data Visualization & Reporting" },
];

export default function ResumeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="resume" className="relative py-28 px-6 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(30,144,255,0.04) 0%, transparent 100%)" }} />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "linear-gradient(rgba(0,229,255,.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block text-[10px] font-mono tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded"
            style={{ color: "#1e90ff", background: "rgba(30,144,255,0.05)", border: "1px solid rgba(30,144,255,0.15)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            CAREER DOCUMENT
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Resume
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">
            4+ years of data engineering expertise — Snowflake migrations, cloud ETL pipelines, and analytics systems at enterprise scale.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          className="relative rounded-2xl overflow-hidden mb-10"
          style={{
            background: "rgba(5,5,18,0.92)",
            border: "1px solid rgba(30,144,255,0.12)",
            backdropFilter: "blur(40px)",
            boxShadow: "0 0 80px rgba(30,144,255,0.06), inset 0 0 60px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* HUD corners */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: "rgba(0,229,255,0.4)" }} />
          <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: "rgba(147,51,234,0.4)" }} />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: "rgba(147,51,234,0.4)" }} />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: "rgba(0,229,255,0.4)" }} />

          {/* Top glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #1e90ff60, #9333ea60, transparent)" }} />

          {/* Scan line */}
          <motion.div
            className="absolute inset-x-0 h-[1px] pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.15), transparent)" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="p-8 md:p-12">
            {/* Identity row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.03em" }}>
                  Ravikant Patil
                </h3>
                <p className="text-sm font-mono mb-3" style={{ color: "#1e90ff", letterSpacing: "0.12em" }}>
                  DATA ENGINEER  •  SNOWFLAKE  •  IICS  •  CLOUD PIPELINES
                </p>
                <div className="flex flex-wrap gap-4 text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <span>📧 ravikantpatil137@gmail.com</span>
                  <span>📍 Pune, India</span>
                  <span>🏢 Lacento Technologies</span>
                </div>
              </div>

              {/* Download button — main CTA */}
              <motion.a
                href="/Ravikant_Patil_Resume.pdf"
                download="Ravikant_Patil_Resume.pdf"
                className="group relative flex-shrink-0 flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-sm tracking-wider overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(30,144,255,0.15), rgba(147,51,234,0.15))",
                  border: "1px solid rgba(30,144,255,0.4)",
                  color: "#fff",
                  boxShadow: "0 0 30px rgba(30,144,255,0.12), inset 0 0 30px rgba(30,144,255,0.04)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 50px rgba(30,144,255,0.3), 0 0 100px rgba(30,144,255,0.1)",
                  borderColor: "rgba(30,144,255,0.7)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                {/* Download icon */}
                <svg className="relative w-5 h-5 text-[#00e5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="relative font-bold tracking-widest">DOWNLOAD PDF</span>
              </motion.a>
            </div>

            <div className="h-px mb-10" style={{ background: "linear-gradient(90deg, transparent, rgba(30,144,255,0.2), rgba(147,51,234,0.2), transparent)" }} />

            {/* Core skills grid */}
            <div className="mb-6">
              <h4 className="text-[10px] font-mono tracking-[0.3em] uppercase mb-5" style={{ color: "rgba(255,255,255,0.25)" }}>CORE COMPETENCIES</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {HIGHLIGHTS.map((h, i) => (
                  <motion.div
                    key={h.label}
                    className="group flex items-start gap-3 p-4 rounded-xl transition-all duration-300"
                    style={{
                      background: "rgba(2,2,8,0.5)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    whileHover={{
                      borderColor: "rgba(30,144,255,0.25)",
                      background: "rgba(30,144,255,0.04)",
                    }}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{h.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-white/85 mb-0.5" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{h.label}</div>
                      <div className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>{h.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="h-px my-8" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }} />

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: "4+", label: "Years Experience", color: "#1e90ff" },
                { value: "80+", label: "Pipelines Built", color: "#9333ea" },
                { value: "10M+", label: "Records/Day", color: "#00ff88" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  className="p-4 rounded-xl"
                  style={{ background: "rgba(2,2,8,0.6)", border: "1px solid rgba(255,255,255,0.04)" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <div className="text-xl md:text-2xl font-bold font-mono mb-1" style={{ color: s.color, textShadow: `0 0 20px ${s.color}40`, fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(16px,3vw,26px)" }}>
                    {s.value}
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.1em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
