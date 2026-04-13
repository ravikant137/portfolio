"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import DashboardPreview from "./DashboardPreview";

/* ─── data ─── */
const ACHIEVEMENTS = [
  { icon: "⚡", metric: "40%",  label: "Processing Time Reduced",   color: "#ff6b2b" },
  { icon: "💰", metric: "30%",  label: "Cloud Costs Optimized",      color: "#00e5ff" },
  { icon: "📊", metric: "10M+", label: "Records Processed Daily",    color: "#9333ea" },
  { icon: "🔄", metric: "99.9%",label: "Pipeline Uptime",            color: "#00ff88" },
  { icon: "🚀", metric: "50%",  label: "Query Latency Reduced",      color: "#ff6b2b" },
  { icon: "🎯", metric: "5×",   label: "Faster Business Decisions",  color: "#00e5ff" },
];
const INFO_BLOCKS = [
  { id: "intro",     title: "Hi, I'm Ravikant Patil",                subtitle: "Snowflake & IICS Data Engineer  •  4+ Years Experience",  body: "I help enterprises modernize data platforms with Snowflake, Informatica IICS, and Azure/AWS. My focus: seamless cloud migration, robust ETL pipelines, and real-time analytics that drive measurable business outcomes.", color: "#00e5ff" },
  { id: "lacento",   title: "Data Engineer @ Lacento Technologies",  subtitle: "Current  •  Snowflake, IICS, Azure Data Factory",          body: "Architecting scalable ETL pipelines (IICS, ADF), cloud-native Snowflake data platforms, and advanced analytics solutions. Led multiple data migration projects from legacy to cloud.", color: "#9333ea" },
  { id: "sigmasoft", title: "Previously @ Sigmasoft Infotech",       subtitle: "2022–2025  •  Bangalore, India",                           body: "Spearheaded Pentaho-to-Snowflake and SAP HANA-to-Azure migrations. Built enterprise ETL workflows with Informatica IICS & ADF, optimized SQL performance at enterprise scale.", color: "#ff6b2b" },
];

