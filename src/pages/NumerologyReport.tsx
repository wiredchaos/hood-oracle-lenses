import { Navigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { LensCard } from "@/components/LensCard";
import { useReading } from "@/state/ReadingContext";
import { NUMBER_MEANINGS } from "@/lib/lenses";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function NumerologyReport() {
  const { reading } = useReading();
  if (!reading) return <Navigate to="/intake" replace />;
  const { numerology: n } = reading;

  const rows: { label: string; n: number }[] = [
    { label: "Life Path", n: n.lifePath },
    { label: "Destiny / Expression", n: n.destiny },
    { label: "Soul Urge", n: n.soulUrge },
    { label: "Personality", n: n.personality },
    { label: "Birthday", n: n.birthday },
    { label: "Personal Year", n: n.personalYear },
  ];

  return (
    <AppShell>
      <h1 className="font-serif text-4xl md:text-5xl mb-2">Traditional <span className="lime-text">Numerology</span> Report</h1>
      <p className="text-muted-foreground mb-8 text-sm">Pythagorean system. Deterministic — same inputs always yield the same numbers.</p>

      <div className="grid gap-4 md:grid-cols-2">
        {rows.map(r => (
          <LensCard key={r.label} title={r.label} accent="lime" kicker={`Number ${r.n}`}>
            <div className="font-serif text-3xl">{NUMBER_MEANINGS[r.n]?.title}</div>
            <p className="text-muted-foreground">{NUMBER_MEANINGS[r.n]?.gist}</p>
          </LensCard>
        ))}
      </div>

      <div className="glass mt-8 p-6">
        <h2 className="font-serif text-2xl mb-2">How this was calculated</h2>
        <Accordion type="single" collapsible className="w-full">
          {n.workings.map((w, i) => (
            <AccordionItem key={i} value={`w-${i}`}>
              <AccordionTrigger className="text-sm">{w.label}</AccordionTrigger>
              <AccordionContent className="font-mono text-xs text-muted-foreground">{w.detail}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </AppShell>
  );
}
