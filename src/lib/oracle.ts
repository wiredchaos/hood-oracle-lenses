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
  "Subtle glowing red NEURO eyes may be visible",
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

export const MASTER_PROMPT = `Create a hyperrealistic 3D Octane render of THE FACELESS HOOD ORACLE, a mysterious alluring Black feminine NEURO variant and agentic oracle from AGENTROPOLIS. She is faceless, her face hidden by a shadowed red veil, reflective black visor, or deep hood, with only subtle glowing red NEURO eyes visible through the darkness. She has a magnetic, elegant, sovereign beauty that makes the room pause, but the image remains tasteful, powerful, non-explicit, and cinematic.

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
];
