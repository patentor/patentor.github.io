import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import PatentDrafting from "./pages/PatentDrafting";
import Research from "./pages/Research";
import Patents from "./pages/Patents";
import Attorneys from "./pages/Attorneys";
import Marketplace from "./pages/Marketplace";
import Commercialization from "./pages/Commercialization";
import Investors from "./pages/Investors";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/drafting" element={<PatentDrafting />} />
            <Route path="/research" element={<Research />} />
            <Route path="/patents" element={<Patents />} />
            <Route path="/attorneys" element={<Attorneys />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/commercialization" element={<Commercialization />} />
            <Route path="/investors" element={<Investors />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
