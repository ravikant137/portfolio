"use client";

import { useState, useRef, Suspense, lazy } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import LoadingScreen from "@/components/LoadingScreen";
import DetailPanel from "@/components/DetailPanel";
import { PIPELINE_NODES } from "@/components/PipelineScene";
import DashboardSection from "@/components/DashboardSection";
import TechStackSection from "@/components/TechStackSection";
import ContactSection from "@/components/ContactSection";
import StoryMode from "@/components/StoryMode";

// Dynamic imports for 3D scenes (heavy)
const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#050510]" />,
});

const PipelineScene = dynamic(() => import("@/components/PipelineScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#050510]" />,
});

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const pipelineInView = useInView(pipelineRef, { once: true, margin: "-100px" });

  const selectedPipelineNode = PIPELINE_NODES.find((n) => n.id === selectedNode) ?? null;

  return (
    <>
      <LoadingScreen />
      <Navigation />

      <main className="relative">
        {/* ========== HERO SECTION ========== */}
        <section
          ref={heroRef}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* 3D Background */}
          <div className="absolute inset-0 z-0">
            <HeroScene />
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#050510]/40 via-transparent to-[#050510]" />

          {/* Text overlay */}
          <div className="relative z-20 text-center px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <motion.div
                className="inline-block px-4 py-1.5 rounded-full text-xs font-mono mb-6"
                style={{
                  background: "rgba(0, 212, 255, 0.1)",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                  color: "#00d4ff",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.8 }}
              >
                DATA ENGINEER • PIPELINE ARCHITECT • CLOUD SPECIALIST
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="block text-white/90">Transforming Raw Data</span>
                <span className="block gradient-text">into Intelligent Systems</span>
              </h1>

              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                I design and build scalable data pipelines, warehouse architectures,
                and analytics platforms that turn chaos into clarity.
              </p>

              <motion.a
                href="#pipeline"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-medium text-sm transition-all neon-glow"
                style={{
                  background: "linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(168, 85, 247, 0.15))",
                  border: "1px solid rgba(0, 212, 255, 0.3)",
                  color: "#00d4ff",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(0, 212, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Enter Data World
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2">
              <div className="w-1 h-2 rounded-full bg-cyan-400" />
            </div>
          </motion.div>
        </section>

        {/* ========== PIPELINE SECTION ========== */}
        <section
          ref={pipelineRef}
          id="pipeline"
          className="relative min-h-screen py-24 px-6"
        >
          <div className="absolute inset-0 grid-bg opacity-50" />

          <div className="relative max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                Interactive Data Pipeline
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Click on any pipeline stage to explore the architecture, tools, and
                real-world projects behind each component.
              </p>
            </motion.div>

            {/* 3D Pipeline */}
            <motion.div
              className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative"
              initial={{ opacity: 0 }}
              animate={pipelineInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div
                className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
                style={{
                  boxShadow: "inset 0 0 60px rgba(0, 0, 0, 0.5)",
                }}
              />
              <PipelineScene
                selectedNode={selectedNode}
                onSelectNode={setSelectedNode}
              />
            </motion.div>

            {/* Pipeline node buttons (mobile-friendly) */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {PIPELINE_NODES.map((node) => (
                <motion.button
                  key={node.id}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono transition-all"
                  style={{
                    background: selectedNode === node.id ? `${node.color}20` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${selectedNode === node.id ? node.color : "rgba(255,255,255,0.08)"}`,
                    color: selectedNode === node.id ? node.color : "#888",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                >
                  {node.icon} {node.label}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ========== STORY MODE ========== */}
        <StoryMode />

        {/* ========== DASHBOARD SECTION ========== */}
        <DashboardSection />

        {/* ========== TECH STACK ========== */}
        <TechStackSection />

        {/* ========== CONTACT ========== */}
        <ContactSection />
      </main>

      {/* ========== DETAIL PANEL (overlay) ========== */}
      <DetailPanel
        node={selectedPipelineNode}
        onClose={() => setSelectedNode(null)}
      />
    </>
  );
}

