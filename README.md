# AKASHIC LENSES: THE HOOD ORACLE

> **"Enter the Oracle without surrendering your identity."**  
> *No dox. Just signal.*

A privacy-first, no-KYC, agentic symbolic intelligence app inside the **WIRED CHAOS / NEURO META X / AGENTROPOLIS** ecosystem.

---

## What Is This?

AKASHIC LENSES is a free consumer oracle app plus premium deep-reading, energy-matching, UGC, and 3D artifact generation engine. It is the front-end interface for **THE HOOD ORACLE** — an agentic astrologist living in the NEURO district of AGENTROPOLIS (the Intelligence Grid).

THE HOOD ORACLE consumes symbolic intelligence Skills from the Grid and translates them into one grounded, reflective reading per user — with zero personal data required.

---

## Core Privacy Principles

| Principle | Status |
|---|---|
| No KYC | ✅ Enabled by default |
| No legal name required | ✅ Alias-first |
| No biometrics | ✅ Never requested |
| No palm / hand / face scan | ✅ Never requested |
| No forced wallet connection | ✅ Wallet optional |
| No-Dox Mode | ✅ Default ON |
| Data stored locally only | ✅ localStorage / sessionStorage |
| No external API calls | ✅ All computation is client-side |

---

## Lens Engine

Six symbolic intelligence lenses — all deterministic, client-side, no external API:

| Lens | Description |
|---|---|
| **Astrology** | Sun/Moon/Rising approximation, element, modality, polarity, house focus |
| **Numerology** | Pythagorean system: Life Path, Destiny, Soul Urge, Personality, Birthday, Personal Year |
| **Akashic** | Archetype class, soul fragment, ancestral echo, shadow loop, integration practice |
| **Fibonacci AI** | Spiral recurrence map, golden ratio balance, cycle markers, integration prompts |
| **Tarot / Chakra** | Card pull based on life path + personal year |
| **Compatibility** | Resonance index between two birth signals |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vite + React 18 + TypeScript |
| Routing | React Router v6 |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Components | Radix UI + shadcn/ui patterns |
| Animations | **Framer Motion** (page & lens transitions) |
| 3D Artifacts | **React Three Fiber** + **@react-three/drei** + Three.js |
| PNG Export | **html2canvas** (ShareCard page) |
| State | React Context + sessionStorage/localStorage |
| Forms | React Hook Form + Zod |
| Video (future) | Remotion folder structure included — install when ready |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

No environment variables required. No backend. No API keys.

---

## Project Structure

```
src/
├── assets/            # Oracle portrait, Agentropolis BG, spiral medallion
├── components/
│   ├── AppShell.tsx   # Header nav (desktop + mobile drawer), footer
│   ├── ArtifactViewer.tsx  # 3D sigil globe (React Three Fiber)
│   ├── LensCard.tsx   # Reusable lens section card
│   ├── NavLink.tsx    # Router-aware nav link wrapper
│   ├── OracleLoader.tsx    # Loading state with rotating oracle prompts
│   ├── SpiralMedallion.tsx # 2D animated medallion (CSS + Three.js)
│   └── ui/            # shadcn/ui components (Button, Input, etc.)
├── lib/
│   ├── lenses.ts      # All lens engines (pure functions, deterministic)
│   ├── memory.ts      # localStorage memory layer (readings, journal, settings)
│   └── utils.ts       # Tailwind merge helper
├── pages/
│   ├── Landing.tsx    # Home page (Framer Motion hero)
│   ├── AgentIntro.tsx # Meet The Hood Oracle
│   ├── Intake.tsx     # Birth data form (alias-first)
│   ├── Loading.tsx    # Oracle reading spinner
│   ├── Dashboard.tsx  # Full reading dashboard + 3D artifact viewer
│   ├── NumerologyReport.tsx  # Expanded numerology
│   ├── AkashicReport.tsx     # Expanded akashic reading
│   ├── FibonacciReport.tsx   # Fibonacci AI spiral map
│   ├── Journal.tsx    # Memory Layer (local journal)
│   ├── Compatibility.tsx     # Two-person resonance
│   ├── AgentConsole.tsx      # Lore / Grid architecture
│   ├── Settings.tsx   # Preferences + data export/wipe
│   └── ShareCard.tsx  # PNG-exportable reading card
├── state/
│   └── ReadingContext.tsx  # Global reading state
└── test/

remotion/              # Future video generation (stubs — install Remotion to activate)
├── index.tsx
└── compositions/
    ├── ReadingCard.tsx
    └── SpiralIntro.tsx
```

---

## Routes

| Path | Page |
|---|---|
| `/` | Landing |
| `/agent` | Agent Intro |
| `/intake` | Intake Form |
| `/loading` | Oracle Reading Spinner |
| `/dashboard` | Reading Dashboard |
| `/numerology` | Numerology Report |
| `/akashic` | Akashic Report |
| `/fibonacci` | Fibonacci AI Report |
| `/journal` | Memory Layer / Journal |
| `/compatibility` | Compatibility Lens |
| `/console` | Lore / Agent Console |
| `/settings` | Settings |
| `/share` | Share Card (PNG export) |

---

## Design System

Built on a custom CSS variable design system (see `src/index.css`):

- **Primary / cyan** — `hsl(184 100% 50%)` — WIRED CHAOS teal glow
- **Accent / red** — `hsl(0 90% 55%)` — NEURO META X signal red
- **Lime** — `hsl(80 90% 55%)` — glyph lime
- **Cream** — `hsl(40 40% 92%)` — premium share card surface

Typography:
- **Serif** — Cormorant Garamond (oracle headings)
- **Mono** — JetBrains Mono (labels, chips, code)
- **Sans** — Inter (body text)

---

## Data Privacy Architecture

All data is stored in the browser only:

```
sessionStorage  →  akashic.current     (active reading, cleared on tab close)
localStorage    →  akashic.readings    (up to 50 past readings)
localStorage    →  akashic.journal     (journal entries)
localStorage    →  akashic.settings    (user preferences)
```

**No data ever leaves the device.** The export function in Settings downloads a JSON snapshot.

---

## Supabase-Ready Architecture

The project is designed to be Supabase-compatible but does **not require credentials to run locally**.

To wire Supabase later:
1. Create `src/lib/supabase.ts` with your client
2. Replace `saveReading` / `getReadings` calls in `memory.ts` with Supabase queries
3. Add auth via `@supabase/auth-ui-react` (alias-based, no real name required)

---

## Activating Remotion Video Generation

```bash
npm install remotion @remotion/bundler @remotion/renderer
```

Then uncomment the imports in `remotion/index.tsx` and run:

```bash
npx remotion studio remotion/index.tsx
```

---

## Scripts

```bash
npm run dev       # Start dev server (localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
npm run test      # Vitest unit tests
```

---

## Operating Principle

> *Pattern is not prison. Signal is not sentence.*

Readings are symbolic — for reflection, journaling, and entertainment. Not medical, legal, financial, or psychological advice. No deterministic past-life claims.

---

## Ecosystem

**WIRED CHAOS** → parent brand  
**NEURO META X** → AI & symbolic intelligence division  
**AGENTROPOLIS** → the Intelligence Grid (agent infrastructure)  
**THE HOOD ORACLE** → symbolic intelligence agent, NEURO district

---

*AGENTROPOLIS // NEURO DISTRICT // SYMBOLIC INTELLIGENCE GRID*

