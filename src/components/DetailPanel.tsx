"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { PipelineNode } from "./PipelineScene";

interface DetailPanelProps {
  node: PipelineNode | null;
  onClose: () => void;
}

export default function DetailPanel({ node, onClose }: DetailPanelProps) {
  return (
    <AnimatePresence>
      {node && (
        <>
          {/* Backdrop blur */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg overflow-y-auto"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="h-full p-6 flex flex-col glass-strong m-4 my-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{node.icon}</span>
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={{ color: node.color }}
                    >
                      {node.label}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{node.description}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Energy pulse divider */}
              <div className="relative h-px mb-6">
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(90deg, transparent, ${node.color}, transparent)` }}
                />
                <motion.div
                  className="absolute h-1 w-16 -top-[1px] rounded-full"
                  style={{ background: node.color, boxShadow: `0 0 15px ${node.color}` }}
                  animate={{ left: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Tools */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
                  Tools & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {node.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-full text-xs font-mono"
                      style={{
                        background: `${node.color}15`,
                        border: `1px solid ${node.color}33`,
                        color: node.color,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture Diagram Mini */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
                  Architecture
                </h4>
                <div
                  className="rounded-xl p-4 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${node.color}08, ${node.color}04)`,
                    border: `1px solid ${node.color}20`,
                  }}
                >
                  {/* Mini pipeline diagram */}
                  <div className="flex items-center justify-between gap-2">
                    {["Input", "Process", "Output"].map((stage, i) => (
                      <div key={stage} className="flex items-center gap-2">
                        <div
                          className="w-16 h-10 rounded-lg flex items-center justify-center text-[10px] font-mono"
                          style={{
                            border: `1px solid ${node.color}44`,
                            background: `${node.color}10`,
                            color: node.color,
                          }}
                        >
                          {stage}
                        </div>
                        {i < 2 && (
                          <div className="flex items-center gap-0.5">
                            <div className="w-4 h-px" style={{ background: node.color }} />
                            <div
                              className="w-0 h-0"
                              style={{
                                borderLeft: `4px solid ${node.color}`,
                                borderTop: "3px solid transparent",
                                borderBottom: "3px solid transparent",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="mb-6 flex-1">
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
                  Real-World Use Case
                </h4>
                <p className="text-sm leading-relaxed text-gray-300">
                  {node.details}
                </p>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                {node.github && (
                  <a
                    href={node.github}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                    style={{
                      background: `${node.color}20`,
                      border: `1px solid ${node.color}40`,
                      color: node.color,
                    }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Code
                  </a>
                )}
                <button
                  className="flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${node.color}30, ${node.color}10)`,
                    border: `1px solid ${node.color}40`,
                    color: node.color,
                  }}
                >
                  Live Demo →
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
