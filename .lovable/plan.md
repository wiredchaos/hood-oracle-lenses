# 3D Hologram Lens Scrolls

Replace the flat `LensCard` grid on `/dashboard` with a stack of **3D holographic scrolls** — one per lens (Astrology, Numerology, Akashic, Fibonacci AI, Tarot/Chakra, Journal/Compatibility). Each scroll renders in true CSS 3D space with:

- **3D mouse tracking** — pointer position rotates the scroll on X/Y axes (rotateY/rotateX) with smooth spring-eased follow, plus a parallax shift on inner layers (kicker → title → body → glyph).
- **3D scroll depth** — as the user scrolls, each card translates on the Z axis and tilts in/out, creating a "passing through holograms" feel. Cards far from viewport center sink back (translateZ negative + lower opacity); the centered card pops forward.
- **Hologram aesthetic** — scroll-shaped silhouette (top/bottom rolled caps), cyan/red/lime scanline overlay matching existing `accent` system, animated chromatic aberration edges, glowing rim light, subtle floating idle animation.

## What's built

### 1. New component: `src/components/HologramScroll.tsx`
- Wraps existing `LensCard` content API (`title`, `kicker`, `accent`, `children`, `action`) so we don't rewrite per-lens content.
- Outer `perspective: 1400px` wrapper.
- Inner transformed plate with `transform-style: preserve-3d`.
- `useRef` + `requestAnimationFrame` loop applies lerp toward target rotation/translation (no re-renders during motion).
- Pointer handlers: `onPointerMove` computes normalized (-1..1) offsets from card center → target `rotateY`, `rotateX` (max ±14°). `onPointerLeave` returns to rest.
- Scroll handler (single shared `IntersectionObserver` + `scroll` listener on window): computes each card's distance from viewport center → drives `translateZ` (-180px far → +40px center) and base tilt.
- Layered children with `translateZ` offsets: scroll-cap top/bottom (z: -20), scanline mesh (z: 10), kicker (z: 30), title (z: 60), body (z: 40), accent glyph (z: 80).
- Holographic glyph per accent: spinning sigil (numerology digit, zodiac glyph, spiral, fibonacci spiral, tarot suit) — rendered as inline SVG with `filter: drop-shadow` glow.
- Respects `prefers-reduced-motion` (disables tilt and Z motion).

### 2. New CSS: extend `src/index.css`
- `.hologram-scroll` — base perspective container.
- `.hologram-plate` — preserve-3d, will-change transform.
- `.hologram-scanlines` — repeating linear-gradient scanlines + slow vertical sweep keyframe.
- `.hologram-rim` — conic-gradient rim glow on accent color.
- `.hologram-cap` — rolled paper-scroll caps top & bottom (rounded gradient bars).
- `.hologram-chromatic` — pseudo-elements with offset cyan/red text-shadows for chromatic aberration on titles.
- Floating idle keyframe (3s ease-in-out infinite).

### 3. Wire into Dashboard: `src/pages/Dashboard.tsx`
- Replace the `<div className="mt-8 grid ...">` block (lines ~73–134) with a new vertical 3D stack: `<div className="hologram-stack">` containing 6 `<HologramScroll>` items, one per existing lens, **preserving all current content and links** (Astrology stats, NumChips, Akashic archetype, Fibonacci RatioBar, Tarot card, Journal prompt with save button).
- Stack uses tall vertical layout (single column, generous spacing) so scroll-depth effect has room to breathe; on `xl` screens it stays single-column to keep the hologram feel (cards are wide centerpieces, not a grid).
- Keep top hero card and bottom "Distribute this reading" section unchanged.

### 4. Lens 06 fix
The screenshot shows Lens 06 as "Compatibility" but current code shows "Journal Prompt." We'll keep the existing Journal Prompt content (it's wired to `saveJournalPrompt`) but the user can rename later. No change to lens taxonomy in this task.

## Visual / motion spec

```text
        viewport center
              │
   ┌──────────┼──────────┐  ← card at center: translateZ(+40), full opacity, mouse tilt active
   │  ╭────╮  │  ╭────╮  │
   │  │ Z  │  │  │ Z  │  │  ← cards above/below: translateZ(-120 → -180), opacity 0.55→0.3
   │  ╰────╯  │  ╰────╯  │
   └──────────┼──────────┘
              │
   pointer (px,py) → rotateY = px*14°, rotateX = -py*14°
   inner layers translateZ for parallax depth
```

- Tilt range: ±14° each axis
- Z range on scroll: -180px (edge) to +40px (center)
- Lerp factor: 0.12 per frame (~smooth 60fps follow)
- Idle float: translateY ±4px over 3s when pointer absent
- Reduced-motion: all transforms disabled, plain card fallback

## Files

- **create** `src/components/HologramScroll.tsx`
- **edit** `src/index.css` (append hologram styles)
- **edit** `src/pages/Dashboard.tsx` (swap LensCard grid for HologramScroll stack)

No new dependencies — pure React + CSS 3D transforms.
