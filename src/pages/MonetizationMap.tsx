import { AppShell } from "@/components/AppShell";
import { MONETIZATION_NODES } from "@/lib/content";
import { ArrowRight, Coins } from "lucide-react";

const SURFACES = [
  "AKASHIC LENSES",
  "AGENTtv",
  "Pocket App",
  "WIRED CHAOS marketplace",
  "Agentropolis Skill Exchange",
  "Creator referral system",
  "Signal Credits",
  "Premium readings",
  "Creator packs",
  "360 Remotion packs",
];

export default function MonetizationMap() {
  return (
    <AppShell>
      <header className="mb-6">
        <span className="chip"><Coins className="h-3 w-3" /> MONETIZATION MAP</span>
        <h1 className="font-serif text-4xl mt-2">From signal to revenue.</h1>
        <p className="text-muted-foreground text-sm mt-1">The full pipeline. Every reading flows through every surface.</p>
      </header>

      <div className="glass-strong p-6 scanline">
        <div className="flex flex-wrap items-center gap-2">
          {MONETIZATION_NODES.map((n, i) => (
            <div key={n.id} className="flex items-center gap-2">
              <div className="rounded-xl border border-primary/30 bg-card/40 px-3 py-2 min-w-[140px]">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">{i + 1}</div>
                <div className="font-serif text-sm">{n.label}</div>
                <div className="text-[10px] text-muted-foreground">{n.note}</div>
              </div>
              {i < MONETIZATION_NODES.length - 1 && <ArrowRight className="h-4 w-4 text-accent shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <section className="mt-8">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3">Cross-application surfaces</div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SURFACES.map(s => (
            <div key={s} className="glass p-4">
              <div className="font-serif text-lg">{s}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 glass p-5">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-2">Clean architecture</div>
        <ul className="space-y-2 text-sm">
          <li><b>AKASHIC LENSES</b> · Free app + premium readings + SignalMatch.</li>
          <li><b>AGENTtv</b> · Broadcast arm. Stories and readings become shows.</li>
          <li><b>Pocket App</b> · Micro-content arm. Stories and readings become swipeable daily cards.</li>
          <li><b>UGC Forge</b> · Creator engine. Everything becomes TikTok, Shorts, Reels, X, carousels.</li>
          <li><b>GTM Listicle Engine</b> · Distribution engine. Everything becomes searchable, shareable listicles.</li>
          <li><b>Agentropolis Skill Exchange</b> · Economy layer. Other apps call the Oracle Skills.</li>
        </ul>
      </section>
    </AppShell>
  );
}
