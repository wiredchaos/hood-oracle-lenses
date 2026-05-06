import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, AdditiveBlending, Mesh, Group } from "three";
import { Billboard, Html } from "@react-three/drei";

interface Props {
  src: string;
  label: string;
  index: number;
  total: number;
  radius: number;
  show: number; // 0..1 reveal
}

export default function LensOrb({ src, label, index, total, radius, show }: Props) {
  const tex = useLoader(TextureLoader, src);
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [hover, setHover] = useState(false);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const angle = (index / total) * Math.PI * 2 + t * 0.12;
    const g = groupRef.current;
    if (g) {
      const r = radius * show;
      g.position.x = Math.cos(angle) * r;
      g.position.z = Math.sin(angle) * r;
      g.position.y = Math.sin(t * 0.6 + index) * 0.25;
      g.scale.setScalar(0.001 + show * (hover ? 1.25 : 1));
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += dt * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Billboard>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          <planeGeometry args={[1.4, 1.4]} />
          <meshBasicMaterial
            map={tex}
            transparent
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <Html center position={[0, -1.1, 0]} style={{ pointerEvents: "none" }}>
          <div
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary whitespace-nowrap"
            style={{ opacity: show, textShadow: "0 0 8px hsl(var(--primary))" }}
          >
            {label}
          </div>
        </Html>
      </Billboard>
    </group>
  );
}
