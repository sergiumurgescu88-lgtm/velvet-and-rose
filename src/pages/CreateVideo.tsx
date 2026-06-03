import { useState } from "react";
import { Video, Sparkles, Loader2, Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { streamImage, saveImageToLibrary } from "@/lib/ai";
import { toast } from "sonner";

const CreateVideo = () => {
  const [prompt, setPrompt] = useState("");
  const [frame, setFrame] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [final, setFinal] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return toast.error("Describe your scene");
    setBusy(true); setFrame(null); setFinal(false);
    try {
      await streamImage(`Cinematic still frame: ${prompt}. Photorealistic, 16:9 cinema, motion blur, dramatic lighting`,
        (url, f) => { setFrame(url); if (f) setFinal(true); }, "1536x1024");
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  const save = async () => {
    if (!frame) return;
    try { await saveImageToLibrary({ dataUrl: frame, prompt, source: "video-storyboard" }); toast.success("Saved"); }
    catch (e: any) { toast.error(e.message); }
  };

  return (
    <div className="p-4 pt-14 sm:p-6 md:pt-6">
      <h1 className="mb-2 flex items-center gap-2 text-xl font-bold sm:text-2xl"><Video className="h-6 w-6 text-primary" /> Create Video</h1>
      <p className="mb-4 text-xs text-muted-foreground">Generate cinematic storyboard frames for your video. Animated video rendering coming soon.</p>

      <div className="grid gap-4 lg:grid-cols-[1fr_400px]">
        <div className="flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-border bg-card">
          {frame ? <img src={frame} alt="" className={`h-full w-full object-cover transition-[filter] duration-500 ${final ? "" : "blur-xl"}`} /> :
           busy ? <Loader2 className="h-10 w-10 animate-spin text-primary" /> :
           <p className="text-sm text-muted-foreground">Your storyboard frame appears here</p>}
        </div>
        <div className="space-y-3">
          <Textarea rows={6} placeholder="Describe the scene: characters, action, location, mood..." value={prompt} onChange={e => setPrompt(e.target.value)} />
          <Button onClick={generate} disabled={busy} className="w-full gap-2">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} Generate Frame
          </Button>
          {frame && final && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={save} className="flex-1 gap-2"><Save className="h-4 w-4" /> Save</Button>
              <a href={frame} download="frame.png" className="flex-1"><Button variant="outline" className="w-full gap-2"><Download className="h-4 w-4" /> Download</Button></a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateVideo;