/* ─── counter ─── */
function Counter({ value, color, inView }: { value: string; color: string; inView: boolean }) {
  const suffix  = value.replace(/^[\d.]+/, "");
  const numStr  = value.match(/^([\d.]+)/)?.[1];
  const target  = numStr ? parseFloat(numStr) : 0;
  const isFloat = value.includes(".");
  const [display, setDisplay] = useState(numStr ? "0" + suffix : value);
  const done = useRef(false);
  useEffect(() => {
    if (!inView || !numStr || done.current) return;
    done.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1800, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay((isFloat ? (e * target).toFixed(1) : Math.round(e * target).toString()) + suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, suffix, isFloat, numStr]);
  return (
    <span style={{ color, textShadow: `0 0 25px ${color}50`, fontFamily: "'Orbitron', sans-serif" }}
      className="text-2xl md:text-3xl font-bold tabular-nums">
      {display}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CIRCULAR PROFESSIONAL PHOTO
   ═══════════════════════════════════════════════════════════════ */
function CircularPhotoPresence({ inView }: { inView: boolean }) {
  const areaRef  = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const cur      = useRef({ x: 0.5, y: 0.5 });
  const tgt      = useRef({ x: 0.5, y: 0.5 });
  const [m, setM]           = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState(false);

  /* smooth lerp loop */
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      cur.current.x = lerp(cur.current.x, tgt.current.x, 0.07);
      cur.current.y = lerp(cur.current.y, tgt.current.y, 0.07);
      setM({ x: cur.current.x, y: cur.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMove  = useCallback((e: React.MouseEvent) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    tgt.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
  }, []);
  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback(() => { setHovered(false); tgt.current = { x: 0.5, y: 0.5 }; }, []);

  const dx = m.x - 0.5;   // −0.5 → 0.5
  const dy = m.y - 0.5;

  /* 3-D tilt */
  const tiltX = dy * -14;
  const tiltY = dx *  14;

  /* specular position on the photo */
  const specX = m.x * 100;
  const specY = m.y * 100;

  /* glow color shift with cursor */
  const hue  = Math.round(180 + dx * 60);  // 150 cyan ↔ 210 blue-purple
  const hue2 = (hue + 140) % 360;

  /* glow intensity */
  const glowOpacity = hovered ? 0.9 : 0.55;
  const outerOpacity = hovered ? 0.7 : 0.35;

  return (
    <motion.div
      ref={areaRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative mx-auto flex items-center justify-center"
      style={{ width: 380, height: 380, perspective: 900 }}
      initial={{ opacity: 0, scale: 0.75, y: 50 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      {/* ── AMBIENT GLOW BENEATH ── */}
      <motion.div
        className="absolute inset-[-20%] rounded-full pointer-events-none"
        style={{ filter: "blur(50px)", zIndex: 0 }}
        animate={{
          background: [
            "radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(0,100,180,0.08) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(0,180,255,0.22) 0%, rgba(147,51,234,0.10) 50%, transparent 80%)",
            "radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(0,100,180,0.08) 50%, transparent 80%)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── OUTER DASHED RING (slow rotate) ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -20,
          border: `1.5px dashed hsla(${hue},80%,60%,${outerOpacity})`,
          boxShadow: `0 0 12px hsla(${hue},80%,60%,${outerOpacity * 0.4})`,
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Dashed ring dots */}
      {[0, 90, 180, 270].map((deg) => (
        <motion.div
          key={deg}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 7, height: 7,
            background: `hsla(${hue},80%,65%,${outerOpacity})`,
            boxShadow: `0 0 8px hsla(${hue},80%,60%,0.8)`,
            top: "50%", left: "50%",
            transformOrigin: "0 0",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            // offset so each dot stays at 0°/90°/180°/270° on the ring
            // we just stack them on the ring — positions are visual via the ring itself
          }}
        />
      ))}

      {/* ── SOLID NEON RING ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: 0,
          border: `2.5px solid hsla(${hue},90%,60%,${glowOpacity})`,
          boxShadow: `
            0 0 0 1px hsla(${hue},90%,60%,${glowOpacity * 0.3}),
            0 0 16px hsla(${hue},80%,60%,${glowOpacity * 0.6}),
            0 0 40px hsla(${hue},80%,60%,${glowOpacity * 0.25}),
            0 0 80px hsla(${hue2},70%,55%,${glowOpacity * 0.12}),
            inset 0 0 20px hsla(${hue},80%,60%,${glowOpacity * 0.08})
          `,
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
      />

      {/* ── PHOTO CIRCLE ── */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: hovered ? "transform 0.06s ease-out" : "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
          willChange: "transform",
          background: "linear-gradient(145deg, #0d1a2a, #071018)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.05 : 1.0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src="/bg.png"
            alt="Ravikant Patil"
            fill
            sizes="380px"
            className="object-cover object-top"
            draggable={false}
            priority
            style={{ filter: `brightness(${0.92 + (1 - m.y) * 0.16}) contrast(1.06) saturate(1.12)` }}
          />
        </motion.div>

        {/* Specular highlight — follows cursor */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${specX}% ${specY}%, rgba(255,255,255,${hovered ? 0.13 : 0.04}) 0%, transparent 55%)`,
            mixBlendMode: "screen",
            transition: hovered ? "none" : "background 0.6s",
          }}
        />

        {/* Subtle scan line sweep on hover */}
        {hovered && (
          <motion.div
            className="absolute inset-x-0 h-[1px] pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, hsla(${hue},80%,65%,0.5), transparent)` }}
            animate={{ top: ["-1%", "101%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
          />
        )}

        {/* Edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.55)" }}
        />
      </div>

      {/* ── STATUS DOT ── */}
      <motion.div
        className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
        style={{
          background: "rgba(2,2,8,0.85)",
          border: "1px solid rgba(0,255,136,0.25)",
          backdropFilter: "blur(10px)",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ background: "#00ff88", boxShadow: "0 0 8px #00ff88" }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-[9px] font-mono tracking-[0.15em]" style={{ color: "#00ff88" }}>AVAILABLE</span>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */
export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Ambient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 30% 40%, rgba(0,229,255,0.03) 0%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 70% 60%, rgba(147,51,234,0.03) 0%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.2, backgroundImage: "linear-gradient(rgba(0,229,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,.02) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text" style={{ fontFamily: "'Orbitron', sans-serif" }}>About Me</h2>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-24">
          {/* Photo */}
          <motion.div style={{ y: photoY }} className="flex justify-center">
            <CircularPhotoPresence inView={inView} />
          </motion.div>

          {/* Text */}
          <div className="relative">
            {INFO_BLOCKS.map((block, idx) => (
              <motion.div key={block.id} className={`relative pl-6 ${idx > 0 ? "mt-14" : ""}`}
                initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + idx * 0.25 }}>
                <motion.div className="absolute left-0 top-0 w-[2px] rounded-full"
                  style={{ background: `linear-gradient(180deg, ${block.color}, transparent)` }}
                  initial={{ height: 0 }} animate={inView ? { height: "100%" } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + idx * 0.25 }} />
                <div className="absolute left-[-1px] top-0 w-3 h-3 border-t border-l" style={{ borderColor: block.color + "50" }} />
                <h3 className="text-xl md:text-2xl font-bold mb-2"
                  style={{ color: idx === 0 ? "#fff" : block.color, fontFamily: "'Rajdhani', sans-serif" }}>
                  {block.title}
                </h3>
                <p className="text-[10px] font-mono tracking-[0.1em] mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>{block.subtitle}</p>
                <p className="text-sm text-gray-400 leading-relaxed max-w-md" style={{ lineHeight: 1.8 }}>{block.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dashboard Preview */}
        <motion.div className="mb-24 max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.8 }}>
          <div className="text-center mb-6">
            <span className="inline-block text-[10px] font-mono tracking-[0.3em] uppercase px-4 py-1.5 rounded mb-4"
              style={{ color: "#00e5ff", background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.15)" }}>
              REAL PIPELINE METRICS
            </span>
          </div>
          <DashboardPreview />
        </motion.div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 1 }}>
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold gradient-text" style={{ fontFamily: "'Orbitron', sans-serif" }}>Measurable Impact</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div key={a.label} className="relative p-5 text-center group overflow-hidden rounded-xl"
                style={{ background: "rgba(6,6,20,0.7)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.04)" }}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                whileHover={{ scale: 1.04, y: -4, borderColor: a.color + "40", boxShadow: `0 12px 40px ${a.color}15` }}>
                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: a.color + "60" }} />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: a.color + "60" }} />
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${a.color}, transparent)` }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${a.color}06 0%, transparent 70%)` }} />
                <span className="text-2xl mb-2 block">{a.icon}</span>
                <Counter value={a.metric} color={a.color} inView={inView} />
                <p className="text-[10px] text-gray-500 mt-2 font-mono tracking-[0.05em]">{a.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="text-center mt-28" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 1.6 }}>
          <div className="relative h-px w-48 mx-auto mb-10">
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, #00e5ff50, #9333ea50, transparent)" }} />
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{ background: "#00e5ff", boxShadow: "0 0 15px #00e5ff80" }}
              animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
          <h3 className="text-3xl md:text-5xl font-bold gradient-text-hero mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>Ravikant Patil</h3>
          <p className="text-sm font-mono mb-2" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>DATA ENGINEER • CLOUD ARCHITECTURE • AI-DRIVEN SYSTEMS</p>
          <p className="text-xs text-gray-600 max-w-sm mx-auto mb-8">Building the infrastructure that powers tomorrow&apos;s data-driven decisions.</p>
          <motion.a href="#pipeline" className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-mono text-sm"
            style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.1), rgba(147,51,234,0.1))", border: "1px solid rgba(0,229,255,0.25)", color: "#00e5ff" }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(0,229,255,0.2)", borderColor: "rgba(0,229,255,0.5)" }}
            whileTap={{ scale: 0.96 }}>
            <span>EXPLORE MY WORK</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
