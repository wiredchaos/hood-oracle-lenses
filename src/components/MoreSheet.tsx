import { Link } from "react-router-dom";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

const MORE = [
  { to: "/lenses", label: "Lenses Index" },
  { to: "/demo", label: "Demo Profile" },
  { to: "/intake", label: "Intake" },
  { to: "/forge", label: "UGC Forge" },
  { to: "/cointelpro", label: "COINTELPRO" },
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
  { to: "/hoods", label: "Hoods" },
  { to: "/install", label: "Install App" },
  { to: "/settings", label: "Settings" },
];

export function MoreSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className="border-border/60"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <DrawerHeader>
          <DrawerTitle className="font-display tracking-[0.18em] uppercase text-sm">More</DrawerTitle>
        </DrawerHeader>
        <div className="grid grid-cols-2 gap-2 px-4 pb-6 max-h-[60vh] overflow-y-auto">
          {MORE.map(n => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => onOpenChange(false)}
              className="rounded-lg border border-border/60 bg-card/40 px-3 py-3 text-xs font-mono uppercase tracking-[0.18em] text-foreground/80 active:bg-primary/10 active:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
