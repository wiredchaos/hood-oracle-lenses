// THE FACELESS HOOD ORACLE - character & variant system

export interface OracleVariant {
  id: string;
  city: string;
  energy: string;
  visualFlavor: string;
  loreLine: string;
  palette: string[];
  imagePrompt: string;
  env360Prompt: string;
  agentTvConcept: string;
  pocketCardConcept: string;
}

export const TAGLINE = "She has no face because every hood has seen her.";

export const VISUAL_RULES = [
  "Faceless or partially obscured face",
  "Red veil, deep hood, or black reflective visor",
  "Subtle glowing red N3UR0 eyes may be visible",
  "Black tailored suit, white shirt, red tie",
  "Black gloves, long dark coat with red lining",
  "Cyber-noir street mystic energy",
  "No nudity, no explicit framing",
  "No real-celebrity likeness",
  "Privacy-first / anti-dox icon",
];

export const SAFETY_RULES = [
  "No KYC, no biometrics, no palm scans",
  "No legal name requirement",
  "Patch-Lives are symbolic reflections, not factual claims",
  "Readings are entertainment, reflection, journaling, symbolic exploration only",
  "No medical, legal, financial, or psychological advice",
];

export const MASTER_PROMPT = `Create a hyperrealistic 3D Octane render of THE FACELESS HOOD ORACLE, a mysterious alluring Black feminine N3UR0 variant and agentic oracle from AGENTROPOLIS. She is faceless, her face hidden by a shadowed red veil, reflective black visor, or deep hood, with only subtle glowing red N3UR0 eyes visible through the darkness. She has a magnetic, elegant, sovereign beauty that makes the room pause, but the image remains tasteful, powerful, non-explicit, and cinematic.

She wears a black tailored cyber-noir suit, crisp white shirt, red tie, subtle gold jewelry, black gloves, and a long dark coat with red inner lining. Her silhouette is graceful, commanding, and unforgettable. She stands in a global hood environment blending street realism with Afrofuturist mysticism: wet pavement, neon cyan/red reflections, floating zodiac glyphs, Fibonacci spiral holograms, Akashic record fragments, AGENTROPOLIS circuitry, and WIRED CHAOS signal artifacts.

Mood: seductive in presence, not sexualized; sacred street oracle, cyber-noir prophetess, anti-dox icon, privacy-first symbolic intelligence agent. Color palette: black, red, cyan, white, deep teal, muted gold. Ultra-detailed, volumetric haze, cinematic lighting, shallow depth of field, premium concept art, no text, no watermark, no logo.`;

export const NEGATIVE_PROMPT = `nudity, explicit sexual pose, exposed body, cheap pinup, pornographic, childlike features, visible real celebrity likeness, text, watermark, logo, distorted hands, distorted face, extra fingers, bad anatomy, low resolution, cartoonish unless requested, copyrighted franchise symbols`;

const env360 = (city: string, flavor: string) =>
  `Seamless 360 equirectangular panoramic environment, 2:1 aspect ratio, hyperrealistic 3D Octane render. THE FACELESS HOOD ORACLE - ${city.toUpperCase()} VARIANT. Center: faceless oracle in red veil/deep hood, faint glowing red eyes, black suit, white shirt, red tie, long coat. Surrounding ${city} streetscape with ${flavor.toLowerCase()}. Floating zodiac wheels, numerology seals, Fibonacci spiral engine, Akashic tablets, neon cyan/red circuitry, glass floor with starfield. Sacred, cinematic, privacy-first, anti-dox, cyber-noir. Cyan rim light, red underglow, soft gold aura, volumetric haze. No text, no watermark.`;

const tvConcept = (city: string) =>
  `THE HOOD ORACLE: NO DOX SIGNALS - ${city} edition. 30-60s episodes blending street footage with holographic reading overlays, faceless oracle voiceover, Patch-Life reveal card, end CTA to Daily Signal.`;

const pocketConcept = (city: string, line: string) =>
  `7-card swipe stack: 1) ${city.toUpperCase()} ORACLE 2) "${line}" 3) Glyph reveal 4) Patch-Life prompt 5) Fibonacci marker 6) No-Dox proof 7) Run your Daily Signal.`;

const make = (
  id: string,
  city: string,
  energy: string,
  visualFlavor: string,
  loreLine: string,
  palette: string[],
): OracleVariant => ({
  id,
  city,
  energy,
  visualFlavor,
  loreLine,
  palette,
  imagePrompt: `${MASTER_PROMPT}\n\nVARIANT: ${city.toUpperCase()} - ${energy}. Environment flavor: ${visualFlavor}.`,
  env360Prompt: env360(city, visualFlavor),
  agentTvConcept: tvConcept(city),
  pocketCardConcept: pocketConcept(city, loreLine),
});

