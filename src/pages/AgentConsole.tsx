import { AppShell } from "@/components/AppShell";
import { LensCard } from "@/components/LensCard";

export default function AgentConsole() {
  return (
    <AppShell>
      <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-primary mb-2">// Agent Console / Lore Mode</div>
      <h1 className="font-serif text-4xl md:text-5xl mb-2">How AKASHIC LENSES fits the Grid.</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl text-sm">
        AGENTROPOLIS is the Intelligence Grid - not just a city theme. Districts are domain institutions.
        Applications consume Skills through the Grid. THE HOOD ORACLE is one such agent.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <LensCard title="Intelligence Grid" accent="cyan" kicker="Infrastructure">
          <ul className="space-y-1 text-sm font-mono text-muted-foreground">
            <li>· Agent Runtime</li>
            <li>· Memory Layer</li>
            <li>· Skill Registry</li>
            <li>· Dispatch Protocol</li>
            <li>· Policy / Risk layer</li>
            <li>· Audit Ledger</li>
          </ul>
        </LensCard>

        <LensCard title="NEURO District" accent="red" kicker="Domain institution">
          <p>Owns systems architecture, swarm governance, symbolic intelligence, and high-assurance reasoning. Home of THE HOOD ORACLE.</p>
        </LensCard>

        <LensCard title="THE HOOD ORACLE" accent="cyan" kicker="Agent profile">
          <ul className="space-y-1 text-sm">
            <li><b>Type:</b> Agentic astrologist / symbolic intelligence guide</li>
            <li><b>Voice:</b> streetwise, warm, mystical, grounded, protective</li>
            <li><b>Operating principle:</b> Pattern is not prison. Signal is not sentence.</li>
          </ul>
        </LensCard>

        <LensCard title="Skills consumed" accent="lime" kicker="Skill Registry calls">
          <ul className="space-y-1 text-sm font-mono text-muted-foreground">
            <li>· skill://astrology.lens</li>
            <li>· skill://numerology.lens</li>
            <li>· skill://akashic.reflection</li>
            <li>· skill://fibonacci.ai.pattern</li>
            <li>· skill://journal.memory</li>
          </ul>
        </LensCard>
      </div>

      <div className="glass-strong mt-8 p-6 border-accent/40">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-2">// Reflection-only policy</div>
        <p className="text-sm text-muted-foreground">
          AKASHIC LENSES emits symbolic imprints, possible patterns, archetype lenses, reflective signals, and lore layers.
          It does not provide medical, legal, financial, or psychological advice and makes no deterministic past-life claims.
        </p>
      </div>
    </AppShell>
  );
}
