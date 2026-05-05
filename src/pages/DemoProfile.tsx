import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { LensCard } from "@/components/LensCard";
import { SpiralMedallion } from "@/components/SpiralMedallion";
import { Button } from "@/components/ui/button";
import { DEMO_NOTICE, DEMO_PROFILE } from "@/lib/demoSeed";
import { SAFETY_FOOTER } from "@/lib/cointelpro";
import { Lock, Sparkles } from "lucide-react";

export default function DemoProfile() {
  const p = DEMO_PROFILE;

  return (
    <AppShell>
      <header className="mb-6">
        <div className="flex flex-wrap gap-2">
          <span className="chip-red chip"><Lock className="h-3 w-3" /> NO DOX ORACLE ACTIVE</span>
          <span className="chip">{p.archetypeCode}</span>
          <span className="chip-lime chip">{p.spiralPhase}</span>
          <span className="chip">{p.elementAxis}</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl mt-3">{p.alias}</h1>
        <p className="text-muted-foreground text-sm mt-2 max-w-2xl italic">"{p.hoodOracleLine}"</p>
        <p className="text-[11px] text-muted-foreground mt-3">{DEMO_NOTICE}</p>
      </header>

      <section className="glass-strong p-6 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center scanline mb-8">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Patch-Life</div>
          <div className="font-serif text-3xl red-text">{p.patchLife.name}</div>
          <p className="text-sm text-muted-foreground mt-2">{p.patchLife.eraAesthetic}</p>
          <p className="text-sm mt-3 italic">"{p.patchLife.shareLine}"</p>
        </div>
        <div className="flex justify-center">
          <SpiralMedallion size={220} label={`Phase: ${p.fibonacci.spiralPhase}`} />
        </div>
        <div className="md:text-right">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Privacy posture</div>
          <div className="mt-2 flex md:justify-end flex-wrap gap-1.5">
            {p.privacyFlags.map(f => <span key={f} className="chip"><Lock className="h-3 w-3" /> {f}</span>)}
          </div>
          <div className="mt-5 flex md:justify-end gap-2">
            <Button asChild size="sm" variant="outline" className="rounded-full text-[11px] font-mono uppercase tracking-[0.2em]">
              <Link to="/agenttv?seed=demo">Run on AGENTtv</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="rounded-full text-[11px] font-mono uppercase tracking-[0.2em]">
              <Link to="/pocket?seed=demo">Pocket Stack</Link>
            </Button>
            <Button asChild size="sm" className="rounded-full text-[11px] font-mono uppercase tracking-[0.2em] bg-primary text-primary-foreground shadow-cyan">
              <Link to="/forge?seed=demo">UGC Forge</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <LensCard kicker="Lens 01" title="Astrology" accent="cyan">
          <p><b>{p.astrology.sunSign}</b> · {p.astrology.element} · {p.astrology.modality} · {p.astrology.polarity}</p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mt-2">{p.astrology.archetype}</p>
          <p>{p.astrology.reading}</p>
        </LensCard>

        <LensCard kicker="Lens 02" title="Numerology" accent="lime">
          <div className="flex gap-2">
            <span className="chip-lime chip">Life Path {p.numerology.lifePath}</span>
            <span className="chip-lime chip">Birth Day {p.numerology.birthDay}</span>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] lime-text mt-1">{p.numerology.archetype}</p>
          <p>{p.numerology.reading}</p>
          <p className="italic text-sm">"{p.numerology.line}"</p>
        </LensCard>

        <LensCard kicker="Lens 03" title="Akashic" accent="red">
          <div className="font-serif text-2xl">{p.akashic.archiveName}</div>
          <p className="text-muted-foreground text-sm">{p.akashic.soulFragment}</p>
          <p className="text-xs"><b className="red-text">Release:</b> {p.akashic.patternToRelease}</p>
          <p className="text-xs"><b className="red-text">Integrate:</b> {p.akashic.giftToIntegrate}</p>
          <p className="italic text-sm">"{p.akashic.line}"</p>
        </LensCard>

        <LensCard kicker="Lens 04" title="Fibonacci AI" accent="lime">
          <p>Cycle marker <b className="lime-text">{p.fibonacci.cycleMarker}</b> · phase <b>{p.fibonacci.spiralPhase}</b></p>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mt-2 flex justify-between">
            <span>Expansion {p.fibonacci.expansion}%</span><span>Contraction {p.fibonacci.contraction}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div className="h-full bg-neuro" style={{ width: `${p.fibonacci.expansion}%` }} />
          </div>
          <ul className="text-xs text-muted-foreground space-y-0.5 mt-2 font-mono">
            {p.fibonacci.patternRecurrence.map(r => <li key={r}>· {r}</li>)}
          </ul>
          <p className="italic text-sm flex gap-2"><Sparkles className="h-3.5 w-3.5 text-lime shrink-0 mt-0.5" /> "{p.fibonacci.prompt}"</p>
        </LensCard>

        <LensCard kicker="Lens 05" title="Patch-Life" accent="red">
          <div className="font-serif text-2xl red-text">{p.patchLife.name}</div>
          <p className="text-xs"><b className="red-text">Wound:</b> {p.patchLife.coreWound}</p>
          <p className="text-xs"><b className="red-text">Gift:</b> {p.patchLife.coreGift}</p>
          <p className="text-xs"><b className="red-text">Lesson:</b> {p.patchLife.currentLesson}</p>
          <p className="text-xs"><b className="red-text">Practice:</b> {p.patchLife.integration}</p>
        </LensCard>

        <LensCard kicker="ID" title="Energy ID" accent="cyan">
          <div className="font-mono text-lg neon-text">{p.archetypeCode} // {p.spiralPhase} // {p.elementAxis}</div>
          <p className="text-xs text-muted-foreground">Shadow → Gift axis: <b>{p.shadowGiftAxis}</b></p>
          <p className="italic text-sm mt-2">"{p.oraclePhrase}"</p>
        </LensCard>
      </div>

      {/* SignalMatch */}
      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="glass p-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-3">SignalMatch</div>
          <table className="w-full text-sm">
            <thead><tr className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <th className="text-left pb-2">Match Type</th><th className="text-left pb-2">Resonance</th>
            </tr></thead>
            <tbody>
              {p.signalMatch.map(s => (
                <tr key={s.type} className="border-t border-border/40">
                  <td className="py-2">{s.type}</td><td className="py-2 text-primary">{s.resonance}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="italic text-sm mt-3">"{p.signalMatchLine}"</p>
        </div>

        <div className="glass p-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-3">Resonance map</div>
          <ul className="space-y-2 text-sm">
            {p.resonanceMap.map(r => (
              <li key={r.lane}>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{r.lane}</span>
                <span className="text-muted-foreground"> · {r.reading}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-6 glass-strong p-5 scanline">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-2">Circle Test demo</div>
        <div className="flex flex-wrap gap-3 items-baseline">
          <div className="font-serif text-3xl red-text">{p.circleTest.status}</div>
          <div className="flex gap-1.5 flex-wrap">
            {p.circleTest.riskPattern.map(r => <span key={r} className="chip-red chip">{r}</span>)}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">Repair: {p.circleTest.repairCode.join(" · ")}</p>
        <p className="italic text-sm mt-2">"{p.circleTest.oracleLine}"</p>
        <div className="mt-3 flex gap-2">
          <Button asChild variant="outline" className="rounded-full text-[11px] font-mono uppercase tracking-[0.2em]">
            <Link to="/circle-test">Run your own Circle Test</Link>
          </Button>
        </div>
      </section>

      <footer className="mt-8 text-xs text-muted-foreground">{SAFETY_FOOTER}</footer>
    </AppShell>
  );
}
