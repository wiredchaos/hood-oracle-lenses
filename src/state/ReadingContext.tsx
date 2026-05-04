import { createContext, useContext, useEffect, useState } from "react";
import type { Reading, BirthData } from "@/lib/lenses";
import { generateReading } from "@/lib/lenses";
import { saveReading } from "@/lib/memory";

interface Ctx {
  reading: Reading | null;
  setReading: (r: Reading | null) => void;
  runReading: (b: BirthData) => Promise<Reading>;
}

const ReadingCtx = createContext<Ctx | null>(null);

export function ReadingProvider({ children }: { children: React.ReactNode }) {
  const [reading, setReading] = useState<Reading | null>(null);

  useEffect(() => {
    try { const v = sessionStorage.getItem("akashic.current"); if (v) setReading(JSON.parse(v)); } catch {}
  }, []);
  useEffect(() => {
    try { reading ? sessionStorage.setItem("akashic.current", JSON.stringify(reading))
                  : sessionStorage.removeItem("akashic.current"); } catch {}
  }, [reading]);

  const runReading = async (b: BirthData) => {
    await new Promise(r => setTimeout(r, 1500));
    const r = generateReading(b);
    setReading(r);
    saveReading(r);
    return r;
  };

  return <ReadingCtx.Provider value={{ reading, setReading, runReading }}>{children}</ReadingCtx.Provider>;
}

export const useReading = () => {
  const ctx = useContext(ReadingCtx);
  if (!ctx) throw new Error("useReading must be used inside ReadingProvider");
  return ctx;
};
