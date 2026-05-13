import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { DailyCheckIn } from "@/components/life/DailyCheckIn";
import { TrendsChart } from "@/components/life/TrendsChart";
import { SourcesPanel } from "@/components/life/SourcesPanel";
import { VaultPanel } from "@/components/life/VaultPanel";
import { currentStreak, listEntries } from "@/lib/lifeTracker";
import { Flame } from "lucide-react";

export default function LifeTracker() {
  const [streak, setStreak] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const refresh = () => {
      const all = listEntries();
      setStreak(currentStreak(all));
      setCount(all.length);
    };
    refresh();
    window.addEventListener("lifetracker:change", refresh);
    return () => window.removeEventListener("lifetracker:change", refresh);
  }, []);

  return (
    <AppShell>
      <title>Real Life Tracker — private, opt-in | Hood Oracle</title>
      <meta name="description" content="A real life tracker for those willing. Manual logging, optional device sensors, encrypted local-only vault. No accounts. No upload." />
      <link rel="canonical" href="/life" />

      <header className="space-y-3">
        <div className="editorial-kicker">REAL · OPT-IN · LOCAL ONLY</div>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight">
          Track your <span className="red-text">real</span> life.<br />
          On <span className="neon-text">your</span> device.
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Quantified for those who want it — mood, energy, focus, sleep, steps, HRV. Nothing leaves this device unless you export an encrypted vault you control. The symbolic{" "}
          <Link to="/demo/neuro-life" className="underline decoration-primary/60 underline-offset-4">NEURO Spiral</Link>{" "}
          stays available alongside.
        </p>
        <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="chip flex items-center gap-1"><Flame className="h-3 w-3 text-accent" /> Streak {streak}d</span>
          <span className="chip">{count} entries</span>
          <span className="chip">No backend</span>
          <span className="chip">No medical advice</span>
        </div>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <DailyCheckIn />
        <div className="space-y-4">
          <TrendsChart />
          <SourcesPanel />
          <VaultPanel />
        </div>
      </div>
    </AppShell>
  );
}
