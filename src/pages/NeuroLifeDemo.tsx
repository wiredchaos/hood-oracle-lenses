import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { NeuroLifeTracker } from "@/components/NeuroLifeTracker";
import { Button } from "@/components/ui/button";
import { useReading } from "@/state/ReadingContext";
import { DEMO_BIRTH, generateReading } from "@/lib/lenses";
import { useMemo } from "react";

export default function NeuroLifeDemo() {
  const { reading } = useReading();
  const demo = useMemo(() => reading ?? generateReading(DEMO_BIRTH), [reading]);

  return (
    <AppShell>
      <title>NEURO Life Tracker · Demo | Akashic Lenses</title>
      <meta name="description" content="NEURO Life Tracker demo: symbolic Fibonacci-spaced life phase tracker. No biometrics, reflection only." />
      <section>
        <div className="editorial-kicker mb-3">VOL · IV · NEURO LIFE TRACKER · DEMO</div>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight">
          Your <span className="red-text">life</span>, read as a <span className="neon-text">spiral</span>.
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          A symbolic, no-biometrics tracker. Fibonacci-spaced phases, current pulse, dominant lens per arc. For reflection only.
        </p>
      </section>

      <div className="mt-8">
        <NeuroLifeTracker reading={demo} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild className="rounded-full text-xs font-mono uppercase tracking-[0.2em] bg-primary text-primary-foreground shadow-cyan">
          <Link to="/">Back to Portal</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full text-xs font-mono uppercase tracking-[0.2em]">
          <Link to="/intake">Run Your Own Reading</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full text-xs font-mono uppercase tracking-[0.2em]">
          <Link to="/life">Switch to Real Tracker</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full text-xs font-mono uppercase tracking-[0.2em]">
          <Link to="/bio">Open 3D Brand Bio</Link>
        </Button>
      </div>
    </AppShell>
  );
}
