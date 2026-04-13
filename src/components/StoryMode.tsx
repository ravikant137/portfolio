"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StoryStage {
  id: number;
  label: string;
  headline: string;
  narrative: string;
  color: string;
  icon: string;
  detail: string;
}

const STAGES: StoryStage[] = [
  {
    id: 0, label: "01 — THE CHAOS", headline: "Raw, Unstructured, Everywhere", icon: "🌪️", color: "#ff6b2b",
    narrative: "Data pours in from 30+ sources — APIs, CDC streams, flat files, IoT sensors. Formats clash. Schemas drift. Volumes spike at 3 AM.",
    detail: "Millions of events per minute. REST, gRPC, Kafka topics, SFTP drops. No two sources speak the same language.",
  },
  {
    id: 1, label: "02 — INGESTION", headline: "Capture → Validate → Land", icon: "📡", color: "#00e5ff",
    narrative: "Airflow DAGs orchestrate extraction windows. Schema registries enforce contracts. Data lands in raw zones with full lineage metadata.",
    detail: "Python extractors, Kafka consumers, ADF pipelines. Every record tagged with source, timestamp, and ingestion batch ID.",
  },
  {
    id: 2, label: "03 — TRANSFORM", headline: "Clean → Enrich → Model", icon: "⚙️", color: "#9333ea",
    narrative: "dbt models cascade through staging → intermediate → marts. 500+ tests validate every layer. Slowly-changing dimensions track history.",
    detail: "PySpark for heavy lifting. dbt for SQL transformations. Great Expectations for data quality. All version-controlled, CI/CD deployed.",
  },
  {
    id: 3, label: "04 — WAREHOUSE", headline: "Star Schemas. Governed. Fast.", icon: "🏛️", color: "#00ff88",
    narrative: "Snowflake multi-cluster warehouse auto-scales. Materialized views serve dashboards in <500ms. Row-level security locks down PII.",
    detail: "Medallion architecture: Bronze → Silver → Gold. Cost-optimized with auto-suspend. Query execution plans reviewed weekly.",
  },
  {
    id: 4, label: "05 — INSIGHTS", headline: "Decisions. In Real Time.", icon: "🎯", color: "#ff6b2b",
    narrative: "Self-service analytics for 200+ business users. ML features served from the feature store. Anomaly detection runs every 5 minutes.",
    detail: "Looker, Power BI, Streamlit apps — all connected to governed semantic layer. Data mesh principles emerging across domains.",
  },
];

