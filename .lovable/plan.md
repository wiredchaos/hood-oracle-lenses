## Goal

Two deliverables that together form the brand bio system for **THE HOOD ORACLE / Akashic Lenses / N3UR0 META X**:

1. **A 20-second MP4 brand documentary** — rendered via Remotion, downloadable from `/mnt/documents/`, suitable for socials, press, and embed.
2. **An in-app 3D explainer experience** — a new route `/bio` that pairs scroll-driven 3D parallax with mouse-driven 3D tilt (extending the existing `FloatingHolo` / `HologramScroll` system). True 3D HTML using `react-three-fiber` for the hero medallion + holographic lens orbs.

The two share the same script, palette, fonts, and motifs so the video plays as a trailer for the experience and vice versa.

---

## 1. The MP4 Brand Documentary (Remotion)

### Direction
- **Aesthetic**: Cinematic minimal × Tech product. Editorial pacing with kinetic accent moments.
- **Palette** (pulled from `src/index.css` tokens): bg `#070A12`, primary cyan `hsl(--primary)`, accent red `hsl(--accent)`, lime accent, off-white `#F2F4F7`.
- **Type**: Display = Cormorant Garamond (serif, matches in-app `font-serif`). Mono = JetBrains Mono (matches `font-mono` kicker chips).
- **Motifs**: spiral medallion, rim-lit holographic plate, scanline sweep, chip pills, grid-bg.
- **Motion system**: default entrance = blur(12px)→0 + spring scale 0.96→1 (`damping: 22`). Accent moments = clip-path reveal of serif title from bottom. Scene transitions = `wipe(from-bottom)` + occasional `clockWipe` for hero beats.

### Script (5 scenes, 600 frames @ 30fps = 20s)
1. **Cold open (0–90f)** — black → spiral medallion ignites center-screen → kicker `// AGENTROPOLIS // N3UR0 DISTRICT` types in.
2. **Thesis (90–210f)** — full-bleed serif: *"The Hood Oracle reads your lenses."* Word-by-word reveal with red highlight on **Oracle** and cyan on **lenses**.
3. **Six lenses (210–360f)** — the six lens hologram PNGs (`src/assets/lenses/*.png`) orbit in, each labeled, staggered 12f apart. Background scanlines drift.
4. **Agent card (360–480f)** — the `faceless-oracle.jpg` portrait slides in left, chip pills (`N3UR0 META X`, `SKILL: Astrology Lens`) stamp in, transmission quote types out right.
5. **Sign-off (480–600f)** — wordmark `AKASHIC LENSES` locks up with URL `hoodoracle.lovable.app`, spiral medallion echoes.

### Implementation
- New folder `remotion/` scaffolded per the Remotion skill (bun init, install `remotion @remotion/cli @remotion/renderer @remotion/bundler @remotion/transitions @remotion/google-fonts @remotion/fonts`, fix musl/gnu compositor binary, symlink ffmpeg/ffprobe).
- Copy the 8 brand assets (`faceless-oracle.jpg`, `agentropolis-bg.jpg`, 6 `lenses/*.png`) into `remotion/public/images/`.
- Scenes: `remotion/src/scenes/{ColdOpen,Thesis,LensesOrbit,AgentCard,SignOff}.tsx`.
- Persistent layers: `PersistentBackground.tsx` (gradient + grid + drifting scanlines), `PersistentVignette.tsx`.
- Wire with `<TransitionSeries>` in `MainVideo.tsx`. Total `durationInFrames` accounts for transition overlaps.
- Programmatic render script `remotion/scripts/render-remotion.mjs` (chrome-for-testing, muted, concurrency 1) → `/mnt/documents/hood-oracle-bio.mp4`.
- QA: `bunx remotion still` at frames 30/150/280/420/560 to spot-check each scene before final render.

### Out of scope for the video
- No voiceover (silent piece — passes mute test by design; user can request TTS later).
- No motion graphics that require real Three.js inside Remotion (handled in deliverable 2).

---

## 2. In-App 3D Explainer (`/bio`)

### What it is
A single scroll-driven page that tells the same story as the video, but interactive — the user controls pacing by scrolling, and every element responds to the mouse in real 3D.

