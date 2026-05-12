import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Lock, Play, Pause } from "lucide-react";
import { hasUnlock, grantUnlock, type ProductId } from "@/lib/entitlements";
import { MoneroPayButton } from "@/components/shared/MoneroPayButton";
import { toast } from "sonner";

interface Props {
  src: string;
  poster?: string;
  productId: ProductId;
  price: number;
  title: string;
  filename?: string;
  /** if true, ignore paywall (used for free demos) */
  free?: boolean;
}

export function VideoReportPlayer({ src, poster, productId, price, title, filename, free }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [unlocked, setUnlocked] = useState(free || hasUnlock(productId));
  const [playing, setPlaying] = useState(false);

  const previewSrc = unlocked ? src : `${src}#t=0,8`;

  const toggle = () => {
    const v = ref.current; if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  const simulatePurchase = () => {
    grantUnlock(productId);
    setUnlocked(true);
    toast.success(`${title} unlocked.`);
  };

  return (
    <div className="glass-strong overflow-hidden">
      <div className="relative aspect-video bg-black">
        <video
          ref={ref}
          src={previewSrc}
          poster={poster}
          playsInline
          preload="metadata"
          controls={unlocked}
          loop={!unlocked}
          muted={!unlocked}
          className="absolute inset-0 h-full w-full object-cover"
          onEnded={() => setPlaying(false)}
        />
        {!unlocked && (
          <button onClick={toggle} className="absolute inset-0 grid place-items-center group">
            <span className="rounded-full border border-primary/60 bg-background/40 backdrop-blur-sm p-4 text-primary group-hover:scale-110 transition-transform">
              {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </span>
            <span className="absolute top-3 left-3 chip-red chip text-[10px]"><Lock className="h-3 w-3" /> 8s preview</span>
          </button>
        )}
      </div>
      <div className="p-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">{unlocked ? "Unlocked" : `$${price}`}</div>
          <div className="font-serif text-lg leading-tight">{title}</div>
        </div>
        {unlocked ? (
          <Button asChild size="sm" className="rounded-full text-[11px] font-mono uppercase tracking-[0.18em] bg-primary text-primary-foreground shadow-cyan">
            <a href={src} download={filename || true}><Download className="h-3.5 w-3.5 mr-2" /> Download</a>
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <MoneroPayButton
              productId={productId}
              title={title}
              amountUsd={price}
              onUnlocked={() => setUnlocked(true)}
              label="XMR"
            />
            <Button onClick={simulatePurchase} size="sm" className="rounded-full text-[11px] font-mono uppercase tracking-[0.18em] bg-accent text-accent-foreground shadow-red">
              <Lock className="h-3.5 w-3.5 mr-2" /> Unlock ${price}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
