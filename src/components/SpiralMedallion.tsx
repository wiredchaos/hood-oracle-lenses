import medallion from "@/assets/spiral-medallion.png";
import { cn } from "@/lib/utils";

export function SpiralMedallion({ label, size = 220, className }: { label?: string; size?: number; className?: string }) {
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-spiral opacity-30 blur-2xl" />
      <div className="absolute inset-2 rounded-full border border-primary/40 animate-spin-slow" />
      <div className="absolute inset-6 rounded-full border border-accent/30" />
      <img src={medallion} alt="Spiral medallion" width={size} height={size}
        className="relative z-10 animate-float-soft drop-shadow-[0_0_20px_hsl(var(--primary)/0.5)]" loading="lazy" />
      {label && (
        <div className="absolute bottom-2 z-20 chip-lime chip text-[10px]">{label}</div>
      )}
    </div>
  );
}
