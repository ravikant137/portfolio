"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[80vh] flex items-center justify-center py-24 px-6"
    >
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto w-full">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Holographic card */}
          <motion.div
            className="glass-strong p-10 md:p-16 relative overflow-hidden mx-auto max-w-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-[20px] overflow-hidden pointer-events-none">
              <motion.div
                className="absolute w-40 h-40 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(0, 212, 255, 0.3), transparent 70%)",
                  filter: "blur(20px)",
                }}
                animate={{
                  x: [0, 300, 300, 0, 0],
                  y: [0, 0, 300, 300, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-40 h-40 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 70%)",
                  filter: "blur(20px)",
                }}
                animate={{
                  x: [300, 0, 0, 300, 300],
                  y: [300, 300, 0, 0, 300],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                className="text-6xl mb-6"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                🌐
              </motion.div>

              <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
                Let&apos;s Build Data Systems Together
              </h2>

              <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
                Looking for a data engineer who can architect scalable pipelines,
                optimize warehouse performance, and deliver actionable insights?
              </p>

              {/* Contact links */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="mailto:hello@dataengineer.dev"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-sm transition-all"
                  style={{
                    background: "linear-gradient(135deg, #00d4ff20, #a855f720)",
                    border: "1px solid rgba(0, 212, 255, 0.3)",
                    color: "#00d4ff",
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(0, 212, 255, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Get in Touch
                </motion.a>

                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-sm transition-all"
                  style={{
                    background: "linear-gradient(135deg, #a855f720, #ec489920)",
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                    color: "#a855f7",
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(168, 85, 247, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </motion.a>

                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-sm transition-all"
                  style={{
                    background: "linear-gradient(135deg, #ffffff10, #ffffff05)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#e0e0ff",
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.p
            className="text-xs text-gray-600 mt-12 font-mono"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            Built with Next.js • Three.js • Framer Motion • Tailwind CSS
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