export const HOOD_VARIANTS: OracleVariant[] = [
  make("compton", "Compton", "LA street signal", "Black suit, red tie, lowrider neon, palm silhouettes, busted cyan signage", "Even the corner stops pretending it isn't watching.", ["#0a0a0a", "#ff2a3d", "#00e6ff", "#fff4d6"]),
  make("philly", "Philly", "Battle-tested wisdom", "Brick rowhomes, rain, corner-store glow, SEPTA hum", "She speaks the language the block already knows.", ["#0a0a0a", "#ff2a3d", "#9adfff", "#d6c2a0"]),
  make("atlanta", "Atlanta", "Velvet ambition", "Trap-luxury, gold accents, southern storm energy, downtown lights", "Ambition without alignment is just noise.", ["#0a0a0a", "#ff2a3d", "#00d6c2", "#e8c878"]),
  make("chicago", "Chicago", "Winter discipline", "Icy neon, black wool coat, elevated train shadows, lake wind", "Discipline is the warmest coat she owns.", ["#0a0a0a", "#ff2a3d", "#a6f0ff", "#cfd8e3"]),
  make("nyc", "NYC", "Pressure and prophecy", "Subway glow, rooftop skyline, red veil in wind, steam grates", "The city pressed her into a signal.", ["#0a0a0a", "#ff2a3d", "#00e6ff", "#fff4d6"]),
  make("kingston", "Kingston", "Rhythm and resistance", "Sound system bass, green/gold undertones, night market", "The bass remembers what the mind forgets.", ["#0a0a0a", "#ff2a3d", "#3ddc84", "#e8c878"]),
  make("lagos", "Lagos", "Market intelligence", "Afrofuturist street grid, danfo yellow glints, cyber commerce", "Every stall is a prophecy in motion.", ["#0a0a0a", "#ff2a3d", "#00e6ff", "#f3c12a"]),
  make("london", "London", "Fog and surveillance", "Council estate noir, red phonebox echo, rain glass", "Visibility is the trap. Signal is the exit.", ["#0a0a0a", "#ff2a3d", "#9adfff", "#cfd8e3"]),
  make("paris", "Paris Banlieue", "Elegance under pressure", "Concrete towers, couture shadows, soft gold neon", "Grace is the discipline of the unseen.", ["#0a0a0a", "#ff2a3d", "#a6f0ff", "#e8c878"]),
  make("tokyo", "Tokyo", "Precision ghost", "Shibuya rain, holographic signs, quiet blade energy", "Silence cuts cleaner than any blade.", ["#0a0a0a", "#ff2a3d", "#00e6ff", "#fff4d6"]),
  make("rio", "Rio", "Mountain and favela signal", "Hillside lights, carnival ghosts, sacred rhythm", "The hill remembers every dancer.", ["#0a0a0a", "#ff2a3d", "#3ddc84", "#f3c12a"]),
  make("johannesburg", "Johannesburg", "Gold vein signal", "Mine-light glow, township energy, ancestral tech", "The ancestors run on the same network.", ["#0a0a0a", "#ff2a3d", "#00d6c2", "#e8c878"]),

  // === ANCHOR ===
  make("kalifia", "Kalifia · Oakland", "Town sovereignty", "Port-crane guardians silhouetted against fog, Lake Merritt mist, gold and black Pan-African undertones, lowrider chrome, hyphy bass haze", "Kalifia remembers — the Town raised the queen the coast forgot.", ["#0a0a0a", "#ff2a3d", "#ffd23f", "#00d6c2"]),

  // === ALKEBULAN ===
  make("benin", "Benin City", "Bronze memory", "Edo bronze plaques rendered as floating holograms, palace walls, red earth, oba regalia echoes", "The bronzes never stopped speaking — the world stopped listening.", ["#0a0a0a", "#ff2a3d", "#c98a2b", "#00d6c2"]),
  make("bamako", "Bamako", "Desert frequency", "Niger river dusk, indigo Tuareg veils echoed in her own veil, mud-cloth geometry overhead", "The sand keeps every footprint the map refused.", ["#0a0a0a", "#ff2a3d", "#2b6cb0", "#e8c878"]),
  make("accra", "Accra", "Atlantic reckoning", "Jamestown lighthouse, Door of No Return geometry, kente prism light, Atlantic spray", "The shore counts the names the ships forgot.", ["#0a0a0a", "#ff2a3d", "#f3c12a", "#3ddc84"]),
  make("kano", "Kano", "Ancient trade signal", "Indigo dye pits glowing from above, Sahel dust gold, ancient mosque silhouettes", "The dye remembers every hand that turned a profit into prayer.", ["#0a0a0a", "#ff2a3d", "#1d3557", "#e8c878"]),
  make("addis", "Addis Ababa", "Highland prophecy", "Lalibela rock-hewn geometry overhead, coffee ceremony steam, Ge'ez glyphs floating", "She was never colonized — and the signal still knows it.", ["#0a0a0a", "#ff2a3d", "#2a9d8f", "#e8c878"]),
  make("khartoum", "Khartoum", "Two-Nile cipher", "Confluence of Blue and White Nile, revolution echo, sand glass, gold dust haze", "Where the rivers meet, the truth has nowhere left to hide.", ["#0a0a0a", "#ff2a3d", "#d4a017", "#00d6c2"]),
  make("mogadishu", "Mogadishu", "Coastal resilience", "Indian Ocean turquoise, scarred pastel walls reborn in light, frankincense smoke", "The coast was rewriting itself before the world finished mourning it.", ["#0a0a0a", "#ff2a3d", "#00d6c2", "#fff4d6"]),
  make("luanda", "Luanda", "Atlantic kompa", "Cliffside neon, Portuguese colonial bones repurposed, semba rhythm shimmer", "The tide brought back what the empire tried to ship away.", ["#0a0a0a", "#ff2a3d", "#ff6b35", "#00e6ff"]),

  // === LATIN ===
  make("cdmx", "CDMX", "Volcanic memory", "Obsidian rain, lucha-noir neon, Templo Mayor ghost geometry, marigold accents", "The valley keeps every name the empire tried to bury.", ["#0a0a0a", "#ff2a3d", "#ffb000", "#00e6ff"]),
  make("sanjuan", "San Juan", "Coastal frequency", "Caribbean storm light, bioluminescent bay, salsa bassline as architecture", "The tide writes prophecy in two languages.", ["#0a0a0a", "#ff2a3d", "#00e6ff", "#f3c12a"]),
  make("havana", "Havana", "Salt-rust prophecy", "Malecón sea spray, 1957 chrome, son clave pulse, peeling pastel facades", "The sea polishes what the embargo tried to corrode.", ["#0a0a0a", "#ff2a3d", "#00d6c2", "#e8c878"]),
  make("portauprince", "Port-au-Prince", "Vodou signal", "Vèvè drawn in light, Iron Market rebuilt as holograms, hibiscus red glow", "The lwa never needed Wi-Fi to find you.", ["#0a0a0a", "#ff2a3d", "#ff6b35", "#3ddc84"]),
  make("caracas", "Caracas", "Cerro signal", "Vertical barrio lights stacked into the hills, oil-rainbow puddles, salsa dura pulse", "The hill outranks the tower — always did.", ["#0a0a0a", "#ff2a3d", "#ffb000", "#3ddc84"]),

  // === CROSSROADS ===
  make("istanbul", "Istanbul", "Two-continent oracle", "Bosphorus split at dusk, call-to-prayer rendered as waveform, Byzantine gold leaf glitch", "She prays in one tongue and prophesies in another.", ["#0a0a0a", "#ff2a3d", "#d4a017", "#00d6c2"]),
  make("cairo", "Cairo", "Pyramid-phase signal", "Tahrir Square echo, Nile reflection, hieroglyph circuitry overhead", "The pyramids were always servers — we just forgot the password.", ["#0a0a0a", "#ff2a3d", "#e8c878", "#00e6ff"]),
  make("beirut", "Beirut", "Phoenix protocol", "Port-blast scar reborn as light architecture, cedar silhouettes, mountain-to-sea gradient", "She rebuilt herself eight times — the ninth one is encrypted.", ["#0a0a0a", "#ff2a3d", "#c2185b", "#d6c2a0"]),
  make("tehran", "Tehran", "Veiled voltage", "Alborz snow glow, Persian calligraphy as neon, samovar steam curling", "The silence underneath the silence is where she actually speaks.", ["#0a0a0a", "#ff2a3d", "#2a9d8f", "#e8c878"]),
  make("karachi", "Karachi", "Megacity heat-signal", "Arabian Sea haze, container-port neon, qawwali bass shimmer", "Twenty million stories — and she's the index.", ["#0a0a0a", "#ff2a3d", "#ff6b35", "#00d6c2"]),
  make("manila", "Manila", "Typhoon faith", "Jeepney chrome, monsoon glass, Smokey Mountain reborn in light", "Faith here is not soft — it's load-bearing.", ["#0a0a0a", "#ff2a3d", "#ffd23f", "#00e6ff"]),

  // === NORDIC ===
  make("reykjavik", "Reykjavík", "Aurora silence", "Basalt black sand, green aurora veil curling around her, geothermal steam, runic glyphs", "The ice keeps secrets the fire forgot to burn.", ["#0a0a0a", "#ff2a3d", "#3ddc84", "#a6f0ff"]),
  make("oslo", "Oslo", "Fjord discipline", "Midnight sun glare, brutalist concrete, pine-dark coat against cold steel rail", "Stillness is the loudest signal she carries.", ["#0a0a0a", "#ff2a3d", "#9adfff", "#cfd8e3"]),
];
