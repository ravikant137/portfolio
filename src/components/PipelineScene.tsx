"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Float, Environment, Html, MeshReflectorMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ─── Types ─── */
export interface PipelineNode {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
  icon: string;
  description: string;
  tools: string[];
  details: string;
  achievements: { metric: string; value: string; description: string }[];
  github?: string;
}

export const PIPELINE_NODES: PipelineNode[] = [
  {
    id: "sources",
    label: "Data Sources",
    position: [-6, 0.5, 0],
    color: "#ff6b2b",
    icon: "📡",
    description: "ERP Systems, REST APIs, CSV/JSON, Streaming Feeds",
    tools: ["REST APIs", "Kafka", "FTP/SFTP", "Webhooks", "IoT Sensors"],
    details:
      "Integrated 50+ heterogeneous data sources including SAP ERP, Salesforce CRM, IoT telemetry, and real-time Kafka streams. Built resilient connectors with automatic retry, dead-letter queues, and schema evolution handling.",
    achievements: [
      { metric: "50+", value: "Data Sources", description: "Connected across ERP, CRM, IoT" },
      { metric: "10M+", value: "Records/Day", description: "Ingested daily across all sources" },
    ],
    github: "#",
  },
  {
    id: "ingestion",
    label: "Ingestion Layer",
    position: [-3, -0.5, 0],
    color: "#ff8c42",
    icon: "⬇️",
    description: "Real-time & Batch Ingestion with exactly-once semantics",
    tools: ["Apache Kafka", "Azure Event Hub", "AWS Kinesis", "Airbyte", "Fivetran"],
    details:
      "Designed dual-mode ingestion: real-time streaming (sub-second latency) and scheduled batch. Processing 10M+ events daily with exactly-once semantics, backpressure handling, and auto-scaling consumers.",
    achievements: [
      { metric: "<1s", value: "Latency", description: "Real-time stream processing" },
      { metric: "99.9%", value: "Uptime", description: "Pipeline reliability achieved" },
    ],
    github: "#",
  },
  {
    id: "etl",
    label: "ETL Engine",
    position: [0, 0.5, 0],
    color: "#1e90ff",
    icon: "⚙️",
    description: "Transform · Clean · Enrich · Validate",
    tools: ["Python", "Apache Spark", "dbt", "Apache Airflow", "Databricks"],
    details:
      "Built modular transformation pipelines: dbt for SQL-based models, Spark for heavy computation, Airflow for orchestration. Reduced processing time by 40% via partition pruning and incremental materialization.",
    achievements: [
      { metric: "40%", value: "Faster Processing", description: "Reduced ETL runtime" },
      { metric: "200+", value: "dbt Models", description: "Modular SQL transformations" },
    ],
    github: "#",
  },
  {
    id: "warehouse",
    label: "Data Warehouse",
    position: [3, -0.5, 0],
    color: "#9333ea",
    icon: "🏗️",
    description: "Snowflake · Delta Lake · Medallion Architecture",
    tools: ["Snowflake", "Databricks", "Delta Lake", "BigQuery", "SQL"],
    details:
      "Architected a multi-layer warehouse (Bronze → Silver → Gold) on Snowflake with SCD Type 2 tracking, automated data quality gates, and cost-optimized compute clusters. Achieved 30% cloud cost reduction.",
    achievements: [
      { metric: "30%", value: "Cost Saved", description: "Cloud infrastructure optimization" },
      { metric: "50%", value: "Faster Queries", description: "Reduced query latency" },
    ],
    github: "#",
  },
  {
    id: "analytics",
    label: "Analytics & BI",
    position: [6, 0.5, 0],
    color: "#00e5a0",
    icon: "📊",
    description: "Dashboards, KPIs, ML Features, Self-Service",
    tools: ["Power BI", "Tableau", "Looker", "Python ML", "Streamlit"],
    details:
      "Delivered 20+ executive dashboards with real-time KPIs, predictive models, and self-service portals. Enabled data-driven decisions across 5 business units, driving measurable ROI.",
    achievements: [
      { metric: "20+", value: "Dashboards", description: "Executive & operational" },
      { metric: "5x", value: "Faster Decisions", description: "Business decision acceleration" },
    ],
    github: "#",
  },
];

const CONNECTIONS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
];

/* ─── Grid Floor ─── */
function PipelineFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
      <planeGeometry args={[50, 30, 50, 30]} />
      <MeshReflectorMaterial
        mirror={0.12}
        blur={[200, 80]}
        resolution={512}
        mixBlur={1}
        mixStrength={0.5}
        roughness={1}
        depthScale={1}
        color="#040410"
        metalness={0.4}
      />
    </mesh>
  );
}

