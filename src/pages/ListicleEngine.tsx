import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { CopyBlock } from "@/components/CopyBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LISTICLE_TOPICS, PLATFORMS, buildListicle } from "@/lib/content";
import { ListOrdered } from "lucide-react";

export default function ListicleEngine() {
  const [topic, setTopic] = useState(LISTICLE_TOPICS[0]);
  const data = buildListicle(topic);
  return (
    <AppShell>
      <header className="mb-6">
        <span className="chip"><ListOrdered className="h-3 w-3" /> GTM LISTICLE ENGINE</span>
        <h1 className="font-serif text-4xl mt-2">Turn every reading into a listicle.</h1>
        <p className="text-muted-foreground text-sm mt-1">Distribution-ready content packs across {PLATFORMS.length} channels. No-dox, signal-first.</p>
      </header>

      <div className="glass p-4 mb-6 space-y-3">
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Topic seed</div>
        <Input value={topic} onChange={e => setTopic(e.target.value)} className="bg-background/60" />
        <div className="flex flex-wrap gap-2">
          {LISTICLE_TOPICS.map(t => (
            <Button key={t} size="sm" variant="outline" onClick={() => setTopic(t)}
              className="rounded-full text-[11px] font-mono uppercase tracking-[0.15em]">
              {t.split(" ").slice(0, 4).join(" ")}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass p-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">Title</div>
          <div className="font-serif text-2xl mt-1">{data.title}</div>
          <p className="text-sm text-muted-foreground mt-2 italic">{data.hook}</p>
          <ul className="mt-4 space-y-1 text-sm">
            {data.points.map(p => <li key={p}>· {p}</li>)}
          </ul>
        </div>
        <div className="space-y-3">
          <CopyBlock label="Video script" text={data.videoScript} lang="script" />
          <CopyBlock label="X thread" text={data.xThread.join("\n\n")} lang="x" />
          <CopyBlock label="Carousel copy" text={data.carousel.join("\n")} lang="carousel" />
          <CopyBlock label="SEO blog intro" text={data.seoIntro} lang="seo" />
        </div>
      </div>

      <div className="mt-6 glass p-4">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Distribution</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {PLATFORMS.map(p => <span key={p} className="chip">{p}</span>)}
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {data.tags.map(t => <span key={t} className="chip-lime chip">{t}</span>)}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">CTA: {data.cta}</p>
        <p className="mt-1 text-xs font-mono text-primary">→ {data.referralLink}</p>
      </div>
    </AppShell>
  );
}
