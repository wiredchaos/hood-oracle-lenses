import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReadingProvider } from "@/state/ReadingContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AgentIntro from "./pages/AgentIntro.tsx";
import Intake from "./pages/Intake.tsx";
import Loading from "./pages/Loading.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NumerologyReport from "./pages/NumerologyReport.tsx";
import AkashicReport from "./pages/AkashicReport.tsx";
import FibonacciReport from "./pages/FibonacciReport.tsx";
import Journal from "./pages/Journal.tsx";
import Compatibility from "./pages/Compatibility.tsx";
import AgentConsole from "./pages/AgentConsole.tsx";
import SettingsPage from "./pages/Settings.tsx";
import ShareCard from "./pages/ShareCard.tsx";
import HoodOracle from "./pages/HoodOracle.tsx";
import GlobalHoods from "./pages/GlobalHoods.tsx";
import ListicleEngine from "./pages/ListicleEngine.tsx";
import AgentTvStudio from "./pages/AgentTvStudio.tsx";
import HoodOracleFiles from "./pages/HoodOracleFiles.tsx";
import PocketCards from "./pages/PocketCards.tsx";
import UgcForge from "./pages/UgcForge.tsx";
import MonetizationMap from "./pages/MonetizationMap.tsx";
import CointelproLink from "./pages/CointelproLink.tsx";
import TrustSignal from "./pages/TrustSignal.tsx";
import CircleTest from "./pages/CircleTest.tsx";
import MovementEchoes from "./pages/MovementEchoes.tsx";
import DemoProfile from "./pages/DemoProfile.tsx";
import VideoReports from "./pages/VideoReports.tsx";
import NeuroVideoDemo from "./pages/NeuroVideoDemo.tsx";
import VideoPortal from "./pages/VideoPortal.tsx";
import NeuroLifeDemo from "./pages/NeuroLifeDemo.tsx";
import Install from "./pages/Install.tsx";
import Shroud from "./pages/Shroud.tsx";
import Donate from "./pages/Donate.tsx";
import LifeTracker from "./pages/LifeTracker.tsx";
import { lazy, Suspense, useEffect } from "react";
import { applyTierAttribute } from "@/lib/shroud";
const Bio = lazy(() => import("./pages/Bio.tsx"));

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => { applyTierAttribute(); }, []);
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ReadingProvider>
          <Routes>
            <Route path="/" element={<VideoPortal />} />
            <Route path="/lenses" element={<Index />} />
            <Route path="/demo/neuro-life" element={<NeuroLifeDemo />} />
            <Route path="/agent" element={<AgentIntro />} />
            <Route path="/intake" element={<Intake />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/numerology" element={<NumerologyReport />} />
            <Route path="/akashic" element={<AkashicReport />} />
            <Route path="/fibonacci" element={<FibonacciReport />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/compatibility" element={<Compatibility />} />
            <Route path="/console" element={<AgentConsole />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/share" element={<ShareCard />} />
            <Route path="/oracle" element={<HoodOracle />} />
            <Route path="/hoods" element={<GlobalHoods />} />
            <Route path="/listicles" element={<ListicleEngine />} />
            <Route path="/agenttv" element={<AgentTvStudio />} />
            <Route path="/files" element={<HoodOracleFiles />} />
            <Route path="/pocket" element={<PocketCards />} />
            <Route path="/forge" element={<UgcForge />} />
            <Route path="/monetization" element={<MonetizationMap />} />
            <Route path="/cointelpro" element={<CointelproLink />} />
            <Route path="/trust-signal" element={<TrustSignal />} />
            <Route path="/circle-test" element={<CircleTest />} />
            <Route path="/echoes" element={<MovementEchoes />} />
            <Route path="/demo" element={<DemoProfile />} />
            <Route path="/reports/video" element={<VideoReports />} />
            <Route path="/demo/neuro-video" element={<NeuroVideoDemo />} />
            <Route path="/install" element={<Install />} />
            <Route path="/shroud" element={<Shroud />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/life" element={<LifeTracker />} />
            <Route path="/bio" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><Bio /></Suspense>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ReadingProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
