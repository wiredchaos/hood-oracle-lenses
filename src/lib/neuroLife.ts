// NEURO LIFE TRACKER (DEMO) - symbolic only, no biometrics.
// Derives a Fibonacci-spaced phase strip and a current symbolic pulse from a Reading.
import type { Reading } from "./lenses";

export interface NeuroPhase {
  marker: number;       // age cycle start
  next: number;         // age cycle end
  label: string;        // spiral phase
  dominantLens: string; // symbolic dominant lens
  intensity: number;    // 0-100
  active: boolean;
}

export interface NeuroLife {
  age: number;
  pulse: number;          // 0-100 current symbolic pulse
  expansion: number;      // golden-ratio expansion %
  contraction: number;
  phases: NeuroPhase[];
  signalLine: string;
  marker: number;
  nextMarker: number;
  spiralPhase: string;
}

const FIB = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
const PHASES = ["Seed", "Root", "Sprout", "Bloom", "Harvest", "Composting", "Re-seeding"];
const LENSES = ["Astrology", "Numerology", "Akashic", "Fibonacci AI", "Tarot/Chakra"];

export function buildNeuroLife(reading: Reading): NeuroLife {
  const { fibonacci, numerology, akashic } = reading;
  const age = fibonacci.age;
  const expansion = fibonacci.goldenRatio.expansion;

  // symbolic pulse: blend expansion with life-path resonance
  const pulse = Math.max(8, Math.min(98, Math.round(expansion * 0.7 + (numerology.lifePath * 3) % 30 + 10)));

  const phases: NeuroPhase[] = FIB.slice(0, FIB.length - 1).map((m, i) => {
    const next = FIB[i + 1];
    const active = age >= m && age < next;
    const label = PHASES[i % PHASES.length];
    const dominantLens = LENSES[(numerology.lifePath + i) % LENSES.length];
    const intensity = Math.round(((m * 7 + numerology.destiny * 11) % 70) + 25);
    return { marker: m, next, label, dominantLens, intensity, active };
  });

  return {
    age,
    pulse,
    expansion,
    contraction: 100 - expansion,
    phases,
    signalLine: akashic.loreNote,
    marker: fibonacci.cycleMarker,
    nextMarker: fibonacci.nextMarker,
    spiralPhase: fibonacci.spiralPhase,
  };
}
