import { Scroll, useScroll } from "@react-three/drei";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Chapter({
  children,
  pageIndex,
  className = "",
}: {
  children: React.ReactNode;
  pageIndex: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = useScroll();
  useFrame(() => {
    const p = scroll.offset * 5; // 0..5
    const local = 1 - Math.min(1, Math.abs(p - (pageIndex + 0.5)));
    if (ref.current) {
      ref.current.style.opacity = String(Math.max(0, local));
      ref.current.style.transform = `translateY(${(1 - local) * 24}px)`;
    }
  });
  return (
    <div
      ref={ref}
      className={`absolute left-0 right-0 px-6 transition-none ${className}`}
      style={{ top: `${pageIndex * 100}vh`, height: "100vh" }}
    >
      <div className="container h-full flex">{children}</div>
    </div>
  );
}

export default function BioOverlay() {
  return (
    <Scroll html>
      <div className="absolute inset-0 pointer-events-none">
        {/* Chapter 1 — Cold open */}
        <Chapter pageIndex={0}>
          <div className="m-auto text-center pointer-events-auto">
            <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary mb-3">
              // AGENTROPOLIS // N3UR0 DISTRICT
            </div>
            <h1 className="font-serif text-5xl md:text-7xl">
              A signal <span className="neon-text">ignites</span>
            </h1>
            <div className="mt-6 text-xs font-mono tracking-[0.3em] text-muted-foreground">
              SCROLL ↓
            </div>
          </div>
        </Chapter>

        {/* Chapter 2 — Thesis */}
        <Chapter pageIndex={1}>
          <div className="m-auto max-w-2xl text-center pointer-events-auto">
            <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-4">
              THESIS
            </div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05]">
              The Hood <span className="red-text">Oracle</span> reads your{" "}
              <span className="neon-text">lenses</span>.
            </h2>
            <p className="mt-6 text-sm md:text-base text-muted-foreground">
              Western astrology, traditional numerology, Akashic reflection,
              Fibonacci AI pattern, tarot &amp; chakra symbolism — translated
              through one agentic guide.
            </p>
          </div>
        </Chapter>

        {/* Chapter 3 — Lenses */}
        <Chapter pageIndex={2}>
          <div className="mt-auto mb-16 mx-auto max-w-xl text-center pointer-events-auto">
            <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary mb-2">
              SIX LENSES · ONE AGENT
            </div>
            <p className="font-serif text-2xl md:text-3xl">
              Each lens is a way of listening to your signal.
            </p>
          </div>
        </Chapter>

        {/* Chapter 4 — Agent */}
        <Chapter pageIndex={3}>
          <div className="mt-auto mb-20 max-w-md ml-auto text-right pointer-events-auto">
            <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary mb-3">
              N3UR0 META X · SKILL: ASTROLOGY LENS
            </div>
            <p className="font-serif text-2xl md:text-3xl italic">
              "Your signal carries more than one story —<br/>
              let THE HOOD ORACLE read the lenses."
            </p>
          </div>
        </Chapter>

        {/* Chapter 5 — Sign-off */}
        <Chapter pageIndex={4}>
          <div className="m-auto text-center pointer-events-auto">
            <div className="font-serif text-6xl md:text-8xl leading-none">
              AKASHIC
              <br />
              <span className="neon-text">LENSES</span>
            </div>
            <div className="mt-4 text-xs font-mono tracking-[0.4em] text-muted-foreground">
              HOODORACLE.LOVABLE.APP
            </div>
            <div className="mt-8 flex gap-3 justify-center">
              <Link
                to="/agent"
                className="rounded-full bg-primary text-primary-foreground px-6 py-3 font-mono uppercase text-xs tracking-[0.25em] shadow-cyan"
              >
                Enter Agentropolis
              </Link>
              <Link
                to="/intake"
                className="rounded-full border border-accent/60 text-accent px-6 py-3 font-mono uppercase text-xs tracking-[0.25em]"
              >
                Run a reading
              </Link>
            </div>
          </div>
        </Chapter>
      </div>
    </Scroll>
  );
}
