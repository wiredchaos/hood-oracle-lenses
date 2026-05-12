import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Check, ShieldCheck } from "lucide-react";
import { MONERO_ADDRESS, MONERO_IS_PLACEHOLDER, moneroUri, shortAddr, MONERO_GUI_URL } from "@/lib/monero";
import { grantUnlock, type ProductId } from "@/lib/entitlements";
import { tapHaptic, selectionHaptic } from "@/lib/native";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  productId: ProductId;
  title: string;
  amountUsd: number;
  /** approximate XMR amount to prefill in the URI (optional) */
  amountXmr?: number;
  onUnlocked?: () => void;
}

export function MoneroPayDrawer({ open, onOpenChange, productId, title, amountUsd, amountXmr, onUnlocked }: Props) {
  const [qr, setQr] = useState<string>("");
  const [tx, setTx] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const uri = moneroUri(amountXmr, title, `Unlock: ${productId}`);
    QRCode.toDataURL(uri, { errorCorrectionLevel: "M", margin: 1, width: 320, color: { dark: "#0A1014", light: "#F0E7D6" } })
      .then(setQr)
      .catch(() => setQr(""));
  }, [open, amountXmr, title, productId]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(MONERO_ADDRESS);
      setCopied(true);
      tapHaptic();
      toast.success("XMR address copied");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed");
    }
  };

  const confirm = () => {
    if (tx.trim().length < 16) {
      toast.error("Paste a valid tx hash to unlock");
      return;
    }
    try {
      const KEY = "oracle.xmr.tx";
      const log = JSON.parse(localStorage.getItem(KEY) || "[]");
      log.push({ productId, tx: tx.trim(), at: Date.now() });
      localStorage.setItem(KEY, JSON.stringify(log));
    } catch {}
    grantUnlock(productId);
    selectionHaptic();
    toast.success(`${title} unlocked via Monero.`);
    onUnlocked?.();
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="border-border/60" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-display tracking-[0.18em] uppercase text-sm flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-shroud" /> Pay with Monero
          </DrawerTitle>
          <DrawerDescription className="text-xs">
            {title} — approximately ${amountUsd} in XMR. Honor-system unlock; paste tx hash after sending.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {MONERO_IS_PLACEHOLDER && (
            <div className="rounded-md border border-accent/40 bg-accent/5 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-accent">
              Placeholder address — set VITE_MONERO_ADDRESS in project settings.
            </div>
          )}

          <div className="grid place-items-center">
            {qr ? (
              <img
                src={qr}
                alt={`Monero payment QR for ${title}`}
                width={224}
                height={224}
                className="rounded-lg border border-border/60 shadow-card"
              />
            ) : (
              <div className="h-56 w-56 rounded-lg border border-border/60 animate-pulse bg-muted/20" />
            )}
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1">XMR Address</div>
            <button
              onClick={copy}
              className="w-full rounded-md border border-border/60 bg-card/40 p-3 text-left font-mono text-[11px] break-all active:bg-primary/10"
              aria-label="Copy XMR address"
            >
              <span className="text-foreground/90">{shortAddr(MONERO_ADDRESS, 14, 14)}</span>
              <span className="float-right text-primary">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </span>
            </button>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1 block">
              Tx hash (after sending)
            </label>
            <input
              value={tx}
              onChange={e => setTx(e.target.value)}
              placeholder="e.g. a1b2c3…"
              className="w-full rounded-md border border-border/60 bg-card/40 p-3 font-mono text-[11px] outline-none focus:border-primary"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={confirm} className="flex-1 rounded-full text-[11px] font-mono uppercase tracking-[0.18em] bg-primary text-primary-foreground shadow-cyan">
              <ShieldCheck className="h-3.5 w-3.5 mr-2" /> Confirm Unlock
            </Button>
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <a href={MONERO_GUI_URL} target="_blank" rel="noreferrer" aria-label="Get Monero wallet">
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>

          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
            No KYC. No telemetry. Hood Oracle never sees your wallet.
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
