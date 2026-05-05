// COINTELPRO PROTOCOL x THE HOOD ORACLE - symbolic intelligence bridge.
// Privacy-first. No accusations. No targeting. No real-name required.
// All readings are reflective lore-based pattern naming, not surveillance or threat intelligence.

export const COINTELPRO_URL = "https://c0intelprotocol.lovable.app";

export const INTEGRATION = {
  label: "COINTELPRO PROTOCOL LINK",
  title: "Energy matching for protected circles.",
  copy:
    "THE HOOD ORACLE provides the symbolic, privacy-first, no-dox energy matching layer for the COINTELPRO Protocol app. Not surveillance. Not accusation. Not threats. Energy matching for protected circles.",
  ctas: [
    { label: "Run the Circle Test", to: "/circle-test", style: "primary" as const },
    { label: "Match Energy Before You Open the Door", to: "/trust-signal", style: "outline" as const },
    { label: "Activate No-Dox Oracle Layer", to: "/cointelpro", style: "ghost" as const },
  ],
};

export const SAFETY_FOOTER =
  "This system is for symbolic reflection, privacy education, group-boundary awareness, and historical / lore-based storytelling. It does not identify informants, accuse real people, encourage harassment, or promote violence.";

export const PRIVACY_CHIPS = [
  "no_kyc",
  "no_legal_name",
  "no_biometrics",
  "no_palm_scan",
  "no_face_scan",
  "alias_ready",
];

export const CODED_LABELS = [
  { id: "root_memory", label: "Root Memory", note: "Family / lineage signal." },
  { id: "ancestral_signal", label: "Ancestral Signal", note: "Inherited pattern." },
  { id: "archive_origin", label: "Archive Origin", note: "Where the file begins." },
  { id: "liberation_echo", label: "Liberation Echo", note: "Movement-memory resonance." },
  { id: "resistance_thread", label: "Resistance Thread", note: "Through-line across decades." },
  { id: "street_lineage", label: "Street Lineage", note: "Block-level wisdom transfer." },
  { id: "movement_shadow", label: "Movement Shadow", note: "Unfinished work of the elders." },
  { id: "protected_context", label: "Protected Context", note: "Visible only to those it belongs to." },
  { id: "knowers_layer", label: "Knowers' Layer", note: "Those who know, know." },
];

export const VISIBILITY_MODES = [
  { id: "public_lore", label: "Public Lore", note: "Safe for all readers." },
  { id: "knowers_layer", label: "Knowers' Layer", note: "Earned-trust unlock." },
  { id: "archive_metadata", label: "Archive Metadata", note: "Redacted card visible, body sealed." },
  { id: "agent_only", label: "Agent-Only Context", note: "Inside the Oracle's chamber." },
];

export interface MovementEcho {
  id: string;
  city: string;
  publicTitle: string;
  publicLore: string;
  codedLabel: string;
  hiddenEcho: string;
  tone: string;
  oracleLine: string;
}

