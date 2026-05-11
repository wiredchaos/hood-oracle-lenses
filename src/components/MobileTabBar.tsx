import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Sparkles, BookOpenText, Activity, Menu } from "lucide-react";
import { tapHaptic } from "@/lib/native";

const TABS = [
  { to: "/", label: "Portal", icon: Home, match: (p: string) => p === "/" },
  { to: "/oracle", label: "Oracle", icon: Sparkles, match: (p: string) => p.startsWith("/oracle") },
  { to: "/dashboard", label: "Reading", icon: BookOpenText, match: (p: string) => p.startsWith("/dashboard") || p.startsWith("/akashic") || p.startsWith("/numerology") || p.startsWith("/fibonacci") },
  { to: "/demo/neuro-life", label: "Life", icon: Activity, match: (p: string) => p.startsWith("/demo/neuro-life") },
];

export function MobileTabBar({ onMore }: { onMore: () => void }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const go = (to: string) => {
    tapHaptic();
    navigate(to);
  };

  return (
    <nav
      aria-label="Primary"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t rule-hair bg-background/85 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-5 h-16">
        {TABS.map(({ to, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <button
              key={to}
              onClick={() => go(to)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 text-[10px] font-mono uppercase tracking-[0.18em] transition-colors",
                active ? "text-primary" : "text-muted-foreground active:text-primary"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className={cn("h-5 w-5", active && "drop-shadow-[0_0_6px_hsl(var(--primary))]")} />
              <span>{label}</span>
            </button>
          );
        })}
        <button
          onClick={() => { tapHaptic(); onMore(); }}
          className="flex flex-col items-center justify-center gap-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground active:text-primary"
        >
          <Menu className="h-5 w-5" />
          <span>More</span>
        </button>
      </div>
    </nav>
  );
}
