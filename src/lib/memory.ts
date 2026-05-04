// Local-only Memory Layer (user-owned app data)
import type { Reading } from "./lenses";

const READING_KEY = "akashic.readings";
const JOURNAL_KEY = "akashic.journal";
const SETTINGS_KEY = "akashic.settings";

export interface JournalEntry {
  id: string;
  createdAt: string;
  lens: string;
  prompt?: string;
  body: string;
  favorite?: boolean;
  readingId?: string;
}

export interface Settings {
  defaultIntensity: string;
  defaultLenses: string[];
  numerologySystem: string;
  shareCardCream: boolean;
}

const read = <T,>(k: string, fallback: T): T => {
  try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : fallback; }
  catch { return fallback; }
};
const write = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export const getReadings  = () => read<Reading[]>(READING_KEY, []);
export const saveReading  = (r: Reading) => { const all = getReadings(); write(READING_KEY, [r, ...all].slice(0, 50)); };
export const deleteReading = (id: string) => write(READING_KEY, getReadings().filter(r => r.id !== id));

export const getJournal   = () => read<JournalEntry[]>(JOURNAL_KEY, []);
export const saveJournal  = (e: JournalEntry) => write(JOURNAL_KEY, [e, ...getJournal()]);
export const toggleFavorite = (id: string) => {
  const all = getJournal().map(e => e.id === id ? { ...e, favorite: !e.favorite } : e);
  write(JOURNAL_KEY, all);
};
export const deleteJournal = (id: string) => write(JOURNAL_KEY, getJournal().filter(e => e.id !== id));

export const getSettings  = (): Settings => read<Settings>(SETTINGS_KEY, {
  defaultIntensity: "Mystic",
  defaultLenses: ["Astrology","Numerology","Akashic","Fibonacci AI"],
  numerologySystem: "Pythagorean",
  shareCardCream: true,
});
export const saveSettings = (s: Settings) => write(SETTINGS_KEY, s);

export const wipeAll = () => { localStorage.removeItem(READING_KEY); localStorage.removeItem(JOURNAL_KEY); };