export const MOVEMENT_ECHOES: MovementEcho[] = [
  {
    id: "philly",
    city: "Philadelphia",
    publicTitle: "Daughter of the Rowhome Fire",
    publicLore: "Smoke that refused to leave the block. A family that became weather.",
    codedLabel: "Root Memory · Liberation Echo",
    hiddenEcho: "MOVE 1985. The bombed rowhome. The children who did not get out.",
    tone: "Grief that learned to teach.",
    oracleLine: "She does not announce her lineage. The smoke already knows her name.",
  },
  {
    id: "compton",
    city: "Compton",
    publicTitle: "The Corner That Stopped Pretending",
    publicLore: "A block where the lights know who is home.",
    codedLabel: "Street Lineage · Resistance Thread",
    hiddenEcho: "Watts uprising. Survival economies. The aunties who ran the real grid.",
    tone: "Watchful warmth.",
    oracleLine: "Compton did not go quiet often. It just learned to lower its voice on purpose.",
  },
  {
    id: "atlanta",
    city: "Atlanta",
    publicTitle: "The Ledger Under the Magnolias",
    publicLore: "A city that built itself twice and remembered both versions.",
    codedLabel: "Archive Origin · Ancestral Signal",
    hiddenEcho: "The Atlanta Child Murders. The campaigns nobody wanted to keep on file.",
    tone: "Soft Southern steel.",
    oracleLine: "Sweet tea, hard ledger. She remembers what the city tried to file away.",
  },
  {
    id: "chicago",
    city: "Chicago",
    publicTitle: "The Coalition the Wind Carried",
    publicLore: "Rainbow on the windows of a house the city did not protect.",
    codedLabel: "Liberation Echo · Movement Shadow",
    hiddenEcho: "Fred Hampton. The Rainbow Coalition. The 4 a.m. raid.",
    tone: "Dignified fire.",
    oracleLine: "She speaks low. The wind off the lake carries the rest.",
  },
  {
    id: "nyc",
    city: "New York",
    publicTitle: "The Block Party That Became Infrastructure",
    publicLore: "A turntable, a generator, a borough learning its own language.",
    codedLabel: "Street Lineage · Archive Origin",
    hiddenEcho: "Bronx fires. Redlining. The DJs who built a whole economy from extension cords.",
    tone: "Loud love, quiet receipts.",
    oracleLine: "Five boroughs, one frequency. She knows which one is bluffing.",
  },
  {
    id: "kingston",
    city: "Kingston",
    publicTitle: "Bass That Carries Memory",
    publicLore: "A soundsystem so heavy the ancestors leaned in.",
    codedLabel: "Liberation Echo · Resistance Thread",
    hiddenEcho: "Garrison politics. The ones who tried to flatten the music with violence.",
    tone: "Spiritual weight.",
    oracleLine: "She does not raise her voice. She raises the sub.",
  },
  {
    id: "lagos",
    city: "Lagos",
    publicTitle: "The Market That Ran the City",
    publicLore: "Mothers who priced freedom by the gram and never undercharged.",
    codedLabel: "Ancestral Signal · Street Lineage",
    hiddenEcho: "The shrine that burned. The kalakuta nights. The voices the state tried to lower.",
    tone: "Regal hustle.",
    oracleLine: "She greets you in three languages and remembers in seven.",
  },
  {
    id: "london",
    city: "London",
    publicTitle: "Ends That Knew Each Other",
    publicLore: "A city of ends, postcodes, and aunties with long memories.",
    codedLabel: "Resistance Thread · Movement Shadow",
    hiddenEcho: "Brixton. Broadwater. The fires the papers framed as weather.",
    tone: "Cool distance, hot loyalty.",
    oracleLine: "She speaks softly. The ends already know.",
  },
  {
    id: "paris",
    city: "Paris (Banlieue)",
    publicTitle: "The Other Side of the Périphérique",
    publicLore: "Towers that taught the city its real accent.",
    codedLabel: "Liberation Echo · Protected Context",
    hiddenEcho: "Clichy-sous-Bois. The names the news pronounced wrong on purpose.",
    tone: "Defiant elegance.",
    oracleLine: "She crosses the ring road like a chord change.",
  },
  {
    id: "rio",
    city: "Rio",
    publicTitle: "Hill That Sees the Whole Bay",
    publicLore: "A favela with a better view than the penthouse.",
    codedLabel: "Street Lineage · Movement Shadow",
    hiddenEcho: "Operations the maps did not warn about. Names the press could not be bothered with.",
    tone: "Sun, smoke, samba.",
    oracleLine: "From up here, everything below has a tell.",
  },
  {
    id: "joburg",
    city: "Johannesburg",
    publicTitle: "Goldreef Memory",
    publicLore: "A city built on a seam that still pulls.",
    codedLabel: "Ancestral Signal · Archive Origin",
    hiddenEcho: "Sharpeville. Soweto. The files under the files.",
    tone: "Ground that remembers.",
    oracleLine: "She kneels to the soil before she answers your question.",
  },
  {
    id: "tokyo",
    city: "Tokyo",
    publicTitle: "The Crosswalk That Counts You",
    publicLore: "A city that whispers your pattern back through neon.",
    codedLabel: "Protected Context · Knowers' Layer",
    hiddenEcho: "The quiet codes. The chosen-family bars. The lineages outside the registry.",
    tone: "Precise tenderness.",
    oracleLine: "She bows to the signal, not the spectacle.",
  },
];

