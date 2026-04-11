"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text3D, Center, Environment } from "@react-three/drei";
import * as THREE from "three";

function DataStream({ startPos, endPos, color, speed = 1, delay = 0 }: {
  startPos: [number, number, number];
  endPos: [number, number, number];
  color: string;
  speed?: number;
  delay?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const particleCount = 12;

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      offset: (i / particleCount + delay) % 1,
      size: Math.random() * 0.04 + 0.02,
    }));
  }, [delay]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed * 0.3;
    ref.current.children.forEach((child, i) => {
      const p = (particles[i].offset + t) % 1;
      child.position.x = startPos[0] + (endPos[0] - startPos[0]) * p;
      child.position.y = startPos[1] + (endPos[1] - startPos[1]) * p + Math.sin(p * Math.PI * 2) * 0.15;
      child.position.z = startPos[2] + (endPos[2] - startPos[2]) * p;
      const scale = Math.sin(p * Math.PI) * 1.5;
      child.scale.setScalar(Math.max(0.1, scale));
    });
  });

  return (
    <group ref={ref}>
      {particles.map((p, i) => (
        <mesh key={i}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function CentralNode() {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.2;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
    if (glowRef.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.05;
      glowRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
      {/* Core */}
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.9, 2]} />
        <meshStandardMaterial
          color="#0a0a2e"
          emissive="#00d4ff"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
          wireframe
        />
      </mesh>
      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#a855f7"
          emissiveIntensity={1}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

function OrbitRing({ radius, speed, color, tilt = 0 }: {
  radius: number;
  speed: number;
  color: string;
  tilt?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

function ParticleField() {
  const count = 500;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00d4ff"
        size={0.025}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function HeroSceneContent() {
  const streams: Array<{
    start: [number, number, number];
    end: [number, number, number];
    color: string;
    speed: number;
    delay: number;
  }> = [
    { start: [-5, 2, -2], end: [0, 0, 0], color: "#00d4ff", speed: 1, delay: 0 },
    { start: [5, 1, -3], end: [0, 0, 0], color: "#a855f7", speed: 0.8, delay: 0.3 },
    { start: [-4, -2, -1], end: [0, 0, 0], color: "#ec4899", speed: 1.2, delay: 0.6 },
    { start: [3, -3, -2], end: [0, 0, 0], color: "#00d4ff", speed: 0.9, delay: 0.15 },
    { start: [0, 4, -2], end: [0, 0, 0], color: "#a855f7", speed: 1.1, delay: 0.45 },
    { start: [-3, 0, -4], end: [0, 0, 0], color: "#ec4899", speed: 0.7, delay: 0.75 },
    // Outbound streams
    { start: [0, 0, 0], end: [4, 2, 2], color: "#00d4ff", speed: 1, delay: 0.2 },
    { start: [0, 0, 0], end: [-3, -2, 3], color: "#a855f7", speed: 0.9, delay: 0.5 },
    { start: [0, 0, 0], end: [2, -3, 2], color: "#ec4899", speed: 1.1, delay: 0.8 },
  ];

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} color="#00d4ff" intensity={3} distance={15} />
      <pointLight position={[5, 5, 5]} color="#a855f7" intensity={1} distance={20} />
      <pointLight position={[-5, -3, 3]} color="#ec4899" intensity={0.5} distance={15} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <CentralNode />
      </Float>

      <OrbitRing radius={2.2} speed={0.3} color="#00d4ff" tilt={0.3} />
      <OrbitRing radius={2.8} speed={-0.2} color="#a855f7" tilt={-0.5} />
      <OrbitRing radius={3.4} speed={0.15} color="#ec4899" tilt={0.8} />

      {streams.map((s, i) => (
        <DataStream
          key={i}
          startPos={s.start}
          endPos={s.end}
          color={s.color}
          speed={s.speed}
          delay={s.delay}
        />
      ))}

      <ParticleField />
      <Environment preset="night" />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <HeroSceneContent />
      </Canvas>
    </div>
  );
}
