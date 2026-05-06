## 3D 360° Panoramic GPU Hero Background

Add an immersive WebGL-powered 360° panoramic sphere as the hero background on the landing page. The camera sits inside a textured sphere; mouse + device orientation drive subtle yaw/pitch parallax. Existing hero content sits on top with a darkened gradient for legibility.

### What you'll see
- Full-bleed animated 3D backdrop on `/` replacing the static `agentropolis-bg.jpg` layer.
- Slow auto-drift around the horizon (very slow, cinematic).
- Mouse movement gently rotates the view (yaw ±15°, pitch ±8°).
- Touch devices use device orientation if permitted, else just auto-drift.
- Reduced-motion users get a static frame (no auto-drift, no mouse parallax).
- All existing hero text, CTAs, agent card, and lens grid remain untouched on top.

### Tech approach
- Reuse already-installed `three`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0`.
- New component `src/components/PanoramaHero.tsx`:
  - `<Canvas>` with `camera={{ position: [0,0,0.01], fov: 75 }}`, `dpr={[1, 1.75]}`, `gl={{ antialias: true, powerPreference: 'high-performance' }}`.
  - Inside: a large `sphereGeometry` (radius 50, 64×64) with `side: THREE.BackSide`, textured via `useTexture` from the panorama image. Mapping set to equirectangular so existing 360 env images render correctly.
  - `useFrame` lerps camera rotation toward target (mouse + auto-drift). Pointer captured at the wrapper div level, normalized to -1..1.
  - Honors `prefers-reduced-motion` via `matchMedia`.
- Use `src/assets/env360/nyc.jpg` (already a 360 env asset) as the default panorama; expose a `src` prop to swap.
- Wrap in `<Suspense fallback={<img src={bgImg} … />}>` so the existing JPG shows during texture load — no blank flash.
- Mount inside `Landing.tsx` as the bottom layer (absolute inset-0), keeping the existing `bg-cosmic` and `grid-bg` overlays above it for the WIRED CHAOS look.

### Performance & safety
- Sphere is a single draw call; no postprocessing — cheap on mobile.
- `frameloop="always"` but rotation math is trivial; cap dpr at 1.75.
- Pointer events on canvas set to `none` so it never blocks clicks on hero CTAs/links.
- Pure WebGL (Three.js) — no WebGPU dependency, so it runs everywhere including the sandbox preview.
- Lazy-load the component with `React.lazy` to keep initial JS small; fallback = current static image.

### Files
- Create: `src/components/PanoramaHero.tsx`
- Edit: `src/pages/Landing.tsx` (replace the `<img bgImg>` layer with `<Suspense><PanoramaHero/></Suspense>`, keep gradient + grid overlays).

No new dependencies. No backend changes.