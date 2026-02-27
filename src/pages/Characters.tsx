import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Plus, Search, Filter, Edit, Copy, Trash2, Video,
  X, Upload, Mic, Sparkles, ChevronRight, ChevronLeft,
  SlidersHorizontal, MoreVertical, Star, Eye, Heart, Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";

const mockCharacters = [
  { id: 1, name: "Luna Vega", category: "Fashion", status: "active", avatar: "", videos: 24, images: 156, niche: "Luxury Fashion", followers: "125K", engagement: "4.8%", rating: 4.9 },
  { id: 2, name: "Mia Storm", category: "Lifestyle", status: "active", avatar: "", videos: 18, images: 89, niche: "Travel & Lifestyle", followers: "89K", engagement: "3.2%", rating: 4.7 },
  { id: 3, name: "Aria Chen", category: "Fitness", status: "draft", avatar: "", videos: 7, images: 45, niche: "Fitness & Wellness", followers: "45K", engagement: "5.1%", rating: 4.5 },
  { id: 4, name: "Zara Knight", category: "Beauty", status: "active", avatar: "", videos: 31, images: 210, niche: "Beauty & Skincare", followers: "210K", engagement: "6.3%", rating: 4.9 },
  { id: 5, name: "Nova Blake", category: "Tech", status: "inactive", avatar: "", videos: 3, images: 12, niche: "Tech Reviews", followers: "12K", engagement: "2.1%", rating: 4.1 },
  { id: 6, name: "Ivy Rose", category: "Fashion", status: "active", avatar: "", videos: 15, images: 98, niche: "Streetwear", followers: "67K", engagement: "4.5%", rating: 4.6 },
];

const statusColors: Record<string, string> = {
  active: "bg-safe/20 text-safe",
  draft: "bg-primary/20 text-primary",
  inactive: "bg-muted-foreground/20 text-muted-foreground",
};

interface WizardState {
  step: number;
  name: string;
  bio: string;
  handle: string;
  niche: string;
  tone: string;
  voice: string;
  age: number[];
  ethnicity: string;
  bodyType: string;
}

