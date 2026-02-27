import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag, Search, Star, Filter, ChevronRight,
  Download, Eye, Tag, X, ShoppingCart, Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const categories = ["All", "Characters", "Voice Packs", "Dance Templates", "Backgrounds", "Outfit Styles", "Prompt Packs"];

const mockAssets = [
  { id: 1, name: "Cinematic Fashion Pack", creator: "StudioAI", price: 15, rating: 4.8, reviews: 124, category: "Backgrounds", featured: true, free: false, desc: "High-quality cinematic backgrounds for fashion shoots" },
  { id: 2, name: "Street Dance Moves Vol.1", creator: "DanceBot", price: 0, rating: 4.5, reviews: 89, category: "Dance Templates", featured: true, free: true, desc: "20 street dance motion templates" },
  { id: 3, name: "Luxury Voice - Female", creator: "VoiceForge", price: 8, rating: 4.9, reviews: 256, category: "Voice Packs", featured: true, free: false, desc: "Premium female voice with luxury tone" },
  { id: 4, name: "Y2K Aesthetic Bundle", creator: "RetroAI", price: 12, rating: 4.3, reviews: 67, category: "Outfit Styles", featured: false, free: false, desc: "Retro Y2K inspired outfit collection" },
  { id: 5, name: "Viral Prompt Collection", creator: "PromptGuru", price: 5, rating: 4.7, reviews: 312, category: "Prompt Packs", featured: false, free: false, desc: "300+ viral-worthy prompts for AI generation" },
  { id: 6, name: "Fitness Model Base", creator: "FitGen", price: 0, rating: 4.1, reviews: 45, category: "Characters", featured: false, free: true, desc: "Athletic character base templates" },
  { id: 7, name: "Neon City Backgrounds", creator: "CyberScape", price: 10, rating: 4.6, reviews: 178, category: "Backgrounds", featured: false, free: false, desc: "Cyberpunk neon city environments" },
  { id: 8, name: "Pro Influencer Pack", creator: "InfluAI", price: 25, rating: 4.9, reviews: 89, category: "Characters", featured: true, free: false, desc: "Complete influencer character pack with poses" },
];

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 30]);
  const [tab, setTab] = useState("browse");
  const [showFilters, setShowFilters] = useState(false);

  const featured = mockAssets.filter((a) => a.featured);
  const filtered = mockAssets.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || a.category === selectedCategory;
    const matchPrice = a.price >= priceRange[0] && a.price <= priceRange[1];
    return matchSearch && matchCat && matchPrice;
  });

  const FiltersContent = () => (
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
        <Slider min={0} max={30} step={1} value={priceRange} onValueChange={setPriceRange} />
      </div>
      <div>
        <label className="mb-2 block text-xs font-medium text-muted-foreground">Rating</label>
        <div className="flex flex-wrap gap-1">
          {[4, 3, 2, 1].map((r) => (
            <button key={r} className="flex items-center gap-1 rounded border border-border px-2 py-1 text-xs text-muted-foreground hover:border-primary/30">
              {r}+ <Star className="h-3 w-3 fill-primary text-primary" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full min-h-screen flex-col lg:flex-row">
      {/* Desktop Sidebar Filters */}
      <div className="hidden w-64 shrink-0 border-r border-border bg-card/50 p-5 lg:block">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Filter className="h-4 w-4 text-primary" /> Filters
        </h3>
        <FiltersContent />
      </div>

      {/* Mobile Filter Sheet */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <motion.div
            initial={{ x: -300 }} animate={{ x: 0 }}
            className="relative z-10 h-full w-72 border-r border-border bg-card p-5 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Filter className="h-4 w-4 text-primary" /> Filters
              </h3>
              <button onClick={() => setShowFilters(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <FiltersContent />
          </motion.div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <div className="border-b border-border bg-card/50 p-4 pt-14 sm:p-6 md:pt-6">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold text-foreground sm:gap-3 sm:text-2xl">
              <ShoppingBag className="h-6 w-6 text-primary sm:h-7 sm:w-7" /> Marketplace
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Explorează și achiziționează modele AI de calitate.</p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button variant="outline" size="icon" className="lg:hidden shrink-0" onClick={() => setShowFilters(true)}>
              <Filter className="h-4 w-4" />
            </Button>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search marketplace..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="browse">Browse</TabsTrigger>
              <TabsTrigger value="purchases">My Purchases</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="mt-5">
              {/* Featured */}
              <div className="mb-6 sm:mb-8">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Star className="h-4 w-4 text-primary" /> Featured & Trending
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                  {featured.map((asset) => (
                    <div key={asset.id} className="min-w-[200px] sm:min-w-[220px] rounded-xl border border-primary/20 bg-card p-4 glow-primary shrink-0">
                      <div className="mb-3 h-24 sm:h-28 rounded-lg bg-primary/5 flex items-center justify-center">
                        <Tag className="h-8 w-8 text-primary/40" />
                      </div>
                      <h4 className="text-sm font-semibold text-foreground truncate">{asset.name}</h4>
                      <p className="text-xs text-muted-foreground">{asset.creator}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">{asset.desc}</p>
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
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4">
                {filtered.map((asset, i) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30"
                  >
                    <div className="mb-3 h-28 sm:h-32 rounded-lg bg-muted flex items-center justify-center relative">
                      <Tag className="h-8 w-8 text-muted-foreground/30" />
                      <button className="absolute top-2 right-2 rounded-full bg-card/80 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    </div>
                    <Badge variant="outline" className="mb-2 text-[10px]">{asset.category}</Badge>
                    <h4 className="text-sm font-semibold text-foreground">{asset.name}</h4>
                    <p className="text-xs text-muted-foreground">{asset.creator} · {asset.reviews} reviews</p>
                    <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">{asset.desc}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-primary text-primary" /> {asset.rating}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs"><Eye className="h-3 w-3" /> Preview</Button>
                        <Button size="sm" className="h-7 text-xs">{asset.free ? "Get Free" : `$${asset.price}`}</Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="purchases" className="mt-5">
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
