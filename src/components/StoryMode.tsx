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
    id: 0, label: "01  — THE CHAOS", headline: "Raw, Unstructured, Everywhere", icon: "🌪️", color: "#ff6b2b",
    narrative: "Data pours in from 30+ sources — APIs, CDC streams, flat files, IoT sensors. Formats clash. Schemas drift. Volumes spike at 3 AM.",
    detail: "Millions of events per minute. REST, gRPC, Kafka topics, SFTP drops. No two sources speak the same language.",
  },
  {
    id: 1, label: "02  — INGESTION", headline: "Capture → Validate → Land", icon: "📡", color: "#1e90ff",
    narrative: "Airflow DAGs orchestrate extraction windows. Schema registries enforce contracts. Data lands in raw zones with full lineage metadata.",
    detail: "Python extractors, Kafka consumers, ADF pipelines. Every record tagged with source, timestamp, and ingestion batch ID.",
  },
  {
    id: 2, label: "03  — TRANSFORMATION", headline: "Clean → Enrich → Model", icon: "⚙️", color: "#9333ea",
    narrative: "dbt models cascade through staging → intermediate → marts. 500+ tests validate every layer. Slowly-changing dimensions track history.",
    detail: "PySpark for heavy lifting. dbt for SQL transformations. Great Expectations for data quality. All version-controlled, CI/CD deployed.",
  },
  {
    id: 3, label: "04  — WAREHOUSE", headline: "Star Schemas. Governed. Fast.", icon: "🏛️", color: "#00e5a0",
    narrative: "Snowflake multi-cluster warehouse auto-scales. Materialized views serve dashboards in <500ms. Row-level security locks down PII.",
    detail: "Medallion architecture: Bronze → Silver → Gold. Cost-optimized with auto-suspend. Query execution plans reviewed weekly.",
  },
  {
    id: 4, label: "05  — INSIGHTS", headline: "Decisions. In Real Time.", icon: "🎯", color: "#ff6b2b",
    narrative: "Self-service analytics for 200+ business users. ML features served from the feature store. Anomaly detection runs every 5 minutes.",
    detail: "Looker, Power BI, Streamlit apps — all connected to governed semantic layer. Data mesh principles emerging across domains.",
  },
];

export default function StoryMode() {
  const [activeStage, setActiveStage] = useState(0);

  const stage = STAGES[activeStage] ?? STAGES[0];

  return (
    <section id="story" className="relative min-h-screen py-28 px-6 overflow-hidden">
      {/* background pulse */}
      <AnimatePresence>
        {stage && (
          <motion.div
            key={stage.id}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${stage.color}08 0%, transparent 60%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">Data Journey</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Hover over each stage to explore how raw chaos becomes actionable intelligence.
          </p>
        </motion.div>

        {/* Stage Cards — hover to reveal */}
        <div className="relative mb-12">
          {/* Progress Rail */}
          <div className="absolute top-[14px] left-0 right-0 h-[2px] bg-white/5" />
          <motion.div
            className="absolute top-[14px] left-0 h-[2px] transition-all duration-500"
            style={{
              width: `${(activeStage / (STAGES.length - 1)) * 100}%`,
              background: `linear-gradient(90deg, #ff6b2b, ${stage.color})`,
              boxShadow: `0 0 12px ${stage.color}50`,
            }}
          />
          <div className="relative flex justify-between">
            {STAGES.map((s, i) => {
              const isActive = i === activeStage;
              const isPast = i < activeStage;
              return (
                <div
                  key={s.id}
                  className="flex flex-col items-center gap-2 z-10 cursor-pointer"
                  onMouseEnter={() => setActiveStage(i)}
                  onTouchStart={() => setActiveStage(i)}
                >
                  <motion.div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono border transition-all"
                    style={{
                      borderColor: isActive ? s.color : isPast ? s.color + "60" : "#ffffff10",
                      background: isActive ? s.color + "25" : "rgba(3,3,8,0.9)",
                      color: isActive || isPast ? s.color : "#333",
                      boxShadow: isActive ? `0 0 16px ${s.color}40` : "none",
                    }}
                    animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                  >
                    {isPast ? "✓" : i + 1}
                  </motion.div>
                  <span className="text-[8px] font-mono text-gray-600 hidden md:block">{s.label.split("—")[1]?.trim()}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            className="glass-strong p-8 md:p-10"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{stage.icon}</span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: stage.color }}>{stage.label}</span>
                <h3 className="text-2xl md:text-3xl font-bold" style={{ color: stage.color }}>{stage.headline}</h3>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">{stage.narrative}</p>

            <div className="glass-panel p-4">
              <span className="text-[9px] font-mono text-gray-600 uppercase tracking-wider block mb-1">Technical Detail</span>
              <p className="text-gray-400 text-xs leading-relaxed">{stage.detail}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
