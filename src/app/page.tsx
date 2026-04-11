"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import LoadingScreen from "@/components/LoadingScreen";
import DetailPanel from "@/components/DetailPanel";
import { PIPELINE_NODES } from "@/components/PipelineScene";
import DashboardSection from "@/components/DashboardSection";
import TechStackSection from "@/components/TechStackSection";
import ContactSection from "@/components/ContactSection";
import CertificationsSection from "@/components/CertificationsSection";
import StoryMode from "@/components/StoryMode";
import AboutHero from "@/components/AboutHero";

// Dynamic imports for 3D scenes (heavy)
const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#030308]" />,
});

const PipelineScene = dynamic(() => import("@/components/PipelineScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#030308]" />,
});

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const pipelineInView = useInView(pipelineRef, { once: true, margin: "-100px" });

  const selectedPipelineNode = PIPELINE_NODES.find((n) => n.id === selectedNode) ?? null;

  // Magnetic cursor glow
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <>
      <LoadingScreen />
      <Navigation />

      {/* Cursor glow — desktop only */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(30,144,255,0.04) 0%, rgba(147,51,234,0.02) 30%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(1px)",
        }}
      />

      <main className="relative">
        {/* ========== HERO SECTION ========== */}
        <section
          ref={heroRef}
          id="hero"
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* 3D Background */}
          <div className="absolute inset-0 z-0">
            <HeroScene />
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#030308]/40 via-transparent to-[#030308]" />

          {/* Focus spotlight — dark radial gradient behind text for contrast */}
          <div
            className="absolute inset-0 z-[11] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 60% at 50% 48%, rgba(3,3,8,0.78) 0%, rgba(3,3,8,0.4) 50%, transparent 80%)",
            }}
          />

          {/* Floating code symbols behind text */}
          <div className="absolute inset-0 z-[12] pointer-events-none overflow-hidden">
            {["{ }", "=>", "< />", "[ ]", "fn()", "::"].map((sym, i) => (
              <motion.span
                key={sym}
                className="absolute font-mono text-white/[0.03] select-none"
                style={{
                  fontSize: 14 + i * 4,
                  left: `${15 + i * 13}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.02, 0.06, 0.02],
                  rotate: [0, i % 2 === 0 ? 5 : -5, 0],
                }}
                transition={{
                  duration: 6 + i * 0.8,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeInOut",
                }}
              >
                {sym}
              </motion.span>
            ))}
          </div>

          {/* Text overlay */}
          <div className="relative z-20 text-center px-6 max-w-4xl">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono mb-10 tracking-widest"
              style={{
                background: "rgba(30, 144, 255, 0.06)",
                border: "1px solid rgba(30, 144, 255, 0.18)",
                color: "#1e90ff",
                textShadow: "0 0 8px rgba(30,144,255,0.3)",
                boxShadow: "0 0 30px rgba(30,144,255,0.05)",
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" />
              DATA ENGINEER
            </motion.div>

            {/* PRIMARY — Name with typewriter underline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-1 tracking-tight hero-name-glow">
                <span className="text-white">Hi, I&apos;m</span>
                <br />
                <span className="relative inline-block text-white">
                  Ravikant Patil
                  {/* Animated gradient underline */}
                  <motion.span
                    className="absolute -bottom-2 left-0 h-[3px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #1e90ff, #9333ea, #ff6b2b)",
                    }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, delay: 3.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* SECONDARY — Role with shimmer */}
            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-bold mt-6 mb-8 text-shimmer hero-role-glow"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Data Engineer
            </motion.h2>

            {/* TERTIARY — Description */}
            <motion.p
              className="text-base md:text-lg max-w-lg mx-auto mb-14 leading-relaxed"
              style={{
                color: "#9CA3AF",
                lineHeight: 1.85,
                textShadow: "0 2px 12px rgba(0,0,0,0.8)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 3.4, ease: "easeOut" }}
            >
              I help organizations migrate to Snowflake, automate ETL with Informatica IICS, and deliver analytics pipelines that cut costs, boost performance, and enable data-driven decisions. Ready to transform your data ecosystem?
            </motion.p>

            {/* CTA Buttons — dual */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.7, ease: "easeOut" }}
            >
              {/* Primary CTA */}
              <motion.a
                href="#pipeline"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm tracking-wide overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(30,144,255,0.22), rgba(147,51,234,0.18))",
                  border: "1px solid rgba(30,144,255,0.35)",
                  color: "#fff",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 20px rgba(30,144,255,0.08)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 8px 40px rgba(0,0,0,0.4), 0 0 50px rgba(30,144,255,0.2), 0 0 100px rgba(147,51,234,0.08)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Hover shimmer sweep */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s linear infinite",
                  }}
                />
                <span className="relative">See Case Studies</span>
                <svg className="relative w-5 h-5 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold text-sm tracking-wide transition-all"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#9CA3AF",
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  boxShadow: "0 0 30px rgba(255,255,255,0.03)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.2, duration: 1 }}
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/20 uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-5 h-9 rounded-full border border-white/15 flex items-start justify-center pt-1.5">
                <motion.div
                  className="w-1 h-2 rounded-full"
                  style={{ background: "linear-gradient(180deg, #1e90ff, #9333ea)" }}
                  animate={{ opacity: [1, 0.3, 1], scaleY: [1, 0.6, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ========== ABOUT / CINEMATIC SCENES ========== */}
        <AboutHero />

        {/* ========== PIPELINE SECTION ========== */}
        <section
          ref={pipelineRef}
          id="pipeline"
          className="relative min-h-screen py-24 px-6"
        >


          <div className="relative max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="inline-block text-[10px] font-mono tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full"
                style={{
                  color: "#1e90ff",
                  background: "rgba(30,144,255,0.06)",
                  border: "1px solid rgba(30,144,255,0.15)",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                End-to-End Architecture
              </motion.span>
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
              style={{
                border: "1px solid rgba(255,255,255,0.04)",
                background: "rgba(3,3,8,0.6)",
              }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={pipelineInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div
                className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
                style={{
                  boxShadow: "inset 0 0 80px rgba(0, 0, 0, 0.6)",
                }}
              />
              <PipelineScene
                selectedNode={selectedNode}
                onSelectNode={setSelectedNode}
              />
            </motion.div>

            {/* Pipeline node cards — premium interactive buttons */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
              {PIPELINE_NODES.map((node, i) => {
                const isActive = selectedNode === node.id;
                return (
                  <motion.button
                    key={node.id}
                    className="relative group text-left p-4 rounded-xl overflow-hidden transition-all"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${node.color}18, ${node.color}08)`
                        : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isActive ? node.color + "50" : "rgba(255,255,255,0.06)"}`,
                      boxShadow: isActive
                        ? `0 0 30px ${node.color}15, 0 4px 20px rgba(0,0,0,0.3)`
                        : "0 2px 10px rgba(0,0,0,0.2)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    whileHover={{
                      scale: 1.03,
                      borderColor: node.color + "40",
                      boxShadow: `0 0 25px ${node.color}12, 0 4px 20px rgba(0,0,0,0.3)`,
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedNode(isActive ? null : node.id)}
                  >
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${node.color}, transparent)`,
                        opacity: isActive ? 1 : 0,
                      }}
                    />

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${node.color}08, transparent 70%)`,
                      }}
                    />

                    <span className="text-xl mb-2 block">{node.icon}</span>
                    <span
                      className="text-xs font-bold block mb-1 transition-colors"
                      style={{ color: isActive ? node.color : "#ccc" }}
                    >
                      {node.label}
                    </span>
                    <span className="text-[10px] text-gray-500 leading-tight block">
                      {node.tools.slice(0, 2).join(" • ")}
                    </span>

                    {/* Active pulse dot */}
                    {isActive && (
                      <motion.div
                        className="absolute top-3 right-3 w-2 h-2 rounded-full"
                        style={{ background: node.color, boxShadow: `0 0 8px ${node.color}` }}
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Flow direction indicator */}
            <div className="hidden md:flex items-center justify-center gap-1 mt-4">
              {PIPELINE_NODES.map((node, i) => (
                <div key={node.id} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: selectedNode === node.id ? node.color : "rgba(255,255,255,0.1)",
                      boxShadow: selectedNode === node.id ? `0 0 8px ${node.color}` : "none",
                      transition: "all 0.3s",
                    }}
                  />
                  {i < PIPELINE_NODES.length - 1 && (
                    <motion.div
                      className="w-8 h-px"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  )}
                </div>
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

        {/* ========== CERTIFICATIONS ========== */}
        <CertificationsSection />

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

