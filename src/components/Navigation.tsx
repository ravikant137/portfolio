"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const NAV_ITEMS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#pipeline", label: "Pipeline" },
  { href: "#dashboard", label: "Metrics" },
  { href: "#tech", label: "Stack" },
  { href: "#story", label: "Journey" },
  { href: "#contact", label: "Contact" },
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

      // Detect active section
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
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(3,3,8,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
        }}
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] origin-left"
          style={{
            scaleX,
            background: "linear-gradient(90deg, #1e90ff, #9333ea, #ff6b2b)",
            opacity: scrolled ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />

        <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-5">
          {/* Logo */}
          <a href="#hero" className="font-mono text-sm font-bold tracking-wider group">
            <span className="text-white group-hover:text-[#1e90ff] transition-colors duration-300">Ravikant</span>
            <span className="text-[#1e90ff] group-hover:text-[#9333ea] transition-colors duration-300"> Patil</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-1.5 font-mono text-[11px] transition-colors rounded"
                  style={{
                    color: isActive ? "#fff" : "#6b7280",
                  }}
                >
                  {item.label}
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{
                        background: "#1e90ff",
                        boxShadow: "0 0 6px #1e90ff80",
                      }}
                      layoutId="navActiveIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 w-6"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-[1.5px] bg-white/50 rounded origin-center"
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-[1.5px] bg-white/50 rounded"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-[1.5px] bg-white/50 rounded origin-center"
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
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="relative w-full glass-strong rounded-t-2xl p-6 space-y-2"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 font-mono text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.03]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
