// AKASHIC LENSES - Lens engines (deterministic mock + symbolic generators)
// Pure functions; safe to call in render or effects.

export type LensIntensity = "Grounded" | "Mystic" | "Full Akashic" | "Hood Oracle Unfiltered";

export interface BirthData {
  name: string;
  fullBirthName?: string;
  dob: string; // ISO yyyy-mm-dd
  tob?: string; // HH:mm
  timeUnknown?: boolean;
  birthCity?: string;
  currentCity?: string;
  intensity: LensIntensity;
  lenses: string[];
}

/* ---------- NUMEROLOGY (Pythagorean, deterministic) ---------- */

const PYTH: Record<string, number> = {
  a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,
  j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,
  s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8,
};
const VOWELS = new Set(["a","e","i","o","u"]);

const reduce = (n: number): number => {
  if (n === 11 || n === 22 || n === 33) return n;
  while (n > 9) {
    n = n.toString().split("").reduce((s, d) => s + parseInt(d, 10), 0);
    if (n === 11 || n === 22 || n === 33) return n;
  }
  return n;
};

const sumDigits = (s: string) =>
  s.replace(/\D/g, "").split("").reduce((a, c) => a + parseInt(c, 10), 0);

const letterSum = (name: string, filter?: (c: string) => boolean) =>
  name.toLowerCase().replace(/[^a-z]/g, "").split("")
    .filter(c => (filter ? filter(c) : true))
    .reduce((s, c) => s + (PYTH[c] || 0), 0);

export interface NumerologyResult {
  lifePath: number;
  destiny: number;
  soulUrge: number;
  personality: number;
  birthday: number;
  personalYear: number;
  workings: { label: string; detail: string }[];
}

export function computeNumerology(dob: string, fullName: string): NumerologyResult {
  const [y, m, d] = dob.split("-").map(Number);
  const lifePath = reduce(sumDigits(dob));
  const destiny = reduce(letterSum(fullName));
  const soulUrge = reduce(letterSum(fullName, c => VOWELS.has(c)));
  const personality = reduce(letterSum(fullName, c => !VOWELS.has(c)));
  const birthday = reduce(d);
  const now = new Date();
  const py = reduce(sumDigits(`${now.getFullYear()}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`));

  return {
    lifePath, destiny, soulUrge, personality, birthday, personalYear: py,
    workings: [
      { label: "Life Path", detail: `Reduce all digits of DOB ${dob} → ${lifePath}` },
      { label: "Destiny / Expression", detail: `Sum of all letters in "${fullName}" → ${destiny}` },
      { label: "Soul Urge", detail: `Sum of vowels in name → ${soulUrge}` },
      { label: "Personality", detail: `Sum of consonants in name → ${personality}` },
      { label: "Birthday", detail: `Day of birth (${d}) reduced → ${birthday}` },
      { label: "Personal Year", detail: `Birth month/day + current year (${now.getFullYear()}) → ${py}` },
    ],
  };
}

export const NUMBER_MEANINGS: Record<number, { title: string; gist: string }> = {
  1: { title: "The Initiator", gist: "Sovereign signal. Begin, lead, choose." },
  2: { title: "The Bridge", gist: "Diplomacy, partnership, attunement." },
  3: { title: "The Broadcaster", gist: "Voice, art, joyful expression." },
  4: { title: "The Builder", gist: "Foundations, discipline, craft." },
  5: { title: "The Shifter", gist: "Movement, freedom, recalibration." },
  6: { title: "The Caretaker", gist: "Love, service, harmonic responsibility." },
  7: { title: "The Mystic", gist: "Inner study, pattern, solitude." },
  8: { title: "The Architect", gist: "Power, money systems, manifest scale." },
  9: { title: "The Closer", gist: "Completion, compassion, release." },
  11: { title: "The Channel", gist: "Master frequency. Inspire, transmit." },
  22: { title: "The Master Builder", gist: "Vision into structure, world-scale." },
  33: { title: "The Master Teacher", gist: "Devotional service, healing voice." },
};

/* ---------- ASTROLOGY (mock approximations) ---------- */