export default function StoryMode() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = STAGES[activeStage] ?? STAGES[0];

  return (
    <section id="story" className="relative min-h-screen py-28 px-6 overflow-hidden">
      {/* Ambient background */}
      <AnimatePresence>
        {stage && (
          <motion.div
            key={stage.id}
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 50%, ${stage.color}07 0%, transparent 65%)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(0,229,255,.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block text-[10px] font-mono tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded"
            style={{ color: "#ff6b2b", background: "rgba(255,107,43,0.05)", border: "1px solid rgba(255,107,43,0.15)" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            CAMPAIGN PROGRESS
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Data Journey
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Hover over each stage to explore how raw chaos becomes actionable intelligence.
          </p>
        </motion.div>

        {/* Stage progress rail */}
        <div className="relative mb-14">
          {/* Rail background */}
          <div className="absolute top-[18px] left-0 right-0 h-[2px]" style={{ background: "rgba(255,255,255,0.04)" }} />
          {/* Active rail */}
          <motion.div
            className="absolute top-[18px] left-0 h-[2px]"
            style={{
              width: `${(activeStage / (STAGES.length - 1)) * 100}%`,
              background: `linear-gradient(90deg, #ff6b2b, ${stage.color})`,
              boxShadow: `0 0 16px ${stage.color}60`,
              transition: "none",
            }}
            animate={{ width: `${(activeStage / (STAGES.length - 1)) * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />

          <div className="relative flex justify-between">
            {STAGES.map((s, i) => {
              const isActive = i === activeStage;
              const isPast = i < activeStage;
              return (
                <div
                  key={s.id}
                  className="flex flex-col items-center gap-3 z-10 cursor-pointer"
                  onMouseEnter={() => setActiveStage(i)}
                  onTouchStart={() => setActiveStage(i)}
                >
                  <motion.div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
                    style={{
                      border: `1px solid ${isActive ? s.color : isPast ? s.color + "50" : "rgba(255,255,255,0.08)"}`,
                      background: isActive ? `${s.color}18` : "rgba(2,2,8,0.95)",
                      color: isActive || isPast ? s.color : "#444",
                      boxShadow: isActive ? `0 0 20px ${s.color}40, 0 0 40px ${s.color}15` : "none",
                      transform: "rotate(45deg)",
                    }}
                    animate={isActive ? { scale: [1, 1.12, 1] } : {}}
                    transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                  >
                    <span style={{ transform: "rotate(-45deg)", fontSize: 12 }}>
                      {isPast ? "✓" : i + 1}
                    </span>
                  </motion.div>
                  <span className="text-[8px] font-mono hidden md:block tracking-[0.1em]" style={{ color: isActive ? s.color : "rgba(255,255,255,0.2)" }}>
                    {s.label.split("—")[1]?.trim()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            className="relative rounded-xl overflow-hidden"
            style={{
              background: "rgba(5,5,18,0.92)",
              border: `1px solid ${stage.color}20`,
              backdropFilter: "blur(40px)",
              boxShadow: `0 0 60px ${stage.color}08, inset 0 0 40px rgba(0,0,0,0.3)`,
            }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.4 }}
          >
            {/* HUD corners */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l" style={{ borderColor: stage.color + "50" }} />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r" style={{ borderColor: stage.color + "50" }} />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l" style={{ borderColor: stage.color + "50" }} />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r" style={{ borderColor: stage.color + "50" }} />

            {/* Top border glow */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${stage.color}, transparent)`, boxShadow: `0 0 20px ${stage.color}60` }}
            />

            <div className="p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                  style={{ background: `${stage.color}12`, border: `1px solid ${stage.color}30`, boxShadow: `0 0 20px ${stage.color}15` }}
                >
                  {stage.icon}
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-[0.3em] uppercase" style={{ color: stage.color }}>{stage.label}</span>
                  <h3 className="text-2xl md:text-3xl font-bold mt-0.5" style={{ color: "#fff", fontFamily: "'Rajdhani', sans-serif" }}>
                    {stage.headline}
                  </h3>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base" style={{ lineHeight: 1.85 }}>
                {stage.narrative}
              </p>

              <div
                className="relative p-5 rounded-lg overflow-hidden"
                style={{ background: "rgba(2,2,8,0.6)", border: "1px solid rgba(255,255,255,0.04)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${stage.color}30, transparent)` }} />
                <span className="text-[9px] font-mono text-gray-600 uppercase tracking-[0.2em] block mb-2">TECHNICAL DETAIL</span>
                <p className="text-gray-400 text-xs leading-relaxed">{stage.detail}</p>
              </div>

              {/* Stage nav dots */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
                  disabled={activeStage === 0}
                  className="flex items-center gap-2 text-[10px] font-mono tracking-[0.15em] transition-all disabled:opacity-20"
                  style={{ color: stage.color }}
                >
                  ← PREV
                </button>
                <div className="flex items-center gap-2">
                  {STAGES.map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        background: i === activeStage ? stage.color : "rgba(255,255,255,0.1)",
                        boxShadow: i === activeStage ? `0 0 8px ${stage.color}` : "none",
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveStage(Math.min(STAGES.length - 1, activeStage + 1))}
                  disabled={activeStage === STAGES.length - 1}
                  className="flex items-center gap-2 text-[10px] font-mono tracking-[0.15em] transition-all disabled:opacity-20"
                  style={{ color: stage.color }}
                >
                  NEXT →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
