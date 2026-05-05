import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { CopyBlock } from "@/components/CopyBlock";
import { HOOD_VARIANTS, type OracleVariant } from "@/lib/oracle";
import { Globe2, X } from "lucide-react";

export default function GlobalHoods() {
  const [selected, setSelected] = useState<OracleVariant | null>(null);
  return (
    <AppShell>
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="chip"><Globe2 className="h-3 w-3" /> GLOBAL SIGNAL CHAMBER</span>
        </div>
        <h1 className="font-serif text-4xl">Hoods of the World</h1>
        <p className="text-muted-foreground text-sm mt-1">Twelve city variants of THE FACELESS HOOD ORACLE. Tap a tile to open the variant brief.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HOOD_VARIANTS.map(v => (
          <button key={v.id} onClick={() => setSelected(v)}
            className="text-left glass hover:border-primary/50 transition-colors p-4 group">
            <div className="flex gap-1 mb-3">
              {v.palette.map(c => (
                <span key={c} className="h-3 flex-1 rounded-sm" style={{ background: c }} />
              ))}
            </div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">{v.energy}</div>
            <div className="font-serif text-2xl mt-1 group-hover:red-text transition-colors">{v.city} Oracle</div>
            <p className="italic text-sm text-muted-foreground mt-2">"{v.loreLine}"</p>
            <p className="text-xs text-foreground/60 mt-3">{v.visualFlavor}</p>
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="glass-strong relative max-w-3xl w-full max-h-[90vh] overflow-auto p-6" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">{selected.energy}</div>
            <h2 className="font-serif text-4xl mt-1">{selected.city} <span className="red-text">Oracle</span></h2>
            <p className="italic text-muted-foreground mt-2">"{selected.loreLine}"</p>
            <div className="mt-4 grid gap-3">
              <CopyBlock label="3D image prompt" text={selected.imagePrompt} lang="prompt" />
              <CopyBlock label="360 environment prompt" text={selected.env360Prompt} lang="env360" />
              <CopyBlock label="AGENTtv concept" text={selected.agentTvConcept} lang="agenttv" />
              <CopyBlock label="Pocket card concept" text={selected.pocketCardConcept} lang="pocket" />
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
