import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import nycEnv from "@/assets/env360/nyc.jpg";

function PanoSphere({ src }: { src: string }) {
  const tex = useTexture(src);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 64, 64]} />
      <meshBasicMaterial map={tex} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}

function CameraRig({ pointer, reduced }: { pointer: React.MutableRefObject<{ x: number; y: number }>; reduced: boolean }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const drift = reduced ? 0 : t * 0.03;
    const yaw = reduced ? 0 : pointer.current.x * THREE.MathUtils.degToRad(15) + drift;
    const pitch = reduced ? 0 : pointer.current.y * THREE.MathUtils.degToRad(8);
    target.current.set(pitch, yaw, 0);
    camera.rotation.x += (target.current.x - camera.rotation.x) * Math.min(1, dt * 2.5);
    camera.rotation.y += (target.current.y - camera.rotation.y) * Math.min(1, dt * 2.5);
  });
  return null;
}

export default function PanoramaHero({ src = nycEnv }: { src?: string }) {
  const pointer = useRef({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const upd = () => setReduced(mq.matches);
    upd();
    mq.addEventListener?.("change", upd);
    return () => mq.removeEventListener?.("change", upd);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      pointer.current.x = (e.clientX / w) * 2 - 1;
      pointer.current.y = -((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 0.01], fov: 75 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <Suspense fallback={null}>
          <PanoSphere src={src} />
        </Suspense>
        <CameraRig pointer={pointer} reduced={reduced} />
      </Canvas>
    </div>
  );
}
