import { cn } from "@/lib/utils";

export function OracleLogo({
  size = 28,
  className,
  eager = false,
}: { size?: number; className?: string; eager?: boolean }) {
  return (
    <div
      className={cn("relative inline-block shrink-0 rounded-full shadow-cyan", className)}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 rounded-full bg-spiral opacity-40 blur-md" aria-hidden />
      <img
        src="/brand/oracle-logo.gif"
        width={size}
        height={size}
        alt="Hood Oracle"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="relative h-full w-full rounded-full object-cover"
      />
    </div>
  );
}

export default OracleLogo;
