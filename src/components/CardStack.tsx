import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingHolo } from "@/components/FloatingHolo";
import type { PocketCard } from "@/lib/content";

export function CardStack({ cards, accent = "cyan" }: { cards: PocketCard[]; accent?: "cyan" | "red" | "lime" }) {
  const [i, setI] = useState(0);
  const next = () => setI(v => Math.min(cards.length - 1, v + 1));
  const prev = () => setI(v => Math.max(0, v - 1));

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  });

  const card = cards[i];
  const ring = accent === "red" ? "border-accent/50" : accent === "lime" ? "border-lime/50" : "border-primary/50";

  return (
    <div className="space-y-3">
      <FloatingHolo accent={accent} intensity="full" className={`border ${ring}`}>
        <div className="relative overflow-hidden p-8 min-h-[280px] flex flex-col items-center justify-center text-center">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3" style={{ transform: "translateZ(30px)" }}>Card {card.n} / {cards.length}</div>
          {card.title && <div className="font-serif text-3xl mb-3 red-text" style={{ transform: "translateZ(50px)" }}>{card.title}</div>}
          <div className="text-lg text-foreground/90 max-w-md" style={{ transform: "translateZ(20px)" }}>{card.body}</div>
        </div>
      </FloatingHolo>
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={prev} disabled={i === 0} className="rounded-full">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-1.5">
          {cards.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-primary" : "w-1.5 bg-muted"}`} />
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={next} disabled={i === cards.length - 1} className="rounded-full">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
