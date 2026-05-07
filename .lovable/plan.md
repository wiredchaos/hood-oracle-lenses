## Execute all pending in one autonomous pass

### New files
- `src/lib/neuroLife.ts` — `buildNeuroLife(reading)` derives Fibonacci-spaced phases, pulse, markers from existing `Reading`. Symbolic only, no biometrics.
- `src/components/NeuroLifeTracker.tsx` — Phase strip + pulse bar + dominant lens per phase. `compact` prop for embedding.
- `src/pages/NeuroLifeDemo.tsx` — Full tracker page in `AppShell` with CTAs to portal, intake, bio.
- `src/pages/VideoPortal.tsx` — Full-bleed autoplay/looping `/videos/neuro-meta-x-report.mp4`, brand row, three CTAs (Enter Portal → `/lenses`, Launch Bio Demo → `/bio`, Run Demo Reading → loading→dashboard), inline links to NEURO Life Tracker / NEURO video / Video Reports / Skip to Reading, embedded compact `NeuroLifeTracker`.

### Edits
- `src/App.tsx` — `/` → `VideoPortal`; add `/lenses` → `Index`; add `/demo/neuro-life` → `NeuroLifeDemo`.
- `src/components/AppShell.tsx` — PRIMARY: prepend `Portal` (`/`); MORE: add `Life Tracker` (`/demo/neuro-life`).
- `src/pages/Dashboard.tsx` — Add "Open NEURO Life Tracker" button in distribution row.

### Em-dash purge (replace `—` with `-` or rephrase)
`src/index.css`, `src/pages/VideoReports.tsx`, `src/pages/Bio.tsx`, `src/pages/NeuroVideoDemo.tsx`, `src/pages/Landing.tsx`, `src/components/bio/BioOverlay.tsx`, `src/lib/oracle.ts`.

### Note on the missing "Update" button
Frontend changes only go live after clicking **Publish → Update** in the editor. If "Update" is missing, the project hasn't been published yet — click **Publish** (top-right desktop, bottom-right `…` mobile) for the first deploy. After that, "Update" appears for subsequent pushes. Backend changes deploy automatically. Published URL: `https://hoodoracle.lovable.app`.
