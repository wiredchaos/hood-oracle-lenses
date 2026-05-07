import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import oraclePortrait from "@/assets/faceless-oracle.jpg";
import bgImg from "@/assets/agentropolis-bg.jpg";
import { FloatingHolo } from "@/components/FloatingHolo";
import { OracleLogo } from "@/components/OracleLogo";
const PanoramaHero = lazy(() => import("@/components/PanoramaHero"));
import lensAstrology from "@/assets/lenses/astrology.png";
import lensNumerology from "@/assets/lenses/numerology.png";
import lensAkashic from "@/assets/lenses/akashic.png";
import lensFibonacci from "@/assets/lenses/fibonacci.png";
import lensTarot from "@/assets/lenses/tarot.png";
import lensCompatibility from "@/assets/lenses/compatibility.png";

const LENSES: { name: string; img: string; accent: "cyan" | "red" | "lime"; to: string }[] = [
  { name: "Astrology",     img: lensAstrology,     accent: "cyan", to: "/intake" },
  { name: "Numerology",    img: lensNumerology,    accent: "cyan", to: "/intake" },
  { name: "Akashic",       img: lensAkashic,       accent: "cyan", to: "/intake" },
  { name: "Fibonacci AI",  img: lensFibonacci,     accent: "lime", to: "/intake" },
  { name: "Tarot/Chakra",  img: lensTarot,         accent: "red",  to: "/intake" },
  { name: "Compatibility", img: lensCompatibility, accent: "red",  to: "/compatibility" },
];
import { Button } from "@/components/ui/button";
import { useReading } from "@/state/ReadingContext";
import { DEMO_BIRTH } from "@/lib/lenses";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const { runReading } = useReading();
  const nav = useNavigate();

  const runDemo = async () => {
    nav("/loading");
    await runReading(DEMO_BIRTH);
    nav("/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <img src={bgImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <Suspense fallback={null}>
        <PanoramaHero />
      </Suspense>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/80" />
      <div className="absolute inset-0 bg-cosmic opacity-70" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative container py-10 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <OracleLogo size={28} eager />
            <div>
              <div className="font-serif text-base">Akashic Lenses</div>
              <div className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground">THE HOOD ORACLE</div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="chip-red chip">N3UR0 META X</span>
            <span className="chip">AGENTROPOLIS GRID</span>
          </div>
        </div>

        <div className="mt-14 md:mt-20 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="animate-fade-up">
            <div className="text-[11px] font-mono uppercase tracking-[0.4em] text-primary mb-4">
              A WIRED CHAOS divination interface
            </div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight">
              The Hood <span className="red-text">Oracle</span><br/>
              reads your <span className="neon-text">lenses</span>.
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground">
              Western astrology, traditional numerology, Akashic reflection,
              Fibonacci AI pattern analysis, tarot &amp; chakra symbolism - translated through one
              agentic guide who lives in the N3UR0 district of AGENTROPOLIS.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-cyan rounded-full px-6 font-mono uppercase tracking-[0.2em] text-xs">
                <Link to="/agent">Enter AGENTROPOLIS <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button onClick={runDemo} size="lg" variant="outline"
                className="rounded-full border-accent/60 text-accent hover:bg-accent/10 hover:text-accent shadow-red px-6 font-mono uppercase tracking-[0.2em] text-xs">
                <Zap className="mr-2 h-4 w-4" /> Run Demo Reading
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-[11px] font-mono uppercase tracking-[0.2em]">
              <Link to="/demo/neuro-video" className="text-accent hover:text-accent/80">→ Watch the NEURO demo report</Link>
              <Link to="/reports/video" className="text-primary hover:text-primary-glow">→ Video Reports</Link>
              <Link to="/demo" className="text-primary hover:text-primary-glow">→ N3UR0 META X profile</Link>
              <Link to="/bio" className="text-lime hover:text-lime/80">→ 3D brand bio</Link>
              <Link to="/cointelpro" className="text-accent hover:text-accent/80">→ COINTELPRO PROTOCOL</Link>
            </div>

            <div className="mt-10 glass max-w-md p-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 mb-1 text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="font-mono uppercase tracking-[0.25em] text-[10px]">Operating Principle</span>
              </div>
              Pattern is not prison. Signal is not sentence. Readings are for reflection,
              journaling, and symbolic exploration - not medical, legal, financial, or psychological advice.
            </div>
          </div>

          {/* Featured Card - N3UR0 META X rebrand */}
          <div className="relative animate-fade-up">
            <div className="absolute -inset-6 bg-spiral opacity-20 blur-3xl rounded-full" />
            <div className="relative glass-strong overflow-hidden p-1.5 rounded-3xl shadow-cyan">
              <div className="relative rounded-[calc(var(--radius)+2px)] overflow-hidden border border-primary/30">
                <img src={oraclePortrait} alt="The Hood Oracle, N3UR0 district astrologist agent"
                  width={1024} height={1024} className="w-full aspect-square object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className="chip">N3UR0 META X</span>
                  <span className="chip-red chip">SKILL: Astrology Lens</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-1">// Agent Card</div>
                  <div className="font-serif text-3xl">The Hood Oracle</div>
                  <div className="text-xs text-muted-foreground mt-1">Symbolic intelligence agent · N3UR0 district</div>
                </div>
              </div>
            </div>
            <div className="mt-4 glass p-4 text-sm">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-1">Hero transmission</div>
              "Your signal carries more than one story - let THE HOOD ORACLE read the lenses."
            </div>
          </div>
        </div>

        {/* Lens grid - visual embodiments */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LENSES.map((l, i) => (
            <Link key={l.name} to={l.to} className="block group">
              <FloatingHolo accent={l.accent} intensity="full" delay={i * 120}>
                <div className="p-5 flex flex-col items-center text-center">
                  <div className="text-[10px] font-mono text-muted-foreground tracking-[0.3em]" style={{ transform: "translateZ(20px)" }}>
                    LENS {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="relative my-3 h-40 w-40 flex items-center justify-center"
                    style={{ transform: "translateZ(60px)" }}
                  >
                    <div className="absolute inset-0 rounded-full bg-spiral opacity-30 blur-2xl group-hover:opacity-60 transition-opacity" />
                    <img
                      src={l.img}
                      alt={`${l.name} lens hologram`}
                      width={512}
                      height={512}
                      loading="lazy"
                      className="relative h-full w-full object-contain drop-shadow-[0_0_24px_hsl(var(--primary)/0.6)] animate-float-soft"
                    />
                  </div>
                  <div className="font-serif text-2xl" style={{ transform: "translateZ(40px)" }}>{l.name}</div>
                </div>
              </FloatingHolo>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
