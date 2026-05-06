// Lightweight client-side entitlement store. Real payments will replace this.
const KEY = "oracle.unlocks";

export type ProductId =
  | "report.full"
  | "report.patchlife"
  | "report.daily"
  | `oracle.${string}`;

function read(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function write(ids: string[]) {
  try { localStorage.setItem(KEY, JSON.stringify(Array.from(new Set(ids)))); } catch {}
}

export function hasUnlock(id: ProductId): boolean {
  return read().includes(id);
}
export function grantUnlock(id: ProductId) {
  write([...read(), id]);
}
export function revokeUnlock(id: ProductId) {
  write(read().filter(x => x !== id));
}
export function listUnlocks(): string[] {
  return read();
}