/* ─── Pipeline Node 3D Mesh ─── */
function PipelineNodeMesh({
  node,
  isSelected,
  onClick,
}: {
  node: PipelineNode;
  isSelected: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      const ts = isSelected ? 1.35 : hovered ? 1.15 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(ts, ts, ts), 0.08);
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
    }
    if (glowRef.current) {
      const gs = (isSelected ? 2.2 : hovered ? 1.8 : 1.4) + Math.sin(t * 2.5) * 0.12;
      glowRef.current.scale.setScalar(gs);
      (glowRef.current.material as THREE.MeshStandardMaterial).opacity =
        isSelected ? 0.12 : hovered ? 0.08 : 0.03;
    }
    if (pulseRef.current) {
      const ps = 1 + ((t * 0.8) % 2);
      pulseRef.current.scale.setScalar(ps);
      (pulseRef.current.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 0.15 - ps * 0.06);
    }
  });

  const handlePointerOver = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  }, []);
  const handlePointerOut = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = "default";
  }, []);
  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onClick();
    },
    [onClick]
  );

  const getGeometry = () => {
    switch (node.id) {
      case "sources":
        return <boxGeometry args={[0.5, 0.5, 0.5]} />;
      case "ingestion":
        return <coneGeometry args={[0.35, 0.6, 6]} />;
      case "etl":
        return <torusKnotGeometry args={[0.25, 0.08, 128, 16]} />;
      case "warehouse":
        return <boxGeometry args={[0.55, 0.55, 0.55]} />;
      case "analytics":
        return <dodecahedronGeometry args={[0.4, 0]} />;
      default:
        return <sphereGeometry args={[0.4, 32, 32]} />;
    }
  };

  return (
    <Float speed={1.8} rotationIntensity={0.08} floatIntensity={0.25}>
      <group position={node.position}>
        {/* Energy pulse ring */}
        <mesh ref={pulseRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.02, 16, 64]} />
          <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={2} transparent opacity={0.1} />
        </mesh>

        {/* Outer glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.7, 24, 24]} />
          <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.6} transparent opacity={0.03} />
        </mesh>

        {/* Main shape */}
        <mesh
          ref={meshRef}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
          castShadow
        >
          {getGeometry()}
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={hovered || isSelected ? 2.5 : 1.2}
            metalness={0.7}
            roughness={0.2}
            wireframe={false}
          />
        </mesh>

        {/* Label */}
        <Html position={[0, -0.85, 0]} center style={{ pointerEvents: "none", whiteSpace: "nowrap" }}>
          <div
            className="text-[10px] font-mono px-2.5 py-1 rounded-lg text-center transition-all duration-300"
            style={{
              color: node.color,
              background: "rgba(3,3,8,0.85)",
              border: `1px solid ${node.color}${hovered || isSelected ? "66" : "22"}`,
              textShadow: `0 0 8px ${node.color}88`,
              transform: hovered || isSelected ? "scale(1.1)" : "scale(1)",
            }}
          >
            {node.icon} {node.label}
          </div>
        </Html>
      </group>
    </Float>
  );
}

/* ─── Connection Particles (data packets) ─── */
function ConnectionParticles({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Group>(null);
  const count = 10;
  const particles = useMemo(
    () => Array.from({ length: count }, (_, i) => ({ offset: i / count, size: Math.random() * 0.035 + 0.02 })),
    []
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * 0.35;
    ref.current.children.forEach((child, i) => {
      const p = (particles[i].offset + t) % 1;
      child.position.x = start[0] + (end[0] - start[0]) * p;
      child.position.y = start[1] + (end[1] - start[1]) * p + Math.sin(p * Math.PI) * 0.3;
      child.position.z = start[2] + (end[2] - start[2]) * p;
      child.scale.setScalar(Math.max(0.1, Math.sin(p * Math.PI) * 1.2));
    });
  });

  return (
    <group ref={ref}>
      {particles.map((p, i) => (
        <mesh key={i}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Connection Bezier Line ─── */
function ConnectionLine({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const lineObj = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3((start[0] + end[0]) / 2, Math.max(start[1], end[1]) + 0.5, 0),
      new THREE.Vector3(...end)
    );
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.12 });
    return new THREE.Line(geo, mat);
  }, [start, end, color]);

  return <primitive object={lineObj} />;
}

/* ─── Scene Content ─── */
function PipelineSceneContent({
  selectedNode,
  onSelectNode,
}: {
  selectedNode: string | null;
  onSelectNode: (id: string | null) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[-6, 3, 4]} color="#ff6b2b" intensity={2.5} distance={25} />
      <pointLight position={[0, 4, 4]} color="#1e90ff" intensity={3} distance={25} />
      <pointLight position={[3, 3, 4]} color="#9333ea" intensity={2.5} distance={25} />
      <pointLight position={[6, 3, 4]} color="#00e5a0" intensity={2.5} distance={25} />
      <pointLight position={[0, -2, 6]} color="#1e90ff" intensity={1} distance={20} />
      <fog attach="fog" args={["#030308", 16, 35]} />

      <PipelineFloor />

      {PIPELINE_NODES.map((node) => (
        <PipelineNodeMesh
          key={node.id}
          node={node}
          isSelected={selectedNode === node.id}
          onClick={() => onSelectNode(selectedNode === node.id ? null : node.id)}
        />
      ))}

      {CONNECTIONS.map(([fromIdx, toIdx], i) => (
        <group key={i}>
          <ConnectionLine
            start={PIPELINE_NODES[fromIdx].position}
            end={PIPELINE_NODES[toIdx].position}
            color={PIPELINE_NODES[fromIdx].color}
          />
          <ConnectionParticles
            start={PIPELINE_NODES[fromIdx].position}
            end={PIPELINE_NODES[toIdx].position}
            color={PIPELINE_NODES[fromIdx].color}
          />
        </group>
      ))}

      <Environment preset="night" />
    </>
  );
}

export default function PipelineScene({
  selectedNode,
  onSelectNode,
}: {
  selectedNode: string | null;
  onSelectNode: (id: string | null) => void;
}) {
  return (
    <div className="w-full h-full canvas-container">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        dpr={[1, 1.5]}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        onPointerMissed={() => onSelectNode(null)}
      >
        <PipelineSceneContent selectedNode={selectedNode} onSelectNode={onSelectNode} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
