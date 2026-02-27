import { useState } from "react";
import { motion } from "framer-motion";
import {
  Pencil, MousePointer, Crop, Maximize, Paintbrush, Expand,
  Eraser, Palette, Type, Image, Filter, Layers, Undo2, Redo2,
  ZoomIn, Grid3x3, Save, Download, Eye, Sun, Contrast,
  Droplets, Thermometer, Menu, X, ChevronLeft, ChevronRight,
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
  const [showToolbar, setShowToolbar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="flex h-full min-h-screen flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-border bg-card/50 px-3 py-2 pt-14 sm:pt-2 sm:px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-7 w-7 lg:hidden" onClick={() => setShowToolbar(!showToolbar)}>
            <Menu className="h-4 w-4" />
          </Button>
          <h1 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Pencil className="h-4 w-4 text-primary" /> <span className="hidden sm:inline">Image Editor</span>
          </h1>
          <Separator orientation="vertical" className="h-5 hidden sm:block" />
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7"><Undo2 className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7"><Redo2 className="h-3.5 w-3.5" /></Button>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:flex items-center gap-1 rounded border border-border px-2 py-1">
            <ZoomIn className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{zoom}%</span>
          </div>
          <Button variant={showGrid ? "secondary" : "ghost"} size="icon" className="h-7 w-7 hidden sm:flex" onClick={() => setShowGrid(!showGrid)}>
            <Grid3x3 className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="h-7 gap-1 text-xs hidden sm:flex"><Save className="h-3 w-3" /> Save</Button>
          <Button size="sm" className="h-7 gap-1 text-xs"><Download className="h-3 w-3" /> <span className="hidden sm:inline">Export</span></Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 lg:hidden" onClick={() => setShowPanel(!showPanel)}>
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar - Desktop: icon strip, Mobile: overlay */}
        <div className={`${showToolbar ? "fixed inset-0 z-40 lg:relative lg:inset-auto" : "hidden lg:block"}`}>
          {showToolbar && <div className="absolute inset-0 bg-background/60 lg:hidden" onClick={() => setShowToolbar(false)} />}
          <div className="relative z-10 w-14 shrink-0 border-r border-border bg-card/50 py-2 h-full">
            <div className="flex flex-col items-center gap-1">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => { setActiveTool(tool.id); setShowToolbar(false); setShowPanel(true); }}
                  title={tool.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all ${
                    activeTool === tool.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <tool.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center bg-background/50 p-4 sm:p-8 relative">
          {showGrid && (
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
          )}
          <div className="relative rounded-lg border border-border bg-muted shadow-xl w-full max-w-[500px] aspect-square">
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Image className="mx-auto mb-2 h-10 w-10 sm:h-12 sm:w-12" />
                <p className="text-xs sm:text-sm">Drop an image here or upload</p>
                <Button variant="outline" size="sm" className="mt-3 gap-2 text-xs"><Image className="h-3 w-3" /> Upload Image</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className={`${showPanel ? "fixed inset-0 z-40 lg:relative lg:inset-auto" : "hidden lg:block"}`}>
          {showPanel && <div className="absolute inset-0 bg-background/60 lg:hidden" onClick={() => setShowPanel(false)} />}
          <div className="absolute right-0 top-0 bottom-0 lg:relative z-10 w-64 shrink-0 border-l border-border bg-card overflow-y-auto">
            <div className="p-4 space-y-5">
              <div className="flex items-center justify-between lg:hidden">
                <span className="text-xs font-semibold text-foreground">Properties</span>
                <button onClick={() => setShowPanel(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
              </div>

              {activeTool === "color" && (
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold text-foreground">Color Correction</h3>
                  {[
                    { label: "Brightness", icon: Sun, value: brightness, set: setBrightness },
                    { label: "Contrast", icon: Contrast, value: contrast, set: setContrast },
                    { label: "Saturation", icon: Droplets, value: saturation, set: setSaturation },
                    { label: "Temperature", icon: Thermometer, value: temperature, set: setTemperature },
                  ].map((ctrl) => (
                    <div key={ctrl.label}>
                      <div className="mb-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                        <ctrl.icon className="h-3 w-3" /> {ctrl.label}: {ctrl.value[0]}
                      </div>
                      <Slider value={ctrl.value} onValueChange={ctrl.set} max={100} />
                    </div>
                  ))}
                </div>
              )}

              {activeTool === "filter" && (
                <div>
                  <h3 className="mb-3 text-xs font-semibold text-foreground">Filters & LUTs</h3>
                  <div className="grid grid-cols-2 gap-1.5">
                    {filters.map((f) => (
                      <button key={f} onClick={() => setActiveFilter(f)}
                        className={`rounded-lg border p-2 text-xs transition-all ${
                          activeFilter === f ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                        }`}>{f}</button>
                    ))}
                  </div>
                </div>
              )}

              {activeTool === "inpaint" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-foreground">AI Inpaint</h3>
                  <p className="text-[10px] text-muted-foreground">Paint over the area you want to change, then describe what to generate.</p>
                  <textarea placeholder="Describe what to generate..."
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
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

              {activeTool === "text" && (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-foreground">Add Text</h3>
                  <textarea placeholder="Enter text..."
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                  <Button size="sm" className="w-full gap-1 text-xs"><Type className="h-3 w-3" /> Add Text Layer</Button>
                </div>
              )}

              {activeTool === "select" && (
                <div className="text-center py-8 text-xs text-muted-foreground">
                  <MousePointer className="mx-auto mb-2 h-6 w-6 opacity-30" />
                  Select a tool to see options
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
                      <Eye className="h-3 w-3" /><span>{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* History */}
              <div className="border-t border-border pt-4">
                <h3 className="mb-2 text-xs font-semibold text-foreground">History</h3>
                <div className="space-y-1">
                  {history.map((h, i) => (
                    <div key={i} className="rounded px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted cursor-pointer">{h}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
