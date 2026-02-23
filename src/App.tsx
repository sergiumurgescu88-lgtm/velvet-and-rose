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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const safePage = (title: string, desc: string, icon: any) => (
  <PlaceholderPage title={title} description={desc} icon={icon} />
);
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
                  <Route path="/characters" element={safePage("Characters", "Creează și gestionează personaje AI pentru conținut SFW.", Users)} />
                  <Route path="/marketplace" element={safePage("Marketplace", "Explorează și achiziționează modele AI de calitate.", ShoppingBag)} />
                  <Route path="/generation" element={safePage("Generation", "Generează imagini AI de înaltă calitate.", Sparkles)} />
                  <Route path="/create-video" element={safePage("Create Video", "Creează videoclipuri AI pentru fashion și lifestyle.", Video)} />
                  <Route path="/image-editor" element={safePage("Image Editor", "Editează și îmbunătățește imaginile generate.", Pencil)} />
                  <Route path="/face-swap" element={safePage("Face Swap", "Schimbă fețele în imagini cu AI.", RefreshCw)} />
                  <Route path="/clone-dance" element={safePage("Clone Dance", "Clonează mișcări de dans cu AI.", Music2)} />
                  <Route path="/prompts" element={safePage("Prompts", "Biblioteca ta de prompturi SFW.", FileText)} />
                  <Route path="/ppv-content" element={safePage("PPV Content", "Conținut pay-per-view pentru fashion și lifestyle.", DollarSign)} />
                  <Route path="/media-library" element={safePage("Media Library", "Toate fișierele tale media într-un singur loc.", FolderOpen)} />

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
