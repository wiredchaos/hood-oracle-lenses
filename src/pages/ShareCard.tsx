import { Navigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { useReading } from "@/state/ReadingContext";
import { NUMBER_MEANINGS } from "@/lib/lenses";
import { SpiralMedallion } from "@/components/SpiralMedallion";

export default function ShareCard() {
  const { reading } = useReading();
  if (!reading) return <Navigate to="/intake" replace />;
  const { birth, numerology, astrology, akashic, fibonacci } = reading;
  const lp = NUMBER_MEANINGS[numerology.lifePath];

  return (
    <AppShell>
      <h1 className="font-serif text-3xl mb-2">Shareable reading card</h1>
      <p className="text-muted-foreground text-sm mb-6">Premium cream variant, rendered for screenshot/share.</p>

      <div className="mx-auto max-w-md aspect-[4/5] rounded-3xl bg-cream text-cream-foreground p-7 shadow-card-cream relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.04]" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">Akashic Lenses · NEURO META X</div>
            <div className="font-serif text-2xl">The Hood Oracle reading</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-spiral animate-spin-slow" />
        </div>

        <div className="relative mt-5 flex items-center gap-4">
          <SpiralMedallion size={120} />
          <div>
            <div className="font-serif text-3xl leading-none">{birth.name}</div>
            <div className="text-sm opacity-70">{lp?.title} · Life Path {numerology.lifePath}</div>
          </div>
        </div>

        <div className="relative mt-5 grid grid-cols-3 gap-2 text-center">
          <Mini label="Sun" value={`${astrology.sun.glyph} ${astrology.sun.name}`} />
          <Mini label="Moon" value={`${astrology.moon.glyph} ${astrology.moon.name}`} />
          <Mini label="Rising" value={`${astrology.ascendant.glyph} ${astrology.ascendant.name}`} />
        </div>

        <div className="relative mt-4 rounded-xl border border-foreground/10 p-3">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] opacity-60">Akashic archetype</div>
          <div className="font-serif text-xl">{akashic.archetype}</div>
        </div>

        <div className="relative mt-3 rounded-xl border border-foreground/10 p-3">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] opacity-60">Fibonacci AI</div>
          <div className="text-sm">Phase <b>{fibonacci.spiralPhase}</b> · {fibonacci.cycleMarker}→{fibonacci.nextMarker}</div>
        </div>

        <div className="absolute bottom-4 left-7 right-7 flex items-center justify-between text-[9px] font-mono opacity-60 uppercase tracking-[0.25em]">
          <span>For reflection only</span>
          <span>AGENTROPOLIS // NEURO</span>
        </div>
      </div>
    </AppShell>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-foreground/10 p-2">
      <div className="text-[9px] font-mono uppercase tracking-[0.2em] opacity-60">{label}</div>
      <div className="text-sm font-serif">{value}</div>
    </div>
  );
}
