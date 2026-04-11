"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Environment } from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import { useState } from "react";

interface TechItem {
  name: string;
  icon: string;
  color: string;
  proficiency: number;
  useCase: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
}

const TECH_STACK: TechItem[] = [
  {
    name: "Snowflake",
    icon: "❄️",
    color: "#29b5e8",
    proficiency: 95,
    useCase: "Cloud data warehouse — designed multi-layer schemas, optimized query performance, managed cost with auto-scaling clusters.",
    orbitRadius: 2.5,
    orbitSpeed: 0.3,
    orbitOffset: 0,
  },
  {
    name: "Python",
    icon: "🐍",
    color: "#ffd43b",
    proficiency: 92,
    useCase: "ETL scripting, data validation, API integration, ML pipeline development using Pandas, PySpark, and FastAPI.",
    orbitRadius: 2.5,
    orbitSpeed: 0.3,
    orbitOffset: Math.PI * 0.5,
  },
  {
    name: "SQL",
    icon: "📋",
    color: "#00d4ff",
    proficiency: 98,
    useCase: "Complex analytical queries, window functions, CTEs, stored procedures, database optimization and indexing.",
    orbitRadius: 2.5,
    orbitSpeed: 0.3,
    orbitOffset: Math.PI,
  },
  {
    name: "Azure",
    icon: "☁️",
    color: "#0078d4",
    proficiency: 88,
    useCase: "Azure Data Factory, Synapse Analytics, Blob Storage, Event Hub — full cloud data platform deployment.",
    orbitRadius: 2.5,
    orbitSpeed: 0.3,
    orbitOffset: Math.PI * 1.5,
  },
  {
    name: "AWS",
    icon: "🔶",
    color: "#ff9900",
    proficiency: 85,
    useCase: "S3, Redshift, Glue, Lambda, Step Functions — serverless ETL and data lake architecture.",
    orbitRadius: 3.2,
    orbitSpeed: -0.2,
    orbitOffset: Math.PI * 0.25,
  },
  {
    name: "Apache Spark",
    icon: "⚡",
    color: "#e25a1c",
    proficiency: 87,
    useCase: "Large-scale distributed data processing, PySpark transformations, and streaming analytics.",
    orbitRadius: 3.2,
    orbitSpeed: -0.2,
    orbitOffset: Math.PI * 0.75,
  },
  {
    name: "Airflow",
    icon: "🌊",
    color: "#017cee",
    proficiency: 90,
    useCase: "Pipeline orchestration — DAGs for scheduling, monitoring, and managing complex data workflows.",
    orbitRadius: 3.2,
    orbitSpeed: -0.2,
    orbitOffset: Math.PI * 1.25,
  },
  {
    name: "dbt",
    icon: "🔧",
    color: "#ff694b",
    proficiency: 93,
    useCase: "Data transformation layer — modular SQL models, testing, documentation, and CI/CD integration.",
    orbitRadius: 3.2,
    orbitSpeed: -0.2,
    orbitOffset: Math.PI * 1.75,
  },
];

function OrbitingIcon({
  tech,
  isSelected,
  onClick,
}: {
  tech: TechItem;
  isSelected: boolean;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * tech.orbitSpeed + tech.orbitOffset;
    ref.current.position.x = Math.cos(t) * tech.orbitRadius;
    ref.current.position.z = Math.sin(t) * tech.orbitRadius;
    ref.current.position.y = Math.sin(t * 2) * 0.3;
  });

  return (
    <group ref={ref}>
      <Float speed={3} rotationIntensity={0} floatIntensity={0.2}>
        <mesh onClick={(e) => { e.stopPropagation(); onClick(); }}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color={tech.color}
            emissive={tech.color}
            emissiveIntensity={isSelected ? 2 : 0.5}
            transparent
            opacity={isSelected ? 0.9 : 0.6}
          />
        </mesh>
        <Html center style={{ pointerEvents: "none", whiteSpace: "nowrap" }}>
          <div
            className="flex flex-col items-center cursor-pointer select-none"
            style={{ transform: "translateY(-8px)" }}
          >
            <span className="text-xl">{tech.icon}</span>
            <span
              className="text-[9px] font-mono mt-0.5 px-1.5 py-0.5 rounded"
              style={{
                color: tech.color,
                background: "rgba(5,5,16,0.9)",
                border: `1px solid ${tech.color}33`,
              }}
            >
              {tech.name}
            </span>
          </div>
        </Html>
      </Float>
    </group>
  );
}

function CenterHub() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <>
      <mesh ref={ref}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          wireframe
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={1}
          transparent
          opacity={0.5}
        />
      </mesh>
    </>
  );
}

function TechSceneContent({
  selectedTech,
  onSelectTech,
}: {
  selectedTech: string | null;
  onSelectTech: (name: string | null) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 3, 3]} color="#a855f7" intensity={1.5} />
      <pointLight position={[-3, -2, 2]} color="#00d4ff" intensity={1} />

      <CenterHub />

      {/* Orbit rings */}
      {[2.5, 3.2].map((r) => (
        <mesh key={r} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.005, 16, 100]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.08}
          />
        </mesh>
      ))}

      {TECH_STACK.map((tech) => (
        <OrbitingIcon
          key={tech.name}
          tech={tech}
          isSelected={selectedTech === tech.name}
          onClick={() => onSelectTech(selectedTech === tech.name ? null : tech.name)}
        />
      ))}

      <Environment preset="night" />
    </>
  );
}

export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const selectedItem = TECH_STACK.find((t) => t.name === selectedTech);

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="relative min-h-screen py-24 px-6"
    >
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Tech Stack
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Click any orbiting technology to see proficiency and real-world usage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* 3D Scene */}
          <motion.div
            className="lg:col-span-3 h-[400px] md:h-[500px]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <Canvas
              camera={{ position: [0, 2, 6], fov: 50 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              style={{ background: "transparent" }}
            >
              <TechSceneContent
                selectedTech={selectedTech}
                onSelectTech={setSelectedTech}
              />
            </Canvas>
          </motion.div>

          {/* Detail Panel */}
          <div className="lg:col-span-2">
            {selectedItem ? (
              <motion.div
                key={selectedItem.name}
                className="glass p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{selectedItem.icon}</span>
                  <h3 className="text-xl font-bold" style={{ color: selectedItem.color }}>
                    {selectedItem.name}
                  </h3>
                </div>

                {/* Proficiency bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-gray-400">Proficiency</span>
                    <span style={{ color: selectedItem.color }}>{selectedItem.proficiency}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${selectedItem.color}, ${selectedItem.color}88)`,
                        boxShadow: `0 0 10px ${selectedItem.color}40`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedItem.proficiency}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">{selectedItem.useCase}</p>
              </motion.div>
            ) : (
              <motion.div
                className="glass p-6 text-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="text-4xl mb-3">🔮</div>
                <p className="text-sm text-gray-400">
                  Click a technology icon in the 3D scene to explore proficiency and use cases
                </p>
              </motion.div>
            )}

            {/* Mini grid of all tech */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {TECH_STACK.map((tech) => (
                <motion.button
                  key={tech.name}
                  className="glass p-2 text-center text-xs font-mono transition-all"
                  style={{
                    borderColor: selectedTech === tech.name ? tech.color : undefined,
                    color: selectedTech === tech.name ? tech.color : "#888",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTech(selectedTech === tech.name ? null : tech.name)}
                >
                  <span className="text-lg block">{tech.icon}</span>
                  <span className="text-[9px] mt-1 block">{tech.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
