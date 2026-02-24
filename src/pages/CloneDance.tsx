import { useState } from "react";
import { motion } from "framer-motion";
import {
  Music2, Upload, Users, Image, Play, Settings2,
  RefreshCw, Save, Download, Music, Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const CloneDance = () => {
  const [step, setStep] = useState(1);
  const [character, setCharacter] = useState("");
  const [background, setBackground] = useState("keep");
  const [outputStyle, setOutputStyle] = useState("realistic");
  const [musicOverlay, setMusicOverlay] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ step: 0, label: "" });

  const handleGenerate = () => {
    setIsGenerating(true);
    setStep(4);
    const steps = ["Pose Detection", "Motion Transfer", "Rendering"];
    let i = 0;
    const interval = setInterval(() => {
      setProgress({ step: i + 1, label: steps[i] });
      i++;
      if (i >= steps.length) {
        clearInterval(interval);
        setTimeout(() => { setIsGenerating(false); setStep(5); }, 1500);
      }
    }, 2000);
  };

  return (
    <div className="flex h-full min-h-screen flex-col p-6">
      <div className="mb-6">
        <h1 className="flex items-center gap-3 text-2xl font-bold text-foreground">
          <Music2 className="h-7 w-7 text-primary" /> Clone Dance
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Clonează mișcări de dans cu AI.</p>
      </div>

      {/* Steps indicator */}
      <div className="mb-8 flex items-center gap-2">
        {["Upload Video", "Select Character", "Options", "Generate", "Preview"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              i + 1 <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {i + 1}
            </div>
            <span className={`hidden text-xs sm:inline ${i + 1 <= step ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
            {i < 4 && <div className={`h-px w-8 ${i + 1 < step ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      <div className="flex-1">
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Step 1: Upload Reference Dance Video</h3>
            <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-border bg-card hover:border-primary/30 transition-colors cursor-pointer">
              <div className="text-center text-muted-foreground">
                <Upload className="mx-auto mb-3 h-12 w-12" />
                <p className="text-sm font-medium">Drag & drop video file</p>
                <p className="text-xs opacity-60">MP4/MOV, max 60 seconds</p>
              </div>
            </div>
            <Button className="mt-4" onClick={() => setStep(2)}>Continue</Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Step 2: Select Target Character</h3>
            <Select value={character} onValueChange={setCharacter}>
              <SelectTrigger><SelectValue placeholder="Choose a character..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="luna">Luna Vega</SelectItem>
                <SelectItem value="mia">Mia Storm</SelectItem>
                <SelectItem value="aria">Aria Chen</SelectItem>
                <SelectItem value="zara">Zara Knight</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} disabled={!character}>Continue</Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg space-y-5">
            <h3 className="text-sm font-semibold text-foreground">Step 3: Options</h3>
            <div>
              <label className="mb-1 text-xs text-muted-foreground">Background</label>
              <Select value={background} onValueChange={setBackground}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="keep">Keep Original</SelectItem>
                  <SelectItem value="custom">Custom Scene</SelectItem>
                  <SelectItem value="transparent">Transparent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 text-xs text-muted-foreground">Output Style</label>
              <div className="grid grid-cols-3 gap-2">
                {["realistic", "stylized", "cinematic"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setOutputStyle(s)}
                    className={`rounded-lg border px-3 py-2 text-xs capitalize transition-all ${
                      outputStyle === s ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs text-muted-foreground">Music Overlay</label>
              <button
                onClick={() => setMusicOverlay(!musicOverlay)}
                className={`rounded-full px-3 py-1 text-xs transition-all ${
                  musicOverlay ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {musicOverlay ? "On" : "Off"}
              </button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={handleGenerate} className="gap-2"><Play className="h-4 w-4" /> Generate</Button>
            </div>
          </motion.div>
        )}

        {step === 4 && isGenerating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20">
            <div className="mb-6 flex gap-4">
              {["Pose Detection", "Motion Transfer", "Rendering"].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${
                    i + 1 <= progress.step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {i + 1 <= progress.step ? "✓" : i + 1}
                  </div>
                  <span className={`text-xs ${i + 1 <= progress.step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
                </div>
              ))}
            </div>
            <RefreshCw className="mb-3 h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">{progress.label || "Preparing..."}</p>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Step 5: Side-by-Side Comparison</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex aspect-video items-center justify-center rounded-xl border border-border bg-card">
                <div className="text-center text-muted-foreground">
                  <Play className="mx-auto mb-1 h-8 w-8" />
                  <p className="text-xs">Original</p>
                </div>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-xl border border-primary/30 bg-card glow-primary">
                <div className="text-center text-muted-foreground">
                  <Play className="mx-auto mb-1 h-8 w-8 text-primary" />
                  <p className="text-xs text-primary">AI Clone</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="gap-1"><Save className="h-3.5 w-3.5" /> Save to Library</Button>
              <Button className="gap-1"><Download className="h-3.5 w-3.5" /> Export</Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CloneDance;
