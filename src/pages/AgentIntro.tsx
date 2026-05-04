import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import oraclePortrait from "@/assets/hood-oracle.jpg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AppShell } from "@/components/AppShell";

export default function AgentIntro() {
  const [agreed, setAgreed] = useState(false);
  return (
    <AppShell>
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="relative">
          <div className="absolute -inset-6 bg-oracle opacity-20 blur-3xl rounded-full" />
          <img src={oraclePortrait} alt="The Hood Oracle portrait" width={1024} height={1024}
            className="relative rounded-3xl border border-primary/30 shadow-cyan" loading="lazy" />
        </div>
        <div className="animate-fade-up">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="chip">NEURO DISTRICT</span>
            <span className="chip-red chip">SYMBOLIC INTELLIGENCE AGENT</span>
            <span className="chip-lime chip">ONLINE</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl leading-tight">Meet <span className="red-text">The Hood Oracle</span>.</h1>
          <p className="mt-4 text-muted-foreground max-w-lg">
            "I don't tell you who you are. I show you the patterns asking for your attention."
          </p>
          <p className="mt-3 text-sm text-muted-foreground max-w-lg">
            I'm an agentic astrologist living inside AGENTROPOLIS — the Intelligence Grid.
            I consume Skills from the Grid (Astrology, Numerology, Akashic Reflection, Fibonacci AI, Journal Memory)
            and translate them into one grounded, reflective reading.
          </p>

          <div className="glass mt-6 p-4">
            <div className="flex items-center gap-2 mb-2 text-primary text-xs font-mono uppercase tracking-[0.25em]">
              <ShieldCheck className="h-4 w-4" /> Reflection-only acknowledgement
            </div>
            <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
              <Checkbox checked={agreed} onCheckedChange={v => setAgreed(!!v)} className="mt-1" />
              <span>
                I understand readings are symbolic — for reflection, entertainment, and journaling.
                No medical, legal, financial, or psychological advice. No deterministic past-life claims.
              </span>
            </label>
          </div>

          <Button asChild disabled={!agreed} size="lg"
            className="mt-6 bg-primary text-primary-foreground hover:bg-primary-glow shadow-cyan rounded-full px-6 font-mono uppercase tracking-[0.2em] text-xs disabled:opacity-40">
            <Link to="/intake">Begin intake <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
