"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = 2026;

  return (
    <footer className="relative py-10 px-6 overflow-hidden">
      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.4), rgba(147,51,234,0.4), transparent)" }}
      />

      {/* Subtle bg tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(2,2,8,0.6)" }}
      />

      <div className="relative max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo / Name */}
        <motion.div
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold"
            style={{
              background: "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(147,51,234,0.2))",
              border: "1px solid rgba(0,229,255,0.4)",
              color: "#00e5ff",
              transform: "rotate(45deg)",
            }}
          >
            <span style={{ transform: "rotate(-45deg)" }}>RP</span>
          </div>
          <span
            className="text-sm font-mono tracking-[0.18em] font-semibold"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            RAVIKANT PATIL
          </span>
        </motion.div>

        {/* Copyright */}
        <motion.p
          className="text-sm font-mono tracking-[0.08em] text-center"
          style={{ color: "rgba(255,255,255,0.70)" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {"\u00A9"} {year}{" "}
          <span style={{ color: "#00e5ff", fontWeight: 700 }}>Ravikant Patil</span>
          {". All rights reserved."}
        </motion.p>

        {/* Status */}
        <motion.div
          className="flex items-center gap-2 text-xs font-mono tracking-[0.12em]"
          style={{ color: "rgba(255,255,255,0.65)" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: "#00ff88", boxShadow: "0 0 8px #00ff88" }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          DATA ENGINEER
        </motion.div>
      </div>
    </footer>
  );
}