const SIGNS = [
  { name: "Capricorn", glyph: "♑", element: "Earth", modality: "Cardinal", polarity: "Yin" },
  { name: "Aquarius", glyph: "♒", element: "Air",   modality: "Fixed",    polarity: "Yang" },
  { name: "Pisces",   glyph: "♓", element: "Water", modality: "Mutable",  polarity: "Yin" },
  { name: "Aries",    glyph: "♈", element: "Fire",  modality: "Cardinal", polarity: "Yang" },
  { name: "Taurus",   glyph: "♉", element: "Earth", modality: "Fixed",    polarity: "Yin" },
  { name: "Gemini",   glyph: "♊", element: "Air",   modality: "Mutable",  polarity: "Yang" },
  { name: "Cancer",   glyph: "♋", element: "Water", modality: "Cardinal", polarity: "Yin" },
  { name: "Leo",      glyph: "♌", element: "Fire",  modality: "Fixed",    polarity: "Yang" },
  { name: "Virgo",    glyph: "♍", element: "Earth", modality: "Mutable",  polarity: "Yin" },
  { name: "Libra",    glyph: "♎", element: "Air",   modality: "Cardinal", polarity: "Yang" },
  { name: "Scorpio",  glyph: "♏", element: "Water", modality: "Fixed",    polarity: "Yin" },
  { name: "Sagittarius", glyph: "♐", element: "Fire", modality: "Mutable", polarity: "Yang" },
];
// Sun-sign approx by month/day cutoff (~22nd of each month)
const SUN_CUTOFFS = [20,19,20,20,21,21,22,23,23,23,22,21]; // last day of prev sign per month

export interface AstrologyResult {
  sun: typeof SIGNS[number];
  moon: typeof SIGNS[number];
  ascendant: typeof SIGNS[number];
  element: string;
  modality: string;
  polarity: string;
  houseFocus: string[];
  planetaryFocus: string[];
  approximated: boolean;
}

export function computeAstrology(birth: BirthData): AstrologyResult {
  const [y, m, d] = birth.dob.split("-").map(Number);
  const sunIdx = (d <= SUN_CUTOFFS[m - 1]) ? (m - 1) : (m % 12);
  const sun = SIGNS[(sunIdx + 9) % 12]; // align to Cap=0 list above

  // deterministic pseudo seeds
  const seed = (y * 31 + m * 17 + d * 7);
  const moon = SIGNS[(seed) % 12];
  const tobNum = birth.tob ? parseInt(birth.tob.replace(":", ""), 10) : 600;
  const asc = SIGNS[(seed + Math.floor(tobNum / 30)) % 12];

  const houseFocus = [
    "10th House - public signal & vocation",
    "4th House - roots, lineage, ancestral memory",
    "11th House - networks, futures, swarm alignment",
  ];
  const planetaryFocus = ["Saturn - discipline ledger", "Mercury - pattern translation", "Venus - value field"];

  return {
    sun, moon, ascendant: asc,
    element: sun.element, modality: sun.modality, polarity: sun.polarity,
    houseFocus, planetaryFocus,
    approximated: true,
  };
}

/* ---------- AKASHIC LENS ---------- */

const ARCHETYPES = [
  "The Lantern Carrier", "The Threshold Walker", "The Codebreaker", "The Hearthkeeper",
  "The Storm Translator", "The Mirror Smith", "The Garden Hacker", "The Signal Priest",
  "The River Mapper", "The Quiet Architect", "The Echo Weaver", "The Spiral Witness",
];

export interface AkashicResult {
  archetype: string;
  soulFragment: string;
  ancestralEcho: string;
  patternToRelease: string;
  giftToIntegrate: string;
  shadowLoop: string;
  practice: string;
  loreNote: string;
}

export function computeAkashic(birth: BirthData, num: NumerologyResult): AkashicResult {
  const seed = (num.lifePath * 13 + num.soulUrge * 7 + num.destiny * 5);
  const arc = ARCHETYPES[seed % ARCHETYPES.length];
  return {
    archetype: arc,
    soulFragment: `A symbolic imprint of ${arc.toLowerCase()} threads through your field - a reflective signal of someone who learned to translate noise into navigable pattern.`,
    ancestralEcho: "There is a lineage memory of carrying responsibility quietly. Honor the strength; refuse the silence that came with it.",
    patternToRelease: "Performing competence to feel safe. Your worth is not a deliverable.",
    giftToIntegrate: "Calm authority during other people's chaos. Your nervous system is a tuning fork others borrow.",
    shadowLoop: "Over-scanning for threat → over-functioning → quiet resentment → withdrawal → repeat.",
    practice: "Daily 5-minute 'signal check': name one input you'll act on, one you'll archive, one you'll ignore.",
    loreNote: "THE HOOD ORACLE notes: Pattern is not prison. Signal is not sentence. You are allowed to update the protocol.",
  };
}

/* ---------- FIBONACCI AI ---------- */

const FIB = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

