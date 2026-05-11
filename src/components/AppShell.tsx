import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Activity, Menu, X } from "lucide-react";
import { OracleLogo } from "@/components/OracleLogo";
import { MobileTabBar } from "@/components/MobileTabBar";
import { MoreSheet } from "@/components/MoreSheet";

const PRIMARY = [
  { to: "/", label: "Portal" },
  { to: "/oracle", label: "Oracle" },
  { to: "/hoods", label: "Hoods" },
  { to: "/dashboard", label: "Reading" },
  { to: "/forge", label: "Forge" },
  { to: "/cointelpro", label: "COINTELPRO", accent: "red" as const },
];

const MORE = [
  { to: "/demo/neuro-life", label: "Life Tracker" },
  { to: "/demo", label: "Demo Profile" },
  { to: "/intake", label: "Intake" },
  { to: "/trust-signal", label: "Trust Signal" },
  { to: "/circle-test", label: "Circle Test" },
  { to: "/echoes", label: "Movement Echoes" },
  { to: "/listicles", label: "Listicles" },
  { to: "/agenttv", label: "AGENTtv" },
  { to: "/files", label: "Files" },
  { to: "/pocket", label: "Pocket" },
  { to: "/monetization", label: "Map" },
  { to: "/journal", label: "Memory" },
  { to: "/compatibility", label: "Match" },
  { to: "/console", label: "Lore" },
  { to: "/install", label: "Install App" },
  { to: "/settings", label: "Settings" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const publishMarker = "neuro-life-portal-ready";

  const linkCls = (active: boolean) => cn(
    "rounded-full px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] transition-colors",
    active ? "bg-primary/15 text-primary shadow-cyan" : "text-muted-foreground hover:text-primary"
  );

  return (
    <div className="min-h-screen relative" data-publish-marker={publishMarker}>
      <div className="grain-overlay" aria-hidden />
      <header
        className="sticky top-0 z-40 border-b rule-hair bg-background/70 backdrop-blur-xl"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="container flex h-14 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <OracleLogo size={28} eager />
            <div className="leading-tight">
              <div className="font-display text-sm tracking-[0.18em] uppercase bone-text">Akashic Lenses</div>
              <div className="text-[9px] font-mono tracking-[0.32em] text-muted-foreground hidden sm:block">N3UR0 · META · X</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {PRIMARY.map(n => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link key={n.to} to={n.to}
                  className={cn(
                    linkCls(active),
                    n.accent === "red" && "border border-accent/50 text-accent hover:text-accent",
                  )}>{n.label}</Link>
              );
            })}
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
          </div>
        </div>
      </header>

      <main
        className="container py-4 sm:py-6 md:py-12"
        style={{ perspective: "1600px", transformStyle: "preserve-3d", paddingBottom: "calc(80px + env(safe-area-inset-bottom))" }}
      >
        {children}
      </main>

      <footer className="hidden lg:block border-t rule-hair py-8">
        <div className="container flex flex-wrap items-center justify-between gap-3 editorial-meta">
          <span>AGENTROPOLIS // N3UR0 DISTRICT // <b>VOL · MMXXVI</b></span>
          <span className="max-w-xl text-right">For reflection &amp; entertainment only. No medical, legal, financial, or psychological advice. No KYC, no biometrics, no real-name required.</span>
        </div>
      </footer>

      <MobileTabBar onMore={() => setMoreOpen(true)} />
      <MoreSheet open={moreOpen} onOpenChange={setMoreOpen} />
    </div>
  );
}
