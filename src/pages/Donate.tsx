import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, ShieldCheck, Heart } from "lucide-react";
import { MONERO_ADDRESS, MONERO_IS_PLACEHOLDER, moneroUri, shortAddr, MONERO_GUI_URL, MONERO_GUI_REPO } from "@/lib/monero";
import { tapHaptic, selectionHaptic } from "@/lib/native";
import { grantUnlock } from "@/lib/entitlements";
import { toast } from "sonner";

export default function Donate() {
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);
  const [tx, setTx] = useState("");
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Donate with Monero — Hood Oracle";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Support Hood Oracle privately with Monero (XMR). No KYC, no card networks, no surveillance trail.");
    QRCode.toDataURL(moneroUri(undefined, "Hood Oracle Donation"), {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 320,
      color: { dark: "#0A1014", light: "#F0E7D6" },
    }).then(setQr).catch(() => {});
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(MONERO_ADDRESS);
      setCopied(true);
      tapHaptic();
      toast.success("XMR address copied");
      setTimeout(() => setCopied(false), 1800);
    } catch { toast.error("Copy failed"); }
  };

  const submitTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (tx.trim().length < 16) { toast.error("Paste a valid tx hash"); return; }
    const c = `XMR-${tx.trim().slice(0, 6).toUpperCase()}-${Date.now().toString(36).toUpperCase().slice(-4)}`;
    try {
      const log = JSON.parse(localStorage.getItem("oracle.xmr.donate") || "[]");
      log.push({ tx: tx.trim(), code: c, at: Date.now() });
      localStorage.setItem("oracle.xmr.donate", JSON.stringify(log));
    } catch {}
    grantUnlock("oracle.donor");
    setCode(c);
    selectionHaptic();
    toast.success("Thank you. Donor flag granted.");
  };

  return (
    <AppShell>
      <article className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-3">
          <div className="editorial-meta">
            <Heart className="inline h-3 w-3 text-shroud mr-2" />
            PRIVATE SUPPORT // XMR
          </div>
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight bone-text leading-[0.95]">
            Donate with <span className="text-shroud">Monero</span>.
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            No KYC. No card networks. No surveillance trail. Hood Oracle never sees your wallet — just an unlinkable receipt at our address.
          </p>
        </header>

        <section className="glass-strong rounded-xl p-5 space-y-5">
          {MONERO_IS_PLACEHOLDER && (
            <div className="rounded-md border border-accent/40 bg-accent/5 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-accent">
              Placeholder address shown — set VITE_MONERO_ADDRESS to your real XMR address.
            </div>
          )}

          <div className="grid place-items-center">
            {qr ? (
              <img src={qr} alt="Monero donation QR code for Hood Oracle" width={256} height={256} className="rounded-lg border border-border/60 shadow-card" />
            ) : (
              <div className="h-64 w-64 rounded-lg border border-border/60 animate-pulse bg-muted/20" />
            )}
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1">XMR Address</div>
            <button onClick={copy} className="w-full rounded-md border border-border/60 bg-card/40 p-3 text-left font-mono text-[11px] break-all active:bg-primary/10">
              <span className="text-foreground/90">{shortAddr(MONERO_ADDRESS, 16, 16)}</span>
              <span className="float-right text-primary">{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm" className="rounded-full text-[11px] font-mono uppercase tracking-[0.18em]">
              <a href={MONERO_GUI_URL} target="_blank" rel="noreferrer">
                <ExternalLink className="h-3.5 w-3.5 mr-2" /> Get Monero GUI
              </a>
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-full text-[11px] font-mono uppercase tracking-[0.18em]">
              <a href={MONERO_GUI_REPO} target="_blank" rel="noreferrer">
                <ExternalLink className="h-3.5 w-3.5 mr-2" /> monero-project/monero-gui
              </a>
            </Button>
          </div>
        </section>

        <section className="glass-strong rounded-xl p-5 space-y-3">
          <h2 className="font-display text-lg tracking-[0.18em] uppercase bone-text">I sent it</h2>
          <p className="text-xs text-muted-foreground">Optional. Paste your tx hash to receive a one-time donor unlock code.</p>
          <form onSubmit={submitTx} className="space-y-3">
            <input
              value={tx}
              onChange={e => setTx(e.target.value)}
              placeholder="Tx hash"
              className="w-full rounded-md border border-border/60 bg-card/40 p-3 font-mono text-[11px] outline-none focus:border-primary"
            />
            <Button type="submit" size="sm" className="rounded-full text-[11px] font-mono uppercase tracking-[0.18em] bg-primary text-primary-foreground shadow-cyan">
              <ShieldCheck className="h-3.5 w-3.5 mr-2" /> Generate Donor Code
            </Button>
          </form>
          {code && (
            <div className="rounded-md border border-shroud/40 bg-shroud/5 p-3">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-shroud mb-1">Donor Code</div>
              <div className="font-mono text-sm break-all">{code}</div>
            </div>
          )}
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
            Honor system. We don't verify on-chain. Saved locally to your device only.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-[0.18em] uppercase bone-text">Why Monero</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Monero uses ring signatures, stealth addresses, and confidential transactions —
            so the sender, receiver, and amount stay private by default. It's the only major
            cryptocurrency where privacy is not optional. That's the cryptographic precedent
            the Shroud District builds on.
          </p>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DonateAction",
              recipient: { "@type": "Organization", name: "Hood Oracle" },
              instrument: { "@type": "Thing", name: "Monero (XMR)" },
            }),
          }}
        />
      </article>
    </AppShell>
  );
}
