import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MemoryProvider } from "@/contexts/MemoryContext";
import SplashScreen from "./pages/SplashScreen";
import EmotionPickerScreen from "./pages/EmotionPickerScreen";
import AddMemoryScreen from "./pages/AddMemoryScreen";
import MemoryDetailScreen from "./pages/MemoryDetailScreen";
import TimelineScreen from "./pages/TimelineScreen";
import AllMemoriesScreen from "./pages/AllMemoriesScreen";
import ReflectionScreen from "./pages/ReflectionScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <MemoryProvider>
        <BrowserRouter>
          <div className="max-w-lg mx-auto min-h-screen relative">
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/timeline" element={<TimelineScreen />} />
              <Route path="/all" element={<AllMemoriesScreen />} />
              <Route path="/emotions" element={<EmotionPickerScreen />} />
              <Route path="/add" element={<AddMemoryScreen />} />
              <Route path="/memory/:id" element={<MemoryDetailScreen />} />
              <Route path="/reflect/:id" element={<ReflectionScreen />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </MemoryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
