import { cn } from "@/lib/utils";

export function LensCard({
  title, kicker, accent = "cyan", children, className, action,
}: {
  title: string; kicker?: string; accent?: "cyan" | "red" | "lime";
  children: React.ReactNode; className?: string; action?: React.ReactNode;
}) {
  const accentClass =
    accent === "red" ? "before:bg-accent shadow-red/30" :
    accent === "lime" ? "before:bg-lime shadow-lime/30" :
    "before:bg-primary shadow-cyan/30";
  return (
    <section className={cn(
      "glass relative overflow-hidden p-5 md:p-6 animate-fade-up",
      "before:absolute before:left-0 before:top-0 before:h-full before:w-[2px]",
      accentClass, className,
    )}>
      <header className="mb-3 flex items-start justify-between gap-3">
        <div>
          {kicker && <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-1">{kicker}</div>}
          <h3 className="font-serif text-2xl leading-tight">{title}</h3>
        </div>
        {action}
      </header>
      <div className="space-y-3 text-sm leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}
