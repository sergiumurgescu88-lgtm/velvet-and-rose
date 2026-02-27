import { useState } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw, Upload, Image, User, Sparkles, ArrowRight, ArrowDown,
  Download, Save, Settings2, Eye, Sliders,
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
  const [faceEnhance, setFaceEnhance] = useState([50]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSwap = () => {
    setIsProcessing(true);
    setTimeout(() => { setIsProcessing(false); setShowResult(true); }, 3000);
  };

  return (
    <div className="flex h-full min-h-screen flex-col p-4 pt-14 sm:p-6 md:pt-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="flex items-center gap-2 text-xl font-bold text-foreground sm:gap-3 sm:text-2xl">
          <RefreshCw className="h-6 w-6 text-primary sm:h-7 sm:w-7" /> Face Swap
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Schimbă fețele în imagini cu AI.</p>
      </div>

      {/* Main Content - stacks vertically on mobile */}
      <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:flex-1">
        {/* Source */}
        <div className="flex-1">
          <h3 className="mb-2 text-sm font-semibold text-foreground">Source Image</h3>
          <div className="flex aspect-square max-h-[300px] lg:max-h-none items-center justify-center rounded-xl border-2 border-dashed border-border bg-card hover:border-primary/30 transition-colors cursor-pointer">
            <div className="text-center text-muted-foreground">
              <Upload className="mx-auto mb-2 h-8 w-8 sm:h-10 sm:w-10" />
              <p className="text-sm">Upload source image</p>
              <p className="text-xs opacity-60">or drag & drop</p>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center">
          <div className="rounded-full border border-border bg-card p-2 sm:p-3">
            <ArrowDown className="h-5 w-5 text-primary lg:hidden" />
            <ArrowRight className="h-5 w-5 text-primary hidden lg:block" />
          </div>
        </div>

        {/* Target */}
        <div className="flex-1">
          <h3 className="mb-2 text-sm font-semibold text-foreground">Target Face</h3>
          <div className="flex aspect-square max-h-[300px] lg:max-h-none items-center justify-center rounded-xl border-2 border-dashed border-border bg-card hover:border-primary/30 transition-colors cursor-pointer">
            <div className="text-center text-muted-foreground">
              <User className="mx-auto mb-2 h-8 w-8 sm:h-10 sm:w-10" />
              <p className="text-sm">Select from Characters</p>
              <p className="text-xs opacity-60">or upload a face</p>
            </div>
          </div>
          <Select value={targetFace} onValueChange={setTargetFace}>
            <SelectTrigger className="mt-2 sm:mt-3"><SelectValue placeholder="Or select a character..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="luna">Luna Vega</SelectItem>
              <SelectItem value="mia">Mia Storm</SelectItem>
              <SelectItem value="aria">Aria Chen</SelectItem>
              <SelectItem value="zara">Zara Knight</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center">
          <div className="rounded-full border border-border bg-card p-2 sm:p-3">
            <ArrowDown className="h-5 w-5 text-primary lg:hidden" />
            <ArrowRight className="h-5 w-5 text-primary hidden lg:block" />
          </div>
        </div>

        {/* Result */}
        <div className="flex-1">
          <h3 className="mb-2 text-sm font-semibold text-foreground">Result</h3>
          <div className="flex aspect-square max-h-[300px] lg:max-h-none items-center justify-center rounded-xl border border-border bg-card">
            {isProcessing ? (
              <div className="text-center">
                <RefreshCw className="mx-auto mb-2 h-8 w-8 sm:h-10 sm:w-10 animate-spin text-primary" />
                <p className="text-xs text-muted-foreground">Processing...</p>
              </div>
            ) : showResult ? (
              <div className="text-center text-muted-foreground">
                <Eye className="mx-auto mb-2 h-10 w-10 text-primary" />
                <p className="text-xs text-primary">Swap Complete!</p>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Image className="mx-auto mb-2 h-8 w-8 sm:h-10 sm:w-10" />
                <p className="text-xs">Result will appear here</p>
              </div>
            )}
          </div>
          <div className="mt-2 sm:mt-3 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs"><Save className="h-3 w-3" /> Save</Button>
            <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs"><Download className="h-3 w-3" /> Download</Button>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="mt-4 sm:mt-6 rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="mb-3 sm:mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Settings2 className="h-4 w-4 text-primary" /> Settings
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Blending: {blending[0]}%</label>
            <Slider value={blending} onValueChange={setBlending} max={100} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Face Enhance: {faceEnhance[0]}%</label>
            <Slider value={faceEnhance} onValueChange={setFaceEnhance} max={100} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Skin Matching</label>
            <Select defaultValue="auto">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Lighting</label>
            <Select defaultValue="auto">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="match">Match Source</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="mt-4 gap-2 w-full sm:w-auto" onClick={handleSwap} disabled={isProcessing}>
          <Sparkles className="h-4 w-4" /> Swap Face
        </Button>
      </div>
    </div>
  );
};

export default FaceSwap;
