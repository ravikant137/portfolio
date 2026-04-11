"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#030308]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Pulsing core */}
          <motion.div
            className="relative w-14 h-14 mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid #1e90ff20" }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-2 rounded-full"
              style={{ border: "1.5px solid #9333ea40" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <div className="absolute inset-4 rounded-full bg-[#1e90ff] opacity-40" />
          </motion.div>

          {/* Text */}
          <motion.div
            className="font-mono text-xs text-gray-600 tracking-widest"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            INITIALIZING PIPELINE
          </motion.div>

          {/* Progress */}
          <div className="mt-5 w-40 h-[2px] bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #ff6b2b, #1e90ff, #9333ea)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
