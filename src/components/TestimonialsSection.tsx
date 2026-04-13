"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Data Platform Lead, Lacento Technologies",
    text: "Ravikant led our Snowflake migration with zero downtime. His expertise in IICS and cloud data engineering directly enabled our team to deliver analytics 10x faster.",
    color: "#00e5ff",
    icon: "❄️",
  },
  {
    name: "Rahul Mehta",
    role: "Director of Analytics, Sigmasoft Infotech",
    text: "We reduced cloud costs by 30% and improved pipeline reliability thanks to Ravikant's architecture and hands-on leadership.",
    color: "#9333ea",
    icon: "📊",
  },
  {
    name: "Sonal Jain",
    role: "Project Manager, Enterprise Client",
    text: "The ETL automation and data quality frameworks implemented by Ravikant empowered our business teams with real-time, trusted data.",
    color: "#00ff88",
    icon: "🚀",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative min-h-[30vh] py-24 px-6 overflow-hidden">
      {/* Ambient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(147,51,234,0.03) 0%, transparent 100%)" }} />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block text-[10px] font-mono tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded"
            style={{ color: "#9333ea", background: "rgba(147,51,234,0.05)", border: "1px solid rgba(147,51,234,0.15)" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            FIELD REPORTS
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Testimonials
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            What clients and leaders say about my data engineering work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="relative flex flex-col gap-5 p-7 rounded-xl overflow-hidden group"
              style={{
                background: "rgba(6,6,20,0.7)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{
                scale: 1.02,
                borderColor: t.color + "30",
                boxShadow: `0 12px 40px ${t.color}10, 0 0 30px ${t.color}06`,
              }}
            >
              {/* HUD corners */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: t.color + "50" }} />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: t.color + "50" }} />

              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`, boxShadow: `0 0 10px ${t.color}40` }}
              />

              {/* Hover radial glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top, ${t.color}06 0%, transparent 70%)` }}
              />

              {/* Quote mark */}
              <div className="text-4xl font-bold leading-none select-none" style={{ color: t.color, opacity: 0.2, fontFamily: "serif" }}>"</div>

              <p className="text-gray-300 text-sm leading-relaxed italic flex-1">
                {t.text}
              </p>

              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {/* Avatar circle with icon */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
                  style={{ background: `${t.color}12`, border: `1px solid ${t.color}30` }}
                >
                  {t.icon}
                </div>
                <div>
                  <div className="font-bold text-sm text-white/90" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{t.name}</div>
                  <div className="text-[9px] font-mono tracking-[0.05em]" style={{ color: "rgba(255,255,255,0.25)" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
