
# Plan: COINTELPRO link + NEURO META X demo seed + N3UR0 rename

Two combined deliverables, one safety posture: privacy-first, symbolic-only, no doxxing, no accusations, no real birth data ever rendered in UI.

## A. Site-wide rename + em-dash sweep

- Replace `NEURO` → `N3UR0` across `src/` and `index.html` (display strings, hashtags, chips, copy). Brand acronym stays `N3UR0 META X` everywhere visible.
- Replace any remaining `—` with `-`.

## B. COINTELPRO PROTOCOL LINK integration

### B.1 New library `src/lib/cointelpro.ts`
Exports: `COINTELPRO_URL = "https://c0intelprotocol.lovable.app"`, `INTEGRATION` (label, title, copy, three CTAs), `SAFETY_FOOTER`, `CODED_LABELS` (Root Memory, Ancestral Signal, Archive Origin, Liberation Echo, Resistance Thread, Street Lineage, Movement Shadow, Protected Context, Knowers' Layer), `VISIBILITY_MODES` (Public Lore / Knowers' Layer / Archive Metadata / Agent-Only Context), `MOVEMENT_ECHOES` (12 entries: Philly→MOVE, Compton, Atlanta, Chicago, NYC, Kingston, Lagos, London, Paris Banlieue, Rio, Johannesburg, Tokyo - each with publicTitle, publicLore, codedLabel, hiddenEcho, tone, oracleLine), `TRUST_LANES` (Signal, Mask, Pressure, Betrayal Risk, Repair Code), `TRUST_USE_CASES`, `CIRCLE_QUESTIONS` (9), `scoreCircle()` returning `{ status: Open|Watch|Boundary|Do Not Invite, risk, patterns, repair, oracleLine }`, `AGENTS` (8: Hood Oracle, Philly, Trust Signal, Infiltration Pattern, Privacy Sentinel, Archive Echo, Boundary Keeper, GTM Listicle), `LINKED_MODULES` (8 routes), `ROWHOME_STORY`, `ROWHOME_POCKET`.

### B.2 New pages + routes (added to `src/App.tsx`)
- `/cointelpro` → `CointelproLink.tsx` - integration hub: title card, three CTAs ("Run the Circle Test", "Match Energy Before You Open the Door", "Activate No-Dox Oracle Layer"), external link to c0intelprotocol.lovable.app, linked-modules list, agent grid, coded-labels + visibility-modes chips, privacy posture, safety footer.
- `/trust-signal` → `TrustSignal.tsx` - alias A / alias B / context inputs, renders the 5 lanes with hints, includes the "Betrayal Risk is not an accusation" disclaimer.
- `/circle-test` → `CircleTest.tsx` - 9 yes/no/unsure questions with sticky live result panel (status, risk patterns, repair code, Oracle line).
- `/echoes` → `MovementEchoes.tsx` - 12 echo cards. Hidden echo + tone rendered as redacted black bars by default; "Reveal Knowers' Layer" toggle (also via `?layer=knowers`) unredacts.

### B.3 Updates to existing files
- `src/lib/oracle.ts`: soften Philly variant `loreLine` to "She does not announce her lineage. The smoke already knows her name." (no MOVE in public copy).
- `src/lib/content.ts`: add Rowhome AGENTtv preset (bucket "The Faceless Oracle", short-story format, beats from spec, CTA "Run the Circle Test. Match energy before you open the door.").
- `src/pages/HoodOracleFiles.tsx`: add Philly section anchor `#philly` with the full Daughter of the Rowhome Fire story, redacted file box (`ROOT MEMORY: FAMILY UNDER FIRE / VISIBILITY: KNOWERS' LAYER / ACCESS: EARNED TRUST ONLY`), and `<CardStack>` of `ROWHOME_POCKET`.
- `src/components/AppShell.tsx`: add **COINTELPRO** to primary nav (red chip styling) + Trust Signal, Circle Test, Echoes, Knowers' Layer to MORE menu.
- `src/pages/Dashboard.tsx`: add "Run the Circle Test" button to the Distribute panel.

