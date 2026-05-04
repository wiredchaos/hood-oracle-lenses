import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useReading } from "@/state/ReadingContext";
import { DEMO_BIRTH, type BirthData, type LensIntensity } from "@/lib/lenses";
import { toast } from "sonner";

const ALL_LENSES = ["Astrology","Numerology","Akashic","Fibonacci AI","Tarot/Chakra","Compatibility"];
const INTENSITIES: LensIntensity[] = ["Grounded","Mystic","Full Akashic","Hood Oracle Unfiltered"];

export default function Intake() {
  const nav = useNavigate();
  const { runReading } = useReading();
  const [data, setData] = useState<BirthData>({ ...DEMO_BIRTH, name: "", fullBirthName: "", dob: "", tob: "", birthCity: "", currentCity: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof BirthData>(k: K, v: BirthData[K]) => setData(d => ({ ...d, [k]: v }));
  const toggleLens = (l: string) => update("lenses", data.lenses.includes(l) ? data.lenses.filter(x=>x!==l) : [...data.lenses, l]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name.trim() || !data.dob) { toast.error("Need at least a name and date of birth."); return; }
    if (data.lenses.length === 0) { toast.error("Choose at least one lens."); return; }
    setSubmitting(true);
    nav("/loading");
    await runReading(data);
    nav("/dashboard");
  };

  const fillDemo = () => setData(DEMO_BIRTH);

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-primary mb-2">// Intake protocol</div>
        <div className="flex items-end justify-between gap-4 mb-8">
          <h1 className="font-serif text-4xl md:text-5xl">Tell the Oracle what to read.</h1>
          <Button variant="ghost" onClick={fillDemo} className="text-primary hover:text-primary-glow font-mono text-xs uppercase tracking-[0.2em]">Use demo</Button>
        </div>

        <form onSubmit={submit} className="glass p-6 md:p-8 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Preferred name *">
              <Input value={data.name} onChange={e=>update("name", e.target.value)} maxLength={60} placeholder="Ari" />
            </Field>
            <Field label="Full birth name (numerology)">
              <Input value={data.fullBirthName||""} onChange={e=>update("fullBirthName", e.target.value)} maxLength={120} placeholder="Ariel Solene Vega" />
            </Field>
            <Field label="Date of birth *">
              <Input type="date" value={data.dob} onChange={e=>update("dob", e.target.value)} />
            </Field>
            <Field label="Time of birth">
              <Input type="time" value={data.tob||""} onChange={e=>update("tob", e.target.value)} disabled={data.timeUnknown} />
              <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Switch checked={!!data.timeUnknown} onCheckedChange={v=>update("timeUnknown", v)} /> Exact birth time unknown
              </label>
            </Field>
            <Field label="Birth city / country">
              <Input value={data.birthCity||""} onChange={e=>update("birthCity", e.target.value)} maxLength={100} placeholder="Brooklyn, NY" />
            </Field>
            <Field label="Current city (optional)">
              <Input value={data.currentCity||""} onChange={e=>update("currentCity", e.target.value)} maxLength={100} placeholder="Lisbon, PT" />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Lens intensity">
              <Select value={data.intensity} onValueChange={v=>update("intensity", v as LensIntensity)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {INTENSITIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Active lenses">
              <div className="flex flex-wrap gap-2">
                {ALL_LENSES.map(l => {
                  const active = data.lenses.includes(l);
                  return (
                    <button key={l} type="button" onClick={()=>toggleLens(l)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-mono uppercase tracking-[0.15em] transition-all ${
                        active ? "border-primary text-primary bg-primary/10 shadow-cyan" : "border-border text-muted-foreground hover:text-primary"
                      }`}>{l}</button>
                  );
                })}
              </div>
            </Field>
          </div>

          <div className="flex items-start gap-3 text-xs text-muted-foreground border-t border-border/60 pt-4">
            <Checkbox checked disabled />
            Reflection-only acknowledged. THE HOOD ORACLE will translate, not diagnose.
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={submitting}
              className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-cyan rounded-full px-6 font-mono uppercase tracking-[0.2em] text-xs">
              Generate reading
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
