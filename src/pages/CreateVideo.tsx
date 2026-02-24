import { useState } from "react";
import { motion } from "framer-motion";
import {
  Video, Plus, Play, Settings2, Users, Image, Type,
  Music, Sparkles, GripVertical, Trash2, ChevronDown,
  Download, Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface Scene {
  id: number;
  character: string;
  background: string;
  script: string;
  motion: string;
  transition: string;
}

const CreateVideo = () => {
  const [title, setTitle] = useState("");
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [duration, setDuration] = useState("30s");
  const [scenes, setScenes] = useState<Scene[]>([
    { id: 1, character: "Luna Vega", background: "Neon City", script: "Hey everyone! Welcome back to my channel.", motion: "subtle", transition: "fade" },
    { id: 2, character: "Luna Vega", background: "Studio", script: "Today I'm showing you the latest trends.", motion: "dynamic", transition: "slide" },
  ]);
  const [activeScene, setActiveScene] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ step: 0, label: "" });

  const addScene = () => {
    const newId = Math.max(...scenes.map((s) => s.id), 0) + 1;
    setScenes([...scenes, { id: newId, character: "", background: "", script: "", motion: "subtle", transition: "fade" }]);
    setActiveScene(newId);
  };

  const removeScene = (id: number) => {
    if (scenes.length <= 1) return;
    setScenes(scenes.filter((s) => s.id !== id));
    if (activeScene === id) setActiveScene(scenes[0].id);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    const steps = ["Script Processing", "Generating Visuals", "Audio Synthesis", "Final Render"];
    let i = 0;
    const interval = setInterval(() => {
      setProgress({ step: i + 1, label: steps[i] });
      i++;
      if (i >= steps.length) {
        clearInterval(interval);
        setTimeout(() => setIsGenerating(false), 1500);
      }
    }, 1500);
  };

  const currentScene = scenes.find((s) => s.id === activeScene);

  return (
    <div className="flex h-full min-h-screen flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-border bg-card/50 px-6 py-3">
        <div className="flex items-center gap-4">
          <h1 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Video className="h-5 w-5 text-primary" /> Create Video
          </h1>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Video Title..."
            className="w-60"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select value={aspectRatio} onValueChange={setAspectRatio}>
            <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="9:16">9:16</SelectItem>
              <SelectItem value="16:9">16:9</SelectItem>
              <SelectItem value="1:1">1:1</SelectItem>
            </SelectContent>
          </Select>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="15s">15s</SelectItem>
              <SelectItem value="30s">30s</SelectItem>
              <SelectItem value="60s">60s</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleGenerate} disabled={isGenerating} className="gap-2">
            <Play className="h-4 w-4" /> Generate Video
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Scene Editor */}
        <div className="w-72 shrink-0 border-r border-border bg-card/50 overflow-y-auto">
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Scenes</h3>
              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={addScene}>
                <Plus className="h-3 w-3" /> Add
              </Button>
            </div>
            <div className="space-y-1.5">
              {scenes.map((scene, i) => (
                <button
                  key={scene.id}
                  onClick={() => setActiveScene(scene.id)}
                  className={`flex w-full items-center gap-2 rounded-lg border p-2.5 text-left text-sm transition-all ${
                    activeScene === scene.id
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <GripVertical className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium">Scene {i + 1}</span>
                    <p className="truncate text-[10px] text-muted-foreground">{scene.script || "Empty"}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeScene(scene.id); }}
                    className="text-muted-foreground/50 hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-lg border border-border bg-muted/30 p-3">
              <Button variant="ghost" size="sm" className="w-full gap-2 text-xs">
                <Wand2 className="h-3.5 w-3.5" /> AI Script Generator
              </Button>
            </div>
          </div>
        </div>

        {/* Preview / Center */}
        <div className="flex-1 flex items-center justify-center p-6">
          {isGenerating ? (
            <div className="text-center">
              <div className="mb-6 flex items-center justify-center gap-3">
                {["Script", "Visuals", "Audio", "Render"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      i + 1 <= progress.step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {i + 1}
                    </div>
                    <span className={`text-xs ${i + 1 <= progress.step ? "text-primary" : "text-muted-foreground"}`}>{step}</span>
                    {i < 3 && <ChevronDown className="h-3 w-3 rotate-[-90deg] text-muted-foreground" />}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{progress.label || "Preparing..."}</p>
            </div>
          ) : (
            <div className={`rounded-xl border border-border bg-muted flex items-center justify-center ${
              aspectRatio === "9:16" ? "h-[500px] w-[280px]" : aspectRatio === "16:9" ? "h-[300px] w-[533px]" : "h-[400px] w-[400px]"
            }`}>
              <div className="text-center text-muted-foreground">
                <Play className="mx-auto mb-2 h-10 w-10" />
                <p className="text-xs">Video Preview</p>
              </div>
            </div>
          )}
        </div>

        {/* Scene Properties */}
        <div className="w-72 shrink-0 border-l border-border bg-card/50 overflow-y-auto">
          {currentScene && (
            <div className="p-4 space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-primary" /> Scene Settings
              </h3>

              <div>
                <label className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" /> Character
                </label>
                <Select value={currentScene.character} onValueChange={() => {}}>
                  <SelectTrigger><SelectValue placeholder="Select character" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Luna Vega">Luna Vega</SelectItem>
                    <SelectItem value="Mia Storm">Mia Storm</SelectItem>
                    <SelectItem value="Aria Chen">Aria Chen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Image className="h-3 w-3" /> Background
                </label>
                <Select value={currentScene.background} onValueChange={() => {}}>
                  <SelectTrigger><SelectValue placeholder="Select background" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Neon City">Neon City</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                    <SelectItem value="Beach">Beach</SelectItem>
                    <SelectItem value="Urban">Urban</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Type className="h-3 w-3" /> Script/Dialogue
                </label>
                <textarea
                  value={currentScene.script}
                  onChange={() => {}}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">Motion Style</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {["static", "subtle", "dynamic"].map((m) => (
                    <button
                      key={m}
                      className={`rounded border px-2 py-1 text-xs capitalize ${
                        currentScene.motion === m ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">Transition</label>
                <Select value={currentScene.transition} onValueChange={() => {}}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fade">Fade</SelectItem>
                    <SelectItem value="slide">Slide</SelectItem>
                    <SelectItem value="cut">Cut</SelectItem>
                    <SelectItem value="zoom">Zoom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t border-border pt-4">
                <label className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Music className="h-3 w-3" /> Audio
                </label>
                <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                  <Music className="h-3.5 w-3.5" /> Add Voice / Music
                </Button>
              </div>

              <div className="border-t border-border pt-4">
                <label className="mb-1 text-xs text-muted-foreground">Export</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {["720p", "1080p", "4K"].map((q) => (
                    <button key={q} className="rounded border border-border px-2 py-1 text-xs text-muted-foreground hover:border-primary/30">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t border-border bg-card/50 px-6 py-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {scenes.map((scene, i) => (
            <div
              key={scene.id}
              onClick={() => setActiveScene(scene.id)}
              className={`flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-xs cursor-pointer transition-all ${
                activeScene === scene.id ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              <span className="font-medium">Scene {i + 1}</span>
              <span className="text-[10px] opacity-60">{scene.character || "..."}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateVideo;
