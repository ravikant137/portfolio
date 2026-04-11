"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const JOURNEY_STAGES = [
  {
    title: "Data Sources",
    icon: "📡",
    narrative: "Every system begins with data. From ERP systems processing millions of transactions to IoT sensors streaming real-time telemetry — I connect them all into a unified ingestion layer.",
    color: "#00d4ff",
  },
  {
    title: "Ingestion Layer",
    icon: "⬇️",
    narrative: "Raw data flows through resilient pipelines — Apache Kafka for real-time streams, batch connectors for scheduled loads. With exactly-once processing, no record is ever lost or duplicated.",
    color: "#22d3ee",
  },
  {
    title: "ETL Processing",
    icon: "⚙️",
    narrative: "This is where the magic happens. Data is cleaned, validated, enriched, and transformed using dbt models orchestrated by Airflow. Complex business logic becomes elegant SQL.",
    color: "#a855f7",
  },
  {
    title: "Data Warehouse",
    icon: "🏗️",
    narrative: "Architected on Snowflake with a medallion pattern — Bronze for raw, Silver for cleansed, Gold for business-ready. Optimized for both analytics speed and cost efficiency.",
    color: "#ec4899",
  },
  {
    title: "Analytics & BI",
    icon: "📊",
    narrative: "The final output: dashboards that tell stories. Power BI and Tableau surfaces bring real-time KPIs to executives, enabling data-driven decisions across the organization.",
    color: "#f97316",
  },
];

export default function StoryMode() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const STAGE_DURATION = 5000; // 5 seconds per stage

  const stop = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
    setCurrentStage(0);
    setProgress(0);

    let stageStart = Date.now();
    let stage = 0;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - stageStart;
      const stageProgress = Math.min(elapsed / STAGE_DURATION, 1);
      setProgress(stageProgress);

      if (stageProgress >= 1) {
        stage++;
        if (stage >= JOURNEY_STAGES.length) {
          stop();
          return;
        }
        setCurrentStage(stage);
        stageStart = Date.now();
      }
    }, 50);
  }, [stop]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const stage = JOURNEY_STAGES[currentStage];

  return (
    <section id="story" className="relative py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Toggle button */}
        <div className="text-center mb-8">
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-medium text-sm transition-all"
            style={{
              background: isPlaying
                ? "linear-gradient(135deg, #ec489930, #a855f730)"
                : "linear-gradient(135deg, #00d4ff20, #a855f720)",
              border: `1px solid ${isPlaying ? "#ec489950" : "#00d4ff30"}`,
              color: isPlaying ? "#ec4899" : "#00d4ff",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isPlaying ? stop : play}
          >
            {isPlaying ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
                Stop Journey
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch My Journey
              </>
            )}
          </motion.button>
        </div>

        {/* Journey visualization */}
        <AnimatePresence mode="wait">
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Progress bar */}
              <div className="flex items-center gap-2 mb-8">
                {JOURNEY_STAGES.map((s, i) => (
                  <div key={s.title} className="flex-1 flex items-center gap-2">
                    <div className="flex-1">
                      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: s.color,
                            boxShadow: `0 0 8px ${s.color}40`,
                          }}
                          animate={{
                            width: i < currentStage ? "100%" : i === currentStage ? `${progress * 100}%` : "0%",
                          }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </div>
                    {i < JOURNEY_STAGES.length - 1 && (
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          background: i < currentStage ? JOURNEY_STAGES[i + 1].color : "#ffffff10",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Current stage card */}
              <motion.div
                key={currentStage}
                className="glass-strong p-8 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${stage.color}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 text-center">
                  <motion.span
                    className="text-5xl block mb-4"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    {stage.icon}
                  </motion.span>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: stage.color }}
                  >
                    {stage.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-lg mx-auto">
                    {stage.narrative}
                  </p>
                  <div className="mt-4 text-xs font-mono" style={{ color: `${stage.color}80` }}>
                    Stage {currentStage + 1} of {JOURNEY_STAGES.length}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
