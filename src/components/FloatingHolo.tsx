import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Accent = "cyan" | "red" | "lime";

interface Props {
  accent?: Accent;
  intensity?: "subtle" | "full";
  className?: string;
  children: ReactNode;
  as?: "div" | "section" | "article";
  delay?: number;
}

const ACCENT: Record<Accent, string> = {
  cyan: "var(--primary)",
  red: "var(--accent)",
  lime: "var(--lime)",
};

export function FloatingHolo({
  accent = "cyan",
  intensity = "subtle",
  className,
  children,
  as: Tag = "div",
  delay = 0,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const target = useRef({ rx: 0, ry: 0 });
  const current = useRef({ rx: 0, ry: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const tick = () => {
      const c = current.current, t = target.current;
      c.rx += (t.rx - c.rx) * 0.12;
      c.ry += (t.ry - c.ry) * 0.12;
      const p = plateRef.current;
      if (p) p.style.transform = `rotateX(${c.rx}deg) rotateY(${c.ry}deg)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current!);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 2 - 1;
    const py = ((e.clientY - r.top) / r.height) * 2 - 1;
    const max = intensity === "full" ? 12 : 6;
    target.current.ry = px * max;
    target.current.rx = -py * (max * 0.7);
  };
  const onLeave = () => { target.current.rx = 0; target.current.ry = 0; };

  const Comp: any = Tag;
  return (
    <Comp
      ref={wrapRef as any}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("holo-wrap", className)}
      style={{ ["--holo" as any]: `hsl(${ACCENT[accent]})`, animationDelay: `${delay}ms` }}
    >
      <div ref={plateRef} className="holo-plate">
        <div className="holo-rim" aria-hidden />
        <div className="holo-scan" aria-hidden />
        <div className="holo-inner">{children}</div>
      </div>
    </Comp>
  );
}
