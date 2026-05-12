import { cn } from "@/lib/utils";

const LAYERS = [
  {
    n: "L3",
    name: "SHROUD",
    sub: "Invisible worker",
    body: "AI agents act on your behalf, identity-shielded.",
    accent: "violet" as const,
  },
  {
    n: "L2",
    name: "MONERO / XMR",
    sub: "Invisible currency",
    body: "Ring signatures, stealth addresses, unlinkable receipts.",
    accent: "gold" as const,
  },
  {
    n: "L1",
    name: "TOR / MIXNET",
    sub: "Invisible transport",
    body: "Onion routing & traffic mixing at the network layer.",
    accent: "cyan" as const,
  },
];

const ACCENT: Record<"violet" | "gold" | "cyan", string> = {
  violet: "border-shroud/40 text-shroud shadow-shroud",
  gold: "border-gold/40 text-gold",
  cyan: "border-primary/40 text-primary shadow-cyan",
};

export function ShroudLayerStack() {
  return (
    <div className="space-y-3">
      {LAYERS.map((l, i) => (
        <div
          key={l.n}
          className={cn(
            "glass-strong rounded-xl border-l-2 p-4 transition-transform hover:translate-x-1",
            ACCENT[l.accent],
          )}
          style={{ marginLeft: `${i * 12}px` }}
        >
          <div className="flex items-baseline justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] opacity-70">{l.n}</span>
              <span className="font-display text-base tracking-[0.18em] uppercase">{l.name}</span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">{l.sub}</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{l.body}</p>
        </div>
      ))}
    </div>
  );
}
