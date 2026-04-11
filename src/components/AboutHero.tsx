"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import DashboardPreview from "./DashboardPreview";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const ACHIEVEMENTS = [
  { icon: "⚡", metric: "40%", label: "Processing Time Reduced", color: "#ff6b2b" },
  { icon: "💰", metric: "30%", label: "Cloud Costs Optimized", color: "#1e90ff" },
  { icon: "📊", metric: "10M+", label: "Records Processed Daily", color: "#9333ea" },
  { icon: "🔄", metric: "99.9%", label: "Pipeline Uptime", color: "#00e5a0" },
  { icon: "🚀", metric: "50%", label: "Query Latency Reduced", color: "#ff6b2b" },
  { icon: "🎯", metric: "5×", label: "Faster Business Decisions", color: "#1e90ff" },
];

const INFO_BLOCKS = [
  {
    id: "intro",
    title: "Hi, I'm Ravikant Patil",
    subtitle: "Data Engineer  •  4.3 Years Experience",
    body: "I design and build scalable data systems that power business decisions.",
    color: "#1e90ff",
  },
  {
    id: "netapp",
    title: "Data Engineer @ NetApp",
    subtitle: "Building enterprise-scale data infrastructure",
    body: "Leading data pipeline architecture across cloud platforms — transforming complex, fragmented data into reliable, governed analytics that drive strategic decisions.",
    color: "#9333ea",
  },
  {
    id: "brand",
    title: "I don't just build pipelines.",
    subtitle: "I engineer systems that drive impact.",
    body: "From raw data chaos to executive dashboards — every system I build is designed for scale, reliability, and measurable business outcomes.",
    color: "#ff6b2b",
  },
];

/* ═══════════════════════════════════════════════════════════════
   MOUSE TRACKER HOOK
   ═══════════════════════════════════════════════════════════════ */

function useMouse(ref: React.RefObject<HTMLDivElement | null>) {
  const [pos, setPos] = useState({ x: 0, y: 0, isOver: false });

  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 → 1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setPos({ x, y, isOver: true });
    },
    [ref],
  );

  const onLeave = useCallback(() => setPos({ x: 0, y: 0, isOver: false }), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, onMove, onLeave]);

  return pos;
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING PARTICLES (behind avatar)
   ═══════════════════════════════════════════════════════════════ */

const PARTICLE_COLORS = ["#1e90ff", "#9333ea", "#ff6b2b", "#00e5a0"];

