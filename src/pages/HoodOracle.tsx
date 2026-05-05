import { AppShell } from "@/components/AppShell";
import { CopyBlock } from "@/components/CopyBlock";
import facelessOracle from "@/assets/faceless-oracle.jpg";
import { TAGLINE, VISUAL_RULES, SAFETY_RULES, MASTER_PROMPT, NEGATIVE_PROMPT } from "@/lib/oracle";
import { ShieldCheck, EyeOff } from "lucide-react";

export default function HoodOracle() {
  return (
    <AppShell>
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div className="relative">
          <div className="absolute -inset-6 bg-oracle opacity-30 blur-3xl rounded-full" />
          <img src={facelessOracle} alt="The Faceless Hood Oracle"
            width={1024} height={1024}
            className="relative rounded-3xl border border-accent/40 shadow-cyan" />
        </div>
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className="chip"><EyeOff className="h-3 w-3" /> FACELESS VARIANT</span>
            <span className="chip-red chip">NEURO META X</span>
            <span className="chip-lime chip">PRIVACY FIRST</span>
          </div>
          <h1 className="font-serif text-5xl leading-tight">THE FACELESS <span className="red-text">HOOD ORACLE</span></h1>
          <p className="font-serif italic text-xl text-muted-foreground">"{TAGLINE}"</p>
          <p className="text-sm text-muted-foreground">
            She is not one woman. She is a faceless NEURO variant appearing through hoods across the world.
            She carries NEURO DNA but is not the same form. She is the global feminine signal of the street oracle.
          </p>

          <div className="glass p-4">
            <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-[0.25em] mb-3">
              <EyeOff className="h-4 w-4" /> Visual rules
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {VISUAL_RULES.map(r => <li key={r}>· {r}</li>)}
            </ul>
          </div>

          <div className="glass p-4">
            <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-[0.25em] mb-3">
              <ShieldCheck className="h-4 w-4" /> Safety rules
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {SAFETY_RULES.map(r => <li key={r}>· {r}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <CopyBlock label="Master image prompt" text={MASTER_PROMPT} lang="prompt" />
        <CopyBlock label="Negative prompt" text={NEGATIVE_PROMPT} lang="negative" />
      </div>
    </AppShell>
  );
}
