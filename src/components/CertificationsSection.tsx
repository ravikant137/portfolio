"use client";

import { motion } from "framer-motion";
import { FaSnowflake, FaMicrosoft, FaCloud, FaCertificate } from "react-icons/fa";

const CERTIFICATIONS = [
  {
    name: "SnowPro Core",
    status: "Verified",
    icon: <FaSnowflake className="text-sky-400" />,
    color: "#29b5e8",
    highlight: true,
  },
  {
    name: "Azure Certified",
    status: "Verified",
    icon: <FaMicrosoft className="text-blue-500" />,
    color: "#0078d4",
  },
  {
    name: "Informatica IICS",
    status: "Verified",
    icon: <FaCloud className="text-green-400" />,
    color: "#00ff88",
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative min-h-[40vh] py-24 px-6">
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block text-[10px] font-mono tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded"
            style={{ color: "#00e5ff", background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.15)" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            ACHIEVEMENTS UNLOCKED
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Certifications
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Industry-recognized credentials validating expertise in Snowflake, Azure, and Informatica IICS.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.name}
              className="relative flex flex-col items-center p-8 rounded-xl overflow-hidden group"
              style={{
                background: "rgba(6,6,20,0.7)",
                backdropFilter: "blur(24px)",
                border: `1px solid rgba(255,255,255,0.05)`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{
                scale: 1.03,
                borderColor: cert.color + "40",
                boxShadow: `0 0 40px ${cert.color}15, 0 0 20px ${cert.color}08`,
              }}
            >
              {/* HUD corners */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l" style={{ borderColor: cert.color + "40" }} />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r" style={{ borderColor: cert.color + "40" }} />

              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`, boxShadow: `0 0 10px ${cert.color}40` }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at center, ${cert.color}06 0%, transparent 70%)` }}
              />

              <div className="text-5xl mb-5 transition-all duration-300 group-hover:scale-110" style={{ filter: `drop-shadow(0 0 10px ${cert.color}40)` }}>
                {cert.icon}
              </div>
              <div className="font-bold text-lg mb-1 tracking-wide transition-colors duration-300" style={{ color: cert.color, fontFamily: "'Rajdhani', sans-serif" }}>
                {cert.name}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono mb-3 tracking-[0.1em]" style={{ color: "#00ff88" }}>
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {cert.status}
              </div>
              <FaCertificate className="text-yellow-400 text-xl mt-1" style={{ filter: "drop-shadow(0 0 8px rgba(250,204,21,0.4))" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
