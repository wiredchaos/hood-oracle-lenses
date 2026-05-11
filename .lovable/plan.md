
# Mobile-First Redesign + iOS Wrapper

Two parallel tracks: (1) reshape the entire UI for a phone-native feel, (2) wrap it as an installable web app and a real Capacitor iOS/Android shell.

---

## Track 1 — Mobile-first UI/UX redesign

### A. Global shell (`src/components/AppShell.tsx`, `src/index.css`)

- Replace the desktop top-nav-only model with a **dual shell**:
  - **Mobile (<lg):** compact top bar (logo + status chip + profile glyph) + **fixed bottom tab bar** with 5 primary destinations: Portal · Oracle · Reading · Life · More.
  - **Desktop (≥lg):** existing horizontal nav stays.
- Bottom tab bar: 56px tall, safe-area aware (`pb-[env(safe-area-inset-bottom)]`), active item shows cyan glow + label, inactive shows glyph only.
- "More" opens a `Drawer` (vaul) sheet from bottom listing the secondary routes currently in the `MORE` array.
- Add `viewport-fit=cover` to `index.html` and global CSS:
  - `body { padding: env(safe-area-inset-top) env(safe-area-inset-right) calc(56px + env(safe-area-inset-bottom)) env(safe-area-inset-left); }` on mobile.
  - Disable iOS tap highlight, enable `overscroll-behavior: none`, lock font-size to prevent input zoom (`font-size: 16px` on inputs).
- Remove desktop hover-only "More" dropdown on touch devices.

### B. Page-by-page redesign (mobile-first, then enhance up)

For each page below: single-column flow, sticky page header with back chevron, large tap targets (≥44px), thumb-zone CTAs, swipeable card stacks instead of grids, collapsible sections.

- **`Index.tsx` / Landing** — hero collapses to one viewport: logo, tagline, single primary CTA ("Begin Reading"), secondary text link. Below: vertical snap-scroll of feature cards.
- **`HoodOracle.tsx`** — chat-style full-height column, input pinned above tab bar, message bubbles, no side panels on mobile.
- **`Intake.tsx`** — already touched; convert to **multi-step wizard** (Name → DOB → Time → City → Intent), one field per screen, progress dots, large numeric keyboard for date.
- **`Dashboard.tsx`** — replace 3-column hero with a **vertical card stack**: identity card → Sun/Moon/Rising chip row → Spiral medallion → each lens as a full-width card; "Distribute" actions become a horizontal swipe rail.
- **`NeuroLifeDemo.tsx` (Life Tracker)** — assessment as wizard; timeline becomes horizontally scrollable with snap points and a sticky "today" pin.
- **`Compatibility.tsx`, `AkashicReport.tsx`, `FibonacciReport.tsx`, `NumerologyReport.tsx`, `ShareCard.tsx`** — single column, accordion sections, share/export CTAs in a sticky bottom action bar.
- **`Journal.tsx`, `PocketCards.tsx`, `Files.tsx`, `ListicleEngine.tsx`, `AgentTvStudio.tsx`** — list-first layouts with pull-style headers; FAB for primary action.
- **`VideoPortal.tsx`, `VideoReports.tsx`, `NeuroVideoDemo.tsx`** — full-bleed 9:16 player on mobile, controls overlay.
- **`Settings.tsx`, `MonetizationMap.tsx`, `TrustSignal.tsx`, `CircleTest.tsx`, `Bio.tsx`, `MovementEchoes.tsx`, `AgentConsole.tsx`, `DemoProfile.tsx`, `UgcForge.tsx`, `GlobalHoods.tsx`, `CointelproLink.tsx`, `HoodOracleFiles.tsx`** — pass to apply: stack columns, increase line-height, replace tables with cards, ensure 16px inputs, add safe-area padding.

### C. Tokens & motion

- Add mobile type scale in `tailwind.config.ts` (`text-display-mobile`, etc.).
- Tighten container paddings on mobile (`px-4`) and widen on desktop.
- Add `prefers-reduced-motion` guards to existing animations.
- Use `framer-motion` for tab transitions and bottom-sheet entry.

### D. SEO/meta (kept)

- `index.html` already has viewport, OG, Twitter; add `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style=black-translucent`, `theme-color`, `apple-touch-icon`.

