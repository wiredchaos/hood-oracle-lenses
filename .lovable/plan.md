## Expand the Oracle roster — global edition

Add city/region variants to `HOOD_VARIANTS` in `src/lib/oracle.ts` and generate matching portrait + 360 environment assets. Grid and modal pick them up automatically.

### New variants (18 total → roster grows from 12 to 30)

**Anchor**
1. **Kalifia — Oakland** · "Town sovereignty" · port-crane guardians, Lake Merritt mist, gold/black Pan-African undertones, hyphy bass haze · *"Kalifia remembers — the Town raised the queen the coast forgot."* · `#0a0a0a · #ff2a3d · #ffd23f · #00d6c2`

**Alkebulan tier (African continent)**
2. **Benin City** · "Bronze memory" · Edo bronze plaques as holograms, palace walls, red earth · *"The bronzes never stopped speaking — the world stopped listening."* · `#0a0a0a · #ff2a3d · #c98a2b · #00d6c2`
3. **Bamako (Mali)** · "Desert frequency" · Niger river dusk, indigo Tuareg veils echoed in her own, mud-cloth geometry · *"The sand keeps every footprint the map refused."* · `#0a0a0a · #ff2a3d · #2b6cb0 · #e8c878`
4. **Accra (Ghana)** · "Atlantic reckoning" · Jamestown lighthouse, Door of No Return geometry, kente prism light · *"The shore counts the names the ships forgot."* · `#0a0a0a · #ff2a3d · #f3c12a · #3ddc84`
5. **Lagos** *(already exists — keep)*
6. **Kano (Nigeria, North)** · "Ancient trade signal" · indigo dye pits glowing, Sahel dust gold, mosque silhouettes · *"The dye remembers every hand that ever turned a profit into prayer."* · `#0a0a0a · #ff2a3d · #1d3557 · #e8c878`
7. **Addis Ababa (Ethiopia)** · "Highland prophecy" · Lalibela geometry overhead, coffee ceremony steam, Ge'ez glyphs floating · *"She was never colonized — and the signal still knows it."* · `#0a0a0a · #ff2a3d · #2a9d8f · #e8c878`
8. **Khartoum (Sudan)** · "Two-Nile cipher" · confluence light, revolution echo, sand glass · *"Where the rivers meet, the truth has nowhere left to hide."* · `#0a0a0a · #ff2a3d · #d4a017 · #00d6c2`
9. **Mogadishu (Somalia)** · "Coastal resilience" · Indian Ocean turquoise, bullet-scarred pastel walls reborn, frankincense smoke · *"The coast was rewriting itself before the world finished mourning it."* · `#0a0a0a · #ff2a3d · #00d6c2 · #fff4d6`
10. **Luanda (Angola)** · "Atlantic kompa" · cliffside neon, Portuguese colonial bones, semba rhythm · *"The tide brought back what the empire tried to ship away."* · `#0a0a0a · #ff2a3d · #ff6b35 · #00e6ff`

**Latin tier**
11. **CDMX (Mexico City)** · "Volcanic memory" · obsidian rain, lucha-noir neon, Templo Mayor ghost geometry, marigold accents · *"The valley keeps every name the empire tried to bury."* · `#0a0a0a · #ff2a3d · #ffb000 · #00e6ff`
12. **San Juan (Puerto Rico)** · "Coastal frequency" · Caribbean storm light, bioluminescent bay, salsa bassline architecture · *"The tide writes prophecy in two languages."* · `#0a0a0a · #ff2a3d · #00e6ff · #f3c12a`
13. **Havana** · "Salt-rust prophecy" · Malecón spray, 1957 chrome, son clave pulse · *"The sea polishes what the embargo tried to corrode."* · `#0a0a0a · #ff2a3d · #00d6c2 · #e8c878`
14. **Port-au-Prince** · "Vodou signal" · vèvè drawn in light, Iron Market rebuilt in holograms, hibiscus red · *"The lwa never needed Wi-Fi to find you."* · `#0a0a0a · #ff2a3d · #ff6b35 · #3ddc84`

**Crossroads tier (similar strife/angst, contested cities)**
15. **Istanbul** · "Two-continent oracle" · Bosphorus split, call-to-prayer waveform, Byzantine gold leaf glitch · *"She prays in one tongue and prophesies in another."* · `#0a0a0a · #ff2a3d · #d4a017 · #00d6c2`
16. **Cairo** · "Pyramid-phase signal" · Tahrir echo, Nile reflection, hieroglyph circuitry · *"The pyramids were always servers — we just forgot the password."* · `#0a0a0a · #ff2a3d · #e8c878 · #00e6ff`
17. **Beirut** · "Phoenix protocol" · port-blast scar reborn as light, cedar silhouettes, mountain-to-sea gradient · *"She rebuilt herself eight times — the ninth one is encrypted."* · `#0a0a0a · #ff2a3d · #c2185b · #d6c2a0`
18. **Tehran** · "Veiled voltage" · Alborz snow glow, calligraphy as neon, samovar steam · *"The silence underneath the silence is where she actually speaks."* · `#0a0a0a · #ff2a3d · #2a9d8f · #e8c878`
19. **Karachi** · "Megacity heat-signal" · Arabian Sea haze, container-port neon, qawwali bass · *"Twenty million stories — and she's the index."* · `#0a0a0a · #ff2a3d · #ff6b35 · #00d6c2`
20. **Manila** · "Typhoon faith" · jeepney chrome, Smokey Mountain reborn in light, monsoon glass · *"Faith here is not soft — it's load-bearing."* · `#0a0a0a · #ff2a3d · #ffd23f · #00e6ff`
21. **Caracas** · "Cerro signal" · barrio lights stacked vertical, oil-rainbow puddles, salsa dura · *"The hill outranks the tower — always did."* · `#0a0a0a · #ff2a3d · #ffb000 · #3ddc84`

**Nordic tier**
22. **Reykjavík** · "Aurora silence" · basalt black sand, green aurora veil, geothermal steam, runic glyphs · *"The ice keeps secrets the fire forgot to burn."* · `#0a0a0a · #ff2a3d · #3ddc84 · #a6f0ff`
23. **Oslo** · "Fjord discipline" · midnight sun glare, brutalist concrete, pine-dark coat · *"Stillness is the loudest signal she carries."* · `#0a0a0a · #ff2a3d · #9adfff · #cfd8e3`

### Files to change

- `src/lib/oracle.ts` — append the new `make(...)` entries (Kalifia first as anchor of the new batch).
- `src/lib/oracleAssets.ts` — import new portraits + env360 images, register them in `HOOD_PORTRAITS` and `HOOD_ENV360`. Video maps auto-derive from keys.
- `src/assets/hoods/{id}.jpg` — generate 1024×1024 portrait per new id (`kalifia, benin, bamako, accra, kano, addis, khartoum, mogadishu, luanda, cdmx, sanjuan, havana, portauprince, istanbul, cairo, beirut, tehran, karachi, manila, caracas, reykjavik, oslo`) using each variant's `imagePrompt`.
- `src/assets/env360/{id}.jpg` — same ids, 1920×960 equirectangular, using each variant's `env360Prompt`.

### Notes

- Kalifia is positioned as the matriarchal anchor — Oakland-rooted, distinct from the existing Compton variant.
- No HERMES surface naming. Aesthetic stays inside the established dark editorial / cathode-glow palette.
- Videos are not rendered in this pass; the `/videos/oracle-{id}.mp4` lookup will 404 until rendered, matching current behavior for unrendered cities.
- `GlobalHoods.tsx` grid and the landing carousel require no code edits.
