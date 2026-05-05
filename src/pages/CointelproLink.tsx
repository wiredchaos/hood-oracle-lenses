import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Shield, ExternalLink, Lock } from "lucide-react";
import {
  COINTELPRO_URL, INTEGRATION, SAFETY_FOOTER, PRIVACY_CHIPS,
  CODED_LABELS, VISIBILITY_MODES, AGENTS, LINKED_MODULES,
} from "@/lib/cointelpro";

export default function CointelproLink() {
  return (
    <AppShell>
      <header className="mb-6">
        <span className="chip-red chip"><Shield className="h-3 w-3" /> {INTEGRATION.label}</span>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">{INTEGRATION.title}</h1>
        <p className="text-muted-foreground text-sm mt-3 max-w-2xl">{INTEGRATION.copy}</p>
      </header>

      <section className="glass-strong p-6 scanline mb-6">
        <div className="flex flex-wrap gap-3">
          {INTEGRATION.ctas.map(c => (
            <Button key={c.label} asChild
              className={
                c.style === "primary"
                  ? "rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-red font-mono text-xs uppercase tracking-[0.2em]"
                  : c.style === "outline"
                  ? "rounded-full border border-primary/60 bg-transparent text-primary hover:bg-primary/10 font-mono text-xs uppercase tracking-[0.2em]"
                  : "rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 font-mono text-xs uppercase tracking-[0.2em]"
              }>
              <Link to={c.to}>{c.label}</Link>
            </Button>
          ))}
          <a href={COINTELPRO_URL} target="_blank" rel="noreferrer"
             className="chip-red chip"><ExternalLink className="h-3 w-3" /> c0intelprotocol.lovable.app</a>
        </div>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {PRIVACY_CHIPS.map(p => <span key={p} className="chip"><Lock className="h-3 w-3" /> {p}</span>)}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="glass p-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-3">Linked modules</div>
          <ul className="space-y-2">
            {LINKED_MODULES.map(m => (
              <li key={m.to}>
                <Link to={m.to} className="flex items-baseline justify-between gap-3 hover:text-primary">
                  <span className="font-serif text-lg">{m.label}</span>
                  <span className="text-xs text-muted-foreground font-mono">{m.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass p-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-3">Agents on this layer</div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {AGENTS.map(a => (
              <li key={a.id} className="rounded-lg border border-border/60 p-3">
                <div className="font-serif text-base">{a.name}</div>
                <div className="text-xs text-muted-foreground">{a.role}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass p-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-lime mb-3">Coded labels</div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {CODED_LABELS.map(c => (
              <li key={c.id} className="rounded-lg border border-lime/30 bg-lime/5 p-3">
                <div className="font-mono text-xs uppercase tracking-[0.18em] lime-text">{c.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.note}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass p-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-3">Visibility modes</div>
          <ul className="space-y-2">
            {VISIBILITY_MODES.map(v => (
              <li key={v.id} className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{v.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{v.note}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="mt-8 glass p-4 text-xs text-muted-foreground">
        {SAFETY_FOOTER}
      </footer>
    </AppShell>
  );
}
