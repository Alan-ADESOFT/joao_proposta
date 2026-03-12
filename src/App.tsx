import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import ChatWidget from "@/components/ChatWidget";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/admin");

  return (
    <>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/*" element={<DashboardPage />} />
      </Routes>
      {!isDashboard && <ChatWidget />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
