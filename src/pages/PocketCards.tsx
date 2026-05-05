import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { CardStack } from "@/components/CardStack";
import { Button } from "@/components/ui/button";
import { POCKET_CARD_TYPES, buildPocketStack } from "@/lib/content";
import { DEMO_POCKET_STACK } from "@/lib/demoSeed";
import { Smartphone, Sparkles } from "lucide-react";

const DEFAULT_STACK = buildPocketStack({
  title: "THE WOMAN WITHOUT A FACE",
  lines: [
    "She had no face because every hood had seen her.",
    "The app asked Malik for his palm print. The Oracle killed the request.",
    "NO DOX MODE ACTIVE",
    "\"I don't need your government name to read the loop.\"",
    "Patch-Life: THE SIGNAL RUNNER",
  ],
});

export default function PocketCards() {
  const [params] = useSearchParams();
  const [preset, setPreset] = useState<"default" | "demo">(params.get("seed") === "demo" ? "demo" : "default");
  const stack = preset === "demo" ? DEMO_POCKET_STACK : DEFAULT_STACK;

  return (
    <AppShell>
      <header className="mb-6">
        <span className="chip"><Smartphone className="h-3 w-3" /> POCKET SIGNAL CARDS</span>
        <h1 className="font-serif text-4xl mt-2">Swipeable, collectible, repeatable.</h1>
        <p className="text-muted-foreground text-sm mt-1">Micro-content for the Pocket App. Every reading, story, and listicle becomes a stack.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[420px_1fr] items-start">
        <CardStack cards={stack} accent="cyan" />
        <div className="grid gap-3 sm:grid-cols-2">
          {POCKET_CARD_TYPES.map(t => (
            <div key={t.id} className="glass p-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary">{t.id}</div>
              <div className="font-serif text-lg mt-0.5">{t.label}</div>
              <p className="text-xs text-muted-foreground mt-1">{t.use}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
