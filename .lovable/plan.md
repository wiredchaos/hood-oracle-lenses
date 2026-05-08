## Problem (confirmed by code review)

`src/lib/lenses.ts → computeAstrology()` is producing wrong signs across the whole app. Three concrete bugs:

1. **Sun sign is shifted 9 positions.** `SIGNS` already starts at Capricorn (index 0), but the code does `SIGNS[(sunIdx + 9) % 12]`. The `+9` is a leftover offset.
   - Demo data `1991-08-13` returns **Taurus**. Correct answer: **Leo**.
2. **Sun cutoff table is wrong in 6 of 12 months.** Current `[20,19,20,20,21,21,22,23,23,23,22,21]` should be `[19,18,20,19,20,20,22,22,22,22,21,21]`. So even after fixing #1, dates near a cusp land on the wrong sign.
3. **Moon and Ascendant are pure pseudo-random** seeded from `y*31+m*17+d*7`. They have no astronomical basis. Ascendant additionally pretends to use time of birth via `Math.floor(tobNum/30)` which is meaningless — real rising sign needs sidereal time + latitude/longitude.

These three feed every astrology display in the app: `Dashboard`, `ShareCard`, `Compatibility`, `Akashic` recurrence themes, `Fibonacci` recurrence, plus any reading saved to memory.

## Fix strategy

Replace the homemade math with a real ephemeris. Use **`astronomy-engine`** (MIT, ~80KB, no native deps, fully deterministic, no API key). It gives us accurate Sun & Moon ecliptic longitude for any UTC instant, plus Local Sidereal Time → Ascendant when we have lat/lon.

### 1. New module `src/lib/astrology.ts`
Pure, unit-testable, replaces the broken bits of `lenses.ts`:

- `signFromLongitude(lonDeg) → SignInfo` (12 × 30° wedges starting at 0° Aries; returns `{name, glyph, element, modality, polarity, degreeInSign}`).
- `computeSun(dateUTC) → SignInfo` via `Astronomy.SunPosition`.
- `computeMoon(dateUTC) → SignInfo` via `Astronomy.GeoMoon` → ecliptic longitude.
- `computeAscendant(dateUTC, latDeg, lonDeg) → SignInfo` using standard formula `tan(Asc) = -cos(LST) / (sin(LST)cos(ε) + tan(lat)sin(ε))`, ε from `Astronomy.e_tilt`, LST from `Astronomy.SiderealTime`.
- Single source of truth for the SIGNS table (correct tropical zodiac order: Aries → Pisces).

### 2. Rewrite `computeAstrology()` in `src/lib/lenses.ts`
- Parse DOB + TOB into a UTC Date. If TOB missing → use **12:00 local** and flag `tobAssumed: true`; Sun stays accurate, Moon may be off by up to ~6° (≈half a day of motion) — disclose this.
- Sun: real calculation, always returned.
- Moon: real calculation. If `tobAssumed`, mark `moonApproximate: true`.
- Ascendant: only computed when we have **both** TOB and lat/lon. Otherwise return `null` and the UI shows "—" with a tooltip "Add exact birth time + city to compute".
- `houseFocus` / `planetaryFocus` strings: keep as symbolic prose but no longer dressed up as computed houses (rename to `themes`).

### 3. Birth location → lat/lon
`BirthData.birthCity` is a free-text string today. Add an optional geocode step:

- New helper `src/lib/geocode.ts` → calls **Open-Meteo geocoding** (`https://geocoding-api.open-meteo.com/v1/search`, free, keyless, CORS-enabled). Returns `{lat, lon, tz}`.
- In `Intake.tsx`, after the user enters a birth city, debounce-call the geocoder and store `birthLat`, `birthLon`, `birthTz` on `BirthData`. If multiple matches, show top 3 in a small dropdown.
- Backwards-compat: existing `BirthData` records without coords still work (Ascendant just shows "—").

### 4. Time zone handling
DOB+TOB the user enters is local to birth city. With `birthTz` we convert to UTC via `Intl.DateTimeFormat` offset lookup (or `date-fns-tz` if it's already in deps — check first; otherwise inline a small offset helper using `Intl`). Without `birthTz`, treat input as UTC and flag the reading as "approximate".

### 5. UI updates
- `Dashboard.tsx`: when `ascendant === null`, render Rising as `—` with a small "add birth time + city" link to `/intake`. When `moonApproximate`, append a faint "≈" badge next to Moon.
- `ShareCard.tsx`: same null-handling for Rising.
- `Compatibility.tsx`: keep Sun-only synthesis when either party lacks TOB/city; remove Moon/Rising influence in that case rather than fabricate it.
- `Akashic` & `Fibonacci` recurrence sources: drop the literal "X Rising" string when ascendant is null.

### 6. Demo seed
Update `DEMO_BIRTH` (Ari, 1991-08-13, 04:33, Brooklyn NY) with hard-coded `birthLat: 40.6782, birthLon: -73.9442, birthTz: "America/New_York"` so the demo flow shows a fully-populated, **correct** chart (Sun Leo, Moon ~real, Rising ~real) immediately.

### 7. Tests (`src/test/astrology.test.ts`)
Vitest cases pinning the fix:
- 1991-08-13 → Sun = Leo (regression for the +9 offset bug).
- Each cusp date in the corrected cutoff table returns the expected sign on both sides.
- A known chart (e.g. 2000-01-01 12:00 UTC, lat 0, lon 0) matches values from a reference source within 1°.
- `computeAscendant` returns null when lat/lon missing.

### 8. Cleanup
- Delete `SUN_CUTOFFS`, the local `SIGNS` array, and the random-seed Moon/Asc code from `lenses.ts`.
- `lenses.ts` re-exports types from `astrology.ts` so existing imports keep working.
- Update `.lovable/plan.md` to record the migration so future passes don't reintroduce the pseudo-random version.

## Out of scope
- Houses (Placidus/Whole-Sign) — not currently surfaced numerically; can be added later once Ascendant is solid.
- Aspects, transits, progressions.
- Sidereal/Vedic zodiac (current app is tropical).
- Numerology, Akashic, Fibonacci, Tarot — math there is fine; only the strings that quote astrology fields get adjusted.

## Acceptance
- Ari demo: Dashboard shows **Leo Sun**, real Moon sign, real Rising.
- A user entering DOB only (no time, no city) gets correct Sun, an "≈" Moon, and "—" Rising with a CTA to fill in details.
- A user entering DOB + TOB + city gets all three computed from a real ephemeris and matches free public chart calculators within 1°.
- No occurrence of `(sunIdx + 9) % 12` or random-seeded sign assignment remains in the codebase.
- New tests pass.
