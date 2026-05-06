## Goal

Eliminate flat 2D cards across the entire app. Every surface that currently uses `.glass`, `.glass-strong`, `LensCard`, or the lens grid should render as a **floating hologram** with depth, rim glow, scanlines, parallax tilt, and gentle float — matching the `HologramScroll` aesthetic already on the Dashboard.

Doing this at the **primitive level** (not page-by-page) covers all 24 pages in one pass.

## Approach

### 1. Upgrade `.glass` / `.glass-strong` in `src/index.css`
Redefine these two utility classes (used by 24+ pages) so they render as floating holographic plates instead of flat blurred panels:
- Replace flat `bg-card/60` look with the layered gradient + radial halo from `.hologram-plate`
- Add the holographic border (`hsl(--holo) / 0.35`), inset glow, and outer drop shadow
- Apply subtle `holo-float` animation (6s ease-in-out, ±6px translateY)
- Add `transform-style: preserve-3d` and slight default `translateZ` tilt
- Keep `border-radius` and existing layout behavior so no page breaks

Add a new `.holo-surface` modifier that layers in scanlines + rim sweep via `::before`/`::after` pseudo-elements (no new DOM needed). Apply it globally by extending `.glass` so every existing card automatically gets scanlines + animated rim light.

### 2. New lightweight wrapper: `src/components/FloatingHolo.tsx`
A drop-in replacement for raw `<div className="glass">` blocks that need full 3D mouse tilt (not just the floating look). Uses the same `requestAnimationFrame` + `lerp` engine from `HologramScroll` but without the title/kicker/glyph chrome — just children.

Props: `accent?: "cyan" | "red" | "lime"`, `intensity?: "subtle" | "full"`, `className`, `children`.

### 3. Rework `LensCard` (`src/components/LensCard.tsx`)
Currently the flat tile used on `Index`, `AkashicReport`, etc. Re-implement as a mini hologram:
- Wrap in `FloatingHolo` with `intensity="subtle"`
- Floating glyph badge (top-right) with `translateZ(60px)`
- Title and subtitle on stacked Z layers
- Keep existing API (`title`, `subtitle`, `icon`, `to`, `accent`) — no caller changes needed

### 4. Rework `CardStack` (`src/components/CardStack.tsx`)
The pocket-card swipe stack — convert each card layer to a `.hologram-plate` so the swipe deck floats in 3D space with depth offsets between stacked cards.

### 5. Image tiles (`GlobalHoods`, `DemoProfile`, etc.)
Wrap the image-bearing tiles in `FloatingHolo` so the city portraits hover and tilt instead of sitting flat. The existing `<img>` stays inside, gaining parallax via `translateZ`.

### 6. Reduced-motion + perf
- All new effects honor `prefers-reduced-motion: reduce` (already wired in the existing hologram CSS block — extend the media query to cover `.glass`)
- Use CSS transforms only (GPU); no layout thrash
- Stagger `holo-float` animation-delay by hashing element index so cards don't pulse in lockstep

## Files Touched

- `src/index.css` — upgrade `.glass`, `.glass-strong`, add `.holo-surface`, extend reduced-motion block
- `src/components/FloatingHolo.tsx` — new wrapper (3D tilt + float, no chrome)
- `src/components/LensCard.tsx` — re-implement on top of `FloatingHolo`
- `src/components/CardStack.tsx` — convert layers to hologram plates
- `src/components/AppShell.tsx` — verify root `perspective` is set so all descendants get true 3D depth (add `perspective: 1600px` on main scroll container if missing)

**No page files need editing** — the change propagates through shared primitives.

## Out of Scope

- No content/copy changes
- No new pages
- Form inputs (`<Input>`, `<Textarea>`) stay 2D for usability; only container surfaces float
- Buttons remain flat (interactive affordance clarity)

## Acceptance

- Every card-like surface across all 24 pages floats, tilts on pointer move, has a rim/scanline glow, and respects reduced-motion
- No regressions to layout, click targets, or scroll behavior
- Mobile (384px viewport) still readable — tilt range reduced on touch devices
