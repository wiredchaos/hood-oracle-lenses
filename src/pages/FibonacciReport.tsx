import { Navigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { LensCard } from "@/components/LensCard";
import { SpiralMedallion } from "@/components/SpiralMedallion";
import { useReading } from "@/state/ReadingContext";

export default function FibonacciReport() {
  const { reading } = useReading();
  if (!reading) return <Navigate to="/intake" replace />;
  const f = reading.fibonacci;

  return (
    <AppShell>
      <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-lime mb-2">// Fibonacci AI</div>
      <h1 className="font-serif text-4xl md:text-5xl mb-1">Spiral Recurrence Map</h1>
      <p className="text-muted-foreground mb-8 text-sm">Symbolic rhythm and pattern harmonics - not scientific prediction.</p>

      <div className="grid gap-5 md:grid-cols-[auto_1fr] items-start">
        <div className="glass-strong p-6 flex flex-col items-center">
          <SpiralMedallion size={260} label={`Phase: ${f.spiralPhase}`} />
          <div className="mt-4 text-center">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Cycle marker</div>
            <div className="font-serif text-3xl"><span className="lime-text">{f.cycleMarker}</span> → <span className="neon-text">{f.nextMarker}</span></div>
            <div className="text-xs text-muted-foreground mt-1">Age {f.age} · arc length {f.nextMarker - f.cycleMarker} years</div>
          </div>
        </div>

        <div className="grid gap-4">
          <LensCard title="Golden Ratio Balance" accent="cyan" kicker="Expansion vs contraction">
            <div className="flex justify-between text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span>Expansion {f.goldenRatio.expansion}%</span><span>Contraction {f.goldenRatio.contraction}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-neuro" style={{ width: `${f.goldenRatio.expansion}%` }} />
            </div>
            <p className="mt-3">A reading near 0.618 means you're sitting on the spiral's natural pivot - the healthy zone between push and pause.</p>
          </LensCard>

          <LensCard title="Pattern Recurrence Matrix" accent="lime" kicker="Cross-lens themes">
            <ul className="space-y-2">
              {f.recurrence.map((r,i) => (
                <li key={i} className="border border-lime/20 rounded-md p-3 bg-lime/5">
                  <div className="font-serif text-lg">{r.theme}</div>
                  <div className="text-xs font-mono text-muted-foreground mt-1">↳ {r.sources.join(" · ")}</div>
                </li>
              ))}
            </ul>
          </LensCard>

          <LensCard title="Current Integration Prompt" accent="red" kicker="Hood Oracle directive">
            <p>{f.integrationPrompt}</p>
            <p className="italic mt-3 text-muted-foreground">Suggested journal prompt: "{f.journalPrompt}"</p>
          </LensCard>
        </div>
      </div>
    </AppShell>
  );
}