## C. NEURO META X demo seed

### C.1 New library `src/lib/demoSeed.ts`
Single exported constant `DEMO_PROFILE` containing only the symbolic public layer (alias `N3UR0 META X`, archetype `RED-VEIL-11 // SPIRAL-34 // EARTH-SIGNAL`, sun Virgo, element Earth, modality Mutable, polarity Feminine/Receptive, life path 11/2, birth day 8, patch-life "The Red Veil Systems Oracle", akashic "The Red Ledger of the Systems Oracle", fibonacci `SPIRAL-34` with 61.8/38.2 split, signal-match table, circle-test demo result). **No raw birth date, time, or city is stored or rendered.** A short `DEMO_NOTICE` banner is rendered wherever the seed is used: "Private seed data used internally. Raw birth data is never displayed."

### C.2 New page `/demo` → `DemoProfile.tsx`
Full seeded read-out using the existing LensCard / SpiralMedallion / CardStack components:
- Header chips: `NO DOX ORACLE ACTIVE`, `RED-VEIL-11`, `SPIRAL-34`, `EARTH-SIGNAL`.
- Hood Oracle line: "You were not born to follow the pattern. You were born to catch it, name it, and rebuild the room around it."
- Five lens cards (Astrology, Numerology, Akashic, Fibonacci AI, Patch-Life) using copy from sections 3-7.
- Energy ID hologram block + privacy flags chips (`no_kyc`, `no_legal_name`, `no_biometrics`, `no_palm_scan`, `alias_ready`).
- SignalMatch table (Spark/Mirror/Friction/Mission/Repair).
- Circle Test demo card (Status: Boundary, patterns, repair code, oracle line).
- "Run on AGENTtv" + "Open Pocket Stack" + "Open UGC Forge" CTAs that pre-seed the next page.

### C.3 Pre-seed surfaces with the demo bundle
- `src/pages/AgentTvStudio.tsx`: add quick-pick "THE FACELESS ORACLE READS THE SYSTEMS VIRGO" preset (hook, VO, scene direction, CTA from section 13).
- `src/pages/PocketCards.tsx`: add `RED-VEIL-11 // SPIRAL-34` preset stack (7 cards from section 14).
- `src/pages/UgcForge.tsx`: add demo seed button that fills hook, VO, on-screen text, caption, hashtags, CTA from section 15. Hashtags use `#N3UR0METAX`.
- `src/pages/Landing.tsx`: add a single "View N3UR0 META X demo profile" link below the primary CTA so the demo is discoverable without polluting the main flow.

### C.4 Optional 3D hologram modules - deferred
The brief lists rotating zodiac sphere, numerology cube, akashic tablet, fibonacci spiral, patch-life scroll. Out of scope for this pass to keep the build lean. Will be added later via `@react-three/fiber@^8.18` + `@react-three/drei@^9.122.0` + `three@>=0.133` if approved.

## D. Safety posture (enforced everywhere)

Every COINTELPRO page and the demo page render `SAFETY_FOOTER`:
> "This system is for symbolic reflection, privacy education, group-boundary awareness, and historical/lore-based storytelling. It does not identify informants, accuse real people, encourage harassment, or promote violence."

Plus inline disclaimers:
- Trust Signal: "Betrayal Risk is not an accusation. It is a symbolic pattern warning based on stated behavior, boundaries, and energy mismatch."
- Circle Test header: "No accusations. No threats. No targeting. Just the pattern, named."
- Demo profile: "Symbolic reflection only. Not scientific prediction. Not literal past-life verification."
- No KYC, no biometrics, no palm scans, no legal name, no forced wallet connection - shown as chips on hub + demo pages.
- No literal "snitches get stitches"; reframed as "Those who know, know. The signal recognizes the signal."

## Out of scope this pass
- Real auth handoff to the COINTELPRO app (just an external link).
- Persisting Trust Signal / Circle Test results to the Memory Layer.
- 3D hologram modules (deferred to a follow-up).
