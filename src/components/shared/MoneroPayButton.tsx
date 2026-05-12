import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { MoneroPayDrawer } from "./MoneroPayDrawer";
import type { ProductId } from "@/lib/entitlements";
import { cn } from "@/lib/utils";

interface Props {
  productId: ProductId;
  title: string;
  amountUsd: number;
  amountXmr?: number;
  onUnlocked?: () => void;
  className?: string;
  size?: "sm" | "default";
  variant?: "outline" | "ghost" | "default";
  label?: string;
}

export function MoneroPayButton({ productId, title, amountUsd, amountXmr, onUnlocked, className, size = "sm", variant = "outline", label = "XMR" }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        size={size}
        variant={variant}
        onClick={() => setOpen(true)}
        className={cn(
          "rounded-full text-[11px] font-mono uppercase tracking-[0.18em] border-shroud/60 text-shroud hover:bg-shroud/10",
          className,
        )}
        aria-label={`Pay ${title} with Monero`}
      >
        <ShieldCheck className="h-3.5 w-3.5 mr-2" /> {label}
      </Button>
      <MoneroPayDrawer
        open={open}
        onOpenChange={setOpen}
        productId={productId}
        title={title}
        amountUsd={amountUsd}
        amountXmr={amountXmr}
        onUnlocked={onUnlocked}
      />
    </>
  );
}
