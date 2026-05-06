import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh } from "three";
import portrait from "@/assets/faceless-oracle.jpg";

export default function AgentHologram3D({ visible }: { visible: number }) {
  const tex = useLoader(TextureLoader, portrait);
  const ref = useRef<Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.4) * 0.12;
    ref.current.scale.setScalar(0.001 + visible * 2.4);
    (ref.current.material as any).opacity = visible * 0.95;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshBasicMaterial map={tex} transparent />
    </mesh>
  );
}
