# Video Reports + NEURO Demo + Hood Oracle Video Messages

Three connected deliverables: (1) a **paid video report system** inside the app with preview + download, (2) a **NEURO META X demo report video** rendered now and shipped as the showcase, and (3) **short video messages from each of the 12 Hood Oracles** rendered now and wired into the existing hood oracle pages.

## 1. Video assets to render (one-time, via Remotion)

Rendered to `/mnt/documents/` and copied into `public/videos/` so the app can stream them.

- **NEURO demo report** — `neuro-meta-x-report.mp4` (~45s, 1080p)
  - Cold open: "NO DOX MODE ACTIVE" glitch title
  - Astrology lens (Virgo Earth Architect)
  - Numerology (Life Path 11/2, Day 8)
  - Akashic (Red Ledger of the Systems Oracle)
  - Fibonacci (SPIRAL-34, Architecture After Pressure)
  - Patch-Life closer + oracle phrase
  - Pulls copy directly from `src/lib/demoSeed.ts`
- **12 Hood Oracle messages** — `oracle-<slug>.mp4` (~12-15s each, 1080x1350 vertical)
  - One per hood: compton, philly, atlanta, chicago, nyc, kingston, lagos, london, paris, tokyo, rio, johannesburg
  - Each: hood portrait backdrop (from `src/assets/hoods/*`) → faceless oracle silhouette → location-specific spoken-style caption + signature line → CTA "Run your Signal"
  - Generated from a single parameterized Remotion composition driven by a `HOOD_MESSAGES` table (one entry per hood, pulling tone from existing `oracleAssets.ts` set)

Render pipeline: extend the existing `remotion/` project. Add a `HoodMessage` composition with `calculateMetadata` for per-hood props, then loop the render script across all 12 slugs.

## 2. Video report system in the app

### New page: `/reports/video` (`src/pages/VideoReports.tsx`)
Gated catalog of video reports tied to the current reading.
- Card grid: "Full Symbolic Report", "Hood Oracle Message", "Patch-Life Cinematic", "Daily Signal Loop"
- Each card: thumbnail (poster frame), duration, price chip, Preview button, Unlock & Download button
- Free 8-second preview (uses `<video>` with `#t=0,8` fragment), full file gated

### New component: `src/components/VideoReportPlayer.tsx`
- HTML5 `<video>` with custom controls, poster, scanline overlay matching existing oracle aesthetic
- Two modes: `preview` (muted, looped, 8s clip) and `full` (controls, download button)
- Download via anchor with `download` attribute once unlocked

### Demo route: `/demo/neuro-video`
- Public showcase page playing `neuro-meta-x-report.mp4` full-length, no paywall
- Linked from Landing page hero ("Watch the NEURO demo report")

### Hood oracle integration
- `src/pages/HoodOracle.tsx` and `src/pages/GlobalHoods.tsx`: add a "Video message" tab on each hood card that plays `oracle-<slug>.mp4` inline (preview unlocked, download gated)
- Add `HOOD_VIDEOS` map in `src/lib/oracleAssets.ts` mapping slug → `/videos/oracle-<slug>.mp4`

### Paywall (entitlement-only, no payments wired yet)
- New `src/lib/entitlements.ts` with `hasVideoUnlock(productId)` reading from `localStorage` key `oracle.unlocks`
- "Unlock & Download" button currently shows a modal: "Video reports unlock $X — payments coming soon" with a dev-only "Simulate purchase" toggle that writes the entitlement so QA + the user can test the download flow end-to-end
- Stripe wiring is out of scope for this pass; the UI, pricing chips, gating, and download flow are all in place so payments can be plugged in later (single tool call to enable Stripe + one checkout edge function)

### Pricing chips (display only this pass)
- Hood Oracle Message — $4
- Full Symbolic Report — $19
- Patch-Life Cinematic — $29
- Daily Signal Loop (7-day) — $9

## 3. Routing + navigation
- `src/App.tsx`: add lazy routes `/reports/video` and `/demo/neuro-video`
- `src/pages/Dashboard.tsx`: add "Video Reports" CTA in the distribute section
- `src/pages/Landing.tsx`: add "Watch the NEURO demo" link near the existing Bio link

## 4. Quietly fix runtime errors
The reported `Cannot destructure 'basename'` + null `style` errors look like a component being rendered outside `<BrowserRouter>` (likely a lazy page or the new PanoramaHero mount). I'll inspect `src/App.tsx` + `PanoramaHero.tsx` and patch as part of this pass.

## Files

**Created**
- `remotion/src/scenes/neuro/*` (5 scene files for the demo report)
- `remotion/src/scenes/HoodMessage.tsx` + `remotion/src/data/hoodMessages.ts`
- `remotion/scripts/render-hoods.mjs` (loops the 12 renders)
- `public/videos/neuro-meta-x-report.mp4`
- `public/videos/oracle-<slug>.mp4` ×12
- `public/videos/posters/*.jpg` ×13 (poster frames extracted via ffmpeg)
- `src/pages/VideoReports.tsx`
- `src/pages/NeuroVideoDemo.tsx`
- `src/components/VideoReportPlayer.tsx`
- `src/lib/entitlements.ts`

**Modified**
- `remotion/src/Root.tsx` (register new compositions)
- `src/App.tsx` (routes; runtime-error fix)
- `src/lib/oracleAssets.ts` (HOOD_VIDEOS map)
- `src/pages/HoodOracle.tsx`, `src/pages/GlobalHoods.tsx` (video tab)
- `src/pages/Landing.tsx`, `src/pages/Dashboard.tsx` (entry points)

## Out of scope (call out, do not build)
- Real Stripe checkout + webhook (next pass — one tool call away)
- Per-user reading-personalized video rendering (would need a server-side render queue; current pass uses the demo profile + 12 fixed hood messages)
