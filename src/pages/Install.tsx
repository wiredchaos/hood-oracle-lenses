import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Apple, Smartphone, Share2, Plus, Bell } from "lucide-react";
import { getPushState, registerPush, type PushState } from "@/lib/push";
import { isNative } from "@/lib/native";
import { toast } from "sonner";

export default function Install() {
  const [deferred, setDeferred] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [push, setPush] = useState<PushState>({ supported: false, permission: "unknown" });

  useEffect(() => {
    const onPrompt = (e: any) => { e.preventDefault(); setDeferred(e); };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    getPushState().then(setPush);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const triggerInstall = async () => {
    if (!deferred) return;
    deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setDeferred(null);
  };

  const enablePush = async () => {
    const s = await registerPush();
    setPush(s);
    if (s.permission === "granted") toast.success("Notifications enabled");
    else if (s.permission === "denied") toast.error("Permission denied");
    else if (!s.supported) toast.message("Open the installed app on your device to enable push.");
  };

  return (
    <AppShell>
      <section className="max-w-xl mx-auto space-y-6">
        <header className="space-y-2">
          <span className="editorial-kicker">Install</span>
          <h1 className="font-serif text-3xl md:text-4xl">Carry the Oracle in your pocket</h1>
          <p className="text-sm text-muted-foreground">Add Hood Oracle to your home screen for a full-screen, app-like experience. Works on iPhone, Android, and desktop.</p>
        </header>

        <div className="glass p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-[0.18em] text-primary">
            <Apple className="h-4 w-4" /> iPhone / iPad
          </div>
          <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-5">
            <li>Open this page in <b>Safari</b>.</li>
            <li>Tap the <Share2 className="inline h-4 w-4 align-text-bottom" /> Share button.</li>
            <li>Choose <b>Add to Home Screen</b> <Plus className="inline h-4 w-4 align-text-bottom" />.</li>
            <li>Tap <b>Add</b>. Launch from the new icon.</li>
          </ol>
        </div>

        <div className="glass p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-[0.18em] text-primary">
            <Smartphone className="h-4 w-4" /> Android / Chrome
          </div>
          <p className="text-sm text-muted-foreground">Tap the install button below or use the browser menu → <b>Install app</b>.</p>
          <Button
            disabled={!deferred || installed}
            onClick={triggerInstall}
            className="rounded-full text-xs font-mono uppercase tracking-[0.2em] bg-primary text-primary-foreground"
          >
            {installed ? "Installed" : deferred ? "Install Hood Oracle" : "Install option not available"}
          </Button>
        </div>

        <div className="glass p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-[0.18em] text-primary">
            <Bell className="h-4 w-4" /> Notifications
          </div>
          <p className="text-sm text-muted-foreground">
            {isNative()
              ? `Status: ${push.permission}`
              : "Push notifications work in the installed native app. Open the iOS/Android build to enable."}
          </p>
          <Button
            onClick={enablePush}
            variant="outline"
            className="rounded-full text-xs font-mono uppercase tracking-[0.2em]"
            disabled={!isNative()}
          >
            Enable notifications
          </Button>
        </div>
      </section>
    </AppShell>
  );
}
