import { useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { ShroudLayerStack } from "@/components/shroud/ShroudLayerStack";
import { ShroudTierGate } from "@/components/shroud/ShroudTierGate";
import { applyTierAttribute } from "@/lib/shroud";
import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

export default function Shroud() {
  useEffect(() => {
    applyTierAttribute();
    document.title = "Shroud District — Agentic Anonymity as a Service";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Shroud District: anonymity-as-a-service for AI agents. Hide what you're doing, not just what you have. Layer 3 above Monero and Tor.");
  }, []);

  return (
    <AppShell>
      <article className="space-y-10">
        <header className="space-y-4">
          <div className="flex items-center gap-2 editorial-meta">
            <Activity className="h-3 w-3 text-shroud animate-flicker" />
            <span>PRIVACY MESH · ONLINE</span>
            <span className="opacity-50">//</span>
            <span>LAYER 3 · SHROUD</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-tight bone-text leading-[0.95]">
            Hide what you're <em className="not-italic text-shroud">doing</em>,
            <br className="hidden sm:block" /> not just what you have.
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Monero made currency invisible. Shroud makes <strong>operations</strong> invisible.
            Subscribe your agent to a privacy mesh that obscures intent, origin, and execution path.
          </p>
        </header>

        <section aria-labelledby="stack" className="space-y-4">
          <h2 id="stack" className="font-display text-xl tracking-[0.18em] uppercase bone-text">The Anonymity Stack</h2>
          <ShroudLayerStack />
        </section>

        <ShroudTierGate />

        <section className="glass-strong rounded-xl p-5 space-y-3">
          <h2 className="font-display text-lg tracking-[0.18em] uppercase bone-text">Why Monero Underneath</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Shroud is the operational layer; Monero is the cryptographic precedent.
            We accept XMR for tier upgrades — no card networks, no KYC, no surveillance trail.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/donate" className="chip text-[10px]">→ Donate / Pay with XMR</Link>
            <a href="https://www.getmonero.org/downloads/" target="_blank" rel="noreferrer" className="chip text-[10px]">Get Monero GUI ↗</a>
            <a href="https://github.com/monero-project/monero-gui" target="_blank" rel="noreferrer" className="chip text-[10px]">monero-project/monero-gui ↗</a>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Shroud District — Agentic Anonymity as a Service",
              serviceType: "Privacy mesh for AI agents",
              provider: { "@type": "Organization", name: "Hood Oracle" },
              areaServed: "Global",
              offers: [
                { "@type": "Offer", name: "Veil", price: "0", priceCurrency: "USD" },
                { "@type": "Offer", name: "Cloak", price: "12", priceCurrency: "USD" },
                { "@type": "Offer", name: "Sovereign", price: "49", priceCurrency: "USD" },
              ],
            }),
          }}
        />
      </article>
    </AppShell>
  );
}