const Characters = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterCategory, setFilterCategory] = useState("all");
  const [wizard, setWizard] = useState<WizardState>({
    step: 1, name: "", bio: "", handle: "", niche: "fashion", tone: "friendly", voice: "female-1", age: [25], ethnicity: "european", bodyType: "slim",
  });

  const filtered = mockCharacters.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || c.category.toLowerCase() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-full min-h-screen flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 p-4 pt-14 sm:p-6 md:pt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold text-foreground sm:gap-3 sm:text-2xl">
              <Users className="h-6 w-6 text-primary sm:h-7 sm:w-7" /> Characters
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Creează și gestionează personaje AI pentru conținut.</p>
          </div>
          <Button onClick={() => setShowWizard(true)} className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" /> Create Character
          </Button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <div className="relative flex-1 min-w-0 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search characters..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <Filter className="mr-2 h-3.5 w-3.5" /><SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[130px]">
                <SlidersHorizontal className="mr-2 h-3.5 w-3.5" /><SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="most-used">Most Used</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4">
          {filtered.map((char, i) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:glow-primary"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary text-xl font-bold">
                  {char.name.charAt(0)}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-100 sm:opacity-0 transition-opacity group-hover:opacity-100">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Edit className="mr-2 h-3.5 w-3.5" /> Edit</DropdownMenuItem>
                    <DropdownMenuItem><Copy className="mr-2 h-3.5 w-3.5" /> Duplicate</DropdownMenuItem>
                    <DropdownMenuItem><Video className="mr-2 h-3.5 w-3.5" /> Use in Video</DropdownMenuItem>
                    <DropdownMenuItem><Share2 className="mr-2 h-3.5 w-3.5" /> Share</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-3.5 w-3.5" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <h3 className="font-semibold text-foreground">{char.name}</h3>
              <p className="text-xs text-muted-foreground">{char.niche}</p>

              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <Badge variant="outline" className={statusColors[char.status]}>{char.status}</Badge>
                <Badge variant="outline" className="text-xs">{char.category}</Badge>
                <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                  <Star className="h-2.5 w-2.5 fill-primary text-primary" /> {char.rating}
                </span>
              </div>

              {/* Extended Stats */}
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
                <div><span className="block text-[10px] uppercase tracking-wider opacity-60">Followers</span>{char.followers}</div>
                <div><span className="block text-[10px] uppercase tracking-wider opacity-60">Engagement</span>{char.engagement}</div>
                <div><span className="block text-[10px] uppercase tracking-wider opacity-60">Videos</span>{char.videos}</div>
                <div><span className="block text-[10px] uppercase tracking-wider opacity-60">Images</span>{char.images}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Wizard Modal */}
      <AnimatePresence>
        {showWizard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/80 backdrop-blur-sm p-0 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl border border-border bg-card p-5 sm:p-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => { setShowWizard(false); setWizard((w) => ({ ...w, step: 1 })); }}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="mb-1 text-lg sm:text-xl font-bold text-foreground">Create New Character</h2>
              <p className="mb-5 text-sm text-muted-foreground">Step {wizard.step} of 4</p>

              <div className="mb-5 flex gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= wizard.step ? "bg-primary" : "bg-muted"}`} />
                ))}
              </div>

              {wizard.step === 1 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-foreground">Upload base photo or generate from description</p>
                  <div className="flex h-36 sm:h-40 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 text-muted-foreground hover:border-primary/50 cursor-pointer transition-colors">
                    <div className="text-center">
                      <Upload className="mx-auto mb-2 h-8 w-8" />
                      <span className="text-sm">Drop image or click to upload</span>
                    </div>
                  </div>
                  <div className="text-center text-xs text-muted-foreground">or</div>
                  <div className="flex gap-2">
                    <Input placeholder="Describe your character..." className="flex-1" />
                    <Button variant="outline" size="icon"><Sparkles className="h-4 w-4" /></Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs text-muted-foreground">Ethnicity</label>
                      <Select value={wizard.ethnicity} onValueChange={(v) => setWizard((w) => ({ ...w, ethnicity: v }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="european">European</SelectItem>
                          <SelectItem value="asian">Asian</SelectItem>
                          <SelectItem value="african">African</SelectItem>
                          <SelectItem value="latina">Latina</SelectItem>
                          <SelectItem value="middle-eastern">Middle Eastern</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-muted-foreground">Body Type</label>
                      <Select value={wizard.bodyType} onValueChange={(v) => setWizard((w) => ({ ...w, bodyType: v }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slim">Slim</SelectItem>
                          <SelectItem value="athletic">Athletic</SelectItem>
                          <SelectItem value="curvy">Curvy</SelectItem>
                          <SelectItem value="average">Average</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">Age: {wizard.age[0]}</label>
                    <Slider value={wizard.age} onValueChange={(v) => setWizard((w) => ({ ...w, age: v }))} min={18} max={60} />
                  </div>
                </div>
              )}

              {wizard.step === 2 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-foreground">Set personality traits</p>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">Tone</label>
                    <Select value={wizard.tone} onValueChange={(v) => setWizard((w) => ({ ...w, tone: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="sassy">Sassy</SelectItem>
                        <SelectItem value="mysterious">Mysterious</SelectItem>
                        <SelectItem value="playful">Playful</SelectItem>
                        <SelectItem value="confident">Confident</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">Niche</label>
                    <Select value={wizard.niche} onValueChange={(v) => setWizard((w) => ({ ...w, niche: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                        <SelectItem value="tech">Tech</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">Personality Keywords</label>
                    <Input placeholder="e.g. bold, creative, minimalist..." />
                  </div>
                </div>
              )}

              {wizard.step === 3 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-foreground">Voice Selection</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["female-1", "female-2", "female-3", "male-1", "male-2", "male-3"].map((v) => (
                      <button
                        key={v}
                        onClick={() => setWizard((w) => ({ ...w, voice: v }))}
                        className={`flex items-center gap-2 rounded-lg border p-3 text-sm transition-all ${
                          wizard.voice === v ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        <Mic className="h-4 w-4" />
                        {v.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground">Voice will be used for video narration and audio content.</p>
                </div>
              )}

              {wizard.step === 4 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-foreground">Character Details</p>
                  <Input placeholder="Character name" value={wizard.name} onChange={(e) => setWizard((w) => ({ ...w, name: e.target.value }))} />
                  <Input placeholder="@social_handle" value={wizard.handle} onChange={(e) => setWizard((w) => ({ ...w, handle: e.target.value }))} />
                  <textarea
                    placeholder="Bio / Description..."
                    value={wizard.bio}
                    onChange={(e) => setWizard((w) => ({ ...w, bio: e.target.value }))}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">Summary</p>
                    <p>Niche: {wizard.niche} · Tone: {wizard.tone} · Voice: {wizard.voice}</p>
                    <p>Age: {wizard.age[0]} · Ethnicity: {wizard.ethnicity} · Body: {wizard.bodyType}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setWizard((w) => ({ ...w, step: Math.max(1, w.step - 1) }))} disabled={wizard.step === 1}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back
                </Button>
                {wizard.step < 4 ? (
                  <Button onClick={() => setWizard((w) => ({ ...w, step: w.step + 1 }))}>
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={() => { setShowWizard(false); setWizard((w) => ({ ...w, step: 1 })); }}>
                    <Sparkles className="mr-1 h-4 w-4" /> Create Character
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Characters;
