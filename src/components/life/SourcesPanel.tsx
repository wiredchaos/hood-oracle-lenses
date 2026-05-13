import { useState } from "react";
import { Button } from "@/components/ui/button";
import { isNative } from "@/lib/native";
import { Activity, Smartphone, Watch, Lock } from "lucide-react";
import { toast } from "sonner";
import { upsertEntry, todayISO } from "@/lib/lifeTracker";

export function SourcesPanel() {
  const [busy, setBusy] = useState<string | null>(null);

  const tryDeviceSensors = async () => {
    setBusy("device");
    try {
      // Web: best-effort step pull via Generic Sensor API where available.
      // No real Health on web — we record a manual prompt to keep the source honest.
      const stepsStr = window.prompt("Today's step count from your phone's Health app:");
      if (stepsStr) {
        const steps = parseInt(stepsStr.replace(/\D/g, ""), 10);
        if (Number.isFinite(steps)) {
          upsertEntry({ date: todayISO(), source: "device", steps });
          toast.success(`Logged ${steps.toLocaleString()} steps from device.`);
        }
      }
      if (isNative()) {
        toast.info("Native Health plugin coming in next build.");
      }
    } finally {
      setBusy(null);
    }
  };

  const wearableSoon = () => toast.info("Wearable OAuth (Oura/Whoop/Fitbit) opens in next phase.");

  return (
    <section className="glass-strong p-5 space-y-3" aria-label="Data sources">
      <header className="flex items-baseline justify-between">
        <h2 className="font-display text-lg tracking-[0.18em] uppercase bone-text">Sources</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground flex items-center gap-1">
          <Lock className="h-3 w-3" /> Local only
        </span>
      </header>

      <Source icon={<Activity className="h-4 w-4" />} title="Manual check-in" status="Active"
        body="Log mood, energy, focus, sleep, workout, notes. The baseline." />
      <Source icon={<Smartphone className="h-4 w-4" />} title="Device sensors" status={isNative() ? "Beta" : "Web prompt"}
        body="Pull steps from Health/Fit. On web, paste from your phone."
        action={<Button size="sm" variant="outline" disabled={busy === "device"}
          className="rounded-full text-[10px] font-mono uppercase tracking-[0.2em]"
          onClick={tryDeviceSensors}>{busy === "device" ? "…" : "Pull steps"}</Button>} />
      <Source icon={<Watch className="h-4 w-4" />} title="Wearable APIs" status="Phase 2"
        body="Oura · Whoop · Fitbit · Apple Health via OAuth. Opt-in upgrade."
        action={<Button size="sm" variant="ghost"
          className="rounded-full text-[10px] font-mono uppercase tracking-[0.2em]"
          onClick={wearableSoon}>Notify me</Button>} />
    </section>
  );
}

function Source({ icon, title, status, body, action }: {
  icon: React.ReactNode; title: string; status: string; body: string; action?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-primary">{icon}</span>
          <span className="font-display text-sm tracking-[0.14em] uppercase truncate">{title}</span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{status}</span>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{body}</p>
      {action && <div className="mt-2 flex justify-end">{action}</div>}
    </div>
  );
}
