import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText, Plus, Search, Copy, Heart, Play, Edit, Trash2,
  Star, Lock, Globe, Tag, Wand2, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const categories = ["All", "Image", "Video", "Character", "Dance", "Scene"];

const mockPrompts = [
  { id: 1, title: "Cinematic Fashion Shot", category: "Image", text: "A stunning {{character_name}} in a {{style}} outfit, cinematic lighting, shallow depth of field, 8k quality", rating: 4.9, uses: 456, isPublic: true, isMine: true },
  { id: 2, title: "Urban Lifestyle Reel", category: "Video", text: "Create a dynamic lifestyle video featuring {{character_name}} walking through a vibrant city at golden hour", rating: 4.7, uses: 234, isPublic: true, isMine: true },
  { id: 3, title: "Fitness Transformation", category: "Character", text: "Athletic {{character_name}} showing confident pose, gym background, motivational atmosphere, {{style}} aesthetic", rating: 4.5, uses: 178, isPublic: false, isMine: true },
  { id: 4, title: "Neon Dance Scene", category: "Dance", text: "{{character_name}} performing energetic dance moves in a neon-lit club, smoke effects, cyberpunk vibes", rating: 4.8, uses: 312, isPublic: true, isMine: false },
  { id: 5, title: "Beach Sunset Mood", category: "Scene", text: "Beautiful sunset beach scene, {{character_name}} silhouette, warm golden tones, peaceful atmosphere", rating: 4.6, uses: 189, isPublic: true, isMine: false },
];

const Prompts = () => {
  const [tab, setTab] = useState("mine");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showCreate, setShowCreate] = useState(false);
  const [newPrompt, setNewPrompt] = useState({ title: "", category: "Image", text: "", isPublic: false });

  const filtered = mockPrompts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    const matchTab = tab === "mine" ? p.isMine : !p.isMine;
    return matchSearch && matchCategory && matchTab;
  });

  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="border-b border-border bg-card/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-foreground">
              <FileText className="h-7 w-7 text-primary" /> Prompts
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Biblioteca ta de prompturi.</p>
          </div>
          <Button onClick={() => setShowCreate(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Create New Prompt
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search prompts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-3 py-1 text-xs transition-all ${
                  category === c ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="mine">My Prompts</TabsTrigger>
            <TabsTrigger value="community">Community Prompts</TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="mt-6">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {filtered.map((prompt, i) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{prompt.title}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px]">{prompt.category}</Badge>
                        {prompt.isPublic ? (
                          <span className="flex items-center gap-1 text-[10px] text-safe"><Globe className="h-2.5 w-2.5" /> Public</span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Lock className="h-2.5 w-2.5" /> Private</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-primary text-primary" /> {prompt.rating}
                    </div>
                  </div>

                  <div className="mt-3 rounded-lg bg-muted/50 px-3 py-2">
                    <code className="text-xs text-muted-foreground font-mono line-clamp-2">{prompt.text}</code>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">{prompt.uses} uses</span>
                    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs"><Copy className="h-3 w-3" /> Copy</Button>
                      <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs"><Heart className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs"><Play className="h-3 w-3" /> Use</Button>
                      {prompt.isMine && (
                        <>
                          <Button variant="ghost" size="sm" className="h-7"><Edit className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="sm" className="h-7 text-destructive"><Trash2 className="h-3 w-3" /></Button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6"
          >
            <button onClick={() => setShowCreate(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            <h2 className="mb-4 text-xl font-bold text-foreground">Create New Prompt</h2>
            <div className="space-y-4">
              <Input placeholder="Prompt title" value={newPrompt.title} onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })} />
              <Select value={newPrompt.category} onValueChange={(v) => setNewPrompt({ ...newPrompt, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.filter((c) => c !== "All").map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div>
                <textarea
                  placeholder="Write your prompt... Use {{variable}} for placeholders"
                  value={newPrompt.text}
                  onChange={(e) => setNewPrompt({ ...newPrompt, text: e.target.value })}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button variant="ghost" size="sm" className="mt-1 h-7 gap-1 text-xs text-primary">
                  <Wand2 className="h-3 w-3" /> AI Enhance
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Privacy:</span>
                <button
                  onClick={() => setNewPrompt({ ...newPrompt, isPublic: !newPrompt.isPublic })}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs ${
                    newPrompt.isPublic ? "bg-safe/10 text-safe" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {newPrompt.isPublic ? <><Globe className="h-3 w-3" /> Public</> : <><Lock className="h-3 w-3" /> Private</>}
                </button>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" className="gap-1"><Play className="h-3 w-3" /> Test Prompt</Button>
                <Button size="sm" onClick={() => setShowCreate(false)}>Save Prompt</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Prompts;
