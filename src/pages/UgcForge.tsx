import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { CopyBlock } from "@/components/CopyBlock";
import { CardStack } from "@/components/CardStack";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { buildUgcBundle } from "@/lib/content";
import { Hammer } from "lucide-react";

export default function UgcForge() {
  const [seed, setSeed] = useState("7 Signs You're in a Mirror Connection");
  const b = buildUgcBundle(seed);
  return (
    <AppShell>
      <header className="mb-6">
        <span className="chip"><Hammer className="h-3 w-3" /> UGC FORGE</span>
        <h1 className="font-serif text-4xl mt-2">One signal, every surface.</h1>
        <p className="text-muted-foreground text-sm mt-1">Drop a seed. Get a multi-platform creator pack with referral and monetization wired in.</p>
      </header>

      <div className="glass p-4 mb-6 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[240px]">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1">Seed</div>
          <Input value={seed} onChange={e => setSeed(e.target.value)} className="bg-background/60" />
        </div>
        <Button onClick={() => setSeed(s => s + " ")}
          className="rounded-full bg-primary text-primary-foreground shadow-cyan font-mono text-xs uppercase tracking-[0.2em]">
          Reforge
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <CopyBlock label="TikTok" text={b.tiktok} lang="tiktok" />
          <CopyBlock label="YouTube Shorts" text={b.shorts} lang="shorts" />
          <CopyBlock label="Reel" text={b.reel} lang="reel" />
          <CopyBlock label="X post" text={b.xPost} lang="x" />
          <CopyBlock label="X thread" text={b.xThread.join("\n\n")} lang="x" />
          <CopyBlock label="Carousel" text={b.carousel.join("\n")} lang="carousel" />
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-2">Pocket stack</div>
            <CardStack cards={b.pocketStack} accent="lime" />
          </div>
          <div className="glass p-4 space-y-2 text-sm">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">Monetization</div>
            <p><b>Referral CTA:</b> {b.referralCta}</p>
            <p><b>Signal Link:</b> <span className="font-mono text-primary text-xs">{b.signalLink}</span></p>
            <p><b>Creator credit:</b> <span className="font-mono text-xs">{b.creatorCredit}</span></p>
            <p><b>Revenue:</b> {b.monetization}</p>
          </div>
          <div className="glass p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-1">AGENTtv episode</div>
            <div className="font-serif text-lg">{b.episode.title}</div>
            <div className="text-xs text-muted-foreground">{b.episode.format} · {b.episode.duration} · {b.episode.bucket}</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
