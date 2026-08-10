# Copilot Instructions for hood-oracle-lenses

## Project Context

This is a Vite + React + TypeScript app (originally scaffolded via Lovable)
that ships as a web PWA and as a native iOS/Android app via Capacitor. The
app centers on an "oracle" experience with 3D visuals and astronomical data.

## Tech Stack

- **Build:** Vite 5 (`vite`, `@vitejs/plugin-react-swc`)
- **Language:** TypeScript 5, React 18
- **Styling:** Tailwind CSS 3 with `tailwindcss-animate` and `@tailwindcss/typography`
- **UI primitives:** shadcn/ui on top of Radix (`@radix-ui/*`)
- **Icons:** `lucide-react`
- **Routing:** `react-router-dom` v6
- **Data:** `@tanstack/react-query`
- **Forms:** `react-hook-form` + `zod` (`@hookform/resolvers`)
- **3D:** `three`, `@react-three/fiber`, `@react-three/drei`
- **Astronomy:** `astronomy-engine`
- **Toasts:** `sonner`
- **Themes:** `next-themes`
- **Native shell:** Capacitor 8 (`@capacitor/{core,ios,android,app,haptics,push-notifications,splash-screen,status-bar}`)
- **Tests:** Vitest + `@testing-library/react` + jsdom
- **Lint:** ESLint 9 flat config (`eslint.config.js`)

## Repo Layout

```
/src
  main.tsx              # entry
  App.tsx               # router + providers
  index.css             # tailwind base + tokens
  components/           # shared components (shadcn-generated live under components/ui)
  hooks/                # custom React hooks
  lib/                  # utilities (e.g. cn)
  pages/                # route components
  state/                # app state
  assets/               # in-bundle assets
  test/                 # vitest setup + unit tests
/public                 # static assets served as-is (icons, manifest, robots.txt)
/scripts                # Python helpers for logo GIF + video renders
/capacitor.config.ts    # Capacitor config
/index.html             # Vite entry HTML
```

## NPM Scripts

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run build:dev` — build with development mode flags
- `npm run preview` — preview the production build
- `npm run lint` — ESLint
- `npm run test` — Vitest run once
- `npm run test:watch` — Vitest in watch mode

## Style Conventions

- **File naming:** components in `PascalCase.tsx`; hooks in `useCamelCase.ts`;
  utilities in `camelCase.ts`. Route/page components live under `src/pages/`.
- **Imports:** use the `@/` alias (configured in `tsconfig` + `vite.config.ts`)
  for imports from `src/`.
- **Styling:** Tailwind utility classes; compose with the `cn` helper in
  `src/lib/utils.ts`. Prefer design tokens from `tailwind.config.ts` over raw
  hex values.
- **UI components:** use shadcn primitives from `src/components/ui/` when they
  exist. Add new shadcn components via the shadcn CLI rather than hand-rolling.
- **State:** prefer local component state or `@tanstack/react-query` for
  server/async state. Reach for context or `src/state/` only when needed.
- **Forms:** `react-hook-form` + `zod` schemas. Keep the schema colocated with
  the form.
- **3D:** keep R3F scenes as isolated components under `src/components/`; avoid
  side effects at module scope.
- **Tests:** Vitest, jsdom environment. Put unit tests next to the code as
  `*.test.ts(x)` or under `src/test/`. Use `@testing-library/react` idioms;
  query by role/label first.

## Capacitor / Native Notes

- Any change that touches native surface area (permissions, plugins, deep links,
  push, splash) needs to be reflected in `capacitor.config.ts` and, if
  applicable, native platform folders after `npx cap sync`.
- Don't check in generated `ios/` or `android/` folders unless the user has
  explicitly added them.
- Push notifications: iOS needs an APNs key, Android needs
  `google-services.json`. Don't commit these.

## What Copilot Should Do

- Reuse existing shadcn/Radix primitives before adding new UI libraries.
- Keep TypeScript strictly typed — no `any` in new code unless there's a
  concrete reason.
- Add tests when adding non-trivial logic (hooks, utilities, state reducers).
- Keep bundles small: prefer per-icon imports from `lucide-react`, tree-shake
  Three.js imports, and lazy-load heavy 3D scenes with `React.lazy`.

## What Copilot Should NOT Do

- Don't introduce a second UI framework (MUI, Chakra, etc.).
- Don't swap the router, data layer, or build tool without an explicit ask.
- Don't add global state libraries (Redux, Zustand, etc.) unless requested.
- Don't commit secrets, `.env` files, native signing material, or generated
  Capacitor platform folders.
- Don't hand-edit `package-lock.json` / `bun.lockb`.
