## Goal
Create an animated GIF logo that cycles through all 12 Hood Oracle portraits, then replace the spinning gradient circle (`bg-spiral`) used as the brand mark across the app.

## Build steps

### 1. Generate the GIF
- Script: `scripts/build_oracle_logo_gif.py`
- Source: the 12 portraits in `src/assets/hoods/*.jpg` (compton, philly, atlanta, chicago, nyc, kingston, lagos, london, paris, tokyo, rio, johannesburg).
- For each frame:
  - Center-crop to square, resize to 128×128.
  - Mask into a circle (transparent corners) with a 2px cyan ring + faint red outer glow to match the existing `shadow-cyan` look.
  - Add a subtle rotating spiral overlay tick so motion feels continuous.
- Assemble with Pillow → `public/brand/oracle-logo.gif`
  - 12 frames, ~180ms/frame (≈2.2s loop), infinite loop, optimized palette.
- Also export a static fallback `public/brand/oracle-logo.png` (first frame) for `<noscript>` / SEO.

### 2. Add a reusable component
- New `src/components/OracleLogo.tsx`:
  - Props: `size` (default 28), `className`, `glow?: boolean` (default true).
  - Renders `<img src="/brand/oracle-logo.gif" />` inside a wrapper that keeps the existing cyan glow ring (`shadow-cyan` + subtle blurred `bg-spiral` halo behind it for parity).
  - `loading="eager"` for header, `decoding="async"`.

### 3. Replace the gradient circle everywhere
Swap `<div className="...bg-spiral animate-spin-slow shadow-cyan" />` for `<OracleLogo />` in:
- `src/components/AppShell.tsx` header logo (h-7 w-7).
- `src/pages/Landing.tsx` top-left brand mark (h-7 w-7).
- `src/components/SpiralMedallion.tsx` — keep the medallion image but optionally swap inner spiral halo (leave as-is unless it visually clashes; default: leave).
- Quick `rg` sweep for other `bg-spiral animate-spin-slow` usages and replace any that are clearly the "brand dot."

### 4. QA
- Render the GIF, then convert it to a PNG strip with ffmpeg/Pillow and visually inspect all 12 frames for: circular mask cleanliness, no letterboxing, consistent brightness, smooth loop (frame 12 → frame 1).
- Check the header at mobile (384px) and desktop widths via screenshot.

## Out of scope
- Changing the large `bg-spiral` halos used as ambient background blurs (those aren't logos).
- Reanimating the `SpiralMedallion` component.

## Files
- New: `scripts/build_oracle_logo_gif.py`, `src/components/OracleLogo.tsx`, `public/brand/oracle-logo.gif`, `public/brand/oracle-logo.png`
- Edited: `src/components/AppShell.tsx`, `src/pages/Landing.tsx`
