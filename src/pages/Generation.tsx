import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, ChevronDown, ChevronUp, Image, Wand2, Save, Video,
  Pencil, RefreshCw, Clock, Settings2, Ratio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const mockHistory = [
  { id: 1, prompt: "Elegant fashion model in a neon city", time: "2 min ago" },
  { id: 2, prompt: "Fitness influencer at sunset beach", time: "15 min ago" },
  { id: 3, prompt: "Luxury lifestyle flat lay", time: "1 hour ago" },
  { id: 4, prompt: "Streetwear model urban setting", time: "2 hours ago" },
];

const mockResults = [
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },
];

const Generation = () => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [showNegative, setShowNegative] = useState(false);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [quality, setQuality] = useState("standard");
  const [seed, setSeed] = useState("random");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  return (
    <div className="flex h-full min-h-screen">
      {/* Settings Panel */}
      <div className="w-80 shrink-0 border-r border-border bg-card/50 overflow-y-auto">
        <div className="p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Settings2 className="h-4 w-4 text-primary" /> Generation Settings
          </h2>

          <div className="space-y-5">
            {/* Prompt */}
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your AI influencer or scene..."
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button variant="ghost" size="sm" className="mt-1 h-7 gap-1 text-xs text-primary">
                <Wand2 className="h-3 w-3" /> Enhance Prompt
              </Button>
            </div>

            {/* Negative Prompt */}
            <div>
              <button
                onClick={() => setShowNegative(!showNegative)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {showNegative ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                Negative Prompt
              </button>
              {showNegative && (
                <textarea
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="What to avoid..."
                  className="mt-2 flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              )}
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                <Ratio className="mr-1 inline h-3 w-3" /> Aspect Ratio
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {["1:1", "9:16", "16:9", "4:5"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setAspectRatio(r)}
                    className={`rounded-md border px-2 py-1.5 text-xs transition-all ${
                      aspectRatio === r ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality */}
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Quality</label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="hd">HD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Seed */}
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Seed</label>
              <Select value={seed} onValueChange={setSeed}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Random</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button className="w-full gap-2" size="lg" onClick={handleGenerate} disabled={!prompt || isGenerating}>
              {isGenerating ? (
                <><RefreshCw className="h-4 w-4 animate-spin" /> Generating...</>
              ) : (
                <><Sparkles className="h-4 w-4" /> Generate</>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas / Results */}
      <div className="flex-1 overflow-auto p-6">
        <h1 className="mb-6 flex items-center gap-3 text-2xl font-bold text-foreground">
          <Sparkles className="h-7 w-7 text-primary" /> Generation
        </h1>

        {isGenerating ? (
          <div className="flex h-96 items-center justify-center rounded-xl border border-border bg-card">
            <div className="text-center">
              <RefreshCw className="mx-auto mb-3 h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Generating your image...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {mockResults.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-square rounded-xl border border-border bg-muted flex items-center justify-center"
              >
                <Image className="h-12 w-12 text-muted-foreground/20" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 rounded-b-xl bg-card/90 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs"><Save className="h-3 w-3" /> Save</Button>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs"><Video className="h-3 w-3" /> Video</Button>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs"><Pencil className="h-3 w-3" /> Edit</Button>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs"><RefreshCw className="h-3 w-3" /> Redo</Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* History Sidebar */}
      <div className="hidden w-64 shrink-0 border-l border-border bg-card/50 overflow-y-auto xl:block">
        <div className="p-5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Clock className="h-4 w-4 text-primary" /> History
          </h3>
          <div className="space-y-2">
            {mockHistory.map((h) => (
              <button
                key={h.id}
                className="w-full rounded-lg border border-border bg-muted/30 p-3 text-left transition-all hover:border-primary/30"
              >
                <p className="text-xs text-foreground line-clamp-2">{h.prompt}</p>
                <span className="mt-1 text-[10px] text-muted-foreground">{h.time}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generation;
