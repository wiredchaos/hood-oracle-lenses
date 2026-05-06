import { cn } from "@/lib/utils";
import { FloatingHolo } from "./FloatingHolo";

export function LensCard({
  title, kicker, accent = "cyan", children, className, action,
}: {
  title: string; kicker?: string; accent?: "cyan" | "red" | "lime";
  children: React.ReactNode; className?: string; action?: React.ReactNode;
}) {
  return (
    <FloatingHolo accent={accent} intensity="subtle" className={cn("animate-fade-up", className)}>
      <div className="p-5 md:p-6">
        <header className="mb-3 flex items-start justify-between gap-3" style={{ transform: "translateZ(20px)" }}>
          <div>
            {kicker && <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-1">{kicker}</div>}
            <h3 className="font-serif text-2xl leading-tight">{title}</h3>
          </div>
          {action}
        </header>
        <div className="space-y-3 text-sm leading-relaxed text-foreground/90" style={{ transform: "translateZ(10px)" }}>
          {children}
        </div>
      </div>
    </FloatingHolo>
  );
}
