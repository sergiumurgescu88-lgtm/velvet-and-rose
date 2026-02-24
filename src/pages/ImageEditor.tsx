import { useState } from "react";
import { motion } from "framer-motion";
import {
  Pencil, MousePointer, Crop, Maximize, Paintbrush, Expand,
  Eraser, Palette, Type, Image, Filter, Layers, Undo2, Redo2,
  ZoomIn, Grid3x3, Save, Download, Eye, Sun, Contrast,
  Droplets, Thermometer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

const tools = [
  { id: "select", icon: MousePointer, label: "Select" },
  { id: "crop", icon: Crop, label: "Crop" },
  { id: "resize", icon: Maximize, label: "Resize" },
  { id: "inpaint", icon: Paintbrush, label: "AI Inpaint" },
  { id: "outpaint", icon: Expand, label: "AI Outpaint" },
  { id: "remove-bg", icon: Image, label: "Remove BG" },
  { id: "object-remove", icon: Eraser, label: "Object Remove" },
  { id: "color", icon: Palette, label: "Color Correct" },
  { id: "text", icon: Type, label: "Add Text" },
  { id: "filter", icon: Filter, label: "Filters & LUTs" },
];

const filters = ["Original", "Fashion", "Cinematic", "Warm", "Cool", "Vintage", "B&W", "Neon"];

const ImageEditor = () => {
  const [activeTool, setActiveTool] = useState("select");
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [brightness, setBrightness] = useState([50]);
  const [contrast, setContrast] = useState([50]);
  const [saturation, setSaturation] = useState([50]);
  const [temperature, setTemperature] = useState([50]);
  const [activeFilter, setActiveFilter] = useState("Original");
  const [history] = useState(["Upload image", "Crop", "Color correction"]);

  return (
    <div className="flex h-full min-h-screen flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-border bg-card/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <h1 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Pencil className="h-4 w-4 text-primary" /> Image Editor
          </h1>
          <Separator orientation="vertical" className="h-5" />
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7"><Undo2 className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7"><Redo2 className="h-3.5 w-3.5" /></Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded border border-border px-2 py-1">
            <ZoomIn className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{zoom}%</span>
          </div>
          <Button
            variant={showGrid ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => setShowGrid(!showGrid)}
          >
            <Grid3x3 className="h-3.5 w-3.5" />
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
            <Save className="h-3 w-3" /> Save to Library
          </Button>
          <Button size="sm" className="h-7 gap-1 text-xs">
            <Download className="h-3 w-3" /> Export
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Toolbar */}
        <div className="w-14 shrink-0 border-r border-border bg-card/50 py-2">
          <div className="flex flex-col items-center gap-1">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                title={tool.label}
                className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all ${
                  activeTool === tool.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <tool.icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center bg-background/50 p-8 relative">
          {showGrid && (
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
          )}
          <div className="relative rounded-lg border border-border bg-muted shadow-xl" style={{ width: 500, height: 500 }}>
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Image className="mx-auto mb-2 h-12 w-12" />
                <p className="text-sm">Drop an image here or upload</p>
                <Button variant="outline" size="sm" className="mt-3 gap-2 text-xs">
                  <Image className="h-3 w-3" /> Upload Image
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-64 shrink-0 border-l border-border bg-card/50 overflow-y-auto">
          <div className="p-4 space-y-5">
            {/* Adjustments */}
            {activeTool === "color" && (
              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-foreground">Color Correction</h3>
                <div>
                  <div className="mb-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Sun className="h-3 w-3" /> Brightness
                  </div>
                  <Slider value={brightness} onValueChange={setBrightness} max={100} />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Contrast className="h-3 w-3" /> Contrast
                  </div>
                  <Slider value={contrast} onValueChange={setContrast} max={100} />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Droplets className="h-3 w-3" /> Saturation
                  </div>
                  <Slider value={saturation} onValueChange={setSaturation} max={100} />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Thermometer className="h-3 w-3" /> Temperature
                  </div>
                  <Slider value={temperature} onValueChange={setTemperature} max={100} />
                </div>
              </div>
            )}

            {activeTool === "filter" && (
              <div>
                <h3 className="mb-3 text-xs font-semibold text-foreground">Filters & LUTs</h3>
                <div className="grid grid-cols-2 gap-1.5">
                  {filters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`rounded-lg border p-2 text-xs transition-all ${
                        activeFilter === f ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTool === "inpaint" && (
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-foreground">AI Inpaint</h3>
                <p className="text-[10px] text-muted-foreground">Paint over the area you want to change, then describe what to generate.</p>
                <textarea
                  placeholder="Describe what to generate..."
                  className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button size="sm" className="w-full gap-1 text-xs"><Paintbrush className="h-3 w-3" /> Apply Inpaint</Button>
              </div>
            )}

            {activeTool === "outpaint" && (
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-foreground">AI Outpaint</h3>
                <p className="text-[10px] text-muted-foreground">Extend image borders with AI-generated content.</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {["Top", "Bottom", "Left", "Right"].map((d) => (
                    <button key={d} className="rounded border border-border px-2 py-1.5 text-xs text-muted-foreground hover:border-primary/30">{d}</button>
                  ))}
                </div>
                <Button size="sm" className="w-full gap-1 text-xs"><Expand className="h-3 w-3" /> Outpaint</Button>
              </div>
            )}

            {/* Layers */}
            <div className="border-t border-border pt-4">
              <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold text-foreground">
                <Layers className="h-3.5 w-3.5 text-primary" /> Layers
              </h3>
              <div className="space-y-1">
                {["Background", "Layer 1"].map((l, i) => (
                  <div key={l} className={`flex items-center gap-2 rounded px-2 py-1.5 text-xs ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                    <Eye className="h-3 w-3" />
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* History */}
            <div className="border-t border-border pt-4">
              <h3 className="mb-2 text-xs font-semibold text-foreground">History</h3>
              <div className="space-y-1">
                {history.map((h, i) => (
                  <div key={i} className="rounded px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted cursor-pointer">
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
