import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Accent = "cyan" | "red" | "lime";

interface Props {
  kicker?: string;
  title: string;
  accent?: Accent;
  glyph?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

const ACCENT_HSL: Record<Accent, string> = {
  cyan: "var(--primary)",
  red: "var(--accent)",
  lime: "var(--lime)",
};

export function HologramScroll({
  kicker, title, accent = "cyan", glyph, action, children, className,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const target = useRef({ rx: 0, ry: 0, tz: -120, hover: 0 });
  const current = useRef({ rx: 0, ry: 0, tz: -120, hover: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const computeScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const cardCenter = rect.top + rect.height / 2;
      const dist = Math.abs(cardCenter - vh / 2) / (vh / 2); // 0 center .. 1+ edges
      const clamped = Math.min(1, dist);
      target.current.tz = 40 - clamped * 220; // +40 → -180
    };

    const tick = () => {
      const c = current.current, t = target.current;
      const k = 0.12;
      c.rx += (t.rx - c.rx) * k;
      c.ry += (t.ry - c.ry) * k;
      c.tz += (t.tz - c.tz) * k;
      c.hover += (t.hover - c.hover) * 0.08;
      const plate = plateRef.current;
      if (plate) {
        const opacity = Math.max(0.35, 1 - Math.abs(c.tz + 120) / 260);
        plate.style.transform = `translateZ(${c.tz}px) rotateX(${c.rx}deg) rotateY(${c.ry}deg)`;
        plate.style.opacity = String(opacity);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    computeScroll();
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", computeScroll, { passive: true });
    window.addEventListener("resize", computeScroll);
    return () => {
      cancelAnimationFrame(rafRef.current!);
      window.removeEventListener("scroll", computeScroll);
      window.removeEventListener("resize", computeScroll);
    };
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 2 - 1;
    const py = ((e.clientY - r.top) / r.height) * 2 - 1;
    target.current.ry = px * 14;
    target.current.rx = -py * 10;
    target.current.hover = 1;
  };
  const onLeave = () => {
    target.current.rx = 0;
    target.current.ry = 0;
    target.current.hover = 0;
  };

  const accentVar = ACCENT_HSL[accent];

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("hologram-scroll", className)}
      style={{ ["--holo" as any]: `hsl(${accentVar})` }}
    >
      <div ref={plateRef} className="hologram-plate">
        {/* scroll caps */}
        <div className="hologram-cap hologram-cap-top" />
        <div className="hologram-cap hologram-cap-bottom" />

        {/* rim glow */}
        <div className="hologram-rim" aria-hidden />

        {/* scanlines */}
        <div className="hologram-scanlines" aria-hidden />

        {/* floating glyph */}
        {glyph && (
          <div className="hologram-glyph" aria-hidden style={{ transform: "translateZ(80px)" }}>
            {glyph}
          </div>
        )}

        {/* content layers */}
        <div className="hologram-content">
          <header className="flex items-start justify-between gap-3" style={{ transform: "translateZ(40px)" }}>
            <div>
              {kicker && (
                <div className="text-[10px] font-mono uppercase tracking-[0.32em] text-muted-foreground mb-1">
                  {kicker}
                </div>
              )}
              <h3
                className="font-serif text-3xl leading-tight hologram-title"
                data-text={title}
                style={{ transform: "translateZ(30px)" }}
              >
                {title}
              </h3>
            </div>
            {action}
          </header>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/90"
               style={{ transform: "translateZ(20px)" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
