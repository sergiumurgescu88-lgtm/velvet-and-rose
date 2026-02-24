import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Plus, Search, Filter, Edit, Copy, Trash2, Video,
  X, Upload, Mic, Sparkles, ChevronRight, ChevronLeft,
  SlidersHorizontal, MoreVertical,
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

const mockCharacters = [
  { id: 1, name: "Luna Vega", category: "Fashion", status: "active", avatar: "", videos: 24, images: 156, niche: "Luxury Fashion" },
  { id: 2, name: "Mia Storm", category: "Lifestyle", status: "active", avatar: "", videos: 18, images: 89, niche: "Travel & Lifestyle" },
  { id: 3, name: "Aria Chen", category: "Fitness", status: "draft", avatar: "", videos: 7, images: 45, niche: "Fitness & Wellness" },
  { id: 4, name: "Zara Knight", category: "Beauty", status: "active", avatar: "", videos: 31, images: 210, niche: "Beauty & Skincare" },
  { id: 5, name: "Nova Blake", category: "Tech", status: "inactive", avatar: "", videos: 3, images: 12, niche: "Tech Reviews" },
  { id: 6, name: "Ivy Rose", category: "Fashion", status: "active", avatar: "", videos: 15, images: 98, niche: "Streetwear" },
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
}

const Characters = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterCategory, setFilterCategory] = useState("all");
  const [wizard, setWizard] = useState<WizardState>({
    step: 1, name: "", bio: "", handle: "", niche: "fashion", tone: "friendly", voice: "female-1",
  });

  const filtered = mockCharacters.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || c.category.toLowerCase() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-full min-h-screen flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-foreground">
              <Users className="h-7 w-7 text-primary" />
              Characters
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Creează și gestionează personaje AI pentru conținut.
            </p>
          </div>
          <Button onClick={() => setShowWizard(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Create New Character
          </Button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search characters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-3.5 w-3.5" />
              <SelectValue />
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
            <SelectTrigger className="w-[130px]">
              <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="most-used">Most Used</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((char, i) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:glow-primary"
            >
              {/* Avatar */}
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary text-xl font-bold">
                  {char.name.charAt(0)}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Edit className="mr-2 h-3.5 w-3.5" /> Edit</DropdownMenuItem>
                    <DropdownMenuItem><Copy className="mr-2 h-3.5 w-3.5" /> Duplicate</DropdownMenuItem>
                    <DropdownMenuItem><Video className="mr-2 h-3.5 w-3.5" /> Use in Video</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-3.5 w-3.5" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <h3 className="font-semibold text-foreground">{char.name}</h3>
              <p className="text-xs text-muted-foreground">{char.niche}</p>

              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline" className={statusColors[char.status]}>
                  {char.status}
                </Badge>
                <Badge variant="outline" className="text-xs">{char.category}</Badge>
              </div>

              {/* Stats */}
              <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                <span>{char.videos} videos</span>
                <span>{char.images} images</span>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6"
            >
              <button
                onClick={() => { setShowWizard(false); setWizard((w) => ({ ...w, step: 1 })); }}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="mb-1 text-xl font-bold text-foreground">Create New Character</h2>
              <p className="mb-6 text-sm text-muted-foreground">Step {wizard.step} of 4</p>

              {/* Progress */}
              <div className="mb-6 flex gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-colors ${s <= wizard.step ? "bg-primary" : "bg-muted"}`}
                  />
                ))}
              </div>

              {wizard.step === 1 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-foreground">Upload base photo or generate from description</p>
                  <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 text-muted-foreground hover:border-primary/50 cursor-pointer transition-colors">
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
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {wizard.step === 3 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-foreground">Voice Selection</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["female-1", "female-2", "male-1", "male-2"].map((v) => (
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
                </div>
              )}

              {wizard.step === 4 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-foreground">Character Details</p>
                  <Input
                    placeholder="Character name"
                    value={wizard.name}
                    onChange={(e) => setWizard((w) => ({ ...w, name: e.target.value }))}
                  />
                  <Input
                    placeholder="@social_handle"
                    value={wizard.handle}
                    onChange={(e) => setWizard((w) => ({ ...w, handle: e.target.value }))}
                  />
                  <textarea
                    placeholder="Bio / Description..."
                    value={wizard.bio}
                    onChange={(e) => setWizard((w) => ({ ...w, bio: e.target.value }))}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              )}

              {/* Navigation */}
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setWizard((w) => ({ ...w, step: Math.max(1, w.step - 1) }))}
                  disabled={wizard.step === 1}
                >
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
