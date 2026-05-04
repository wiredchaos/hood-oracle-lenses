import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";

const NAV = [
  { to: "/intake", label: "Intake" },
  { to: "/dashboard", label: "Reading" },
  { to: "/journal", label: "Memory" },
  { to: "/compatibility", label: "Compatibility" },
  { to: "/console", label: "Lore" },
  { to: "/settings", label: "Settings" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen relative">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="container flex h-14 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative h-7 w-7 rounded-full bg-spiral animate-spin-slow shadow-cyan" />
            <div className="leading-tight">
              <div className="font-serif text-base tracking-wide">Akashic Lenses</div>
              <div className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground">NEURO META X</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(n => (
              <Link key={n.to} to={n.to}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] transition-colors",
                  pathname.startsWith(n.to)
                    ? "bg-primary/15 text-primary shadow-cyan"
                    : "text-muted-foreground hover:text-primary"
                )}>
                {n.label}
              </Link>
            ))}
          </nav>
          <span className="chip"><Activity className="h-3 w-3 animate-flicker" /> Oracle Online</span>
        </div>
      </header>
      <main className="container py-8 md:py-12">{children}</main>
      <footer className="border-t border-border/40 py-6">
        <div className="container flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-muted-foreground">
          <span>AGENTROPOLIS // NEURO DISTRICT // SYMBOLIC INTELLIGENCE GRID</span>
          <span>For reflection &amp; entertainment only. Not medical, legal, financial, or psychological advice.</span>
        </div>
      </footer>
    </div>
  );
}
