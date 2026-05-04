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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ReadingProvider>
          <Routes>
            <Route path="/" element={<Index />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ReadingProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