function BackgroundParticles() {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; dur: number; delay: number; yDrift: number; xDrift: number; color: string }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        dur: 4 + Math.random() * 6,
        delay: Math.random() * 4,
        yDrift: -(20 + Math.random() * 30),
        xDrift: (Math.random() - 0.5) * 20,
        color: PARTICLE_COLORS[i % 4],
      })),
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}50`,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, p.yDrift, 0],
            x: [0, p.xDrift, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3D AVATAR — FREE FLOATING, LAYERED, INTERACTIVE
   ═══════════════════════════════════════════════════════════════ */

function Avatar3D({ inView }: { inView: boolean }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const mouse = useMouse(areaRef);
  const [glowPulse, setGlowPulse] = useState(false);

  // periodic glow pulse every 5s
  useEffect(() => {
    const iv = setInterval(() => {
      setGlowPulse(true);
      setTimeout(() => setGlowPulse(false), 800);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  // parallax factors per layer (face least, edges most)
  const faceX = mouse.x * 4;
  const faceY = mouse.y * 3;
  const bodyX = mouse.x * 8;
  const bodyY = mouse.y * 6;
  const edgeX = mouse.x * 14;
  const edgeY = mouse.y * 10;

  const tiltX = mouse.y * -8; // perspective rotateX
  const tiltY = mouse.x * 8; // perspective rotateY

  return (
    <motion.div
      ref={areaRef}
      className="relative mx-auto"
      style={{
        maxWidth: 380,
        height: 520,
        perspective: 1200,
        willChange: "transform",
      }}
      initial={{ opacity: 0, scale: 0.85, y: 50 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Layer 0: Background particles ── */}
      <BackgroundParticles />

      {/* ── Layer 1: Ambient glow (deepest) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 55%, #1e90ff18 0%, transparent 70%), radial-gradient(ellipse 50% 45% at 55% 50%, #9333ea12 0%, transparent 65%)",
          filter: "blur(40px)",
          willChange: "transform",
          transform: `translate(${edgeX}px, ${edgeY}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* ── Layer 2: Floating shadow (ground effect) ── */}
      <motion.div
        className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "70%",
          height: 30,
          background: "radial-gradient(ellipse, rgba(30,144,255,0.15) 0%, transparent 70%)",
          filter: "blur(12px)",
          willChange: "transform",
        }}
        animate={{ scaleX: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Layer 3: Neon rim glow (around edges) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          willChange: "transform",
          transform: `translate(${edgeX}px, ${edgeY}px)`,
          transition: "transform 0.25s ease-out",
        }}
      >
        {/* Left rim */}
        <div
          className="absolute left-[15%] top-[8%] bottom-[15%] w-[2px] rounded-full"
          style={{
            background: "linear-gradient(180deg, transparent, #1e90ff60, #9333ea50, transparent)",
            filter: "blur(4px)",
            opacity: glowPulse ? 1 : 0.5,
            transition: "opacity 0.4s",
          }}
        />
        {/* Right rim */}
        <div
          className="absolute right-[15%] top-[8%] bottom-[15%] w-[2px] rounded-full"
          style={{
            background: "linear-gradient(180deg, transparent, #9333ea60, #ff6b2b50, transparent)",
            filter: "blur(4px)",
            opacity: glowPulse ? 1 : 0.5,
            transition: "opacity 0.4s",
          }}
        />
        {/* Top rim */}
        <div
          className="absolute top-[5%] left-[25%] right-[25%] h-[2px] rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, #1e90ff40, transparent)",
            filter: "blur(3px)",
            opacity: glowPulse ? 0.9 : 0.3,
            transition: "opacity 0.4s",
          }}
        />
      </div>

      {/* ── Layer 4: BODY (mid-depth, moves more) ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          willChange: "transform",
          transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate(${bodyX}px, ${bodyY}px)`,
          transition: mouse.isOver ? "transform 0.12s ease-out" : "transform 0.6s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Breathing + floating animation wrapper */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.015, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }}
        >
          <Image
            src="/ravikant-nobg.webp"
            alt="Ravikant Patil"
            width={340}
            height={450}
            className="select-none"
            draggable={false}
            priority
            style={{
              filter: `contrast(1.08) saturate(1.1) brightness(${glowPulse ? 1.05 : 0.95})`,
              transition: "filter 0.4s",
              willChange: "filter",
              objectFit: "contain",
              maxHeight: 500,
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Layer 5: FACE highlight (foreground, moves least) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          willChange: "transform",
          transform: `translate(${faceX}px, ${faceY}px)`,
          transition: mouse.isOver ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
      >
        {/* Subtle specular highlight on face area */}
        <div
          className="absolute top-[12%] left-[30%] w-[40%] h-[30%] rounded-full"
          style={{
            background: `radial-gradient(circle at ${50 + mouse.x * 20}% ${50 + mouse.y * 15}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
            filter: "blur(8px)",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* ── Glow pulse ring (every 5s) ── */}
      <motion.div
        className="absolute inset-[10%] rounded-full pointer-events-none"
        style={{
          border: "1px solid",
          borderColor: glowPulse ? "rgba(30,144,255,0.25)" : "transparent",
          boxShadow: glowPulse
            ? "0 0 40px rgba(30,144,255,0.15), inset 0 0 40px rgba(147,51,234,0.08)"
            : "none",
          transition: "all 0.4s ease-out",
        }}
      />

      {/* ── Holo scan line ── */}
      <motion.div
        className="absolute left-[10%] right-[10%] h-[1px] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #1e90ff30 30%, #9333ea25 70%, transparent 100%)",
          boxShadow: "0 0 12px #1e90ff15",
        }}
        animate={{ top: ["5%", "95%", "5%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Floating data dots ── */}
      {[
        { x: "5%", y: "20%", color: "#1e90ff", s: 5, d: 0 },
        { x: "92%", y: "35%", color: "#9333ea", s: 4, d: 0.8 },
        { x: "8%", y: "70%", color: "#ff6b2b", s: 6, d: 1.6 },
        { x: "88%", y: "75%", color: "#00e5a0", s: 4, d: 2.4 },
        { x: "12%", y: "45%", color: "#9333ea", s: 3, d: 0.4 },
        { x: "85%", y: "55%", color: "#1e90ff", s: 5, d: 1.2 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: dot.s,
            height: dot.s,
            left: dot.x,
            top: dot.y,
            background: dot.color,
            boxShadow: `0 0 ${dot.s * 3}px ${dot.color}60`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: dot.d }}
        />
      ))}

      {/* ── Frosted name badge (floating at bottom) ── */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div
          className="backdrop-blur-xl rounded-xl px-5 py-3 flex items-center gap-3"
          style={{
            background: "rgba(3,3,8,0.55)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(30,144,255,0.06)",
          }}
        >
          <motion.div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ background: "#00e5a0", boxShadow: "0 0 8px #00e5a060" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div>
            <div className="font-bold text-white/90 text-sm tracking-wide">Ravikant Patil</div>
            <div className="text-[10px] font-mono text-gray-400">
              Data Engineer  •  Pipeline Architect
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COUNTER — Animated count-up
   ═══════════════════════════════════════════════════════════════ */

function Counter({ value, color, inView }: { value: string; color: string; inView: boolean }) {
  const suffix = value.replace(/^[\d.]+/, "");
  const numStr = value.match(/^([\d.]+)/)?.[1];
  const target = numStr ? parseFloat(numStr) : 0;
  const isFloat = value.includes(".");
  const [display, setDisplay] = useState(numStr ? "0" + suffix : value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || !numStr || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setDisplay((isFloat ? current.toFixed(1) : Math.round(current).toString()) + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, suffix, isFloat, numStr]);

  return (
    <span
      className="text-2xl md:text-3xl font-bold font-mono tabular-nums"
      style={{ color, textShadow: `0 0 20px ${color}40` }}
    >
      {display}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */

export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 30% 40%, #1e90ff06 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 70% 60%, #9333ea05 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* ── ROW 1: AVATAR (left) + TEXT (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20">
          {/* Avatar — left side, no frame */}
          <motion.div style={{ y: photoY }}>
            <Avatar3D inView={inView} />
          </motion.div>

          {/* Text — right side with dark spotlight */}
          <div className="relative">
            {/* Dark spotlight behind text */}
            <div
              className="absolute -inset-8 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(3,3,8,0.6) 0%, transparent 70%)",
              }}
            />
            <div className="relative">
              {INFO_BLOCKS.map((block, idx) => (
                <motion.div
                  key={block.id}
                  className={`relative pl-5 ${idx > 0 ? "mt-14" : ""}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 + idx * 0.25 }}
                >
                  {/* Accent line left */}
                  <motion.div
                    className="absolute left-0 top-0 w-[2px] rounded-full"
                    style={{ background: `linear-gradient(180deg, ${block.color}, transparent)` }}
                    initial={{ height: 0 }}
                    animate={inView ? { height: "100%" } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + idx * 0.25 }}
                  />
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-2"
                    style={{
                      color: idx === 0 ? "#fff" : block.color,
                      textShadow: idx === 0 ? "0 0 10px rgba(255,255,255,0.08)" : `0 0 12px ${block.color}20`,
                    }}
                  >
                    {block.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-500 mb-3">{block.subtitle}</p>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-md" style={{ lineHeight: 1.8 }}>
                    {block.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ROW 2: DASHBOARD PREVIEW (full width, floating monitor) ── */}
        <motion.div
          className="mb-24 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-6">
            <motion.span
              className="inline-block text-[10px] font-mono tracking-[0.3em] uppercase px-4 py-1.5 rounded-full mb-4"
              style={{
                color: "#1e90ff",
                background: "rgba(30,144,255,0.06)",
                border: "1px solid rgba(30,144,255,0.15)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
            >
              Real Pipeline Metrics
            </motion.span>
          </div>
          <DashboardPreview />
        </motion.div>

        {/* ── ACHIEVEMENT METRICS ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold gradient-text">
              Measurable Impact at NetApp
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div
                key={a.label}
                className="relative p-5 text-center group overflow-hidden"
                style={{
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: 16,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                whileHover={{
                  scale: 1.04,
                  y: -4,
                  borderColor: a.color + "40",
                  boxShadow: `0 12px 40px ${a.color}15, 0 0 20px ${a.color}08`,
                }}
              >
                {/* Color accent bar top */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${a.color}, transparent)` }}
                />
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${a.color}06 0%, transparent 70%)`,
                  }}
                />
                <motion.div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full"
                  style={{ background: a.color }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
                <span className="text-2xl mb-2 block">{a.icon}</span>
                <Counter value={a.metric} color={a.color} inView={inView} />
                <p className="text-[11px] text-gray-500 mt-2 font-mono">{a.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CLOSING ── */}
        <motion.div
          className="text-center mt-28"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {/* Premium gradient divider */}
          <div className="relative h-px w-40 mx-auto mb-10">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent, #1e90ff50, #9333ea50, transparent)",
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                background: "#1e90ff",
                boxShadow: "0 0 12px #1e90ff60",
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <h3 className="text-3xl md:text-5xl font-bold gradient-text-hero mb-3">
            Ravikant Patil
          </h3>
          <p className="text-sm font-mono text-gray-500 mb-2">
            Data Engineer  •  Data Architecture  •  AI-Driven Systems
          </p>
          <p className="text-xs text-gray-600 max-w-sm mx-auto mb-8">
            Building the infrastructure that powers tomorrow&apos;s data-driven decisions.
          </p>
          <motion.a
            href="#pipeline"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-mono text-sm overflow-hidden transition-all"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,144,255,0.12), rgba(147,51,234,0.12))",
              border: "1px solid rgba(30,144,255,0.25)",
              color: "#1e90ff",
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 30px rgba(30,144,255,0.2), 0 0 60px rgba(147,51,234,0.08)",
              borderColor: "rgba(30,144,255,0.45)",
            }}
            whileTap={{ scale: 0.96 }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s linear infinite",
              }}
            />
            <span className="relative">Explore My Work</span>
            <svg className="relative w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
