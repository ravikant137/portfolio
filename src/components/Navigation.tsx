"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const NAV_ITEMS = [
  { href: "#hero", label: "HOME", icon: "⬡" },
  { href: "#about", label: "ABOUT", icon: "◇" },
  { href: "#pipeline", label: "PIPELINE", icon: "◈" },
  { href: "#dashboard", label: "METRICS", icon: "◎" },
  { href: "#tech", label: "STACK", icon: "⬢" },
  { href: "#resume", label: "RESUME", icon: "📄" },
  { href: "#contact", label: "CONTACT", icon: "◉" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: scrolled ? "rgba(2,2,8,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(30px) saturate(1.8)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,229,255,0.08)" : "none",
          transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* HUD corner accents */}
        {scrolled && (
          <>
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l" style={{ borderColor: "rgba(0,229,255,0.3)" }} />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r" style={{ borderColor: "rgba(147,51,234,0.3)" }} />
          </>
        )}

        {/* Scroll progress */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] origin-left"
          style={{
            scaleX,
            background: "linear-gradient(90deg, #00e5ff, #1e90ff, #9333ea, #ff6b2b)",
            opacity: scrolled ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />

        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-5">
          {/* Logo */}
          <a href="#hero" className="group flex items-center gap-2">
            <motion.div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(147,51,234,0.15))",
                border: "1px solid rgba(0,229,255,0.35)",
                color: "#00e5ff",
                transform: "rotate(45deg)",
              }}
              whileHover={{ scale: 1.1, rotate: 405, boxShadow: "0 0 20px rgba(0,229,255,0.4)" }}
              transition={{ duration: 0.4 }}
            >
              <span style={{ transform: "rotate(-45deg)", fontSize: 10 }}>RP</span>
            </motion.div>
            <div className="text-sm font-bold tracking-wider font-mono">
              <span className="text-white/90 group-hover:text-[#00e5ff] transition-colors duration-300">RAVIKANT</span>
              <span className="text-[#00e5ff] group-hover:text-[#9333ea] transition-colors duration-300 ml-1">PATIL</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-3.5 py-2 text-[10px] tracking-[0.2em] font-mono transition-all rounded"
                  style={{
                    color: isActive ? "#00e5ff" : "#6b7280",
                  }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 h-[2px]"
                      style={{
                        background: "linear-gradient(90deg, transparent, #00e5ff, transparent)",
                        boxShadow: "0 0 8px #00e5ff80",
                        width: "60%",
                        transform: "translateX(-50%)",
                      }}
                      layoutId="navActive"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Status badge */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded text-[9px] font-mono" style={{ border: "1px solid rgba(0,255,136,0.2)", color: "#00ff88" }}>
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff8880" }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              AVAILABLE
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 w-6"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-[1.5px] rounded origin-center"
              style={{ background: "#00e5ff" }}
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-[1.5px] rounded"
              style={{ background: "#9333ea" }}
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-[1.5px] rounded origin-center"
              style={{ background: "#00e5ff" }}
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="relative w-full rounded-t-2xl p-6 space-y-1"
              style={{
                background: "rgba(5,5,18,0.96)",
                border: "1px solid rgba(0,229,255,0.12)",
                borderBottom: "none",
                backdropFilter: "blur(40px)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* HUD corners on mobile menu */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l" style={{ borderColor: "rgba(0,229,255,0.4)" }} />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r" style={{ borderColor: "rgba(147,51,234,0.4)" }} />

              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 font-mono text-xs tracking-[0.15em] rounded-lg transition-colors"
                  style={{
                    color: activeSection === item.href ? "#00e5ff" : "#6b7280",
                    background: activeSection === item.href ? "rgba(0,229,255,0.05)" : "transparent",
                  }}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span style={{ color: "#9333ea" }}>{item.icon}</span>
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
