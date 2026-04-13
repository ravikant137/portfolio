"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const CONTACT_LINKS = [
  {
    label: "GET IN TOUCH",
    href: "mailto:ravikantpatil137@gmail.com",
    icon: "✉",
    color: "#00e5ff",
    desc: "ravikantpatil137@gmail.com",
  },
  {
    label: "LINKEDIN",
    href: "https://linkedin.com/in/ravikant-patil",
    icon: "in",
    color: "#9333ea",
    desc: "linkedin.com/in/ravikant-patil",
    external: true,
  },
  {
    label: "CALL ME",
    href: "tel:+917058371347",
    icon: "✆",
    color: "#00ff88",
    desc: "+91 7058371347",
  },
];

const STATS = [
  { label: "Experience", value: "4.3 yrs" },
  { label: "Pipelines", value: "80+" },
  { label: "Daily Records", value: "10M+" },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-28 px-6 overflow-hidden"
    >
      {/* Ambient backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,229,255,0.04) 0%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 60% 55%, rgba(147,51,234,0.03) 0%, transparent 100%)" }} />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "linear-gradient(rgba(0,229,255,.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,.015) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto text-center w-full">
        {/* Top divider */}
        <motion.div
          className="h-px w-40 mx-auto mb-12 relative"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, #00e5ff50, #9333ea50, transparent)" }} />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ background: "#00e5ff", boxShadow: "0 0 15px #00e5ff" }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded text-[10px] font-mono tracking-[0.3em] mb-8"
          style={{ color: "#00e5ff", background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.15)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#00ff88", boxShadow: "0 0 8px #00ff88" }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          OPEN TO OPPORTUNITIES
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-5"
          style={{ fontFamily: "'Orbitron', sans-serif", lineHeight: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <span className="gradient-text-hero">Engineering Data.<br /></span>
          <span className="gradient-text">Driving Decisions.</span>
        </motion.h2>

        <motion.p
          className="text-gray-500 max-w-lg mx-auto mb-14 text-sm md:text-base leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          Turning complex data ecosystems into scalable, governed intelligence that powers business outcomes.
        </motion.p>

        {/* CTA grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {CONTACT_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="relative group flex flex-col items-center gap-2 px-5 py-5 rounded-xl overflow-hidden transition-all"
              style={{
                background: "rgba(6,6,20,0.7)",
                border: `1px solid rgba(255,255,255,0.05)`,
                backdropFilter: "blur(20px)",
              }}
              whileHover={{
                scale: 1.04,
                borderColor: link.color + "35",
                boxShadow: `0 0 40px ${link.color}12, 0 0 80px ${link.color}05`,
              }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.12 }}
            >
              {/* HUD corners */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: link.color + "60" }} />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: link.color + "60" }} />
              {/* Top glow bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${link.color}, transparent)`, boxShadow: `0 0 10px ${link.color}60` }}
              />
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at top, ${link.color}07 0%, transparent 70%)` }}
              />
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold transition-all duration-300 group-hover:scale-110"
                style={{ background: `${link.color}12`, border: `1px solid ${link.color}25`, color: link.color, fontFamily: "'Rajdhani', sans-serif" }}
              >
                {link.icon}
              </div>
              <div className="text-[9px] font-mono tracking-[0.2em]" style={{ color: link.color }}>{link.label}</div>
              <div className="text-[9px] text-gray-600 font-mono text-center truncate w-full px-2">{link.desc}</div>
            </motion.a>
          ))}
        </motion.div>

        {/* Profile card */}
        <motion.div
          className="relative mx-auto max-w-md overflow-hidden rounded-2xl"
          style={{
            background: "rgba(5,5,18,0.96)",
            border: "1px solid rgba(0,229,255,0.1)",
            backdropFilter: "blur(40px)",
            boxShadow: "0 0 60px rgba(0,229,255,0.04), inset 0 0 40px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.1 }}
          whileHover={{ boxShadow: "0 0 60px rgba(0,229,255,0.08), inset 0 0 40px rgba(0,0,0,0.3)" }}
        >
          {/* HUD corners */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l" style={{ borderColor: "rgba(0,229,255,0.35)" }} />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r" style={{ borderColor: "rgba(147,51,234,0.35)" }} />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l" style={{ borderColor: "rgba(147,51,234,0.35)" }} />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r" style={{ borderColor: "rgba(0,229,255,0.35)" }} />

          {/* Top gradient */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #00e5ff40, #9333ea40, transparent)" }} />

          {/* Scan line */}
          <motion.div
            className="absolute inset-x-0 h-[1px] pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative p-7 space-y-5">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative w-16 h-16 shrink-0" style={{ perspective: 600 }}>
                <div className="absolute inset-[-4px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,229,255,0.18) 0%, transparent 70%)", filter: "blur(6px)" }} />
                <motion.div
                  className="relative w-16 h-16 overflow-hidden rounded-full"
                  style={{ border: "2px solid rgba(0,229,255,0.3)", boxShadow: "0 0 20px rgba(0,229,255,0.12), 0 4px 16px rgba(0,0,0,0.5)" }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/bg-nobg.webp"
                    alt="Ravikant Patil"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover object-top scale-[1.4]"
                  />
                </motion.div>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white/90" style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.05em" }}>RAVIKANT PATIL</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[9px] font-mono tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.35)" }}>Data Engineer @ Lacento Technologies</span>
                </div>
              </div>
            </div>

            <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.15), transparent)" }} />

            <div className="grid grid-cols-3 gap-3 text-center">
              {STATS.map((s) => (
                <div key={s.label} className="relative p-3 rounded-lg overflow-hidden" style={{ background: "rgba(2,2,8,0.6)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="text-sm font-bold text-white/85 font-mono" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 13 }}>{s.value}</div>
                  <div className="text-[8px] font-mono tracking-[0.1em] mt-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>{s.label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom divider */}
        <motion.div
          className="h-px w-24 mx-auto mt-14"
          style={{ background: "linear-gradient(90deg, transparent, rgba(147,51,234,0.4), transparent)" }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
        />
      </div>
    </section>
  );
}
