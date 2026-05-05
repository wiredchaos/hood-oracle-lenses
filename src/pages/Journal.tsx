import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { LensCard } from "@/components/LensCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star, Trash2 } from "lucide-react";
import { deleteJournal, getJournal, saveJournal, toggleFavorite, type JournalEntry } from "@/lib/memory";
import { toast } from "sonner";

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [draft, setDraft] = useState({ lens: "Reflection", body: "" });

  const refresh = () => setEntries(getJournal());
  useEffect(refresh, []);

  const save = () => {
    if (!draft.body.trim()) return;
    saveJournal({ id: crypto.randomUUID(), createdAt: new Date().toISOString(), lens: draft.lens || "Reflection", body: draft.body.trim().slice(0, 4000) });
    setDraft({ lens: "Reflection", body: "" });
    refresh();
    toast.success("Saved to Memory Layer.");
  };

  return (
    <AppShell>
      <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-primary mb-2">// Memory Layer</div>
      <h1 className="font-serif text-4xl md:text-5xl mb-2">Journal</h1>
      <p className="text-muted-foreground mb-8 text-sm">Your reflections, stored locally. User-owned app data - nothing leaves this device.</p>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <LensCard title="New entry" accent="cyan" kicker="Capture a signal">
          <Input value={draft.lens} maxLength={40} onChange={e=>setDraft(d=>({...d, lens: e.target.value}))} placeholder="Lens (e.g. Akashic)" />
          <Textarea value={draft.body} onChange={e=>setDraft(d=>({...d, body: e.target.value}))}
            maxLength={4000} placeholder="What did the reading surface for you?" className="min-h-[160px]" />
          <Button onClick={save} className="rounded-full bg-primary text-primary-foreground hover:bg-primary-glow shadow-cyan font-mono uppercase tracking-[0.2em] text-xs">Save reflection</Button>
        </LensCard>

        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="glass p-10 text-center">
              <div className="font-serif text-2xl">No memories yet.</div>
              <p className="text-muted-foreground text-sm mt-2">Your saved reflections will appear here, sorted by recency.</p>
            </div>
          ) : entries.map(e => (
            <article key={e.id} className="glass p-5 animate-fade-up">
              <header className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary">{e.lens}</div>
                  <div className="text-xs text-muted-foreground">{new Date(e.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={()=>{toggleFavorite(e.id); refresh();}}>
                    <Star className={`h-4 w-4 ${e.favorite ? "fill-lime text-lime" : "text-muted-foreground"}`} />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={()=>{deleteJournal(e.id); refresh();}}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </header>
              {e.prompt && <p className="italic text-muted-foreground text-sm mb-2">Prompt: "{e.prompt}"</p>}
              {e.body ? <p className="text-sm whitespace-pre-wrap">{e.body}</p>
                      : <p className="text-xs font-mono text-muted-foreground">- Empty draft -</p>}
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
