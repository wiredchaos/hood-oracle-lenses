// Real Life Tracker — local-first, opt-in, encrypted export.
// Stores daily check-ins in localStorage. No network calls.

export type EntrySource = "manual" | "device" | "wearable";

export interface LifeEntry {
  date: string;          // YYYY-MM-DD
  sleepHours?: number;   // 0-14
  mood?: number;         // 1-10
  energy?: number;       // 1-10
  focus?: number;        // 1-10
  workout?: boolean;
  steps?: number;
  restingHr?: number;
  hrv?: number;
  notes?: string;
  source: EntrySource;
  updatedAt: number;
}

const KEY = "lifetracker.entries";

export function todayISO(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function listEntries(): LifeEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as LifeEntry[];
    return arr.sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return [];
  }
}

export function getEntry(date: string): LifeEntry | undefined {
  return listEntries().find(e => e.date === date);
}

export function upsertEntry(entry: Omit<LifeEntry, "updatedAt">): LifeEntry {
  const all = listEntries();
  const idx = all.findIndex(e => e.date === entry.date);
  const merged: LifeEntry = {
    ...(idx >= 0 ? all[idx] : {}),
    ...entry,
    updatedAt: Date.now(),
  } as LifeEntry;
  if (idx >= 0) all[idx] = merged;
  else all.push(merged);
  localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("lifetracker:change"));
  return merged;
}

export function deleteEntry(date: string) {
  const all = listEntries().filter(e => e.date !== date);
  localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("lifetracker:change"));
}

export function clearAll() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("lifetracker:change"));
}

// ---- streak / aggregates ----

export function currentStreak(entries = listEntries()): number {
  if (!entries.length) return 0;
  const dates = new Set(entries.map(e => e.date));
  let streak = 0;
  const cur = new Date();
  while (dates.has(todayISO(cur))) {
    streak++;
    cur.setDate(cur.getDate() - 1);
  }
  return streak;
}

export function rollingAverage(entries: LifeEntry[], field: keyof LifeEntry, days = 7): number | null {
  const cutoff = Date.now() - days * 86400_000;
  const vals = entries
    .filter(e => new Date(e.date).getTime() >= cutoff)
    .map(e => e[field])
    .filter((v): v is number => typeof v === "number");
  if (!vals.length) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

// ---- encrypted export / import (AES-GCM + PBKDF2) ----

const ENC = new TextEncoder();
const DEC = new TextDecoder();

async function deriveKey(passphrase: string, salt: BufferSource): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey(
    "raw", ENC.encode(passphrase) as BufferSource, "PBKDF2", false, ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 250_000, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

function b64(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  bytes.forEach(b => (s += String.fromCharCode(b)));
  return btoa(s);
}
function unb64(s: string): Uint8Array {
  const bin = atob(s);
  const buf = new ArrayBuffer(bin.length);
  const out = new Uint8Array(buf);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export interface EncryptedExport {
  v: 1;
  app: "hood-oracle.lifetracker";
  createdAt: string;
  salt: string;
  iv: string;
  ciphertext: string;
}

export async function exportEncrypted(passphrase: string): Promise<EncryptedExport> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt as unknown as Uint8Array<ArrayBuffer>);
  const data = ENC.encode(JSON.stringify(listEntries()));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);
  return {
    v: 1,
    app: "hood-oracle.lifetracker",
    createdAt: new Date().toISOString(),
    salt: b64(salt),
    iv: b64(iv),
    ciphertext: b64(ct),
  };
}

export async function importEncrypted(blob: EncryptedExport, passphrase: string): Promise<number> {
  if (blob.app !== "hood-oracle.lifetracker") throw new Error("Wrong file type.");
  const key = await deriveKey(passphrase, unb64(blob.salt) as BufferSource);
  const pt = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: unb64(blob.iv) as BufferSource }, key, unb64(blob.ciphertext) as BufferSource,
  );
  const incoming = JSON.parse(DEC.decode(pt)) as LifeEntry[];
  // Merge: incoming wins per date if newer.
  const map = new Map<string, LifeEntry>();
  for (const e of listEntries()) map.set(e.date, e);
  for (const e of incoming) {
    const cur = map.get(e.date);
    if (!cur || (e.updatedAt ?? 0) >= (cur.updatedAt ?? 0)) map.set(e.date, e);
  }
  const merged = Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
  localStorage.setItem(KEY, JSON.stringify(merged));
  window.dispatchEvent(new Event("lifetracker:change"));
  return incoming.length;
}

export function downloadJson(filename: string, payload: unknown) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
