"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "SYSTEM BOOT — DATA CORE v4.3.0",
  "LOADING PIPELINE ARCHITECTURE...",
  "CONNECTING TO SNOWFLAKE WAREHOUSE...",
  "INITIALIZING 3D ENVIRONMENT...",
  "PORTFOLIO READY",
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (lineIndex < BOOT_LINES.length - 1) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 420);
      return () => clearTimeout(t);
    }
  }, [lineIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 12, 100));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#020208" }}
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.05 }}
          transition={{ duration: 0.7 }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(30,144,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,144,255,.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Scanline */}
          <motion.div
            className="absolute inset-x-0 h-[2px] pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.25), transparent)" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Corner accents */}
          {[
            "top-8 left-8 border-t-2 border-l-2",
            "top-8 right-8 border-t-2 border-r-2",
            "bottom-8 left-8 border-b-2 border-l-2",
            "bottom-8 right-8 border-b-2 border-r-2",
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute w-8 h-8 ${cls}`}
              style={{ borderColor: i < 2 ? "rgba(0,229,255,0.5)" : "rgba(147,51,234,0.5)" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            />
          ))}

          {/* Central hex logo */}
          <motion.div
            className="relative mb-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Outer ring */}
            <motion.div
              className="absolute inset-[-20px] rounded-full"
              style={{ border: "1px solid rgba(0,229,255,0.15)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-[-36px] rounded-full"
              style={{ border: "1px solid rgba(147,51,234,0.1)", borderStyle: "dashed" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Core */}
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,255,0.1), rgba(147,51,234,0.15))",
                border: "1px solid rgba(0,229,255,0.35)",
                boxShadow: "0 0 30px rgba(0,229,255,0.15), 0 0 60px rgba(0,229,255,0.05)",
                transform: "rotate(45deg)",
              }}
              animate={{ boxShadow: ["0 0 30px rgba(0,229,255,0.15)", "0 0 60px rgba(0,229,255,0.35)", "0 0 30px rgba(0,229,255,0.15)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div style={{ transform: "rotate(-45deg)", fontSize: 24 }}>⬡</div>
            </motion.div>
          </motion.div>

          {/* Boot lines */}
          <div className="h-32 flex flex-col items-center justify-start gap-1.5 w-80">
            {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
              <motion.div
                key={line}
                className="font-mono text-[10px] tracking-[0.2em] flex items-center gap-2"
                style={{ color: i === lineIndex ? "#00e5ff" : "rgba(255,255,255,0.18)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span style={{ color: i === lineIndex ? "#9333ea" : "#333" }}>▶</span>
                {line}
                {i === lineIndex && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    style={{ color: "#00e5ff" }}
                  >
                    _
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-6 w-72 relative">
            <div className="flex justify-between text-[9px] font-mono mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>
              <span>LOADING</span>
              <span style={{ color: "#00e5ff" }}>{Math.round(progress)}%</span>
            </div>
            <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #1e90ff, #9333ea, #00e5ff)",
                  boxShadow: "0 0 8px #1e90ff80",
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
