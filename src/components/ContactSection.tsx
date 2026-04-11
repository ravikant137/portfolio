"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="contact" className="relative min-h-screen flex items-center justify-center py-28 px-6 overflow-hidden">
      {/* radial backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, #1e90ff06 0%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 60% 55%, #9333ea04 0%, transparent 100%)" }} />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Top line */}
        <motion.div
          className="h-px w-32 mx-auto mb-10"
          style={{ background: "linear-gradient(90deg, transparent, #1e90ff60, transparent)" }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1 }}
        />

        {/* Headline */}
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 gradient-text-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Engineering Data.
          <br />
          Driving Decisions.
        </motion.h2>

        <motion.p
          className="text-gray-500 max-w-lg mx-auto mb-12 text-sm md:text-base"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          Turning complex data ecosystems into scalable, governed intelligence that powers business outcomes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="mailto:ravikantpatil137@gmail.com"
            className="glass px-8 py-3.5 font-mono text-sm transition-all neon-glow-blue hover:bg-[#1e90ff10]"
            style={{ borderColor: "#1e90ff40", color: "#1e90ff" }}
          >
            ✉ Get in Touch
          </a>
          <a
            href="https://linkedin.com/in/ravikant-patil"
            target="_blank"
            rel="noopener noreferrer"
            className="glass px-8 py-3.5 font-mono text-sm transition-all hover:bg-[#9333ea10]"
            style={{ borderColor: "#9333ea30", color: "#9333ea" }}
          >
            in  LinkedIn
          </a>
          <a
            href="tel:+917058371347"
            className="glass px-8 py-3.5 font-mono text-sm transition-all hover:bg-[#00e5a010]"
            style={{ borderColor: "#00e5a030", color: "#00e5a0" }}
          >
            ✆ +91 7058371347
          </a>
        </motion.div>

        {/* Holographic Card */}
        <motion.div
          className="glass-strong p-8 mx-auto max-w-md relative overflow-hidden group"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          {/* shimmer */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
            background: "linear-gradient(120deg, transparent 30%, #1e90ff08 50%, transparent 70%)",
            backgroundSize: "200% 100%",
          }} />

          <div className="relative space-y-3 text-left">
            <div className="flex items-center gap-3">
              {/* 3D-style avatar — transparent bg, floating, neon rim */}
              <div
                className="relative w-14 h-14 shrink-0"
                style={{ perspective: 600 }}
              >
                {/* Neon glow behind */}
                <div
                  className="absolute inset-[-4px] rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(30,144,255,0.15) 0%, transparent 70%)",
                    filter: "blur(6px)",
                  }}
                />
                {/* Floating avatar with transparent bg */}
                <motion.div
                  className="relative w-14 h-14 overflow-hidden rounded-full"
                  style={{
                    border: "2px solid rgba(30,144,255,0.3)",
                    boxShadow: "0 0 16px rgba(30,144,255,0.1), 0 4px 12px rgba(0,0,0,0.4)",
                  }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/bg-nobg.webp"
                    alt="Ravikant Patil"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover object-top scale-[1.4]"
                  />
                </motion.div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white/90">Ravikant Patil</h3>
                <span className="text-[10px] font-mono text-gray-500">Data Engineer @ Lacento Technologies</span>
              </div>
            </div>

            <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, #1e90ff20, transparent)" }} />

            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: "Experience", value: "4.3 yrs" },
                { label: "Pipelines", value: "80+" },
                { label: "Daily Records", value: "10M+" },
              ].map((s) => (
                <div key={s.label} className="glass-panel p-2">
                  <div className="text-sm font-bold text-white/80">{s.value}</div>
                  <div className="text-[8px] font-mono text-gray-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          className="h-px w-24 mx-auto mt-14"
          style={{ background: "linear-gradient(90deg, transparent, #9333ea40, transparent)" }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
        />
      </div>
    </section>
  );
}