### Technical stack additions
- `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0`, `three@^0.160` (versions per Lovable R3F guidance — do NOT use v9).
- New components:
  - `src/components/bio/BioCanvas.tsx` — single full-viewport `<Canvas>` with `dpr={[1, 2]}`, fog, and a shared scene graph. Camera dollies on scroll via `useScroll` from drei.
  - `src/components/bio/SpiralMedallion3D.tsx` — extruded torus + particle ring, mouse-tracked rotation.
  - `src/components/bio/LensOrb.tsx` — six holographic spheres using the existing lens PNGs as `MeshBasicMaterial` textures with additive blending; orbit on a tilted plane, individually pointer-reactive.
  - `src/components/bio/AgentHologram3D.tsx` — `faceless-oracle.jpg` mapped onto a slightly curved plane, with rim-light shader (custom GLSL or `MeshDistortMaterial` from drei).
- New page `src/pages/Bio.tsx` registered in `App.tsx` at `/bio`. Uses `<ScrollControls pages={5}>` from drei to chunk the experience into 5 chapters mirroring the video scenes.

### Scroll → 3D mapping (5 chapters, one viewport each)
| Chapter | 3D camera/scene state | HTML overlay (existing FloatingHolo) |
|---|---|---|
| 1 Cold open | Camera pulled back, medallion centered, particle ignition | Kicker chip + scrolling caps |
| 2 Thesis | Camera dollies through medallion ring | Serif headline reveals on scroll progress |
| 3 Lenses | Six orbs unfurl into orbit, camera circles 30° | Lens names fade in beside each orb (HTML in `<Html>` from drei, anchored to mesh) |
| 4 Agent | Camera locks on AgentHologram3D, orbs recede to bg | Transmission quote + chips |
| 5 Sign-off | Camera pulls way back, all elements compose into wordmark | CTA buttons → `/agent` and `/intake` |

### Mouse-driven 3D
- A single `useFrame` hook in `BioCanvas` reads normalized pointer coords and applies `lerp` to a shared `cameraTarget` ref (subtle ±3° yaw/pitch — global parallax).
- Each lens orb additionally tilts toward the cursor when hovered (handled in `LensOrb` via raycast hit).
- HTML overlays continue to use the existing `FloatingHolo` wrapper for tilt-on-hover, so the 2D and 3D layers move in sympathy.

### Performance & a11y
- Respect `prefers-reduced-motion`: freeze camera, disable orbital animation, render orbs in static layout.
- Mobile (≤480px): drop `dpr` to 1, replace `<ScrollControls>` 3D camera dolly with a simpler scroll-snap of static rendered chapters.
- Lazy-load the bio route via `React.lazy` so Three.js doesn't bloat the main bundle.

### Linking the two deliverables
- Add a "Watch the film" button on `/bio` chapter 1 that opens the rendered `hood-oracle-bio.mp4` in a lightbox (`<video>` element).
- Add `/bio` link to the existing Landing CTA row (`→ Explore the bio`).

---

## Files Touched / Created

### New
- `remotion/` (entire scaffold: `package.json`, `tsconfig.json`, `src/index.ts`, `src/Root.tsx`, `src/MainVideo.tsx`, 5 scene files, 2 persistent-layer files, `scripts/render-remotion.mjs`, `public/images/*`)
- `src/pages/Bio.tsx`
- `src/components/bio/BioCanvas.tsx`
- `src/components/bio/SpiralMedallion3D.tsx`
- `src/components/bio/LensOrb.tsx`
- `src/components/bio/AgentHologram3D.tsx`
- `src/components/bio/BioOverlay.tsx` (the HTML chapters layered above the canvas)
- `/mnt/documents/hood-oracle-bio.mp4` (rendered output)

### Edited
- `src/App.tsx` — add lazy `/bio` route
- `src/pages/Landing.tsx` — add "Explore the bio" link in CTA row
- `package.json` — add `three`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0`

---

## Out of Scope
- No CMS-driven script (copy is hardcoded in both the video and `/bio`; can be lifted later).
- No audio/voiceover on the MP4 (silent).
- No analytics events on `/bio` scroll progress.
- No changes to the existing `FloatingHolo` / `HologramScroll` primitives — they continue to power non-bio pages.

## Acceptance
- `/mnt/documents/hood-oracle-bio.mp4` exists, ~20s, 1920×1080, plays cleanly start-to-finish, every scene visible in spot-checks.
- `/bio` route loads, scrolls through 5 chapters, 3D scene responds to both scroll and mouse, mobile viewport (384px) renders the reduced-motion fallback without errors.
- Reduced-motion users get a static, readable version of both the page and (implicitly) the video poster frame.
