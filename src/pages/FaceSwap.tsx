import { useState } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw, Upload, Image, User, Sparkles, ArrowRight,
  Download, Save, Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const FaceSwap = () => {
  const [sourceImage, setSourceImage] = useState(false);
  const [targetFace, setTargetFace] = useState("");
  const [blending, setBlending] = useState([75]);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="flex h-full min-h-screen flex-col p-6">
      <div className="mb-6">
        <h1 className="flex items-center gap-3 text-2xl font-bold text-foreground">
          <RefreshCw className="h-7 w-7 text-primary" /> Face Swap
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Schimbă fețele în imagini cu AI.</p>
      </div>

      <div className="flex flex-1 gap-6">
        {/* Source */}
        <div className="flex-1">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Source Image</h3>
          <div className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-border bg-card hover:border-primary/30 transition-colors cursor-pointer">
            <div className="text-center text-muted-foreground">
              <Upload className="mx-auto mb-2 h-10 w-10" />
              <p className="text-sm">Upload source image</p>
              <p className="text-xs opacity-60">or drag & drop</p>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center">
          <div className="rounded-full border border-border bg-card p-3">
            <ArrowRight className="h-5 w-5 text-primary" />
          </div>
        </div>

        {/* Target */}
        <div className="flex-1">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Target Face</h3>
          <div className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-border bg-card hover:border-primary/30 transition-colors cursor-pointer">
            <div className="text-center text-muted-foreground">
              <User className="mx-auto mb-2 h-10 w-10" />
              <p className="text-sm">Select from Characters</p>
              <p className="text-xs opacity-60">or upload a face</p>
            </div>
          </div>
          <Select value={targetFace} onValueChange={setTargetFace}>
            <SelectTrigger className="mt-3"><SelectValue placeholder="Or select a character..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="luna">Luna Vega</SelectItem>
              <SelectItem value="mia">Mia Storm</SelectItem>
              <SelectItem value="aria">Aria Chen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Result */}
        <div className="flex-1">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Result</h3>
          <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-card">
            {isProcessing ? (
              <RefreshCw className="h-10 w-10 animate-spin text-primary" />
            ) : (
              <div className="text-center text-muted-foreground">
                <Image className="mx-auto mb-2 h-10 w-10" />
                <p className="text-xs">Result will appear here</p>
              </div>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs">
              <Save className="h-3 w-3" /> Save
            </Button>
            <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs">
              <Download className="h-3 w-3" /> Download
            </Button>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Settings2 className="h-4 w-4 text-primary" /> Settings
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label className="mb-1 text-xs text-muted-foreground">Blending Strength: {blending[0]}%</label>
            <Slider value={blending} onValueChange={setBlending} max={100} />
          </div>
          <div>
            <label className="mb-1 text-xs text-muted-foreground">Skin Matching</label>
            <Select defaultValue="auto">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 text-xs text-muted-foreground">Lighting Adjustment</label>
            <Select defaultValue="auto">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="mt-4 gap-2" onClick={() => { setIsProcessing(true); setTimeout(() => setIsProcessing(false), 3000); }}>
          <Sparkles className="h-4 w-4" /> Swap Face
        </Button>
      </div>
    </div>
  );
};

export default FaceSwap;
