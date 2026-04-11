"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Float, Environment, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Infinite Grid Floor ─── */
function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
      <planeGeometry args={[80, 80, 80, 80]} />
      <MeshReflectorMaterial
        mirror={0.15}
        blur={[300, 100]}
        resolution={512}
        mixBlur={1}
        mixStrength={0.6}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#060612"
        metalness={0.5}
      />
    </mesh>
  );
}

/* grid lines on the floor */
function GridLines() {
  const ref = useRef<THREE.Group>(null);
  const lines = useMemo(() => {
    const arr: { from: [number, number, number]; to: [number, number, number] }[] = [];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const size = isMobile ? 20 : 40;
    const step = isMobile ? 4 : 2;
    for (let i = -size; i <= size; i += step) {
      arr.push({ from: [i, -2.49, -size], to: [i, -2.49, size] });
      arr.push({ from: [-size, -2.49, i], to: [size, -2.49, i] });
    }
    return arr;
  }, []);

  return (
    <group ref={ref}>
      {lines.map((l, i) => {
        const points = [new THREE.Vector3(...l.from), new THREE.Vector3(...l.to)];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({ color: "#1e90ff", transparent: true, opacity: 0.04 });
        const lineObj = new THREE.Line(geo, mat);
        return <primitive key={i} object={lineObj} />;
      })}
    </group>
  );
}

