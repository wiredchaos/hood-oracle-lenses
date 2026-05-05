import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const LINES = [
  "Consulting THE HOOD ORACLE…",
  "Fibonacci AI mapping spiral recurrence…",
  "Pulling Akashic fragment from the lore layer…",
  "Aligning N3UR0 district signal…",
  "Reducing Pythagorean digits…",
  "Casting symbolic chart approximation…",
];

export function OracleLoader() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % LINES.length), 1100);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <div className="relative">
        <div className="h-24 w-24 rounded-full bg-spiral animate-spin-slow shadow-cyan" />
        <Loader2 className="absolute inset-0 m-auto h-8 w-8 animate-spin text-background" />
      </div>
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary animate-flicker">{LINES[i]}</div>
    </div>
  );
}
