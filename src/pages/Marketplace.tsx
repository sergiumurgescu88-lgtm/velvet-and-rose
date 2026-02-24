import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag, Search, Star, Filter, ChevronRight,
  Download, Eye, Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const categories = ["All", "Characters", "Voice Packs", "Dance Templates", "Backgrounds", "Outfit Styles", "Prompt Packs"];

const mockAssets = [
  { id: 1, name: "Cinematic Fashion Pack", creator: "StudioAI", price: 15, rating: 4.8, reviews: 124, category: "Backgrounds", featured: true, free: false },
  { id: 2, name: "Street Dance Moves Vol.1", creator: "DanceBot", price: 0, rating: 4.5, reviews: 89, category: "Dance Templates", featured: true, free: true },
  { id: 3, name: "Luxury Voice - Female", creator: "VoiceForge", price: 8, rating: 4.9, reviews: 256, category: "Voice Packs", featured: true, free: false },
  { id: 4, name: "Y2K Aesthetic Bundle", creator: "RetroAI", price: 12, rating: 4.3, reviews: 67, category: "Outfit Styles", featured: false, free: false },
  { id: 5, name: "Viral Prompt Collection", creator: "PromptGuru", price: 5, rating: 4.7, reviews: 312, category: "Prompt Packs", featured: false, free: false },
  { id: 6, name: "Fitness Model Base", creator: "FitGen", price: 0, rating: 4.1, reviews: 45, category: "Characters", featured: false, free: true },
  { id: 7, name: "Neon City Backgrounds", creator: "CyberScape", price: 10, rating: 4.6, reviews: 178, category: "Backgrounds", featured: false, free: false },
  { id: 8, name: "Pro Influencer Pack", creator: "InfluAI", price: 25, rating: 4.9, reviews: 89, category: "Characters", featured: true, free: false },
];

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 30]);
  const [tab, setTab] = useState("browse");

  const featured = mockAssets.filter((a) => a.featured);
  const filtered = mockAssets.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || a.category === selectedCategory;
    const matchPrice = a.price >= priceRange[0] && a.price <= priceRange[1];
    return matchSearch && matchCat && matchPrice;
  });

  return (
    <div className="flex h-full min-h-screen">
      {/* Sidebar Filters */}
      <div className="hidden w-64 shrink-0 border-r border-border bg-card/50 p-5 lg:block">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Filter className="h-4 w-4 text-primary" /> Filters
        </h3>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">Category</label>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                    selectedCategory === cat ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">
              Price Range: ${priceRange[0]} – ${priceRange[1]}
            </label>
            <Slider
              min={0} max={30} step={1}
              value={priceRange}
              onValueChange={setPriceRange}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">Rating</label>
            <div className="flex gap-1">
              {[4, 3, 2, 1].map((r) => (
                <button key={r} className="flex items-center gap-1 rounded border border-border px-2 py-1 text-xs text-muted-foreground hover:border-primary/30">
                  {r}+ <Star className="h-3 w-3 fill-primary text-primary" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <div className="border-b border-border bg-card/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="flex items-center gap-3 text-2xl font-bold text-foreground">
                <ShoppingBag className="h-7 w-7 text-primary" /> Marketplace
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">Explorează și achiziționează modele AI de calitate.</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search marketplace..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="browse">Browse</TabsTrigger>
              <TabsTrigger value="purchases">My Purchases</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="mt-6">
              {/* Featured */}
              <div className="mb-8">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Star className="h-4 w-4 text-primary" /> Featured & Trending
                </h2>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {featured.map((asset) => (
                    <div key={asset.id} className="min-w-[220px] rounded-xl border border-primary/20 bg-card p-4 glow-primary">
                      <div className="mb-3 h-28 rounded-lg bg-primary/5 flex items-center justify-center">
                        <Tag className="h-8 w-8 text-primary/40" />
                      </div>
                      <h4 className="text-sm font-semibold text-foreground truncate">{asset.name}</h4>
                      <p className="text-xs text-muted-foreground">{asset.creator}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="h-3 w-3 fill-primary text-primary" /> {asset.rating}
                        </div>
                        <span className="text-sm font-bold text-safe">{asset.free ? "Free" : `$${asset.price}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((asset, i) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30"
                  >
                    <div className="mb-3 h-32 rounded-lg bg-muted flex items-center justify-center">
                      <Tag className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                    <Badge variant="outline" className="mb-2 text-[10px]">{asset.category}</Badge>
                    <h4 className="text-sm font-semibold text-foreground">{asset.name}</h4>
                    <p className="text-xs text-muted-foreground">{asset.creator} · {asset.reviews} reviews</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-primary text-primary" /> {asset.rating}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                          <Eye className="h-3 w-3" /> Preview
                        </Button>
                        <Button size="sm" className="h-7 text-xs">
                          {asset.free ? "Get Free" : `$${asset.price}`}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="purchases" className="mt-6">
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <Download className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
                <p className="text-muted-foreground">No purchases yet. Browse the marketplace to find assets.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
