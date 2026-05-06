import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { CopyBlock } from "@/components/CopyBlock";
import { HOOD_VARIANTS, type OracleVariant } from "@/lib/oracle";
import { HOOD_PORTRAITS, HOOD_ENV360, HOOD_VIDEOS, HOOD_VIDEO_POSTERS } from "@/lib/oracleAssets";
import { VideoReportPlayer } from "@/components/VideoReportPlayer";
import type { ProductId } from "@/lib/entitlements";
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
            className="text-left glass hover:border-primary/50 transition-colors p-4 group overflow-hidden">
            <div className="relative -mx-4 -mt-4 mb-3 aspect-square overflow-hidden border-b border-border/40">
              <img src={HOOD_PORTRAITS[v.id]} alt={`${v.city} Oracle variant`} loading="lazy"
                width={1024} height={1024}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/95 to-transparent" />
              <div className="absolute left-3 right-3 bottom-2 flex gap-1">
                {v.palette.map(c => (
                  <span key={c} className="h-1.5 flex-1 rounded-sm" style={{ background: c }} />
                ))}
              </div>
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
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <img src={HOOD_PORTRAITS[selected.id]} alt={`${selected.city} Oracle portrait`}
                width={1024} height={1024} loading="lazy"
                className="rounded-xl border border-primary/30 shadow-cyan w-full h-auto" />
              <img src={HOOD_ENV360[selected.id]} alt={`${selected.city} Oracle 360 environment`}
                width={1920} height={960} loading="lazy"
                className="rounded-xl border border-accent/30 w-full h-auto object-cover" />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">{selected.energy}</div>
            <h2 className="font-serif text-4xl mt-1">{selected.city} <span className="red-text">Oracle</span></h2>
            <p className="italic text-muted-foreground mt-2">"{selected.loreLine}"</p>
            <div className="mt-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-2">Video message</div>
              <VideoReportPlayer
                src={HOOD_VIDEOS[selected.id]}
                poster={HOOD_VIDEO_POSTERS[selected.id]}
                productId={`oracle.${selected.id}` as ProductId}
                price={4}
                title={`${selected.city} Oracle Message`}
                filename={`oracle-${selected.id}.mp4`}
              />
            </div>
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
