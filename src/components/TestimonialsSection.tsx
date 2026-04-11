"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Data Platform Lead, Lacento Technologies",
    text: "Ravikant led our Snowflake migration with zero downtime. His expertise in IICS and cloud data engineering directly enabled our team to deliver analytics 10x faster.",
  },
  {
    name: "Rahul Mehta",
    role: "Director of Analytics, Sigmasoft Infotech",
    text: "We reduced cloud costs by 30% and improved pipeline reliability thanks to Ravikant's architecture and hands-on leadership.",
  },
  {
    name: "Sonal Jain",
    role: "Project Manager, Enterprise Client",
    text: "The ETL automation and data quality frameworks implemented by Ravikant empowered our business teams with real-time, trusted data.",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative min-h-[30vh] py-24 px-6">
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Testimonials</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            What clients and leaders say about my data engineering work.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="glass-panel p-7 rounded-xl border border-gray-700 shadow-lg flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <div className="text-gray-300 text-base italic">“{t.text}”</div>
              <div className="mt-4">
                <div className="font-bold text-sm text-white/90">{t.name}</div>
                <div className="text-xs text-gray-400">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
