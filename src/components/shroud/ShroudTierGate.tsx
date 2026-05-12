import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { SHROUD_TIERS, SHROUD_PRODUCTS, getShroudTier, setShroudTier, type ShroudTier } from "@/lib/shroud";
import { MoneroPayButton } from "@/components/shared/MoneroPayButton";
import { tapHaptic } from "@/lib/native";
import { toast } from "sonner";

const ACCENT: Record<"cyan" | "violet" | "gold", string> = {
  cyan: "border-primary/40 hover:border-primary text-primary",
  violet: "border-shroud/40 hover:border-shroud text-shroud",
  gold: "border-gold/40 hover:border-gold text-gold",
};

export function ShroudTierGate() {
  const [tier, setTier] = useState<ShroudTier>("veil");

  useEffect(() => {
    setTier(getShroudTier());
    const onChange = () => setTier(getShroudTier());
    window.addEventListener("shroud:tier", onChange);
    return () => window.removeEventListener("shroud:tier", onChange);
  }, []);

  const activate = (id: ShroudTier) => {
    tapHaptic();
    setShroudTier(id);
    setTier(id);
    toast.success(`${id.toUpperCase()} tier active.`);
  };

  return (
    <section aria-labelledby="shroud-tiers" className="space-y-4">
      <header className="flex items-baseline justify-between">
        <h2 id="shroud-tiers" className="font-display text-xl tracking-[0.18em] uppercase bone-text">Subscription Monolith</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Active: {tier}</span>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {SHROUD_TIERS.map(t => {
          const active = tier === t.id;
          return (
            <article
              key={t.id}
              className={cn(
                "glass-strong rounded-xl p-4 border transition-all",
                ACCENT[t.accent],
                active && "ring-1 ring-current",
              )}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg tracking-[0.18em] uppercase">{t.name}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-80">
                  {t.price === 0 ? "Free" : `$${t.price}/mo`}
                </span>
              </div>
              <dl className="mt-3 space-y-2 text-xs">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">Hides</dt>
                  <dd className="text-foreground/90">{t.hides}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">Mechanism</dt>
                  <dd className="text-muted-foreground leading-relaxed">{t.mechanism}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-col gap-2">
                {active ? (
                  <Button disabled size="sm" className="rounded-full text-[11px] font-mono uppercase tracking-[0.18em]">
                    <Check className="h-3.5 w-3.5 mr-2" /> Active
                  </Button>
                ) : t.price === 0 ? (
                  <Button onClick={() => activate(t.id)} size="sm" className="rounded-full text-[11px] font-mono uppercase tracking-[0.18em]">
                    <ShieldCheck className="h-3.5 w-3.5 mr-2" /> Activate
                  </Button>
                ) : (
                  <>
                    <Button onClick={() => activate(t.id)} size="sm" className="rounded-full text-[11px] font-mono uppercase tracking-[0.18em]">
                      <Lock className="h-3.5 w-3.5 mr-2" /> Subscribe ${t.price}
                    </Button>
                    <MoneroPayButton
                      productId={t.id === "sovereign" ? SHROUD_PRODUCTS.sovereign : SHROUD_PRODUCTS.cloak}
                      title={`Shroud ${t.name}`}
                      amountUsd={t.price}
                      onUnlocked={() => { setTier(getShroudTier()); }}
                      label="Pay XMR"
                    />
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
