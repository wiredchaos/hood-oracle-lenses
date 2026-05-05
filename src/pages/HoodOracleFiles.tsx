import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { CardStack } from "@/components/CardStack";
import { Button } from "@/components/ui/button";
import { PILOT_STORY, STORY_TEMPLATE_FIELDS, buildPocketStack } from "@/lib/content";
import { ROWHOME_STORY, ROWHOME_POCKET, SAFETY_FOOTER } from "@/lib/cointelpro";
import { BookText, Lock, Shield } from "lucide-react";

export default function HoodOracleFiles() {
  const stack = buildPocketStack({
    title: PILOT_STORY.title,
    lines: [
      "She had no face because every hood had seen her.",
      "The app asked Malik for his palm print. The Oracle killed the request.",
      "NO DOX MODE ACTIVE",
      "\"I don't need your government name to read the loop.\"",
      "Patch-Life: THE SIGNAL RUNNER",
    ],
  });

  return (
    <AppShell>
      <header className="mb-6">
        <span className="chip"><BookText className="h-3 w-3" /> HOOD ORACLE FILES</span>
        <h1 className="font-serif text-4xl mt-2">Short stories from the pattern.</h1>
        <p className="text-muted-foreground text-sm mt-1">Mythic vignettes from the global signal grid. Each story becomes an episode, a stack, a listicle.</p>
      </header>

      <article className="grid gap-6 lg:grid-cols-[1fr_360px] items-start">
        <div className="glass-strong p-6 scanline">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="chip-red chip">PILOT</span>
            <span className="chip">{PILOT_STORY.city}</span>
            <span className="chip-lime chip">{PILOT_STORY.variant.toUpperCase()} VARIANT</span>
          </div>
          <h2 className="font-serif text-3xl">{PILOT_STORY.title}</h2>
          <pre className="mt-4 whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-foreground/85">{PILOT_STORY.body}</pre>
          <div className="mt-6 border-t border-border/60 pt-4">
            <div className="font-serif text-2xl red-text">{PILOT_STORY.finalLine}</div>
            <p className="text-sm text-muted-foreground mt-2">{PILOT_STORY.cta}</p>
          </div>
        </div>

        <aside className="space-y-5">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-2">Pocket preview</div>
            <CardStack cards={stack} accent="red" />
          </div>
          <div className="glass p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-2">Story template</div>
            <ul className="space-y-1 text-sm">
              {STORY_TEMPLATE_FIELDS.map(f => <li key={f} className="font-mono text-xs">· {f}</li>)}
            </ul>
          </div>
          <div className="glass p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-2">Jump to</div>
            <a href="#philly" className="text-sm hover:text-accent">→ Daughter of the Rowhome Fire (Philly)</a>
          </div>
        </aside>
      </article>

      {/* Philly / COINTELPRO chapter */}
      <article id="philly" className="mt-14 grid gap-6 lg:grid-cols-[1fr_360px] items-start scroll-mt-20">
        <div className="glass-strong p-6 scanline">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="chip-red chip"><Shield className="h-3 w-3" /> COINTELPRO LINK</span>
            <span className="chip">{ROWHOME_STORY.city}</span>
            <span className="chip-lime chip">PHILLY VARIANT</span>
          </div>
          <h2 className="font-serif text-3xl">{ROWHOME_STORY.title}</h2>

          <div className="mt-4 rounded-lg border border-accent/40 bg-accent/5 p-4 grid gap-1 sm:grid-cols-3 text-[11px] font-mono uppercase tracking-[0.18em]">
            <div><Lock className="inline h-3 w-3 mr-1 text-accent" /> Root Memory: <span className="text-accent">{ROWHOME_STORY.redactBox.rootMemory}</span></div>
            <div>Visibility: <span className="text-accent">{ROWHOME_STORY.redactBox.visibility}</span></div>
            <div>Access: <span className="text-accent">{ROWHOME_STORY.redactBox.access}</span></div>
          </div>

          <pre className="mt-5 whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-foreground/85">{ROWHOME_STORY.body}</pre>

          <div className="mt-6 border-t border-border/60 pt-4">
            <div className="font-serif text-2xl red-text">{ROWHOME_STORY.finalLine}</div>
            <p className="text-sm text-muted-foreground mt-2">{ROWHOME_STORY.cta}</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <Button asChild className="rounded-full bg-accent text-accent-foreground shadow-red font-mono text-xs uppercase tracking-[0.2em]">
                <Link to="/circle-test">Run the Circle Test</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full font-mono text-xs uppercase tracking-[0.2em]">
                <Link to="/echoes">Open Movement Echoes</Link>
              </Button>
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-2">Rowhome Pocket Stack</div>
            <CardStack cards={ROWHOME_POCKET} accent="red" />
          </div>
          <div className="glass p-4 text-xs text-muted-foreground">{SAFETY_FOOTER}</div>
        </aside>
      </article>
    </AppShell>
  );
}
