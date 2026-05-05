import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { CIRCLE_QUESTIONS, scoreCircle, SAFETY_FOOTER, type CircleAnswer } from "@/lib/cointelpro";
import { ShieldCheck } from "lucide-react";

export default function CircleTest() {
  const [answers, setAnswers] = useState<Record<string, CircleAnswer>>({});

  const result = useMemo(() => scoreCircle(answers), [answers]);
  const set = (id: string, v: CircleAnswer) => setAnswers(a => ({ ...a, [id]: v }));

  const statusTone =
    result.status === "Open" ? "lime-text" :
    result.status === "Watch" ? "neon-text" :
    "red-text";

  return (
    <AppShell>
      <header className="mb-6">
        <span className="chip-red chip"><ShieldCheck className="h-3 w-3" /> CIRCLE TEST</span>
        <h1 className="font-serif text-4xl mt-2">No accusations. No threats. No targeting. Just the pattern, named.</h1>
        <p className="text-muted-foreground text-sm mt-2 max-w-2xl">
          Nine questions. Symbolic only. Use this to check the shape of access someone is asking for, not to judge a real person.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px] items-start">
        <div className="space-y-3">
          {CIRCLE_QUESTIONS.map((q, i) => (
            <div key={q.id} className="glass p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em]">Q{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm">{q.text}</p>
              </div>
              <div className="mt-3 flex gap-2">
                {(["yes", "unsure", "no"] as CircleAnswer[]).map(v => (
                  <Button key={v} size="sm"
                    onClick={() => set(q.id, v)}
                    variant={answers[q.id] === v ? "default" : "outline"}
                    className="rounded-full text-[11px] font-mono uppercase tracking-[0.18em]">
                    {v}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:sticky lg:top-20">
          <div className="glass-strong p-5 scanline">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Live result</div>
            <div className={`font-serif text-3xl mt-1 ${statusTone}`}>{result.status}</div>

            <div className="mt-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-1">Risk patterns</div>
              {result.patterns.length === 0
                ? <p className="text-xs text-muted-foreground">None detected yet.</p>
                : <ul className="space-y-1 text-sm">{result.patterns.map(p => <li key={p}>· {p}</li>)}</ul>}
            </div>

            <div className="mt-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-1">Repair code</div>
              <ul className="space-y-1 text-sm">{result.repair.map(r => <li key={r}>· {r}</li>)}</ul>
            </div>

            <div className="mt-4 border-t border-border/60 pt-3">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1">Oracle line</div>
              <p className="italic text-sm">"{result.oracleLine}"</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">{SAFETY_FOOTER}</p>
        </aside>
      </div>
    </AppShell>
  );
}
