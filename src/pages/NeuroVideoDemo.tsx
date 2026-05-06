import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { VideoReportPlayer } from "@/components/VideoReportPlayer";
import { Button } from "@/components/ui/button";
import { DEMO_PROFILE } from "@/lib/demoSeed";

export default function NeuroVideoDemo() {
  return (
    <AppShell>
      <header className="mb-6">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="chip">DEMO REPORT</span>
          <span className="chip-red chip">NO DOX MODE</span>
          <span className="chip-lime chip">{DEMO_PROFILE.spiralPhase}</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight">N3UR0 META X — <span className="red-text">Symbolic Report</span></h1>
        <p className="text-muted-foreground text-sm mt-2 max-w-2xl">{DEMO_PROFILE.hoodOracleLine}</p>
      </header>

      <VideoReportPlayer
        src="/videos/neuro-meta-x-report.mp4"
        poster="/videos/posters/neuro-meta-x-report.jpg"
        productId="report.full"
        price={19}
        title="Full Symbolic Report — N3UR0 META X"
        filename="neuro-meta-x-report.mp4"
        free
      />

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild variant="outline" className="rounded-full text-xs font-mono uppercase tracking-[0.2em]">
          <Link to="/reports/video">All Video Reports</Link>
        </Button>
        <Button asChild className="rounded-full text-xs font-mono uppercase tracking-[0.2em] bg-primary text-primary-foreground shadow-cyan">
          <Link to="/intake">Run Your Reading</Link>
        </Button>
      </div>
    </AppShell>
  );
}
