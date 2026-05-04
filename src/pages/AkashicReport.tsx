import { Navigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { LensCard } from "@/components/LensCard";
import { useReading } from "@/state/ReadingContext";

export default function AkashicReport() {
  const { reading } = useReading();
  if (!reading) return <Navigate to="/intake" replace />;
  const a = reading.akashic;

  const sections: { title: string; body: string; accent?: "cyan" | "red" | "lime" }[] = [
    { title: "Soul Archive Fragment", body: a.soulFragment, accent: "cyan" },
    { title: "Ancestral Echo", body: a.ancestralEcho, accent: "red" },
    { title: "Pattern to Release", body: a.patternToRelease, accent: "red" },
    { title: "Gift to Integrate", body: a.giftToIntegrate, accent: "lime" },
    { title: "Shadow Loop", body: a.shadowLoop, accent: "red" },
    { title: "Practice for Integration", body: a.practice, accent: "cyan" },
  ];

  return (
    <AppShell>
      <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent mb-2">// Akashic Lens</div>
      <h1 className="font-serif text-4xl md:text-5xl mb-1">{a.archetype}</h1>
      <p className="text-muted-foreground mb-8 text-sm">Symbolic imprints only. No deterministic past-life claims.</p>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map(s => (
          <LensCard key={s.title} title={s.title} accent={s.accent} kicker="Reflective signal">
            <p>{s.body}</p>
          </LensCard>
        ))}
      </div>

      <div className="glass-strong mt-8 p-6 border-accent/40">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">Lore note from THE HOOD ORACLE</div>
        <p className="font-serif text-2xl mt-2">"{a.loreNote}"</p>
      </div>
    </AppShell>
  );
}
