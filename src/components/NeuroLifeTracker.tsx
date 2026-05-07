import { useEffect, useState } from "react";
import type { Reading } from "@/lib/lenses";
import { buildNeuroLife } from "@/lib/neuroLife";
import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";

interface Props {
  reading: Reading;
  compact?: boolean;
}

export function NeuroLifeTracker({ reading, compact = false }: Props) {
  const data = buildNeuroLife(reading);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 100), 90);
    return () => clearInterval(id);
  }, []);
  const livePulse = Math.max(6, Math.min(99, data.pulse + Math.sin(tick / 6) * 6));

  return (
    <section className={cn("glass-strong relative overflow-hidden", compact ? "p-4" : "p-6 md:p-8")}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent flex items-center gap-2">
            <Activity className="h-3 w-3 animate-flicker" /> NEURO LIFE TRACKER · DEMO
          </div>
          <h3 className={cn("font-serif leading-tight mt-1", compact ? "text-2xl" : "text-3xl md:text-4xl")}>
            Phase <span className="red-text">{data.spiralPhase}</span>
            <span className="text-muted-foreground text-sm font-mono uppercase tracking-[0.2em] ml-3">
              {data.marker} → {data.nextMarker}
            </span>
          </h3>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Symbolic pulse</div>
          <div className="font-serif text-3xl neon-text">{Math.round(livePulse)}</div>
        </div>
      </div>

      <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
        <div className="h-full bg-neuro transition-all" style={{ width: `${livePulse}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        <span>Expansion {data.expansion}%</span>
        <span>Contraction {data.contraction}%</span>
      </div>

      <div className={cn("mt-5 grid gap-2", compact ? "grid-cols-3 sm:grid-cols-5" : "grid-cols-3 sm:grid-cols-5 md:grid-cols-9")}>
        {data.phases.map((p, i) => (
          <div key={i} className={cn(
            "rounded-md border p-2 text-center transition",
            p.active
              ? "border-accent/60 bg-accent/10 shadow-red"
              : "border-primary/20 bg-card/40"
          )}>
            <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              {p.marker}-{p.next}
            </div>
            <div className={cn("font-serif text-sm leading-tight mt-0.5", p.active ? "red-text" : "")}>
              {p.label}
            </div>
            {!compact && (
              <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground mt-1">
                {p.dominantLens}
              </div>
            )}
            <div className="mt-1 h-1 rounded-full bg-secondary overflow-hidden">
              <div className={cn("h-full", p.active ? "bg-accent" : "bg-primary/40")} style={{ width: `${p.intensity}%` }} />
            </div>
          </div>
        ))}
      </div>

      {!compact && (
        <p className="mt-5 italic text-sm text-muted-foreground max-w-3xl">"{data.signalLine}"</p>
      )}

      <div className="mt-3 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
        Symbolic only. No biometrics. No medical advice.
      </div>
    </section>
  );
}
