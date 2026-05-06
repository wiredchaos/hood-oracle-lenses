import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

export default function SpiralMedallion3D({ scale = 1 }: { scale?: number }) {
  const ref = useRef<Group>(null);
  useFrame((s, dt) => {
    if (ref.current) {
      ref.current.rotation.z += dt * 0.15;
      ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.3) * 0.12;
    }
  });
  return (
    <group ref={ref} scale={scale}>
      {/* Outer torus */}
      <mesh>
        <torusGeometry args={[1.6, 0.04, 16, 128]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      {/* Inner torus */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.2, 0.025, 12, 128]} />
        <meshBasicMaterial color="#bbff33" />
      </mesh>
      {/* Core */}
      <mesh>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshBasicMaterial color="#ff2a3d" wireframe />
      </mesh>
      {/* Particle dots */}
      {Array.from({ length: 48 }).map((_, i) => {
        const a = (i / 48) * Math.PI * 2;
        const r = 1.9 + (i % 3) * 0.08;
        return (
          <mesh key={i} position={[Math.cos(a) * r, Math.sin(a) * r, 0]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        );
      })}
    </group>
  );
}
