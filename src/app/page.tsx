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
import Footer from "@/components/Footer";
import CertificationsSection from "@/components/CertificationsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ResumeSection from "@/components/ResumeSection";
import StoryMode from "@/components/StoryMode";
import AboutHero from "@/components/AboutHero";

// Dynamic imports for 3D scenes (heavy)
const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#020208]" />,
});

const PipelineScene = dynamic(() => import("@/components/PipelineScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#020208]" />,
});

/* ─── Animated typing text ─── */
function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          style={{ color: "#00e5ff" }}
        >
          ▌
        </motion.span>
      )}
    </span>
  );
}



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
          background: "radial-gradient(circle, rgba(0,229,255,0.03) 0%, rgba(147,51,234,0.02) 30%, transparent 70%)",
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
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#020208]/50 via-transparent to-[#020208]" />

          {/* Focus spotlight */}
          <div
            className="absolute inset-0 z-[11] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 60% at 50% 48%, rgba(2,2,8,0.82) 0%, rgba(2,2,8,0.4) 50%, transparent 80%)",
            }}
          />

          {/* Floating code symbols */}
          <div className="absolute inset-0 z-[12] pointer-events-none overflow-hidden">
            {["{ }", "=>", "< />", "[ ]", "fn()", "::", "SQL", "ETL", "λ", "∞"].map((sym, i) => (
              <motion.span
                key={sym}
                className="absolute font-mono text-white/[0.03] select-none"
                style={{
                  fontSize: 12 + i * 3,
                  left: `${10 + i * 9}%`,
                  top: `${15 + (i % 4) * 22}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  opacity: [0.02, 0.07, 0.02],
                  rotate: [0, i % 2 === 0 ? 6 : -6, 0],
                }}
                transition={{
                  duration: 5 + i * 0.6,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              >
                {sym}
              </motion.span>
            ))}
          </div>



          {/* ─── Text overlay ─── */}
          <div className="relative z-20 text-center px-6 max-w-5xl">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2 rounded text-[10px] font-mono tracking-[0.3em] mb-10"
              style={{
                background: "rgba(0,229,255,0.05)",
                border: "1px solid rgba(0,229,255,0.2)",
                color: "#00e5ff",
                boxShadow: "0 0 20px rgba(0,229,255,0.05), inset 0 0 20px rgba(0,229,255,0.03)",
              }}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.8, ease: "easeOut" }}
            >
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ background: "#00ff88", boxShadow: "0 0 8px #00ff88" }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              DATA ENGINEER
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 3.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] mb-2 tracking-tight hero-name-glow">
                <span className="text-white">Hi, I&apos;m</span>
                <br />
                <span className="relative inline-block gradient-text-hero">
                  Ravikant Patil
                  <motion.span
                    className="absolute -bottom-2 left-0 h-[3px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #00e5ff, #9333ea, #ff6b2b)",
                      boxShadow: "0 0 12px rgba(0,229,255,0.4)",
                    }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, delay: 3.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-bold mt-5 mb-8 text-shimmer hero-role-glow"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Data Engineer
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-sm md:text-base max-w-xl mx-auto mb-14 leading-relaxed font-mono"
              style={{
                color: "#8892a8",
                lineHeight: 1.9,
                letterSpacing: "0.02em",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 3.6, ease: "easeOut" }}
            >
              <TypingText
                text="I help organizations migrate to Snowflake, automate ETL with Informatica IICS, and deliver analytics pipelines that cut costs and drive decisions."
                delay={3.8}
              />
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 4.2, ease: "easeOut" }}
            >
              {/* Primary CTA */}
              <motion.a
                href="#pipeline"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg font-mono text-sm tracking-wider overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(0,229,255,0.12), rgba(147,51,234,0.12))",
                  border: "1px solid rgba(0,229,255,0.35)",
                  color: "#fff",
                  boxShadow: "0 0 30px rgba(0,229,255,0.08), inset 0 0 30px rgba(0,229,255,0.03)",
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 50px rgba(0,229,255,0.2), inset 0 0 30px rgba(0,229,255,0.06)",
                  borderColor: "rgba(0,229,255,0.6)",
                }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
                <span className="relative">EXPLORE PIPELINE</span>
                <svg className="relative w-5 h-5 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-lg font-mono text-sm tracking-wider transition-all"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#6b7280",
                }}
                whileHover={{
                  scale: 1.04,
                  borderColor: "rgba(0,229,255,0.3)",
                  color: "#00e5ff",
                  boxShadow: "0 0 20px rgba(0,229,255,0.06)",
                }}
                whileTap={{ scale: 0.96 }}
              >
                CONTACT ME
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
            transition={{ delay: 4.8, duration: 1 }}
          >
            <span className="text-[9px] font-mono tracking-[0.4em] uppercase" style={{ color: "rgba(0,229,255,0.25)" }}>SCROLL</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-5 h-9 rounded-full flex items-start justify-center pt-2" style={{ border: "1px solid rgba(0,229,255,0.15)" }}>
                <motion.div
                  className="w-1 h-2 rounded-full"
                  style={{ background: "linear-gradient(180deg, #00e5ff, #9333ea)" }}
                  animate={{ opacity: [1, 0.3, 1], scaleY: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
                className="inline-block text-[10px] font-mono tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded"
                style={{
                  color: "#00e5ff",
                  background: "rgba(0,229,255,0.05)",
                  border: "1px solid rgba(0,229,255,0.15)",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                End-to-End Architecture
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Interactive Data Pipeline
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-sm">
                Click on any pipeline stage to explore the architecture, tools, and
                real-world projects behind each component.
              </p>
            </motion.div>

            {/* 3D Pipeline */}
            <motion.div
              className="h-[400px] md:h-[500px] rounded-xl overflow-hidden relative"
              style={{
                border: "1px solid rgba(0,229,255,0.08)",
                background: "rgba(2,2,8,0.6)",
                boxShadow: "0 0 50px rgba(0,0,0,0.5), inset 0 0 50px rgba(0,0,0,0.3)",
              }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={pipelineInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* HUD corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l z-10 pointer-events-none" style={{ borderColor: "rgba(0,229,255,0.3)" }} />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r z-10 pointer-events-none" style={{ borderColor: "rgba(147,51,234,0.3)" }} />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l z-10 pointer-events-none" style={{ borderColor: "rgba(147,51,234,0.3)" }} />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r z-10 pointer-events-none" style={{ borderColor: "rgba(0,229,255,0.3)" }} />

              <div
                className="absolute inset-0 pointer-events-none z-10 rounded-xl"
                style={{ boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.6)" }}
              />
              <PipelineScene
                selectedNode={selectedNode}
                onSelectNode={setSelectedNode}
              />
            </motion.div>

            {/* Pipeline node cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
              {PIPELINE_NODES.map((node, i) => {
                const isActive = selectedNode === node.id;
                return (
                  <motion.button
                    key={node.id}
                    className="relative group text-left p-4 rounded-lg overflow-hidden transition-all"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${node.color}18, ${node.color}08)`
                        : "rgba(255,255,255,0.015)",
                      border: `1px solid ${isActive ? node.color + "50" : "rgba(255,255,255,0.04)"}`,
                      boxShadow: isActive
                        ? `0 0 30px ${node.color}15, 0 4px 20px rgba(0,0,0,0.4)`
                        : "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    whileHover={{
                      scale: 1.03,
                      borderColor: node.color + "40",
                      boxShadow: `0 0 25px ${node.color}15, 0 4px 20px rgba(0,0,0,0.4)`,
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
                    {/* Corner accents */}
                    {isActive && (
                      <>
                        <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l" style={{ borderColor: node.color + "60" }} />
                        <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r" style={{ borderColor: node.color + "60" }} />
                      </>
                    )}
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${node.color}08, transparent 70%)`,
                      }}
                    />
                    <span className="text-xl mb-2 block">{node.icon}</span>
                    <span
                      className="text-xs font-bold block mb-1 transition-colors font-mono"
                      style={{ color: isActive ? node.color : "#ccc" }}
                    >
                      {node.label}
                    </span>
                    <span className="text-[10px] text-gray-500 leading-tight block font-mono">
                      {node.tools.slice(0, 2).join(" • ")}
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute top-3 right-3 w-2 h-2 rounded-full"
                        style={{ background: node.color, boxShadow: `0 0 10px ${node.color}` }}
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Flow direction */}
            <div className="hidden md:flex items-center justify-center gap-1 mt-4">
              {PIPELINE_NODES.map((node, i) => (
                <div key={node.id} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: selectedNode === node.id ? node.color : "rgba(255,255,255,0.08)",
                      boxShadow: selectedNode === node.id ? `0 0 10px ${node.color}` : "none",
                    }}
                  />
                  {i < PIPELINE_NODES.length - 1 && (
                    <motion.div
                      className="w-8 h-px"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                      animate={{ opacity: [0.2, 0.8, 0.2] }}
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

        {/* ========== RESUME ========== */}
        <ResumeSection />

        {/* ========== CERTIFICATIONS ========== */}
        <CertificationsSection />

        {/* ========== TESTIMONIALS ========== */}
        <TestimonialsSection />

        {/* ========== CONTACT ========== */}
        <ContactSection />

        {/* ========== FOOTER ========== */}
        <Footer />
      </main>

      {/* ========== DETAIL PANEL (overlay) ========== */}
      <DetailPanel
        node={selectedPipelineNode}
        onClose={() => setSelectedNode(null)}
      />
    </>
  );
}
