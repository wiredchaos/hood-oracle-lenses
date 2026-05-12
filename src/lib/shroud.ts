import { hasUnlock, grantUnlock, type ProductId } from "@/lib/entitlements";

export type ShroudTier = "veil" | "cloak" | "sovereign";

export const SHROUD_PRODUCTS = {
  cloak: "shroud.cloak" as ProductId,
  sovereign: "shroud.sovereign" as ProductId,
};

export function getShroudTier(): ShroudTier {
  if (hasUnlock(SHROUD_PRODUCTS.sovereign)) return "sovereign";
  if (hasUnlock(SHROUD_PRODUCTS.cloak)) return "cloak";
  return "veil";
}

export function setShroudTier(tier: ShroudTier) {
  if (tier === "sovereign") grantUnlock(SHROUD_PRODUCTS.sovereign);
  if (tier === "cloak" || tier === "sovereign") grantUnlock(SHROUD_PRODUCTS.cloak);
  applyTierAttribute();
  // Notify listeners (e.g. nav tint)
  try { window.dispatchEvent(new CustomEvent("shroud:tier", { detail: { tier } })); } catch {}
}

export function applyTierAttribute() {
  if (typeof document === "undefined") return;
  const tier = getShroudTier();
  document.documentElement.setAttribute("data-tier", tier);
}

export const SHROUD_TIERS: Array<{
  id: ShroudTier;
  name: string;
  price: number;
  hides: string;
  mechanism: string;
  accent: "violet" | "cyan" | "gold";
}> = [
  { id: "veil", name: "Veil", price: 0, hides: "Display handle", mechanism: "Weekly handle rotation", accent: "cyan" },
  { id: "cloak", name: "Cloak", price: 12, hides: "Mission origin", mechanism: "Per-mission stealth subaddress; receipts split across decoy agents", accent: "violet" },
  { id: "sovereign", name: "Sovereign", price: 49, hides: "Full footprint", mechanism: "Relay-mesh routing, time-shuffled treasury payouts, untraceable bounty eligibility", accent: "gold" },
];
