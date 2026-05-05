import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CopyBlock({ label, text, lang = "txt" }: { label: string; text: string; lang?: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/60 bg-background/40">
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">{label} · {lang}</div>
        <Button size="sm" variant="ghost" className="h-7 px-2 text-[10px] font-mono"
          onClick={() => { navigator.clipboard.writeText(text); toast.success(`${label} copied`); }}>
          <Copy className="h-3 w-3 mr-1" /> COPY
        </Button>
      </div>
      <pre className="p-3 text-xs whitespace-pre-wrap font-mono text-foreground/80 max-h-72 overflow-auto">{text}</pre>
    </div>
  );
}