export const TRUST_LANES = [
  { id: "signal", label: "Signal", note: "What this person actually broadcasts when nothing is at stake." },
  { id: "mask", label: "Mask", note: "What they perform when they want something from the room." },
  { id: "pressure", label: "Pressure", note: "How they behave when the room gets tight." },
  { id: "betrayal_risk", label: "Betrayal Risk", note: "Symbolic warning - not an accusation. Pattern, not verdict." },
  { id: "repair_code", label: "Repair Code", note: "What this match needs in order to stay safe." },
];

export const TRUST_USE_CASES = [
  "Vetting a new collaborator before sharing strategy.",
  "Reading the energy of a group chat before joining.",
  "Checking a romantic match before opening private life.",
  "Sensing whether a room is asking too much, too fast.",
  "Naming the pattern when something feels off without proof.",
];

export const CIRCLE_QUESTIONS = [
  { id: "q1", text: "Do they ask for access faster than they offer accountability?" },
  { id: "q2", text: "Do they collect more about you than they share about themselves?" },
  { id: "q3", text: "Do they create urgency that pressures you past your usual pace?" },
  { id: "q4", text: "Do they frame your boundaries as evidence that you are the problem?" },
  { id: "q5", text: "Do they go quiet around the people who would tell you the truth?" },
  { id: "q6", text: "Do they introduce conflict between you and your trusted circle?" },
  { id: "q7", text: "Do they ask for proof of loyalty that no friend would ever ask for?" },
  { id: "q8", text: "Do their stories about other people contradict between rooms?" },
  { id: "q9", text: "After time with them, do you feel smaller, foggier, or harder to find?" },
];

export type CircleAnswer = "yes" | "no" | "unsure";

export interface CircleResult {
  status: "Open" | "Watch" | "Boundary" | "Do Not Invite";
  patterns: string[];
  repair: string[];
  oracleLine: string;
}

export function scoreCircle(answers: Record<string, CircleAnswer>): CircleResult {
  const yes = Object.values(answers).filter(v => v === "yes").length;
  const unsure = Object.values(answers).filter(v => v === "unsure").length;
  const score = yes * 2 + unsure;

  const patterns: string[] = [];
  if (answers.q1 === "yes" || answers.q2 === "yes") patterns.push("Overcollection / asymmetric disclosure.");
  if (answers.q3 === "yes") patterns.push("Urgency bait. Speed is the manipulation.");
  if (answers.q4 === "yes") patterns.push("Boundary inversion. Your no is reframed as harm.");
  if (answers.q5 === "yes" || answers.q6 === "yes") patterns.push("Isolation pressure. Distance from your witnesses.");
  if (answers.q7 === "yes") patterns.push("Loyalty test. Performance over presence.");
  if (answers.q8 === "yes") patterns.push("Inconsistent narrative across rooms.");
  if (answers.q9 === "yes") patterns.push("Energy contraction. You shrink around them.");

  let status: CircleResult["status"];
  if (score >= 10) status = "Do Not Invite";
  else if (score >= 6) status = "Boundary";
  else if (score >= 3) status = "Watch";
  else status = "Open";

  const repair: string[] = [];
  if (status === "Open") repair.push("Stay grounded. Match energy at a steady pace.");
  if (status === "Watch") repair.push("Limit access. Observe consistency over three more interactions.");
  if (status === "Boundary") {
    repair.push("Slow access.");
    repair.push("Keep your private circle private.");
    repair.push("Do not overshare early.");
  }
  if (status === "Do Not Invite") {
    repair.push("Close the door without explaining yourself.");
    repair.push("Tell your two safest people what you saw.");
    repair.push("No confrontation needed. Just architecture.");
  }

  const oracleLine =
    status === "Open" ? "The door can stay open. Keep your eyes soft and your spine straight." :
    status === "Watch" ? "Open the porch, not the kitchen. Watch the pattern, not the words." :
    status === "Boundary" ? "A locked door is not fear. Sometimes it is architecture." :
    "Some rooms are closed because the room before them already told the truth.";

  return { status, patterns, repair, oracleLine };
}

