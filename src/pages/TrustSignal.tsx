import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TRUST_LANES, TRUST_USE_CASES, SAFETY_FOOTER } from "@/lib/cointelpro";
import { Radio } from "lucide-react";

function readLane(laneId: string, a: string, b: string, ctx: string): string {
  const seed = (a + "::" + b + "::" + ctx).toLowerCase();
  const sum = Array.from(seed).reduce((s, c) => s + c.charCodeAt(0), 0);
  const variants: Record<string, string[]> = {
    signal: [
      "Both aliases broadcast a builder frequency. Steady. Buildable.",
      "One aliases as steady, the other as searching. The mismatch is honest.",
      "The signal is warm but distracted. Slow the room before you trust the room.",
    ],
    mask: [
      "The mask is light. What you see is mostly what is there.",
      "The mask leans charming. Verify with time, not vibes.",
      "The mask is heavy on one side. Ask less personal, watch more public.",
    ],
    pressure: [
      "Under pressure, this match steadies. Conflict becomes design.",
      "Under pressure, one side collapses inward. Have a repair plan ready.",
      "Under pressure, urgency spikes. Name the speed before you match it.",
    ],
    betrayal_risk: [
      "Low symbolic risk. Stay grounded, stay clear.",
      "Moderate symbolic risk - pattern, not verdict. Watch the asks.",
      "Elevated symbolic risk. This is a warning shape, not an accusation. Slow access.",
    ],
    repair_code: [
      "Clarity before access. Boundaries before loyalty. Protocol before rescue.",
      "Match pace. Share in passes, not floods. Let consistency earn the next door.",
      "Keep your two safest people informed. Some doors stay porch-only.",
    ],
  };
  const arr = variants[laneId] ?? ["Signal undefined."];
  return arr[sum % arr.length];
}

export default function TrustSignal() {
  const [aliasA, setAliasA] = useState("N3UR0 META X");
  const [aliasB, setAliasB] = useState("GHOSTRUNNER");
  const [ctx, setCtx] = useState("New collaborator. Met online. Wants strategy access fast.");

  const lanes = useMemo(
    () => TRUST_LANES.map(l => ({ ...l, read: readLane(l.id, aliasA, aliasB, ctx) })),
    [aliasA, aliasB, ctx],
  );

  return (
    <AppShell>
      <header className="mb-6">
        <span className="chip-red chip"><Radio className="h-3 w-3" /> TRUST SIGNAL</span>
        <h1 className="font-serif text-4xl mt-2">Match energy before you open the door.</h1>
        <p className="text-muted-foreground text-sm mt-2 max-w-2xl">
          Alias x alias x context. The Oracle reads the shape of the match. Betrayal Risk is not an accusation - it is a symbolic pattern warning based on stated behavior, boundaries, and energy mismatch.
        </p>
      </header>

      <section className="glass p-5 mb-6 grid gap-4 md:grid-cols-3">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1">Alias A</div>
          <Input value={aliasA} onChange={e => setAliasA(e.target.value)} className="bg-background/60" />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1">Alias B</div>
          <Input value={aliasB} onChange={e => setAliasB(e.target.value)} className="bg-background/60" />
        </div>
        <div className="md:col-span-3">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1">Context (no real names, no addresses)</div>
          <Textarea value={ctx} onChange={e => setCtx(e.target.value)} className="bg-background/60 min-h-[80px]" />
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {lanes.map(l => (
          <div key={l.id} className="glass p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent">{l.label}</div>
            <p className="text-sm mt-2">{l.read}</p>
            <p className="text-[11px] text-muted-foreground mt-3 italic">{l.note}</p>
          </div>
        ))}
      </div>

      <section className="mt-8 glass p-5">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-2">Common use</div>
        <ul className="grid gap-1.5 sm:grid-cols-2 text-sm text-muted-foreground">
          {TRUST_USE_CASES.map(u => <li key={u}>· {u}</li>)}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild variant="outline" className="rounded-full text-[11px] font-mono uppercase tracking-[0.2em]">
            <a href="/circle-test">Run the Circle Test</a>
          </Button>
          <Button asChild variant="outline" className="rounded-full text-[11px] font-mono uppercase tracking-[0.2em]">
            <a href="/cointelpro">Back to COINTELPRO Link</a>
          </Button>
        </div>
      </section>

      <footer className="mt-6 text-xs text-muted-foreground">{SAFETY_FOOTER}</footer>
    </AppShell>
  );
}
