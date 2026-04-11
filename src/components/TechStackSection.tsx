"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Environment } from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";

interface TechItem {
  name: string;
  icon: string;
  color: string;
  proficiency: number;
  category: string;
  useCase: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
}

const TECH_STACK: TechItem[] = [
  { name: "Snowflake", icon: "❄️", color: "#29b5e8", proficiency: 95, category: "Cloud DW", useCase: "Multi-layer warehouse design, query optimization, cost management with auto-scaling clusters.", orbitRadius: 2.4, orbitSpeed: 0.3, orbitOffset: 0 },
  { name: "Databricks", icon: "🔥", color: "#ff3621", proficiency: 88, category: "Lakehouse", useCase: "Unified analytics on Delta Lake, PySpark notebooks, ML feature engineering.", orbitRadius: 2.4, orbitSpeed: 0.3, orbitOffset: Math.PI * 0.5 },
  { name: "Python", icon: "🐍", color: "#ffd43b", proficiency: 93, category: "Core Language", useCase: "ETL scripting, data validation, API integration, ML pipelines with Pandas & PySpark.", orbitRadius: 2.4, orbitSpeed: 0.3, orbitOffset: Math.PI },
  { name: "SQL", icon: "📋", color: "#1e90ff", proficiency: 98, category: "Query Engine", useCase: "Complex analytics, window functions, CTEs, stored procedures, performance tuning.", orbitRadius: 2.4, orbitSpeed: 0.3, orbitOffset: Math.PI * 1.5 },
  { name: "Apache Airflow", icon: "🌊", color: "#017cee", proficiency: 91, category: "Orchestration", useCase: "DAG-based pipeline scheduling, monitoring, alerting, and complex dependency management.", orbitRadius: 3.2, orbitSpeed: -0.2, orbitOffset: 0 },
  { name: "dbt", icon: "🔧", color: "#ff694b", proficiency: 94, category: "Transformation", useCase: "Modular SQL models, data testing, documentation, CI/CD for data transformations.", orbitRadius: 3.2, orbitSpeed: -0.2, orbitOffset: Math.PI * 0.5 },
  { name: "Azure", icon: "☁️", color: "#0078d4", proficiency: 89, category: "Cloud Platform", useCase: "ADF, Synapse, Blob Storage, Event Hub — full cloud data platform deployment.", orbitRadius: 3.2, orbitSpeed: -0.2, orbitOffset: Math.PI },
  { name: "AWS", icon: "🔶", color: "#ff9900", proficiency: 86, category: "Cloud Platform", useCase: "S3, Redshift, Glue, Lambda, Step Functions — serverless ETL & data lake.", orbitRadius: 3.2, orbitSpeed: -0.2, orbitOffset: Math.PI * 1.5 },
  { name: "Kafka", icon: "📨", color: "#231f20", proficiency: 85, category: "Streaming", useCase: "Real-time event streaming, topic partitioning, consumer group management.", orbitRadius: 3.9, orbitSpeed: 0.15, orbitOffset: Math.PI * 0.25 },
  { name: "Spark", icon: "⚡", color: "#e25a1c", proficiency: 87, category: "Processing", useCase: "Distributed data processing, PySpark transformations, streaming analytics.", orbitRadius: 3.9, orbitSpeed: 0.15, orbitOffset: Math.PI * 1.25 },
];

