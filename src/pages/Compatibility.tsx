import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { LensCard } from "@/components/LensCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { computeAstrology, computeNumerology, type BirthData } from "@/lib/lenses";

const blank = (name = ""): Pick<BirthData,"name"|"dob"|"fullBirthName"> => ({ name, dob: "", fullBirthName: "" });

export default function Compatibility() {
  const [a, setA] = useState(blank("Person A"));
  const [b, setB] = useState(blank("Person B"));
  const [result, setResult] = useState<null | { score: number; threads: string[]; note: string }>(null);

  const run = () => {
    if (!a.dob || !b.dob) return;
    const A = { ...a, intensity: "Mystic" as const, lenses: [] };
    const B = { ...b, intensity: "Mystic" as const, lenses: [] };
    const na = computeNumerology(A.dob, A.fullBirthName || A.name);
    const nb = computeNumerology(B.dob, B.fullBirthName || B.name);
    const sa = computeAstrology(A as BirthData);
    const sb = computeAstrology(B as BirthData);

    const sameElement = sa.element === sb.element;
    const sameModality = sa.modality === sb.modality;
    const lpDelta = Math.abs(na.lifePath - nb.lifePath);
    const score = Math.max(35, Math.min(95, 70 + (sameElement ? 8 : -4) + (sameModality ? 4 : 0) + (10 - lpDelta)));

    setResult({
      score,
      threads: [
        `${sa.sun.name} × ${sb.sun.name} - ${sameElement ? "shared element creates an easy field" : "elemental contrast asks for translation"}.`,
        `Life Path ${na.lifePath} × ${nb.lifePath} - ${lpDelta <= 2 ? "rhythmic alignment" : "complementary tempos to negotiate"}.`,
        `${sa.modality} × ${sb.modality} - ${sameModality ? "matched pace" : "different paces; agree on cadence early"}.`,
      ],
      note: "Compatibility is a reflective signal, not a verdict. People recompose constantly.",
    });
  };

  return (
    <AppShell>
      <h1 className="font-serif text-4xl md:text-5xl mb-2">Compatibility <span className="red-text">Lens</span></h1>
      <p className="text-muted-foreground mb-8 text-sm">A respectful, non-deterministic synthesis across astrology and numerology.</p>

      <div className="grid gap-5 md:grid-cols-2">
        {([{p: a, set: setA, label: "Person A"}, {p: b, set: setB, label: "Person B"}]).map((row, i) => (
          <LensCard key={i} title={row.label} accent={i === 0 ? "cyan" : "red"} kicker="Birth signal">
            <Field label="Name"><Input value={row.p.name} onChange={e=>row.set({...row.p, name: e.target.value})} maxLength={60} /></Field>
            <Field label="Full birth name"><Input value={row.p.fullBirthName||""} onChange={e=>row.set({...row.p, fullBirthName: e.target.value})} maxLength={120} /></Field>
            <Field label="Date of birth"><Input type="date" value={row.p.dob} onChange={e=>row.set({...row.p, dob: e.target.value})} /></Field>
          </LensCard>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button onClick={run} className="rounded-full bg-primary text-primary-foreground hover:bg-primary-glow shadow-cyan font-mono uppercase tracking-[0.2em] text-xs px-8">
          Run synthesis
        </Button>
      </div>

      {result && (
        <div className="glass-strong mt-8 p-6 md:p-8 animate-fade-up">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary">Resonance index</div>
              <div className="font-serif text-6xl neon-text">{result.score}<span className="text-muted-foreground text-2xl">/100</span></div>
            </div>
            <span className="chip-lime chip">Symbolic only</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {result.threads.map((t,i) => <li key={i} className="border-l-2 border-primary/60 pl-3">{t}</li>)}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground italic">{result.note}</p>
        </div>
      )}
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