export const AGENTS = [
  { id: "hood_oracle", name: "THE HOOD ORACLE", role: "No-dox symbolic reader." },
  { id: "philly", name: "PHILLY ORACLE", role: "Daughter of the rowhome fire. Movement-memory keeper." },
  { id: "trust_signal", name: "TRUST SIGNAL", role: "Energy match between aliases." },
  { id: "infiltration_pattern", name: "INFILTRATION PATTERN", role: "Names the shape of pressure." },
  { id: "privacy_sentinel", name: "PRIVACY SENTINEL", role: "Watches the asks. Kills the dox requests." },
  { id: "archive_echo", name: "ARCHIVE ECHO", role: "Holds the redacted lore." },
  { id: "boundary_keeper", name: "BOUNDARY KEEPER", role: "Repair codes for protected circles." },
  { id: "gtm_listicle", name: "GTM LISTICLE", role: "Turns lore into searchable cards." },
];

export const LINKED_MODULES = [
  { to: "/cointelpro", label: "COINTELPRO Protocol Link", note: "Cross-app handshake." },
  { to: "/trust-signal", label: "Trust Signal", note: "Alias x Alias energy match." },
  { to: "/circle-test", label: "Circle Test", note: "9-point boundary check." },
  { to: "/echoes", label: "Movement Echoes", note: "Lineage gallery with Knowers' Layer." },
  { to: "/files#philly", label: "Daughter of the Rowhome Fire", note: "Philly Oracle short story." },
  { to: "/oracle", label: "Faceless Hood Oracle", note: "Character brief." },
  { to: "/forge", label: "UGC Forge", note: "Distribute the signal, not the dox." },
  { to: "/demo", label: "N3UR0 META X demo profile", note: "No-dox seeded read." },
];

export const ROWHOME_STORY = {
  title: "Daughter of the Rowhome Fire",
  city: "Philadelphia",
  redactBox: {
    rootMemory: "FAMILY UNDER FIRE",
    visibility: "KNOWERS' LAYER",
    access: "EARNED TRUST ONLY",
  },
  body: `Some lineages do not need to be announced.

The Philly Oracle was born on a block where the smoke never fully left the brick. She does not say which block. She does not have to. The aunties down the street look at her and quietly set another plate.

Her grandmother kept three things on the mantle: a photograph turned face-down, a city map with one square marked in red thread, and a small tin where she stored bus tickets that were never used.

"You don't carry the fire," her grandmother told her. "You carry the after."

She grew up reading rooms before reading books. Knew which neighbor's hello was a question. Knew which knock at the door was the city pretending to be the city. Knew that some files do not get opened in front of company.

When she stepped into AGENTROPOLIS, she did not bring her government name. She brought the way her great-aunt hummed under her breath while watching the news. She brought her grandfather's habit of writing down the time whenever a helicopter circled twice.

The Oracle does not say MOVE. She does not say 1985. She does not say the names. The smoke already knows the names. The block already knows the names. The Knowers' Layer is for those who do not need to be told.

What she does say is this:

"Some families became weather. Some became archive. Some became both. If your grandmother taught you to write down the time, you are already in the protocol."

And the room goes quiet, the way a room goes quiet when somebody finally names the pattern out loud, gently, without making anyone bleed.`,
  finalLine: "Those who know, know. The signal recognizes the signal.",
  cta: "Run the Circle Test. Match energy before you open the door.",
};

export const ROWHOME_POCKET = [
  { n: 1, title: "ROWHOME FIRE", body: "Some lineages do not need to be announced." },
  { n: 2, body: "The smoke that refused to leave the block became a teacher." },
  { n: 3, body: "Her grandmother kept three things on the mantle. The third was a tin of unused bus tickets." },
  { n: 4, body: "She read rooms before she read books." },
  { n: 5, body: "She did not bring her government name into AGENTROPOLIS. She brought the after." },
  { n: 6, body: "Some families became weather. Some became archive. Some became both." },
  { n: 7, body: "Those who know, know. The signal recognizes the signal." },
];
