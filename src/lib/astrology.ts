// Real ephemeris-backed tropical astrology.
// Replaces the prior pseudo-random implementation in lenses.ts.
import * as A from "astronomy-engine";

export interface SignInfo {
  name: string;
  glyph: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  modality: "Cardinal" | "Fixed" | "Mutable";
  polarity: "Yang" | "Yin";
  degreeInSign: number; // 0..30
}

// Tropical zodiac, Aries-first (matches 0° ecliptic longitude).
const SIGNS: Omit<SignInfo, "degreeInSign">[] = [
  { name: "Aries",       glyph: "♈", element: "Fire",  modality: "Cardinal", polarity: "Yang" },
  { name: "Taurus",      glyph: "♉", element: "Earth", modality: "Fixed",    polarity: "Yin" },
  { name: "Gemini",      glyph: "♊", element: "Air",   modality: "Mutable",  polarity: "Yang" },
  { name: "Cancer",      glyph: "♋", element: "Water", modality: "Cardinal", polarity: "Yin" },
  { name: "Leo",         glyph: "♌", element: "Fire",  modality: "Fixed",    polarity: "Yang" },
  { name: "Virgo",       glyph: "♍", element: "Earth", modality: "Mutable",  polarity: "Yin" },
  { name: "Libra",       glyph: "♎", element: "Air",   modality: "Cardinal", polarity: "Yang" },
  { name: "Scorpio",     glyph: "♏", element: "Water", modality: "Fixed",    polarity: "Yin" },
  { name: "Sagittarius", glyph: "♐", element: "Fire",  modality: "Mutable",  polarity: "Yang" },
  { name: "Capricorn",   glyph: "♑", element: "Earth", modality: "Cardinal", polarity: "Yin" },
  { name: "Aquarius",    glyph: "♒", element: "Air",   modality: "Fixed",    polarity: "Yang" },
  { name: "Pisces",      glyph: "♓", element: "Water", modality: "Mutable",  polarity: "Yin" },
];

const norm360 = (x: number) => ((x % 360) + 360) % 360;

export function signFromLongitude(lonDeg: number): SignInfo {
  const lon = norm360(lonDeg);
  const idx = Math.floor(lon / 30) % 12;
  return { ...SIGNS[idx], degreeInSign: lon - idx * 30 };
}

function eclipticLongitude(body: A.Body, date: Date): number {
  const vec = A.GeoVector(body, date, true);
  const ecl = A.Ecliptic(vec);
  return ecl.elon;
}

export function computeSun(dateUTC: Date): SignInfo {
  return signFromLongitude(eclipticLongitude(A.Body.Sun, dateUTC));
}

export function computeMoon(dateUTC: Date): SignInfo {
  return signFromLongitude(eclipticLongitude(A.Body.Moon, dateUTC));
}

/**
 * Ascendant via standard tropical formula.
 * Requires UTC instant, geographic latitude (deg, +N), longitude (deg, +E).
 */
export function computeAscendant(dateUTC: Date, latDeg: number, lonDeg: number): SignInfo {
  // Local Sidereal Time in degrees
  const gstHours = A.SiderealTime(dateUTC); // hours, 0..24
  const lstDeg = norm360(gstHours * 15 + lonDeg);
  // Obliquity of the ecliptic (mean) in degrees
  const T = (A.MakeTime(dateUTC).tt) / 36525; // Julian centuries since J2000 TT
  const eps = 23.439291 - 0.0130042 * T; // good enough for natal use
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const ramc = toRad(lstDeg);
  const e = toRad(eps);
  const phi = toRad(latDeg);
  // Asc = atan2( -cos(RAMC), sin(RAMC) cos(eps) + tan(phi) sin(eps) )
  let asc = toDeg(
    Math.atan2(-Math.cos(ramc), Math.sin(ramc) * Math.cos(e) + Math.tan(phi) * Math.sin(e))
  );
  asc = norm360(asc);
  return signFromLongitude(asc);
}

/** Build a UTC Date from local birth components and an IANA timezone. */
export function localToUTC(dob: string, tob: string, tz?: string): Date {
  const [y, mo, d] = dob.split("-").map(Number);
  const [h, mi] = (tob || "12:00").split(":").map(Number);
  if (!tz) {
    // Treat input as UTC when no tz known (Sun stays accurate within ~1°).
    return new Date(Date.UTC(y, mo - 1, d, h, mi));
  }
  // Compute the offset that the named tz applies at this local instant.
  const naiveUTC = Date.UTC(y, mo - 1, d, h, mi);
  const offsetMin = tzOffsetMinutes(new Date(naiveUTC), tz);
  return new Date(naiveUTC - offsetMin * 60_000);
}

function tzOffsetMinutes(at: Date, tz: string): number {
  // Render the UTC instant as wall time in tz, then diff.
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const parts = Object.fromEntries(dtf.formatToParts(at).map(p => [p.type, p.value]));
  const asUTC = Date.UTC(
    +parts.year, +parts.month - 1, +parts.day,
    +parts.hour % 24, +parts.minute, +parts.second
  );
  return (asUTC - at.getTime()) / 60_000;
}
