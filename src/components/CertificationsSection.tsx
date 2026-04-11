"use client";

import { motion } from "framer-motion";
import { FaSnowflake, FaMicrosoft, FaCloud, FaCertificate } from "react-icons/fa";

const CERTIFICATIONS = [
  {
    name: "SnowPro Core",
    status: "Completed",
    icon: <FaSnowflake className="text-sky-400" />,
    highlight: true,
  },
  {
    name: "Azure Cert.",
    status: "Completed",
    icon: <FaMicrosoft className="text-blue-500" />,
  },
  {
    name: "Informatica IICS",
    status: "Completed",
    icon: <FaCloud className="text-green-400" />,
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Certifications</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Industry-recognized credentials validating expertise in Snowflake, Azure, and Informatica IICS.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.name}
              className={`glass-panel flex flex-col items-center p-8 rounded-xl border border-gray-700 shadow-lg transition-transform ${cert.highlight ? 'group hover:border-sky-400 hover:shadow-[0_0_0_4px_rgba(30,144,255,0.18)]' : 'hover:scale-105'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <div className="text-5xl mb-4 group-hover:animate-bounce group-hover:text-sky-400 transition-colors duration-300">{cert.icon}</div>
              <div className={`font-bold text-lg mb-1 whitespace-nowrap ${cert.highlight ? 'text-sky-300 group-hover:text-sky-400' : 'text-white/90'} transition-colors duration-300`}>{cert.name}</div>
              <div className={`text-xs font-mono mb-2 ${cert.highlight ? 'text-sky-400 group-hover:font-bold' : 'text-gray-400'} transition-colors duration-300`}>{cert.status}</div>
              <FaCertificate className={`text-yellow-400 text-xl mt-2 animate-pulse ${cert.highlight ? 'group-hover:scale-125 transition-transform duration-300' : ''}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
