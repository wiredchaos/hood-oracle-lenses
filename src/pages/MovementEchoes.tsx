import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { MOVEMENT_ECHOES, SAFETY_FOOTER } from "@/lib/cointelpro";
import { Eye, EyeOff, Library } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function MovementEchoes() {
  const [params] = useSearchParams();
  const [reveal, setReveal] = useState(params.get("layer") === "knowers");

  return (
    <AppShell>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="chip"><Library className="h-3 w-3" /> MOVEMENT ECHOES</span>
          <h1 className="font-serif text-4xl mt-2">Lineage gallery. Public lore on top. Knowers' Layer underneath.</h1>
          <p className="text-muted-foreground text-sm mt-2 max-w-2xl">
            Twelve echoes from the global signal grid. Public lore is safe for all readers. The Knowers' Layer is for those who already carry the after.
          </p>
        </div>
        <Button variant="outline" onClick={() => setReveal(r => !r)}
          className="rounded-full text-[11px] font-mono uppercase tracking-[0.2em]">
          {reveal ? <><EyeOff className="h-3 w-3 mr-2" /> Hide Knowers' Layer</> : <><Eye className="h-3 w-3 mr-2" /> Reveal Knowers' Layer</>}
        </Button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MOVEMENT_ECHOES.map(e => (
          <article key={e.id} className="glass p-5">
            <div className="flex items-center justify-between">
              <span className="chip">{e.city}</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent">{e.codedLabel}</span>
            </div>
            <h3 className="font-serif text-2xl mt-3">{e.publicTitle}</h3>
            <p className="text-sm text-muted-foreground mt-2">{e.publicLore}</p>

            <div className={`mt-4 rounded-lg border p-3 ${reveal ? "border-accent/40 bg-accent/5" : "border-border/60 bg-muted/30"}`}>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-1">Knowers' Layer</div>
              {reveal ? (
                <>
                  <p className="text-sm">{e.hiddenEcho}</p>
                  <p className="text-xs text-muted-foreground italic mt-1">Tone: {e.tone}</p>
                </>
              ) : (
                <div className="space-y-1.5">
                  <div className="h-3 rounded bg-foreground/70 w-3/4" />
                  <div className="h-3 rounded bg-foreground/60 w-2/3" />
                  <div className="h-3 rounded bg-foreground/50 w-1/2" />
                </div>
              )}
            </div>

            <p className="mt-4 italic text-sm">"{e.oracleLine}"</p>
          </article>
        ))}
      </div>

      <footer className="mt-8 text-xs text-muted-foreground">{SAFETY_FOOTER}</footer>
    </AppShell>
  );
}
