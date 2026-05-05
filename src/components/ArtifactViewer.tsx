// AKASHIC LENSES - 3D Artifact Viewer
// React Three Fiber canvas with an animated sigil globe + oracle ring.
// Accepts optional accent color and label. Fully self-contained.

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Ring, Float, Stars, Text } from "@react-three/drei";
import type { Mesh } from "three";
import { cn } from "@/lib/utils";

// Sigil core sphere – distorts like a living membrane
function SigilSphere({ accent }: { accent: "cyan" | "red" | "lime" }) {
  const meshRef = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.25;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.15) * 0.3;
    }
  });

  const color =
    accent === "red" ? "#e83535" :
    accent === "lime" ? "#8be635" :
    "#00f5ff";

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[1.2, 3]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.35}
          speed={2.5}
          roughness={0.05}
          metalness={0.9}
          wireframe={false}
          transparent
          opacity={0.88}
        />
      </mesh>
    </Float>
  );
}

// Outer oracle ring
function OracleRing({ accent }: { accent: "cyan" | "red" | "lime" }) {
  const ringRef = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.4;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(clock.getElapsedTime() * 0.2) * 0.15;
    }
  });
  const color =
    accent === "red" ? "#e83535" :
    accent === "lime" ? "#8be635" :
    "#00f5ff";

  return (
    <Ring ref={ringRef} args={[1.8, 2.0, 64]}>
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </Ring>
  );
}

// Inner wireframe sphere (data lattice)
function DataLattice() {
  const meshRef = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = -clock.getElapsedTime() * 0.18;
    }
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

interface ArtifactViewerProps {
  accent?: "cyan" | "red" | "lime";
  label?: string;
  size?: number;
  className?: string;
}

export function ArtifactViewer({
  accent = "cyan",
  label,
  size = 320,
  className,
}: ArtifactViewerProps) {
  return (
    <div
      className={cn("relative rounded-2xl overflow-hidden border border-primary/30 bg-card/60", className)}
      style={{ width: size, height: size }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[4, 4, 4]} intensity={2} color={accent === "red" ? "#e83535" : accent === "lime" ? "#8be635" : "#00f5ff"} />
        <pointLight position={[-4, -2, -3]} intensity={0.8} color="#ffffff" />

        <Suspense fallback={null}>
          <Stars radius={30} depth={12} count={800} factor={3} saturation={0} fade speed={0.5} />
          <DataLattice />
          <SigilSphere accent={accent} />
          <OracleRing accent={accent} />
          {label && (
            <Text
              position={[0, -2.3, 0]}
              fontSize={0.22}
              color={accent === "red" ? "#e83535" : accent === "lime" ? "#8be635" : "#00f5ff"}
              anchorX="center"
              anchorY="middle"
              font={undefined}
            >
              {label}
            </Text>
          )}
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>

      {/* overlay glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          boxShadow: `inset 0 0 40px 4px ${accent === "red" ? "hsl(0 90% 55% / 0.15)" : accent === "lime" ? "hsl(80 90% 55% / 0.15)" : "hsl(184 100% 50% / 0.15)"}`,
        }}
      />
    </div>
  );
}
