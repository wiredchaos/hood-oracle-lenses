import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Download, Upload, Trash2, ShieldCheck } from "lucide-react";
import { clearAll, downloadJson, exportEncrypted, importEncrypted } from "@/lib/lifeTracker";

export function VaultPanel() {
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState<"export" | "import" | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onExport = async () => {
    if (pass.length < 8) return toast.error("Use a passphrase of 8+ characters.");
    setBusy("export");
    try {
      const blob = await exportEncrypted(pass);
      downloadJson(`life-vault-${new Date().toISOString().slice(0, 10)}.json`, blob);
      toast.success("Encrypted vault downloaded.");
    } catch (e) {
      toast.error("Export failed.");
    } finally { setBusy(null); }
  };

  const onPickFile = () => fileRef.current?.click();

  const onImport = async (file: File) => {
    if (pass.length < 8) return toast.error("Enter the passphrase used to export.");
    setBusy("import");
    try {
      const text = await file.text();
      const blob = JSON.parse(text);
      const n = await importEncrypted(blob, pass);
      toast.success(`Imported ${n} entries.`);
    } catch {
      toast.error("Wrong passphrase or invalid file.");
    } finally { setBusy(null); }
  };

  const onWipe = () => {
    if (!confirm("Delete all local entries? This cannot be undone.")) return;
    clearAll();
    toast.success("Local entries wiped.");
  };

  return (
    <section className="glass-strong p-5 space-y-4" aria-label="Encrypted vault">
      <header className="flex items-baseline justify-between">
        <h2 className="font-display text-lg tracking-[0.18em] uppercase bone-text">Vault</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground flex items-center gap-1">
          <ShieldCheck className="h-3 w-3" /> AES-256 · PBKDF2
        </span>
      </header>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Your data never leaves this device. Optional: encrypt a backup with a passphrase only you know.
      </p>

      <div>
        <Label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Passphrase</Label>
        <Input type="password" value={pass} onChange={e => setPass(e.target.value)}
          placeholder="At least 8 characters" className="mt-1 bg-background/40" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button onClick={onExport} disabled={busy !== null}
          className="rounded-full text-[11px] font-mono uppercase tracking-[0.2em]">
          <Download className="h-3.5 w-3.5 mr-2" /> Export
        </Button>
        <Button onClick={onPickFile} disabled={busy !== null} variant="outline"
          className="rounded-full text-[11px] font-mono uppercase tracking-[0.2em]">
          <Upload className="h-3.5 w-3.5 mr-2" /> Import
        </Button>
      </div>
      <input ref={fileRef} type="file" accept="application/json" hidden
        onChange={e => { const f = e.target.files?.[0]; if (f) onImport(f); e.target.value = ""; }} />

      <Button onClick={onWipe} variant="ghost"
        className="w-full rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-destructive hover:text-destructive">
        <Trash2 className="h-3.5 w-3.5 mr-2" /> Wipe local data
      </Button>
    </section>
  );
}
