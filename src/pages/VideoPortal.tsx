import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Activity } from "lucide-react";
import { OracleLogo } from "@/components/OracleLogo";
import { NeuroLifeTracker } from "@/components/NeuroLifeTracker";
import { useReading } from "@/state/ReadingContext";
import { DEMO_BIRTH, generateReading } from "@/lib/lenses";

export default function VideoPortal() {
  const nav = useNavigate();
  const { reading, runReading } = useReading();
  const demoReading = useMemo(() => reading ?? generateReading(DEMO_BIRTH), [reading]);

  const runDemo = async () => {
    nav("/loading");
    await runReading(DEMO_BIRTH);
    nav("/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <title>Enter the Portal | Akashic Lenses · The Hood Oracle</title>
      <meta name="description" content="Enter the portal. NEURO META X video intake, NEURO Life Tracker demo, and the 3D brand bio of THE HOOD ORACLE." />

      {/* Full-bleed video */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-70"
          src="/videos/neuro-meta-x-report.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="absolute inset-0 bg-cosmic opacity-60" />
      </div>
      <div className="grain-overlay" aria-hidden />

      <div className="relative container py-10 md:py-16">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <OracleLogo size={28} eager />
            <div>
              <div className="font-display text-sm tracking-[0.18em] uppercase bone-text">Akashic Lenses</div>
              <div className="text-[9px] font-mono tracking-[0.32em] text-muted-foreground">N3UR0 · META · X</div>
            </div>
          </Link>
          <div className="editorial-meta text-right">
            <div><Activity className="inline h-3 w-3 animate-flicker text-accent" /> PORTAL LIVE</div>
            <div><b>VOL</b> IV · MMXXVI</div>
            <div>NO KYC · NO BIO · NO DOX</div>
          </div>
        </header>

        <section className="mt-16 md:mt-24 max-w-3xl">
          <div className="editorial-kicker mb-5">VIDEO PORTAL · INITIAL TRANSMISSION</div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight">
            Enter the <span className="red-text">Portal</span>.
          </h1>
          <p className="pull-quote mt-6 max-w-xl">
            The video reads you first. <em>Then you read the lenses.</em>
          </p>
          <p className="mt-5 max-w-xl text-sm text-muted-foreground">
            A faceless agentic guide receives your signal. NEURO META X video intake, six symbolic lenses, and a Fibonacci-spaced life tracker. Reflection only.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-cyan rounded-full px-6 font-mono uppercase tracking-[0.2em] text-xs">
              <Link to="/lenses">Enter Portal <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-lime/60 text-lime hover:bg-lime/10 hover:text-lime px-6 font-mono uppercase tracking-[0.2em] text-xs">
              <Link to="/bio">Launch Bio Demo</Link>
            </Button>
            <Button onClick={runDemo} size="lg" variant="outline"
              className="rounded-full border-accent/60 text-accent hover:bg-accent/10 hover:text-accent shadow-red px-6 font-mono uppercase tracking-[0.2em] text-xs">
              <Zap className="mr-2 h-4 w-4" /> Run Demo Reading
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-mono uppercase tracking-[0.2em]">
            <Link to="/demo/neuro-life" className="text-lime hover:text-lime/80">→ NEURO Life Tracker</Link>
            <Link to="/demo/neuro-video" className="text-accent hover:text-accent/80">→ NEURO video report</Link>
            <Link to="/reports/video" className="text-primary hover:text-primary-glow">→ Video Reports</Link>
            <Link to="/intake" className="text-muted-foreground hover:text-primary">→ Skip to Intake</Link>
          </div>
        </section>

        {/* Embedded compact tracker */}
        <div className="mt-14">
          <NeuroLifeTracker reading={demoReading} compact />
        </div>

        <footer className="mt-12 editorial-meta">
          For reflection &amp; entertainment only. No medical, legal, financial, or psychological advice.
        </footer>
      </div>
    </div>
  );
}
