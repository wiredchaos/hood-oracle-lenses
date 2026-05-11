import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { LensCard } from "@/components/LensCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSettings, saveSettings, wipeAll, type Settings as S } from "@/lib/memory";
import { getPushState, registerPush, type PushState } from "@/lib/push";
import { isNative } from "@/lib/native";
import { toast } from "sonner";

const ALL_LENSES = ["Astrology","Numerology","Akashic","Fibonacci AI","Tarot/Chakra","Compatibility"];
const INTENSITIES = ["Grounded","Mystic","Full Akashic","Hood Oracle Unfiltered"];

export default function SettingsPage() {
  const [s, setS] = useState<S>(getSettings());
  const [push, setPush] = useState<PushState>({ supported: false, permission: "unknown" });
  useEffect(() => { getPushState().then(setPush); }, []);

  const update = <K extends keyof S>(k: K, v: S[K]) => setS(p => ({ ...p, [k]: v }));
  const persist = () => { saveSettings(s); toast.success("Settings saved."); };
  const togglePush = async () => {
    const next = await registerPush();
    setPush(next);
    if (next.permission === "granted") toast.success("Notifications enabled.");
    else if (next.permission === "denied") toast.error("Notifications blocked. Enable in system settings.");
    else if (!next.supported) toast.message("Open the installed iOS/Android app to enable push.");
  };

  const exportData = () => {
    toast("Export protocol stubbed for prototype.", { description: "Will package readings + journal + settings as JSON." });
  };
  const wipe = () => {
    if (confirm("Delete all readings and journal entries? This cannot be undone.")) {
      wipeAll(); toast.success("Memory Layer cleared.");
    }
  };

  return (
    <AppShell>
      <h1 className="font-serif text-4xl md:text-5xl mb-2">Settings</h1>
      <p className="text-muted-foreground mb-8 text-sm">Profile, lens defaults, and your Memory Layer controls.</p>

      <div className="grid gap-5 md:grid-cols-2">
        <LensCard title="Lens defaults" accent="cyan" kicker="Reading defaults">
          <div>
            <Label className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Default intensity</Label>
            <Select value={s.defaultIntensity} onValueChange={v=>update("defaultIntensity", v)}>
              <SelectTrigger className="mt-1.5"><SelectValue/></SelectTrigger>
              <SelectContent>{INTENSITIES.map(i=><SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Default lenses</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {ALL_LENSES.map(l => {
                const active = s.defaultLenses.includes(l);
                return (
                  <button key={l} type="button"
                    onClick={()=>update("defaultLenses", active ? s.defaultLenses.filter(x=>x!==l) : [...s.defaultLenses, l])}
                    className={`rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-[0.15em] ${
                      active ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground"
                    }`}>{l}</button>
                );
              })}
            </div>
          </div>
        </LensCard>

        <LensCard title="Numerology system" accent="lime" kicker="Algorithm">
          <Select value={s.numerologySystem} onValueChange={v=>update("numerologySystem", v)}>
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="Pythagorean">Pythagorean (active)</SelectItem>
              <SelectItem value="Chaldean" disabled>Chaldean (placeholder)</SelectItem>
              <SelectItem value="Kabbalah" disabled>Kabbalah (placeholder)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-2">Additional systems are wired into the lens engine for later activation.</p>
        </LensCard>

        <LensCard title="Share card style" accent="red" kicker="Premium output">
          <label className="flex items-center justify-between gap-3">
            <span className="text-sm">Cream card variant</span>
            <Switch checked={s.shareCardCream} onCheckedChange={v=>update("shareCardCream", v)} />
          </label>
        </LensCard>

        <LensCard title="Notifications" accent="cyan" kicker="Native push">
          <p className="text-sm text-muted-foreground">
            {isNative()
              ? `Permission: ${push.permission}`
              : "Available in the installed iOS/Android app. The web version cannot send push."}
          </p>
          <Button
            variant="outline"
            onClick={togglePush}
            disabled={!isNative() || push.permission === "granted"}
            className="rounded-full text-xs font-mono uppercase tracking-[0.2em] mt-2"
          >
            {push.permission === "granted" ? "Enabled" : "Enable notifications"}
          </Button>
        </LensCard>

        <LensCard title="Memory Layer" accent="red" kicker="User-owned data">
          <p className="text-sm text-muted-foreground">Readings and journal entries live on this device only.</p>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" onClick={exportData} className="rounded-full text-xs font-mono uppercase tracking-[0.2em]">Export data</Button>
            <Button variant="outline" onClick={wipe} className="rounded-full text-xs font-mono uppercase tracking-[0.2em] border-accent/60 text-accent hover:bg-accent/10 hover:text-accent">Delete data</Button>
          </div>
        </LensCard>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={persist} className="rounded-full bg-primary text-primary-foreground hover:bg-primary-glow shadow-cyan font-mono uppercase tracking-[0.2em] text-xs">Save settings</Button>
      </div>
    </AppShell>
  );
}
