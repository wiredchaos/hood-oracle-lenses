import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { CopyBlock } from "@/components/CopyBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AGENTTV_FORMATS, AGENTTV_BUCKETS, buildEpisode } from "@/lib/content";
import { DEMO_AGENTTV_EPISODE } from "@/lib/demoSeed";
import { Tv, ExternalLink, Sparkles } from "lucide-react";

export default function AgentTvStudio() {
  const [params] = useSearchParams();
  const [title, setTitle] = useState("THE WOMAN WITHOUT A FACE");
  const [format, setFormat] = useState(AGENTTV_FORMATS[0].id);
  const [bucket, setBucket] = useState(AGENTTV_BUCKETS[0]);
  const ep = buildEpisode({ title, format, bucket });

  const loadDemo = () => {
    setTitle(DEMO_AGENTTV_EPISODE.title);
    setFormat(DEMO_AGENTTV_EPISODE.format);
    setBucket(DEMO_AGENTTV_EPISODE.bucket);
  };

  useEffect(() => { if (params.get("seed") === "demo") loadDemo(); }, [params]);

  return (
    <AppShell>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="chip"><Tv className="h-3 w-3" /> AGENTtv STUDIO</span>
          <h1 className="font-serif text-4xl mt-2">Broadcast surface inside Agentropolis.</h1>
          <p className="text-muted-foreground text-sm mt-1">THE HOOD ORACLE: NO DOX SIGNALS. Build episode packages for atvnetwork.</p>
        </div>
        <a href="https://atvnetwork.vercel.app" target="_blank" rel="noreferrer"
          className="chip-red chip"><ExternalLink className="h-3 w-3" /> atvnetwork.vercel.app</a>
      </header>

      <div className="glass p-4 mb-6 space-y-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1">Episode title</div>
          <Input value={title} onChange={e => setTitle(e.target.value)} className="bg-background/60" />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">Format</div>
          <div className="flex flex-wrap gap-2">
            {AGENTTV_FORMATS.map(f => (
              <Button key={f.id} size="sm" variant={format === f.id ? "default" : "outline"} onClick={() => setFormat(f.id)}
                className="rounded-full text-[11px] font-mono uppercase tracking-[0.15em]">
                {f.label} · {f.duration}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">Content bucket</div>
          <div className="flex flex-wrap gap-2">
            {AGENTTV_BUCKETS.map(b => (
              <Button key={b} size="sm" variant={bucket === b ? "default" : "outline"} onClick={() => setBucket(b)}
                className="rounded-full text-[11px] font-mono uppercase tracking-[0.15em]">{b}</Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-strong p-5 scanline">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">Episode package</div>
          <div className="font-serif text-2xl mt-1">{ep.title}</div>
          <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-mono">
            <span className="chip">{ep.format}</span>
            <span className="chip">{ep.duration}</span>
            <span className="chip-lime chip">{ep.bucket}</span>
          </div>
          <p className="mt-3 text-sm italic text-muted-foreground">Hook: {ep.hook}</p>
          <p className="mt-3 text-sm">CTA: {ep.cta}</p>
          <div className="mt-3 flex flex-wrap gap-1 text-[10px] font-mono">
            {ep.exportTargets.map(t => <span key={t} className="chip">→ {t}</span>)}
          </div>
        </div>
        <div className="space-y-3">
          <CopyBlock label="Voiceover script" text={ep.voScript} lang="vo" />
          <CopyBlock label="Scene direction" text={ep.sceneDirection} lang="scene" />
          <CopyBlock label="Remotion notes" text={ep.remotionNotes} lang="remotion" />
          <CopyBlock label="Image prompt" text={ep.imagePrompt} lang="prompt" />
          <CopyBlock label="Caption" text={ep.caption} lang="social" />
        </div>
      </div>
    </AppShell>
  );
}
