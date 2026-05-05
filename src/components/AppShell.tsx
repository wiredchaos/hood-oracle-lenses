import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Activity, Menu, X } from "lucide-react";

const PRIMARY = [
  { to: "/oracle", label: "Oracle" },
  { to: "/hoods", label: "Hoods" },
  { to: "/dashboard", label: "Reading" },
  { to: "/forge", label: "Forge" },
];

const MORE = [
  { to: "/intake", label: "Intake" },
  { to: "/listicles", label: "Listicles" },
  { to: "/agenttv", label: "AGENTtv" },
  { to: "/files", label: "Files" },
  { to: "/pocket", label: "Pocket" },
  { to: "/monetization", label: "Map" },
  { to: "/journal", label: "Memory" },
  { to: "/compatibility", label: "Match" },
  { to: "/console", label: "Lore" },
  { to: "/settings", label: "Settings" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const linkCls = (active: boolean) => cn(
    "rounded-full px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] transition-colors",
    active ? "bg-primary/15 text-primary shadow-cyan" : "text-muted-foreground hover:text-primary"
  );

  return (
    <div className="min-h-screen relative">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="container flex h-14 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative h-7 w-7 rounded-full bg-spiral animate-spin-slow shadow-cyan" />
            <div className="leading-tight">
              <div className="font-serif text-base tracking-wide">Akashic Lenses</div>
              <div className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground">NEURO META X</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {PRIMARY.map(n => (
              <Link key={n.to} to={n.to} className={linkCls(pathname.startsWith(n.to))}>{n.label}</Link>
            ))}
            <div className="relative group">
              <button className={linkCls(false) + " flex items-center gap-1"}>More <Menu className="h-3 w-3" /></button>
              <div className="absolute right-0 top-full mt-1 hidden group-hover:block min-w-[180px] glass p-2 z-50">
                {MORE.map(n => (
                  <Link key={n.to} to={n.to}
                    className={cn("block rounded px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em]",
                      pathname.startsWith(n.to) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5")}>
                    {n.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex chip"><Activity className="h-3 w-3 animate-flicker" /> Oracle Online</span>
            <button onClick={() => setOpen(o => !o)} className="lg:hidden p-2 rounded-md border border-border/60">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
            <div className="container py-3 grid grid-cols-2 gap-1">
              {[...PRIMARY, ...MORE].map(n => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                  className={linkCls(pathname.startsWith(n.to))}>{n.label}</Link>
              ))}
            </div>
          </div>
        )}
      </header>
      <main className="container py-8 md:py-12">{children}</main>
      <footer className="border-t border-border/40 py-6">
        <div className="container flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-muted-foreground">
          <span>AGENTROPOLIS // NEURO DISTRICT // SYMBOLIC INTELLIGENCE GRID</span>
          <span>For reflection &amp; entertainment only. No medical, legal, financial, or psychological advice. No KYC, no biometrics, no real-name required.</span>
        </div>
      </footer>
    </div>
  );
}
