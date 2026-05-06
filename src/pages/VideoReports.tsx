import { AppShell } from "@/components/AppShell";
import { VideoReportPlayer } from "@/components/VideoReportPlayer";
import { HOOD_VARIANTS } from "@/lib/oracle";
import { Film } from "lucide-react";
import type { ProductId } from "@/lib/entitlements";

const CATALOG: Array<{ id: ProductId; title: string; price: number; src: string; poster: string; filename: string }> = [
  { id: "report.full", title: "Full Symbolic Report", price: 19, src: "/videos/neuro-meta-x-report.mp4", poster: "/videos/posters/neuro-meta-x-report.jpg", filename: "symbolic-report.mp4" },
  { id: "report.patchlife", title: "Patch-Life Cinematic", price: 29, src: "/videos/neuro-meta-x-report.mp4", poster: "/videos/posters/neuro-meta-x-report.jpg", filename: "patch-life.mp4" },
  { id: "report.daily", title: "Daily Signal Loop (7-day)", price: 9, src: "/videos/neuro-meta-x-report.mp4", poster: "/videos/posters/neuro-meta-x-report.jpg", filename: "daily-signal.mp4" },
];

export default function VideoReports() {
  return (
    <AppShell>
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="chip"><Film className="h-3 w-3" /> VIDEO REPORTS</span>
        </div>
        <h1 className="font-serif text-4xl">Cinematic Reports</h1>
        <p className="text-muted-foreground text-sm mt-1 max-w-2xl">Symbolic readings rendered as cinematic loops. Preview free, unlock to download.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CATALOG.map(c => (
          <VideoReportPlayer key={c.id} productId={c.id} title={c.title} price={c.price} src={c.src} poster={c.poster} filename={c.filename} />
        ))}
      </section>

      <h2 className="font-serif text-3xl mt-12 mb-4">Hood Oracle Messages <span className="text-muted-foreground text-base font-mono uppercase tracking-[0.2em]">— $4 each</span></h2>
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {HOOD_VARIANTS.map(v => (
          <VideoReportPlayer
            key={v.id}
            src={`/videos/oracle-${v.id}.mp4`}
            poster={`/videos/posters/oracle-${v.id}.jpg`}
            productId={`oracle.${v.id}` as ProductId}
            price={4}
            title={`${v.city} Oracle Message`}
            filename={`oracle-${v.id}.mp4`}
          />
        ))}
      </section>
    </AppShell>
  );
}