---

## Track 2 — Installable PWA (no service worker)

Per Lovable preview safety, **manifest-only** installability. No `vite-plugin-pwa`, no service worker.

- Add `public/manifest.webmanifest`:
  - `name: "Hood Oracle"`, `short_name: "Oracle"`, `start_url: "/"`, `scope: "/"`, `display: "standalone"`, `background_color: "#0F172A"`, `theme_color: "#0F172A"`, `orientation: "portrait"`.
  - Icons: 192, 512, 512 maskable (generated from existing `OracleLogo`).
- Add to `index.html`:
  - `<link rel="manifest" href="/manifest.webmanifest">`
  - `<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">`
  - Apple PWA meta tags above.
- Generate `public/icons/{192,512,512-maskable,apple-touch-icon}.png` via `imagegen`.
- Add `/install` page with simple instructions (Share → Add to Home Screen on iOS; install prompt button on Android via `beforeinstallprompt`).

---

## Track 3 — Capacitor iOS/Android wrapper

### Setup

- Install: `@capacitor/core`, `@capacitor/cli` (dev), `@capacitor/ios`, `@capacitor/android`, `@capacitor/status-bar`, `@capacitor/splash-screen`, `@capacitor/haptics`, `@capacitor/push-notifications`, `@capacitor/app`.
- Create `capacitor.config.ts`:
  - `appId: "app.lovable.763568dc9d8b40b68e2253f7c3fb48f2"`
  - `appName: "hoodoracle"`
  - `webDir: "dist"`
  - `server.url: "https://763568dc-9d8b-40b6-8e22-53f7c3fb48f2.lovableproject.com?forceHideBadge=true"`, `cleartext: true` (hot-reload from sandbox).
  - Plugins: SplashScreen (1500ms, dark bg), StatusBar (Style.Dark), PushNotifications.

### Native polish (`src/lib/native.ts`)

- On app boot, if `Capacitor.isNativePlatform()`:
  - Set status bar style + background color to match theme.
  - Hide splash after first paint.
  - Wire `App.addListener('backButton')` (Android) → router back.
  - Provide `haptics.tap()` helper used by tab bar, primary buttons, slider commits, card swipes.

### Push notifications

- `src/lib/push.ts`:
  - `registerPush()` requests permission, calls `PushNotifications.register()`, listens for `registration` (token), `pushNotificationReceived`, `pushNotificationActionPerformed`.
  - Token logged to console for now (no backend wiring requested).
- Add a **Settings → Notifications** toggle that calls `registerPush()` and shows current permission state.
- Note: actually sending pushes requires Apple Developer account + APNs key; FCM for Android. Out of scope for code, documented in README.

### Build/run docs

A short README section: export to GitHub → `npm i` → `npx cap add ios && npx cap add android` → `npm run build && npx cap sync` → `npx cap run ios` (Mac + Xcode) / `npx cap run android` (Android Studio).

---

## Out of scope

- Backend changes, Oracle logic, astrology engine, payments, auth.
- Real push delivery infra (APNs/FCM credentials).
- Service worker / offline cache (explicitly declined).

## Acceptance

- At 390×844 every page is single-column, no horizontal scroll, all CTAs reachable in thumb zone, bottom tab bar respects safe area.
- "Add to Home Screen" on iOS Safari installs the app with correct icon and standalone chrome; status bar matches theme.
- `npx cap sync ios` succeeds; app boots in iOS simulator showing the live sandbox URL with native splash + dark status bar.
- Tapping a primary button triggers a haptic on device.
- Settings → Notifications can request permission and log a device token in console on a physical device.

## Files (high level)

**New:** `capacitor.config.ts`, `public/manifest.webmanifest`, `public/icons/*`, `src/lib/native.ts`, `src/lib/push.ts`, `src/components/MobileTabBar.tsx`, `src/components/MobileTopBar.tsx`, `src/components/MoreSheet.tsx`, `src/pages/Install.tsx`.

**Edited:** `index.html`, `src/components/AppShell.tsx`, `src/index.css`, `tailwind.config.ts`, `src/main.tsx` (init native), `src/App.tsx` (add `/install`), and every page file listed in §B for mobile layout.
