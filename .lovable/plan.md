## Reality check first

Your detailed plan references infrastructure that does **not exist in this project**: `CityLayout`, `CityCommand`, `HeroChamber`, `GovernmentBuilding3D`, `TreasuryFurnace`, `hermes_audit`, `useXentBalance`, wagmi, the XENT token, and any Supabase migrations / edge functions. Lovable Cloud is **not enabled** — there is no `supabase/` directory, no `shroud_subscriptions` table can exist, and no edge functions can run.

This codebase is the Hood Oracle / Akashic Lenses app: React + Vite + Tailwind, client-only, with `localStorage`-based entitlements (`src/lib/entitlements.ts`) and a `VideoReportPlayer` paywall that simulates purchases.

So this plan delivers the **Shroud District concept faithfully** but grounded in what's actually here. Anything requiring Cloud, wagmi, or real Monero RPC is called out as Phase 2 and gated behind your explicit go-ahead.

---

## Phase 1 — what gets built now (client-only, no backend)

### 1. `/shroud` route — Shroud District shell

- New route in `src/App.tsx` → `<Shroud />`, wrapped in `AppShell` (matches every other inner page).
- New `src/pages/Shroud.tsx`:
  - SEO: `<title>Shroud District — Agentic Anonymity as a Service</title>`, meta description, single H1, JSON-LD `Service`.
  - Hero: editorial kicker `LAYER 3 · SHROUD`, headline "Hide what you're **doing**, not just what you have.", pull quote.
  - Layer-stack diagram (the L3/L2/L1 pyramid you described) rendered as styled HTML/SVG using existing tokens (`bone-text`, `red-text`, `neon-text`, `chip`, `chip-red`). No new 3D engine — keeps load fast and matches the rest of the site's visual language.
  - Three tier panels (Veil / Cloak / Sovereign) using `glass-strong` cards with the existing `FloatingHolo` component for the spire/obelisk feel. Sovereign panel uses gold accent (new token, see §5).
  - "Privacy Mesh · ONLINE" status pylon line in the page header (matches the `editorial-meta` block on Landing).

### 2. Tier gating — local entitlements

- Extend `src/lib/entitlements.ts` with a typed tier helper:
  - New product IDs: `shroud.cloak`, `shroud.sovereign`. `shroud.veil` is implicit/free.
  - `getShroudTier(): "veil" | "cloak" | "sovereign"` — derived from existing `hasUnlock`.
  - `setShroudTier(tier)` for the UI.
- New `src/components/shroud/ShroudTierGate.tsx`: tier picker; "subscribe" buttons call `grantUnlock` (same simulate-purchase pattern `VideoReportPlayer` already uses) **or** open the Monero donate flow (see §3) when the user prefers XMR.
- City-wide avatar halo: there is no city/avatar concept in this app. Instead, when tier is Cloak+, the `OracleLogo` and `MobileTabBar` active glow shift to violet via a `data-tier="cloak|sovereign"` attribute on `<html>`. Documented as the visible "halo".

### 3. Monero acceptance — donate page + paywall integration

- New `src/pages/Donate.tsx` at `/donate`:
  - Static XMR address + QR (generated client-side with `qrcode` lib — small dep, no backend) + copy button (haptic feedback via existing `src/lib/native.ts`).
  - "Why Monero" short blurb + link to `https://www.getmonero.org/downloads/` and the `monero-project/monero-gui` repo. Single H1, alt text on QR, JSON-LD `DonateAction`.
  - "I sent it" form: user pastes tx hash → stored in `localStorage` and a one-time unlock code is shown (honor system, matches your existing `entitlements` model). Optional email field is a `mailto:` link, no backend.
- `src/components/shared/MoneroPayButton.tsx`: reusable "Pay with Monero" button. Drops into:
  - `VideoReportPlayer.tsx` — added next to the existing `Unlock $X` button. On click, opens a `Drawer` (vaul, already installed) with the same QR/address/tx-hash flow scoped to that `productId`.
  - `ShroudTierGate.tsx` — same drawer for Cloak / Sovereign.
