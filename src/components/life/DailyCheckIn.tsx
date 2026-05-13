import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { tapHaptic } from "@/lib/native";
import { toast } from "sonner";
import { getEntry, todayISO, upsertEntry, type LifeEntry } from "@/lib/lifeTracker";

const num = (v: string) => (v === "" ? undefined : Number(v));

export function DailyCheckIn({ date = todayISO(), onSaved }: { date?: string; onSaved?: (e: LifeEntry) => void }) {
  const [sleep, setSleep] = useState<number>(7);
  const [mood, setMood] = useState<number>(6);
  const [energy, setEnergy] = useState<number>(6);
  const [focus, setFocus] = useState<number>(6);
  const [workout, setWorkout] = useState<boolean>(false);
  const [steps, setSteps] = useState<string>("");
  const [hr, setHr] = useState<string>("");
  const [hrv, setHrv] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    const e = getEntry(date);
    if (!e) return;
    if (e.sleepHours != null) setSleep(e.sleepHours);
    if (e.mood != null) setMood(e.mood);
    if (e.energy != null) setEnergy(e.energy);
    if (e.focus != null) setFocus(e.focus);
    if (e.workout != null) setWorkout(e.workout);
    if (e.steps != null) setSteps(String(e.steps));
    if (e.restingHr != null) setHr(String(e.restingHr));
    if (e.hrv != null) setHrv(String(e.hrv));
    if (e.notes) setNotes(e.notes);
  }, [date]);

  const save = () => {
    tapHaptic();
    const saved = upsertEntry({
      date, source: "manual",
      sleepHours: sleep, mood, energy, focus, workout,
      steps: num(steps), restingHr: num(hr), hrv: num(hrv),
      notes: notes.trim() || undefined,
    });
    toast.success("Logged. Stays on this device.");
    onSaved?.(saved);
  };

  return (
    <section className="glass-strong p-5 space-y-5" aria-label="Daily check-in">
      <header className="flex items-baseline justify-between">
        <h2 className="font-display text-lg tracking-[0.18em] uppercase bone-text">Today · {date}</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Manual</span>
      </header>

      <ScaleRow label="Sleep" value={sleep} onChange={setSleep} min={0} max={14} step={0.5} suffix="h" />
      <ScaleRow label="Mood" value={mood} onChange={setMood} />
      <ScaleRow label="Energy" value={energy} onChange={setEnergy} />
      <ScaleRow label="Focus" value={focus} onChange={setFocus} />

      <div className="flex items-center justify-between">
        <Label className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Workout today</Label>
        <Switch checked={workout} onCheckedChange={setWorkout} />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <NumField label="Steps" value={steps} onChange={setSteps} placeholder="8000" />
        <NumField label="Rest HR" value={hr} onChange={setHr} placeholder="62" />
        <NumField label="HRV" value={hrv} onChange={setHrv} placeholder="55" />
      </div>

      <div>
        <Label className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Notes</Label>
        <Textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
          placeholder="What shaped today?" className="mt-1 bg-background/40" />
      </div>

      <Button onClick={save} className="w-full rounded-full font-mono text-[11px] uppercase tracking-[0.22em]">
        Save check-in
      </Button>
    </section>
  );
}

function ScaleRow({ label, value, onChange, min = 1, max = 10, step = 1, suffix = "" }: {
  label: string; value: number; onChange: (v: number) => void;
  min?: number; max?: number; step?: number; suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <Label className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</Label>
        <span className="font-serif text-base">{value}{suffix}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={v => onChange(v[0])} />
    </div>
  );
}

function NumField({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <Label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</Label>
      <Input type="number" inputMode="numeric" value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)} className="mt-1 bg-background/40" />
    </div>
  );
}