/* ─── 3D Orbiting Icon ─── */
function OrbitingIcon({ tech, isSelected, onClick }: { tech: TechItem; isSelected: boolean; onClick: () => void }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * tech.orbitSpeed + tech.orbitOffset;
    ref.current.position.x = Math.cos(t) * tech.orbitRadius;
    ref.current.position.z = Math.sin(t) * tech.orbitRadius;
    ref.current.position.y = Math.sin(t * 2) * 0.25;
  });

  return (
    <group ref={ref}>
      <Float speed={3} rotationIntensity={0} floatIntensity={0.15}>
        <mesh onClick={(e) => { e.stopPropagation(); onClick(); }}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial
            color={tech.color}
            emissive={tech.color}
            emissiveIntensity={isSelected ? 2.5 : 0.6}
            transparent
            opacity={isSelected ? 0.95 : 0.65}
          />
        </mesh>
        <Html center style={{ pointerEvents: "none", whiteSpace: "nowrap" }}>
          <div className="flex flex-col items-center select-none" style={{ transform: "translateY(-10px)" }}>
            <span className="text-lg">{tech.icon}</span>
            <span
              className="text-[8px] font-mono mt-0.5 px-1.5 py-0.5 rounded"
              style={{ color: tech.color, background: "rgba(3,3,8,0.9)", border: `1px solid ${tech.color}30` }}
            >
              {tech.name}
            </span>
          </div>
        </Html>
      </Float>
    </group>
  );
}

/* ─── Central Hub ─── */
function CenterHub() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.12; });

  return (
    <>
      <mesh ref={ref}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial color="#1e90ff" emissive="#1e90ff" emissiveIntensity={0.6} metalness={0.9} roughness={0.1} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#9333ea" emissive="#9333ea" emissiveIntensity={1.2} transparent opacity={0.55} />
      </mesh>
    </>
  );
}

/* ─── 3D Scene ─── */
function TechSceneContent({ selected, onSelect }: { selected: string | null; onSelect: (n: string | null) => void }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 3, 3]} color="#1e90ff" intensity={1.5} />
      <pointLight position={[-3, -2, 2]} color="#9333ea" intensity={0.8} />
      <fog attach="fog" args={["#030308", 8, 25]} />

      <CenterHub />

      {[2.4, 3.2, 3.9].map((r) => (
        <mesh key={r} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.004, 16, 100]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} transparent opacity={0.06} />
        </mesh>
      ))}

      {TECH_STACK.map((tech) => (
        <OrbitingIcon
          key={tech.name}
          tech={tech}
          isSelected={selected === tech.name}
          onClick={() => onSelect(selected === tech.name ? null : tech.name)}
        />
      ))}

      <Environment preset="night" />
    </>
  );
}

/* ─── Main Export ─── */
export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<string | null>(null);
  const item = TECH_STACK.find((t) => t.name === selected);

  return (
    <section ref={sectionRef} id="tech" className="relative min-h-screen py-28 px-6">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">Tech Stack</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm">
            Click any orbiting technology to explore proficiency, use cases, and project context.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* 3D Scene */}
          <motion.div
            className="lg:col-span-3 h-[400px] md:h-[520px]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <Canvas
              camera={{ position: [0, 2.5, 7], fov: 48 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              style={{ background: "transparent" }}
            >
              <TechSceneContent selected={selected} onSelect={setSelected} />
            </Canvas>
          </motion.div>

          {/* Detail Panel */}
          <div className="lg:col-span-2 space-y-4">
            {item ? (
              <motion.div
                key={item.name}
                className="glass p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: item.color }}>{item.name}</h3>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{item.category}</span>
                  </div>
                </div>

                {/* Proficiency bar */}
                <div className="my-4">
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-gray-500">Proficiency</span>
                    <span style={{ color: item.color }}>{item.proficiency}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`, boxShadow: `0 0 12px ${item.color}40` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.proficiency}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed">{item.useCase}</p>
              </motion.div>
            ) : (
              <motion.div
                className="glass p-6 text-center"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="text-4xl mb-2">🔮</div>
                <p className="text-xs text-gray-500">
                  Click a technology in the 3D scene to explore details
                </p>
              </motion.div>
            )}

            {/* Mini grid */}
            <div className="grid grid-cols-5 gap-1.5">
              {TECH_STACK.map((tech) => (
                <motion.button
                  key={tech.name}
                  className="glass-panel p-1.5 text-center transition-all"
                  style={{
                    borderColor: selected === tech.name ? tech.color : undefined,
                    color: selected === tech.name ? tech.color : "#555",
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelected(selected === tech.name ? null : tech.name)}
                >
                  <span className="text-base block">{tech.icon}</span>
                  <span className="text-[7px] font-mono block mt-0.5 truncate">{tech.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
