import { Link, Navigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { LensCard } from "@/components/LensCard";
import { SpiralMedallion } from "@/components/SpiralMedallion";
import { Button } from "@/components/ui/button";
import { useReading } from "@/state/ReadingContext";
import { NUMBER_MEANINGS } from "@/lib/lenses";
import { Activity, BookOpenText, Share2, Sparkles } from "lucide-react";
import { saveJournal } from "@/lib/memory";
import { toast } from "sonner";

export default function Dashboard() {
  const { reading } = useReading();
  if (!reading) return <Navigate to="/intake" replace />;

  const { birth, numerology, astrology, akashic, fibonacci, tarot } = reading;
  const lp = NUMBER_MEANINGS[numerology.lifePath];

  const saveJournalPrompt = (lens: string, prompt: string) => {
    saveJournal({ id: crypto.randomUUID(), createdAt: new Date().toISOString(), lens, prompt, body: "", readingId: reading.id });
    toast.success("Saved to Memory Layer.");
  };

  return (
    <AppShell>
      {/* Top card */}
      <section className="glass-strong relative overflow-hidden p-6 md:p-8 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center scanline">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="chip"><Activity className="h-3 w-3" /> HOOD ORACLE ACTIVE</span>
            <span className="chip-red chip">{birth.intensity}</span>
            <span className="chip-lime chip">Life Path {numerology.lifePath}</span>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Archetype class</div>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight">{birth.name} - <span className="red-text">{lp?.title}</span></h1>
          <p className="text-muted-foreground mt-2 max-w-md text-sm">{lp?.gist}</p>

          <div className="mt-5 grid grid-cols-3 gap-3 max-w-md">
            <Stat label="Sun" glyph={astrology.sun.glyph} value={astrology.sun.name} />
            <Stat label="Moon" glyph={astrology.moon.glyph} value={astrology.moon.name} />
            <Stat label="Rising" glyph={astrology.ascendant.glyph} value={astrology.ascendant.name} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-mono">
            <span className="chip">{astrology.element}</span>
            <span className="chip">{astrology.modality}</span>
            <span className="chip">{astrology.polarity}</span>
          </div>
        </div>

        <div className="flex justify-center">
          <SpiralMedallion size={240} label={`Phase: ${fibonacci.spiralPhase}`} />
        </div>

        <div className="md:text-right">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Skills consumed</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li>· Astrology Lens Skill</li>
            <li>· Numerology Lens Skill</li>
            <li>· Akashic Reflection Skill</li>
            <li>· Fibonacci AI Pattern Skill</li>
            <li>· Journal Memory Skill</li>
          </ul>
          <div className="mt-5 flex md:justify-end gap-2">
            <Button asChild variant="outline" className="rounded-full text-xs font-mono uppercase tracking-[0.2em]">
              <Link to="/share"><Share2 className="h-3.5 w-3.5 mr-2" /> Share Card</Link>
            </Button>
            <Button asChild className="rounded-full text-xs font-mono uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:bg-primary-glow shadow-cyan">
              <Link to="/journal"><BookOpenText className="h-3.5 w-3.5 mr-2" /> Memory Layer</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lens grid */}
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <LensCard kicker="Lens 01" title="Astrology" accent="cyan">
          <p>Your <b>{astrology.sun.name} Sun / {astrology.moon.name} Moon / {astrology.ascendant.name} Rising</b> profile suggests
            an outer signal of {astrology.sun.element.toLowerCase()}-element clarity worn over a more {astrology.moon.element.toLowerCase()}-coded interior.</p>
          <ul className="mt-2 space-y-1 text-muted-foreground text-xs font-mono">
            {astrology.houseFocus.map(h => <li key={h}>· {h}</li>)}
            {astrology.planetaryFocus.map(p => <li key={p}>· {p}</li>)}
          </ul>
          <p className="text-[10px] text-muted-foreground italic">* Approximation. Real ephemeris integration is structured into the lens engine for later wiring.</p>
        </LensCard>

        <LensCard kicker="Lens 02" title="Numerology" accent="lime">
          <div className="grid grid-cols-3 gap-2 text-center">
            <NumChip label="Life" n={numerology.lifePath} />
            <NumChip label="Destiny" n={numerology.destiny} />
            <NumChip label="Soul" n={numerology.soulUrge} />
            <NumChip label="Persona" n={numerology.personality} />
            <NumChip label="Birthday" n={numerology.birthday} />
            <NumChip label="Year" n={numerology.personalYear} />
          </div>
          <p className="mt-2"><b>{NUMBER_MEANINGS[numerology.personalYear]?.title}</b> year - {NUMBER_MEANINGS[numerology.personalYear]?.gist}</p>
          <Link to="/numerology" className="text-primary text-xs font-mono uppercase tracking-[0.2em]">→ Full numerology report</Link>
        </LensCard>

        <LensCard kicker="Lens 03" title="Akashic" accent="red">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent">Archetype</div>
          <div className="font-serif text-2xl">{akashic.archetype}</div>
          <p className="text-muted-foreground">{akashic.soulFragment}</p>
          <Link to="/akashic" className="text-accent text-xs font-mono uppercase tracking-[0.2em]">→ Open Akashic report</Link>
        </LensCard>

        <LensCard kicker="Lens 04" title="Fibonacci AI" accent="lime">
          <p className="text-sm">
            Cycle marker <b className="lime-text">{fibonacci.cycleMarker}</b> → next checkpoint <b className="neon-text">{fibonacci.nextMarker}</b>.
            Spiral phase: <b>{fibonacci.spiralPhase}</b>.
          </p>
          <RatioBar expansion={fibonacci.goldenRatio.expansion} />
          <Link to="/fibonacci" className="text-lime text-xs font-mono uppercase tracking-[0.2em]">→ Open Fibonacci AI report</Link>
        </LensCard>

        <LensCard kicker="Lens 05" title="Tarot / Chakra" accent="red">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent">Card</div>
              <div className="font-serif text-2xl">{tarot.card}</div>
            </div>
            <span className="chip">{tarot.chakra} Chakra</span>
          </div>
          <p>{tarot.meaning}</p>
        </LensCard>

        <LensCard kicker="Lens 06" title="Journal Prompt" accent="cyan"
          action={<Sparkles className="h-4 w-4 text-primary" />}>
          <p className="italic">"{fibonacci.journalPrompt}"</p>
          <Button onClick={() => saveJournalPrompt("Fibonacci AI", fibonacci.journalPrompt)}
            variant="outline" className="rounded-full text-xs font-mono uppercase tracking-[0.2em] mt-2">
            Save to Memory Layer
          </Button>
        </LensCard>
      </div>
    </AppShell>
  );
}

function Stat({ label, value, glyph }: { label: string; value: string; glyph: string }) {
  return (
    <div className="rounded-xl border border-primary/20 bg-card/40 p-3 text-center">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="text-2xl text-primary">{glyph}</div>
      <div className="text-xs">{value}</div>
    </div>
  );
}

function NumChip({ label, n }: { label: string; n: number }) {
  return (
    <div className="rounded-md border border-lime/30 bg-lime/5 p-2">
      <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="lime-text font-serif text-2xl leading-none">{n}</div>
    </div>
  );
}

function RatioBar({ expansion }: { expansion: number }) {
  return (
    <div className="mt-2">
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        <span>Expansion {expansion}%</span><span>Contraction {100 - expansion}%</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-secondary overflow-hidden">
        <div className="h-full bg-neuro" style={{ width: `${expansion}%` }} />
      </div>
    </div>
  );
}
