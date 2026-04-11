"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Float, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

export interface PipelineNode {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
  icon: string;
  description: string;
  tools: string[];
  details: string;
  github?: string;
}

const PIPELINE_NODES: PipelineNode[] = [
  {
    id: "sources",
    label: "Data Sources",
    position: [-4.5, 1.5, 0],
    color: "#00d4ff",
    icon: "📡",
    description: "ERP Systems, REST APIs, CSV/JSON Feeds, Streaming Data",
    tools: ["REST APIs", "Kafka", "FTP/SFTP", "Webhooks"],
    details: "Integrated 50+ data sources including SAP ERP, Salesforce APIs, IoT sensor feeds, and real-time streaming from Kafka topics. Built resilient connectors with automatic retry logic and dead-letter queues.",
    github: "#",
  },
  {
    id: "ingestion",
    label: "Ingestion Layer",
    position: [-2, 0, 0],
    color: "#22d3ee",
    icon: "⬇️",
    description: "Real-time & Batch Ingestion Pipelines",
    tools: ["Apache Kafka", "Azure Event Hub", "AWS Kinesis", "Airbyte"],
    details: "Designed dual-mode ingestion supporting both real-time streaming (sub-second latency) and scheduled batch loads. Processing 10M+ events/day with exactly-once semantics.",
    github: "#",
  },
  {
    id: "etl",
    label: "ETL Processing",
    position: [0.5, -1.2, 0],
    color: "#a855f7",
    icon: "⚙️",
    description: "Transform, Clean, Enrich, Validate",
    tools: ["Python", "Apache Spark", "dbt", "Airflow"],
    details: "Built modular ETL pipelines using dbt for transformation, Airflow for orchestration, and Spark for heavy computation. Reduced pipeline runtime by 70% through partitioning optimization.",
    github: "#",
  },
  {
    id: "warehouse",
    label: "Data Warehouse",
    position: [3, 0, 0],
    color: "#ec4899",
    icon: "🏗️",
    description: "Snowflake / BigQuery / Redshift",
    tools: ["Snowflake", "BigQuery", "Delta Lake", "SQL"],
    details: "Architected a multi-layered warehouse (Bronze/Silver/Gold) on Snowflake with automated data quality checks, SCD Type 2 tracking, and cost-optimized compute clusters.",
    github: "#",
  },
  {
    id: "analytics",
    label: "Analytics & BI",
    position: [5, 1.5, 0],
    color: "#f97316",
    icon: "📊",
    description: "Dashboards, Reports, ML Features",
    tools: ["Power BI", "Tableau", "Looker", "Python"],
    details: "Delivered 20+ executive dashboards with real-time KPIs, predictive analytics models, and self-service analytics portals. Enabled data-driven decision making across 5 business units.",
    github: "#",
  },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
];

function PipelineNodeMesh({
  node,
  isSelected,
  onClick,
  onHover,
}: {
  node: PipelineNode;
  isSelected: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const targetScale = isSelected ? 1.3 : hovered ? 1.15 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
    if (glowRef.current) {
      const s = (isSelected ? 1.8 : hovered ? 1.5 : 1.2) + Math.sin(clock.getElapsedTime() * 2) * 0.1;
      glowRef.current.scale.setScalar(s);
      (glowRef.current.material as THREE.MeshStandardMaterial).opacity = isSelected ? 0.15 : hovered ? 0.1 : 0.05;
    }
  });

  const handlePointerOver = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    onHover(true);
    document.body.style.cursor = "pointer";
  }, [onHover]);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    onHover(false);
    document.body.style.cursor = "default";
  }, [onHover]);

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onClick();
  }, [onClick]);

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={node.position}>
        {/* Glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.05}
          />
        </mesh>

        {/* Main node */}
        <mesh
          ref={meshRef}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <dodecahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={hovered || isSelected ? 1 : 0.4}
            metalness={0.8}
            roughness={0.2}
            wireframe={!isSelected}
          />
        </mesh>

        {/* Label */}
        <Html
          position={[0, -0.7, 0]}
          center
          style={{
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div
            className="text-xs font-mono px-2 py-1 rounded-md text-center"
            style={{
              color: node.color,
              background: "rgba(5,5,16,0.8)",
              border: `1px solid ${node.color}33`,
              textShadow: `0 0 10px ${node.color}66`,
              fontSize: "10px",
            }}
          >
            {node.icon} {node.label}
          </div>
        </Html>
      </group>
    </Float>
  );
}

function ConnectionLine({ start, end, color }: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const particleCount = 8;

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      offset: i / particleCount,
      size: Math.random() * 0.03 + 0.015,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * 0.4;
    ref.current.children.forEach((child, i) => {
      const p = (particles[i].offset + t) % 1;
      child.position.x = start[0] + (end[0] - start[0]) * p;
      child.position.y = start[1] + (end[1] - start[1]) * p;
      child.position.z = start[2] + (end[2] - start[2]) * p;
      const scale = Math.sin(p * Math.PI);
      child.scale.setScalar(Math.max(0.1, scale));
    });
  });

  return (
    <group ref={ref}>
      {particles.map((p, i) => (
        <mesh key={i}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function PipelineSceneContent({
  selectedNode,
  onSelectNode,
}: {
  selectedNode: string | null;
  onSelectNode: (id: string | null) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 5, 5]} color="#00d4ff" intensity={1.5} />
      <pointLight position={[-5, -3, 3]} color="#a855f7" intensity={0.8} />
      <pointLight position={[5, -3, 3]} color="#ec4899" intensity={0.8} />

      {PIPELINE_NODES.map(node => (
        <PipelineNodeMesh
          key={node.id}
          node={node}
          isSelected={selectedNode === node.id}
          onClick={() => onSelectNode(selectedNode === node.id ? null : node.id)}
          onHover={() => {}}
        />
      ))}

      {CONNECTIONS.map(([fromIdx, toIdx], i) => (
        <ConnectionLine
          key={i}
          start={PIPELINE_NODES[fromIdx].position}
          end={PIPELINE_NODES[toIdx].position}
          color={PIPELINE_NODES[fromIdx].color}
        />
      ))}

      <Environment preset="night" />
    </>
  );
}

export { PIPELINE_NODES };

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
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        onPointerMissed={() => onSelectNode(null)}
      >
        <PipelineSceneContent
          selectedNode={selectedNode}
          onSelectNode={onSelectNode}
        />
      </Canvas>
    </div>
  );
}