/* ─── Ambient Particles ─── */
function AmbientParticles() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 150 : 600;
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      [1, 0.42, 0.17],   // orange
      [0.12, 0.56, 1],   // blue
      [0.58, 0.2, 0.92],  // purple
      [0, 0.9, 0.63],    // cyan
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial vertexColors size={0.035} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ─── Data Stream (flowing particles along path) ─── */
function DataStream({
  start, end, color, speed = 1, count = 15, delay = 0,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  speed?: number;
  count?: number;
  delay?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const actualCount = isMobile ? Math.min(count, 6) : count;
  const particles = useMemo(
    () => Array.from({ length: actualCount }, (_, i) => ({ offset: (i / actualCount + delay) % 1, size: Math.random() * 0.04 + 0.02 })),
    [actualCount, delay]
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed * 0.25;
    ref.current.children.forEach((child, i) => {
      const p = (particles[i].offset + t) % 1;
      child.position.x = start[0] + (end[0] - start[0]) * p;
      child.position.y = start[1] + (end[1] - start[1]) * p + Math.sin(p * Math.PI * 3) * 0.12;
      child.position.z = start[2] + (end[2] - start[2]) * p;
      child.scale.setScalar(Math.max(0.1, Math.sin(p * Math.PI) * 1.5));
    });
  });

  return (
    <group ref={ref}>
      {particles.map((p, i) => (
        <mesh key={i}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Central Hub Node ─── */
function CentralHub() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.15;
      outerRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.3;
    }
    if (ring1.current) ring1.current.rotation.z = t * 0.25;
    if (ring2.current) ring2.current.rotation.z = -t * 0.18;
    if (ring3.current) ring3.current.rotation.z = t * 0.12;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group>
        {/* Volumetric glow */}
        <mesh>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshStandardMaterial color="#1e90ff" emissive="#1e90ff" emissiveIntensity={0.15} transparent opacity={0.05} />
        </mesh>
        {/* Outer wireframe */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial color="#0a0a2a" emissive="#1e90ff" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} wireframe />
        </mesh>
        {/* Inner core */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#9333ea" emissive="#9333ea" emissiveIntensity={1.2} metalness={1} roughness={0} />
        </mesh>
        {/* Energy core */}
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="#1e90ff" emissive="#ff6b2b" emissiveIntensity={1.5} transparent opacity={0.7} />
        </mesh>
        {/* Orbit rings */}
        <mesh ref={ring1} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[1.7, 0.008, 16, 128]} />
          <meshStandardMaterial color="#ff6b2b" emissive="#ff6b2b" emissiveIntensity={2} transparent opacity={0.5} />
        </mesh>
        <mesh ref={ring2} rotation={[-0.5, 0.3, 0]}>
          <torusGeometry args={[2.1, 0.006, 16, 128]} />
          <meshStandardMaterial color="#1e90ff" emissive="#1e90ff" emissiveIntensity={2} transparent opacity={0.4} />
        </mesh>
        <mesh ref={ring3} rotation={[0.8, -0.2, 0.4]}>
          <torusGeometry args={[2.5, 0.005, 16, 128]} />
          <meshStandardMaterial color="#9333ea" emissive="#9333ea" emissiveIntensity={2} transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Floating Code Snippets ─── */
function FloatingSnippets() {
  const snippets = [
    { text: "SELECT * FROM dim_users", pos: [-3.5, 2, -2] as [number, number, number], color: "#1e90ff" },
    { text: "df.groupby('region').agg()", pos: [3.8, 1.5, -3] as [number, number, number], color: "#ff6b2b" },
    { text: "dbt run --models staging", pos: [-4, -0.5, -1.5] as [number, number, number], color: "#9333ea" },
    { text: "CREATE TABLE fact_orders", pos: [4, -1, -2] as [number, number, number], color: "#00e5a0" },
  ];

  return (
    <>
      {snippets.map((s, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0} floatIntensity={0.3}>
          <group position={s.pos}>
            {/* We'll use a simple plane with transparent material as bg */}
            <mesh>
              <planeGeometry args={[2.2, 0.35]} />
              <meshStandardMaterial color="#050510" emissive={s.color} emissiveIntensity={0.05} transparent opacity={0.3} />
            </mesh>
          </group>
        </Float>
      ))}
    </>
  );
}

/* ─── Camera Auto-Orbit ─── */
function CameraRig() {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime() * 0.08;
    camera.position.x = Math.sin(t) * 0.5;
    camera.position.y = 0.3 + Math.sin(t * 0.5) * 0.15;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ─── Main Scene ─── */
function HeroSceneContent() {
  const streams = [
    // Inbound (orange — data sources)
    { start: [-6, 2.5, -3] as [number, number, number], end: [0, 0, 0] as [number, number, number], color: "#ff6b2b", speed: 1, delay: 0 },
    { start: [6, 1.5, -4] as [number, number, number], end: [0, 0, 0] as [number, number, number], color: "#ff6b2b", speed: 0.8, delay: 0.25 },
    { start: [-5, -2, -2] as [number, number, number], end: [0, 0, 0] as [number, number, number], color: "#ff6b2b", speed: 1.1, delay: 0.5 },
    { start: [0, 4.5, -3] as [number, number, number], end: [0, 0, 0] as [number, number, number], color: "#1e90ff", speed: 0.9, delay: 0.15 },
    { start: [-4, 0, -5] as [number, number, number], end: [0, 0, 0] as [number, number, number], color: "#9333ea", speed: 1.2, delay: 0.6 },
    { start: [4, -3, -2] as [number, number, number], end: [0, 0, 0] as [number, number, number], color: "#1e90ff", speed: 0.7, delay: 0.75 },
    // Outbound (processed — cyan/green)
    { start: [0, 0, 0] as [number, number, number], end: [5, 2, 3] as [number, number, number], color: "#00e5a0", speed: 1, delay: 0.2 },
    { start: [0, 0, 0] as [number, number, number], end: [-4, -2, 4] as [number, number, number], color: "#00e5a0", speed: 0.9, delay: 0.5 },
    { start: [0, 0, 0] as [number, number, number], end: [3, -3, 3] as [number, number, number], color: "#9333ea", speed: 1.1, delay: 0.8 },
  ];

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.08} />
      <pointLight position={[0, 0, 0]} color="#1e90ff" intensity={4} distance={18} />
      <pointLight position={[5, 4, 5]} color="#ff6b2b" intensity={1.5} distance={22} />
      <pointLight position={[-5, -3, 4]} color="#9333ea" intensity={1} distance={18} />
      <pointLight position={[0, -4, 0]} color="#1e90ff" intensity={0.6} distance={12} />
      {/* Fog */}
      <fog attach="fog" args={["#030308", 8, 35]} />

      <GridFloor />
      <GridLines />
      <CentralHub />
      <AmbientParticles />
      <FloatingSnippets />
      <CameraRig />

      {streams.map((s, i) => (
        <DataStream key={i} start={s.start} end={s.end} color={s.color} speed={s.speed} delay={s.delay} />
      ))}

      <Environment preset="night" />
    </>
  );
}

export default function HeroScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <div className="w-full h-full canvas-container">
      <Canvas
        camera={{ position: [0, 0.5, 7], fov: 58 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        shadows={!isMobile}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        frameloop={isMobile ? "demand" : "always"}
      >
        <HeroSceneContent />
      </Canvas>
    </div>
  );
}
