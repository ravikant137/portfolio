"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import type { PipelineNode } from "./PipelineScene";

/* ─── Animated Counter ─── */
function MetricCounter({ value, delay = 0 }: { value: string; delay?: number }) {
  const [displayed, setDisplayed] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Parse numeric part
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    if (isNaN(num)) {
      setDisplayed(value);
      return;
    }

    let frame = 0;
    const totalFrames = 40;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = num * eased;

        if (num >= 10) {
          setDisplayed(Math.round(current) + suffix);
        } else {
          setDisplayed((Math.round(current * 10) / 10) + suffix);
        }

        if (frame >= totalFrames) {
          setDisplayed(value);
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <span ref={ref} className="font-bold tabular-nums">
      {displayed}
    </span>
  );
}

interface DetailPanelProps {
  node: PipelineNode | null;
  onClose: () => void;
}

export default function DetailPanel({ node, onClose }: DetailPanelProps) {
  return (
    <AnimatePresence>
      {node && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-xl overflow-y-auto"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
          >
            <div className="h-full p-5 flex flex-col glass-strong m-3">
              {/* ── Header ── */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <motion.span
                    className="text-4xl"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    {node.icon}
                  </motion.span>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: node.color }}>
                      {node.label}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{node.description}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* ── Energy divider ── */}
              <div className="relative h-px mb-5">
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(90deg, transparent, ${node.color}, transparent)` }}
                />
                <motion.div
                  className="absolute h-1 w-20 -top-[1px] rounded-full"
                  style={{ background: node.color, boxShadow: `0 0 20px ${node.color}` }}
                  animate={{ left: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* ── Achievement Metrics (HIGHLIGHT) ── */}
              <div className="mb-5">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-3">
                  Key Achievements
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {node.achievements.map((a, i) => (
                    <motion.div
                      key={a.value}
                      className="metric-card glass-panel p-4 relative"
                      style={
                        {
                          "--accent": node.color,
                          "--accent-dim": `${node.color}10`,
                        } as React.CSSProperties
                      }
                      initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                    >
                      <div
                        className="text-2xl font-mono mb-1"
                        style={{
                          color: node.color,
                          textShadow: `0 0 15px ${node.color}60, 0 0 40px ${node.color}20`,
                        }}
                      >
                        <MetricCounter value={a.metric} delay={400 + i * 150} />
                      </div>
                      <div className="text-xs font-semibold text-gray-300">{a.value}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{a.description}</div>

                      {/* Glow pulse behind metric */}
                      <motion.div
                        className="absolute top-2 right-2 w-3 h-3 rounded-full"
                        style={{ background: node.color }}
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ── Tools & Technologies ── */}
              <div className="mb-5">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-3">
                  Tools & Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {node.tools.map((tool, i) => (
                    <motion.span
                      key={tool}
                      className="px-3 py-1 rounded-full text-[11px] font-mono"
                      style={{
                        background: `${node.color}12`,
                        border: `1px solid ${node.color}30`,
                        color: node.color,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.06 }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* ── Architecture Mini ── */}
              <div className="mb-5">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-3">
                  Architecture Flow
                </h4>
                <div
                  className="rounded-xl p-4 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${node.color}06, ${node.color}03)`,
                    border: `1px solid ${node.color}18`,
                  }}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    {["Source", "Ingest", "Transform", "Load", "Serve"].map((stage, i) => (
                      <div key={stage} className="flex items-center gap-1.5">
                        <div
                          className="w-14 h-9 rounded-md flex items-center justify-center text-[9px] font-mono"
                          style={{
                            border: `1px solid ${node.color}${i === 2 ? "66" : "33"}`,
                            background: i === 2 ? `${node.color}18` : `${node.color}08`,
                            color: node.color,
                          }}
                        >
                          {stage}
                        </div>
                        {i < 4 && (
                          <div className="flex items-center gap-0.5 shrink-0">
                            <div className="w-3 h-px" style={{ background: `${node.color}40` }} />
                            <div
                              className="w-0 h-0"
                              style={{
                                borderLeft: `3px solid ${node.color}60`,
                                borderTop: "2px solid transparent",
                                borderBottom: "2px solid transparent",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Animated data flow */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${node.color}, transparent)` }}
                    animate={{ left: ["-20%", "120%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>

              {/* ── Use Case Details ── */}
              <div className="mb-5 flex-1">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-3">
                  Real-World Use Case
                </h4>
                <p className="text-sm leading-relaxed text-gray-400">{node.details}</p>
              </div>

              {/* ── CTA Buttons ── */}
              <div className="flex gap-3 mt-auto pt-4">
                {node.github && (
                  <motion.a
                    href={node.github}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: `${node.color}15`,
                      border: `1px solid ${node.color}35`,
                      color: node.color,
                    }}
                    whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${node.color}20` }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Code
                  </motion.a>
                )}
                <motion.button
                  className="flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${node.color}25, ${node.color}10)`,
                    border: `1px solid ${node.color}35`,
                    color: node.color,
                  }}
                  whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${node.color}20` }}
                  whileTap={{ scale: 0.97 }}
                >
                  Live Demo →
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