export interface FibonacciAIResult {
  age: number;
  cycleMarker: number;
  nextMarker: number;
  spiralPhase: "Seed" | "Root" | "Sprout" | "Bloom" | "Harvest" | "Composting" | "Re-seeding";
  goldenRatio: { expansion: number; contraction: number };
  recurrence: { theme: string; sources: string[] }[];
  integrationPrompt: string;
  journalPrompt: string;
}

export function computeFibonacciAI(birth: BirthData, num: NumerologyResult, astro: AstrologyResult): FibonacciAIResult {
  const [y, m, d] = birth.dob.split("-").map(Number);
  const now = new Date();
  let age = now.getFullYear() - y;
  if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age -= 1;

  let cycleMarker = FIB[0], nextMarker = FIB[1];
  for (let i = 0; i < FIB.length - 1; i++) {
    if (age >= FIB[i] && age < FIB[i + 1]) { cycleMarker = FIB[i]; nextMarker = FIB[i + 1]; break; }
  }
  const span = nextMarker - cycleMarker;
  const into = age - cycleMarker;
  const ratio = span > 0 ? into / span : 0;
  const expansion = Math.round((1 - Math.abs(ratio - 0.618)) * 100);
  const contraction = 100 - expansion;

  const phases: FibonacciAIResult["spiralPhase"][] = ["Seed","Root","Sprout","Bloom","Harvest","Composting","Re-seeding"];
  const phaseIdx = Math.min(phases.length - 1, Math.floor(ratio * phases.length));

  const recurrence = [
    { theme: `${num.lifePath}-coded responsibility`, sources: ["Life Path", "Personal Year", astro.sun.name + " Sun"] },
    { theme: "Bridge / translator function",         sources: ["Soul Urge", "Mercury focus", "Akashic archetype"] },
    { theme: "Quiet authority under load",            sources: ["Destiny", astro.ascendant.name + " Rising", "Saturn focus"] },
  ];

  return {
    age,
    cycleMarker,
    nextMarker,
    spiralPhase: phases[phaseIdx],
    goldenRatio: { expansion, contraction },
    recurrence,
    integrationPrompt: `You're ${into} year(s) into your ${cycleMarker}→${nextMarker} arc. Don't rush the spiral; finish the loop you're inside of.`,
    journalPrompt: "Where in your life are you building at Fibonacci scale (slow, compounding) vs. linear (fast, fragile)? Name one of each.",
  };
}

/* ---------- TAROT / CHAKRA ---------- */

const TAROT = [
  { card: "The Star", chakra: "Throat", meaning: "Restored signal. Speak the cleaner version." },
  { card: "The Hermit", chakra: "Third Eye", meaning: "Solo lap of the spiral. Carry your own lantern." },
  { card: "The Tower", chakra: "Root", meaning: "A structure that no longer fits is leaving on schedule." },
  { card: "The Empress", chakra: "Heart", meaning: "Tend the field; harvest will come from softness, not force." },
  { card: "The Magician", chakra: "Solar Plexus", meaning: "All five tools are on the table. Pick one and run it." },
  { card: "The High Priestess", chakra: "Sacral", meaning: "Listen below the words. The data is in the room." },
];

export interface TarotResult { card: string; chakra: string; meaning: string; }

export function computeTarot(num: NumerologyResult): TarotResult {
  return TAROT[(num.lifePath + num.personalYear) % TAROT.length];
}

/* ---------- READING ASSEMBLY ---------- */

export interface Reading {
  id: string;
  createdAt: string;
  birth: BirthData;
  numerology: NumerologyResult;
  astrology: AstrologyResult;
  akashic: AkashicResult;
  fibonacci: FibonacciAIResult;
  tarot: TarotResult;
}

export function generateReading(birth: BirthData): Reading {
  const num = computeNumerology(birth.dob, birth.fullBirthName || birth.name);
  const astro = computeAstrology(birth);
  const akashic = computeAkashic(birth, num);
  const fib = computeFibonacciAI(birth, num, astro);
  const tarot = computeTarot(num);
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    birth, numerology: num, astrology: astro, akashic, fibonacci: fib, tarot,
  };
}

/* ---------- DEMO DATA ---------- */

export const DEMO_BIRTH: BirthData = {
  name: "Ari",
  fullBirthName: "Ariel Solene Vega",
  dob: "1991-08-13",
  tob: "04:33",
  timeUnknown: false,
  birthCity: "Brooklyn, NY",
  currentCity: "Lisbon, PT",
  intensity: "Mystic",
  lenses: ["Astrology", "Numerology", "Akashic", "Fibonacci AI", "Tarot/Chakra"],
};
