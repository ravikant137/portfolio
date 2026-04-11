"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "Initializing data pipeline...",
  "Loading 3D environment...",
  "Connecting to portfolio...",
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (lineIndex < BOOT_LINES.length - 1) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 450);
      return () => clearTimeout(t);
    }
  }, [lineIndex]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#030308]"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5 }}
        >
          {/* Pulsing core ring */}
          <motion.div
            className="relative w-16 h-16 mb-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid #1e90ff15" }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-2 rounded-full"
              style={{ border: "1.5px solid #9333ea30" }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.15 }}
            />
            <div
              className="absolute inset-5 rounded-full"
              style={{
                background: "radial-gradient(circle, #1e90ff 0%, #9333ea 100%)",
                opacity: 0.5,
                filter: "blur(1px)",
              }}
            />
          </motion.div>

          {/* Boot sequence lines */}
          <div className="h-16 flex flex-col items-center justify-start gap-1.5">
            {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
              <motion.div
                key={line}
                className="font-mono text-[11px] tracking-wider"
                style={{ color: i === lineIndex ? "#1e90ff" : "#333" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[#9333ea]">▸</span> {line}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-6 w-48 h-[2px] bg-white/[0.03] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #1e90ff, #9333ea, #ff6b2b)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
