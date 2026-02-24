import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Users, ShoppingBag, Sparkles, Video, Pencil, RefreshCw,
  Music2, FileText, DollarSign, FolderOpen,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import PlaceholderPage from "@/components/PlaceholderPage";
import Index from "./pages/Index";
import Characters from "./pages/Characters";
import Marketplace from "./pages/Marketplace";
import Generation from "./pages/Generation";
import CreateVideo from "./pages/CreateVideo";
import ImageEditor from "./pages/ImageEditor";
import FaceSwap from "./pages/FaceSwap";
import CloneDance from "./pages/CloneDance";
import Prompts from "./pages/Prompts";
import PPVContent from "./pages/PPVContent";
import MediaLibrary from "./pages/MediaLibrary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const adultPage = (title: string, desc: string, icon: any) => (
  <PlaceholderPage title={title} description={desc} icon={icon} isAdult />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/characters" element={<Characters />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/generation" element={<Generation />} />
                  <Route path="/create-video" element={<CreateVideo />} />
                  <Route path="/image-editor" element={<ImageEditor />} />
                  <Route path="/face-swap" element={<FaceSwap />} />
                  <Route path="/clone-dance" element={<CloneDance />} />
                  <Route path="/prompts" element={<Prompts />} />
                  <Route path="/ppv-content" element={<PPVContent />} />
                  <Route path="/media-library" element={<MediaLibrary />} />

                  <Route path="/adult/characters" element={adultPage("Adult Characters", "Personaje AI pentru conținut adult.", Users)} />
                  <Route path="/adult/marketplace" element={adultPage("Adult Marketplace", "Modele AI NSFW disponibile.", ShoppingBag)} />
                  <Route path="/adult/generation" element={adultPage("Adult Generation", "Generare conținut adult explicit.", Sparkles)} />
                  <Route path="/adult/videos" element={adultPage("Adult Videos", "Creează videoclipuri adult.", Video)} />
                  <Route path="/adult/editor" element={adultPage("Adult Editor", "Editor de imagini fără restricții.", Pencil)} />
                  <Route path="/adult/face-swap" element={adultPage("Adult Face Swap", "Face swap pentru conținut adult.", RefreshCw)} />
                  <Route path="/adult/clone-dance" element={adultPage("Adult Clone Dance", "Clone dance fără restricții.", Music2)} />
                  <Route path="/adult/prompts" element={adultPage("Adult Prompts", "Biblioteca de prompturi NSFW.", FileText)} />
                  <Route path="/adult/ppv-content" element={adultPage("PPV Adult Content", "Conținut PPV orientat OnlyFans.", DollarSign)} />
                  <Route path="/adult/media-library" element={adultPage("Adult Media Library", "Librăria ta de conținut explicit.", FolderOpen)} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </DashboardLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
