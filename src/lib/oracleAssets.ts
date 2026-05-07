// Generated visual assets for THE FACELESS HOOD ORACLE variants.
// Uses import.meta.glob so newly added variants auto-resolve once their
// matching {id}.jpg lands in src/assets/hoods or src/assets/env360.
import fallbackPortrait from "@/assets/faceless-oracle.jpg";
import fallbackEnv from "@/assets/agentropolis-bg.jpg";
import neuroMetaX from "@/assets/demo/neuro-meta-x.jpg";
import { HOOD_VARIANTS } from "./oracle";

const portraitModules = import.meta.glob("@/assets/hoods/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const envModules = import.meta.glob("@/assets/env360/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const byBasename = (mods: Record<string, string>) => {
  const out: Record<string, string> = {};
  for (const [path, url] of Object.entries(mods)) {
    const name = path.split("/").pop()?.replace(/\.jpg$/, "");
    if (name) out[name] = url;
  }
  return out;
};

const portraitMap = byBasename(portraitModules);
const envMap = byBasename(envModules);

export const HOOD_PORTRAITS: Record<string, string> = Object.fromEntries(
  HOOD_VARIANTS.map(v => [v.id, portraitMap[v.id] ?? fallbackPortrait])
);

export const HOOD_ENV360: Record<string, string> = Object.fromEntries(
  HOOD_VARIANTS.map(v => [v.id, envMap[v.id] ?? fallbackEnv])
);

export const DEMO_HOLOGRAM = neuroMetaX;

export const HOOD_VIDEOS: Record<string, string> = Object.fromEntries(
  HOOD_VARIANTS.map(v => [v.id, `/videos/oracle-${v.id}.mp4`])
);
export const HOOD_VIDEO_POSTERS: Record<string, string> = Object.fromEntries(
  HOOD_VARIANTS.map(v => [v.id, `/videos/posters/oracle-${v.id}.jpg`])
);
