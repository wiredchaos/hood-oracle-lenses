import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, useScroll, Stars } from "@react-three/drei";
import { Vector3, MathUtils } from "three";
import SpiralMedallion3D from "./SpiralMedallion3D";
import LensOrb from "./LensOrb";
import AgentHologram3D from "./AgentHologram3D";
import lensAstrology from "@/assets/lenses/astrology.png";
import lensNumerology from "@/assets/lenses/numerology.png";
import lensAkashic from "@/assets/lenses/akashic.png";
import lensFibonacci from "@/assets/lenses/fibonacci.png";
import lensTarot from "@/assets/lenses/tarot.png";
import lensCompatibility from "@/assets/lenses/compatibility.png";
import BioOverlay from "./BioOverlay";

const LENSES = [
  { src: lensAstrology, label: "Astrology" },
  { src: lensNumerology, label: "Numerology" },
  { src: lensAkashic, label: "Akashic" },
  { src: lensFibonacci, label: "Fibonacci AI" },
  { src: lensTarot, label: "Tarot/Chakra" },
  { src: lensCompatibility, label: "Compatibility" },
];

function Scene() {
  const scroll = useScroll();
  const { camera, pointer } = useThree();
  const target = useRef(new Vector3(0, 0, 6));
  const medScale = useRef(0);
  const orbShow = useRef(0);
  const agentShow = useRef(0);

  useFrame((_, dt) => {
    const p = scroll.offset; // 0..1 across 5 pages
    // chapter ranges: 0-.2 cold, .2-.4 thesis, .4-.6 lenses, .6-.8 agent, .8-1 signoff
    const camZ = MathUtils.lerp(7, 3.5, Math.min(p / 0.4, 1)) +
      (p > 0.6 ? (p - 0.6) * 8 : 0);
    target.current.set(pointer.x * 0.6, pointer.y * 0.4, camZ);
    camera.position.lerp(target.current, Math.min(1, dt * 3));
    camera.lookAt(0, 0, 0);

    medScale.current = MathUtils.lerp(medScale.current, p < 0.6 ? 1 : 0.4, dt * 2);
    orbShow.current = MathUtils.lerp(
      orbShow.current,
      p > 0.35 && p < 0.85 ? 1 : p >= 0.85 ? 0.4 : 0,
      dt * 2
    );
    agentShow.current = MathUtils.lerp(
      agentShow.current,
      p > 0.55 && p < 0.85 ? 1 : 0,
      dt * 2
    );
  });

  return (
    <>
      <Stars radius={50} depth={30} count={1500} factor={2} fade speed={0.4} />
      <ambientLight intensity={0.5} />
      <SpiralMedallion3D scale={medScale.current * 1.2 + 0.001} />
      {LENSES.map((l, i) => (
        <LensOrb
          key={l.label}
          src={l.src}
          label={l.label}
          index={i}
          total={LENSES.length}
          radius={2.6}
          show={orbShow.current}
        />
      ))}
      <AgentHologram3D visible={agentShow.current} />
    </>
  );
}

export default function BioCanvas() {
  return (
    <div className="fixed inset-0">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#050810"]} />
        <fog attach="fog" args={["#050810", 6, 22]} />
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.25}>
            <Scene />
            <BioOverlay />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
