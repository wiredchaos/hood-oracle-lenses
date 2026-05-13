import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { listEntries, rollingAverage, type LifeEntry } from "@/lib/lifeTracker";

const FIELDS: { key: keyof LifeEntry; label: string; color: string }[] = [
  { key: "mood", label: "Mood", color: "hsl(var(--primary))" },
  { key: "energy", label: "Energy", color: "hsl(var(--accent))" },
  { key: "focus", label: "Focus", color: "hsl(var(--shroud))" },
  { key: "sleepHours", label: "Sleep", color: "hsl(var(--gold))" },
];

export function TrendsChart() {
  const [entries, setEntries] = useState<LifeEntry[]>([]);
  useEffect(() => {
    const refresh = () => setEntries(listEntries());
    refresh();
    window.addEventListener("lifetracker:change", refresh);
    return () => window.removeEventListener("lifetracker:change", refresh);
  }, []);

  const data = useMemo(() => entries.slice(-30).map(e => ({
    date: e.date.slice(5),
    mood: e.mood, energy: e.energy, focus: e.focus, sleepHours: e.sleepHours,
  })), [entries]);

  const avgs = FIELDS.map(f => ({ ...f, avg: rollingAverage(entries, f.key, 7) }));

  return (
    <section className="glass-strong p-5 space-y-4" aria-label="Trends">
      <header className="flex items-baseline justify-between">
        <h2 className="font-display text-lg tracking-[0.18em] uppercase bone-text">Trends · 30d</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{entries.length} entries</span>
      </header>

      <div className="grid grid-cols-4 gap-2">
        {avgs.map(a => (
          <div key={a.key as string} className="rounded-lg border border-border/60 bg-card/40 p-2 text-center">
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{a.label} 7d</div>
            <div className="font-serif text-lg" style={{ color: a.color }}>
              {a.avg == null ? "—" : a.avg.toFixed(1)}
            </div>
          </div>
        ))}
      </div>

      {data.length > 0 ? (
        <div className="h-56 w-full">
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} domain={[0, 10]} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  fontSize: 11,
                }}
              />
              {FIELDS.map(f => (
                <Line key={f.key as string} type="monotone" dataKey={f.key as string}
                  stroke={f.color} strokeWidth={1.5} dot={false} connectNulls />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">Log a few days to see trends.</p>
      )}
    </section>
  );
}
