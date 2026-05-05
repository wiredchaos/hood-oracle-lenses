
# Plan: THE FACELESS HOOD ORACLE expansion

Turning Akashic Lenses into the full content + character + distribution system across AGENTROPOLIS.

## 1. Character system upgrade

- Replace single oracle portrait with **Faceless Hood Oracle** identity model.
- New file `src/lib/oracle.ts`:
  - `OracleVariant` type: `{ id, city, energy, palette, visualFlavor, loreLine, imagePrompt, env360Prompt, agentTvConcept, pocketCardConcept }`
  - Export `HOOD_VARIANTS` array with all 12 cities (Compton, Philly, Atlanta, Chicago, NYC, Kingston, Lagos, London, Paris Banlieue, Tokyo, Rio, Johannesburg).
  - Export `MASTER_PROMPT`, `NEGATIVE_PROMPT`, `VISUAL_RULES`, `SAFETY_RULES`.
- Generate one new hero image asset `src/assets/faceless-oracle.jpg` (red veil, hooded silhouette, glowing red eyes, cyber-noir; non-explicit) using nano banana pro. Replace usage of `hood-oracle.jpg` on Landing + AgentIntro with the new faceless render. Add tagline: *"She has no face because every hood has seen her."*

## 2. New pages and routes

Add to `src/App.tsx` and `AppShell` nav:

| Route | Component | Purpose |
|---|---|---|
| `/oracle` | `HoodOracle.tsx` | Character bible: faceless identity, visual rules, safety rules, master prompt, tagline |
| `/hoods` | `GlobalHoods.tsx` | Grid of 12 variants; click → variant detail drawer with prompts + concepts |
| `/listicles` | `ListicleEngine.tsx` | GTM engine: pick a topic, generates title/hook/points/video script/carousel/X thread/SEO intro/CTA + platform tag chips |
| `/agenttv` | `AgentTvStudio.tsx` | Episode builder: format selector, bucket selector, outputs episode package (title, hook, VO script, scene direction, Remotion notes, image prompt, caption, CTA, export targets); link to atvnetwork.vercel.app |
| `/files` | `HoodOracleFiles.tsx` | Short story library; embed pilot "The Woman Without a Face"; template form to draft new stories |
| `/pocket` | `PocketCards.tsx` | Swipeable card-stack builder + viewer for the 9 Pocket card types; sample "Woman Without a Face" stack |
| `/forge` | `UgcForge.tsx` | One-input → multi-output generator (TikTok/Shorts/Reel scripts, X thread, carousel, Pocket stack, AGENTtv package, referral CTA, Signal Link, creator-credit + monetization placeholders) |
| `/monetization` | `MonetizationMap.tsx` | Visual pipeline: Reading → Story → Listicle → Short → AGENTtv → Pocket → Social → Referral → Premium → Skill Revenue, with chips for each surface (Akashic, AGENTtv, Pocket, WIRED CHAOS marketplace, Skill Exchange, Signal Credits) |

Update `AppShell` NAV to include: Oracle, Hoods, Listicles, AGENTtv, Files, Pocket, Forge, Map (collapse less-used items into a "More" dropdown to fit 744px viewport).

## 3. Content libraries

`src/lib/content.ts`:
- `LISTICLE_TEMPLATES` (the 7 example titles + structure generator)
- `AGENTTV_FORMATS` and `AGENTTV_BUCKETS` arrays
- `POCKET_CARD_TYPES` array
- `PILOT_STORY` constant containing the full "The Woman Without a Face" text
- Pure functions `buildListicle(topic)`, `buildEpisode(input)`, `buildPocketStack(story)`, `buildUgcBundle(seed)` returning structured objects (deterministic stub generators using existing reading data when present).

## 4. Pocket card viewer component

`src/components/CardStack.tsx`: swipe/click through cards, keyboard arrows, progress dots, glass cyber-noir styling. Reused on `/pocket` and inside `/files` story preview.

## 5. Design + safety

- Reuse existing palette (black/cyan/red/white/deep teal/muted gold) and glass panels. Add `--gold-muted` token if missing.
- Every generative page shows a small "Safety" chip linking to rules: no KYC, no biometrics, no real-person likeness, symbolic-only, non-explicit.
- Continue site-wide rule: no em dashes.

## 6. Wiring

- Generated content from `/forge`, `/listicles`, `/agenttv`, `/pocket` can be saved to existing Memory Layer (extend `memory.ts` with `getAssets/saveAsset` for a new `akashic.assets` bucket).
- Dashboard gets a new "Distribute this reading" panel with quick links: Make Listicle, Make Episode, Make Pocket Stack, Open Forge — each prefilled with current reading.

## Technical notes

- All generation is client-side deterministic templating (no AI calls). Functions accept a seed (reading or topic) and return typed objects rendered as code-like broadcast panels.
- Variant images are NOT all generated (cost). Only the master faceless hero is rendered; variant cards use CSS-composed silhouette tiles + palette swatches + city skyline SVG accents, with the image prompt shown as copyable text for users who want to render externally.
- 360 environment prompts are shown as copyable code blocks; no actual 360 viewer.
- AGENTtv "export" buttons copy structured JSON/markdown to clipboard and link out to atvnetwork.vercel.app.

## Out of scope (callable later)

- Real video rendering with Remotion
- Auth, payments, real Skill Exchange API
- Actual social posting