- Footer link to `/donate` and entry in `MoreSheet.tsx`.

### 4. Discovery surfaces

- `MoreSheet.tsx` → add **Shroud** and **Donate (XMR)** rows.
- `Landing.tsx` → one new link in the existing inline link strip: `→ Enter the SHROUD district`.
- No nav redesign — additive only.

### 5. Tokens & memory

- `index.css` / `tailwind.config.ts`: add `--shroud-violet` and `--sovereign-gold` HSL tokens + matching utilities (`text-shroud`, `bg-shroud`, `shadow-shroud`). All HSL, semantic, no raw hex in components.
- New memory: `mem://features/shroud-anonymity-service` — L3 positioning, three tiers, "no real monerod in Phase 1" constraint.
- Update `mem://index.md` Memories list.

### 6. Acceptance (Phase 1)

- `/shroud` renders cleanly at 384×677 (your current viewport) and desktop, no horizontal scroll.
- `/donate` shows a scannable QR for the XMR address you provide.
- "Pay with Monero" button appears on every `VideoReportPlayer` and on the Shroud tier gate, opens drawer with QR + tx-hash form.
- Granting `shroud.cloak` (via either simulated card unlock or the XMR honor-system flow) flips `<html data-tier="cloak">` and re-tints active nav glow to violet.
- Lighthouse: no regression on Landing; new pages have valid meta + single H1.
- Zero new env vars, zero backend calls, no service worker.

---

## Phase 2 — gated behind your explicit yes (not built now)

These require decisions and infrastructure this project doesn't yet have. I'll only start them after you confirm each:

1. **Lovable Cloud** — needed for `shroud_subscriptions`, `shroud_relay_log`, RLS, and the `shroud-mint` / `shroud-relay` edge functions. Requires enabling Cloud (one tool call, free dev tier).
2. **Real Monero subaddresses** — requires a hosted `monero-wallet-rpc` URL + view key stored as Cloud secrets. You host the node; we call it from `shroud-mint`.
3. **Auto-verified XMR payments** — alternative to self-hosted RPC: NOWPayments or BTCPay Server webhook into a Cloud edge function that calls `grantUnlock` server-side.
4. **wagmi / XENT billing** — no wallet stack exists yet. Adding wagmi + chain config is its own scoped change.
5. **Tor/i2p relay receipts**, group-buy Sovereign missions — third-party APIs, separate plan.

---

## Open question before I implement

Phase 1's `/donate` and `MoneroPayButton` need an **XMR address** to display. Three options — pick one in your approval message:

- **A.** Paste your real primary XMR address now; it ships hardcoded in `src/lib/monero.ts`.
- **B.** Ship with a `VITE_MONERO_ADDRESS` env var + a clearly-marked placeholder address; you set the real one in Project Settings.
- **C.** Ship a placeholder + a Settings page field that writes to `localStorage` (lets you change it without redeploy, but each browser stores its own).

Default if you don't specify: **B**.

---

## Files

**New**
- `src/pages/Shroud.tsx`
- `src/pages/Donate.tsx`
- `src/components/shroud/ShroudTierGate.tsx`
- `src/components/shroud/ShroudLayerStack.tsx`
- `src/components/shared/MoneroPayButton.tsx`
- `src/components/shared/MoneroPayDrawer.tsx`
- `src/lib/monero.ts` (address constant + helpers)
- `src/lib/shroud.ts` (tier helpers on top of entitlements)
- `mem://features/shroud-anonymity-service`

**Edited**
- `src/App.tsx` (routes)
- `src/lib/entitlements.ts` (add `shroud.*` product IDs)
- `src/components/MoreSheet.tsx` (Shroud + Donate links)
- `src/components/VideoReportPlayer.tsx` (XMR pay button)
- `src/components/MobileTabBar.tsx` + `src/components/OracleLogo.tsx` (tier-based tint)
- `src/pages/Landing.tsx` (one new link)
- `src/index.css`, `tailwind.config.ts` (shroud + gold tokens)
- `mem://index.md`
- `package.json` (`qrcode` dep)
