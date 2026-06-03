import { useState } from "react";
import { Music2, Sparkles, Loader2, Download, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { editImage, fileToDataUrl, saveImageToLibrary } from "@/lib/ai";
import { toast } from "sonner";

const CloneDance = () => {
  const [character, setCharacter] = useState("");
  const [pose, setPose] = useState("");
  const [prompt, setPrompt] = useState("dynamic dance pose, energetic motion, stage lighting");
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (!character || !pose) return toast.error("Upload both character and pose reference");
    setBusy(true);
    try {
      const out = await editImage(
        `Apply the dance pose and motion from the second image to the character in the first image. ${prompt}. Keep character identity. Photorealistic.`,
        [character, pose]
      );
      setResult(out);
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  const Drop = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
    <label className="block">
      <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
        const f = e.target.files?.[0]; if (f) onChange(await fileToDataUrl(f));
      }} />
      <div className="flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-card hover:border-primary/40">
        {value ? <img src={value} alt="" className="h-full w-full object-contain" /> :
          <div className="text-center text-muted-foreground"><Upload className="mx-auto mb-2 h-8 w-8" /><p className="text-xs">{label}</p></div>}
      </div>
    </label>
  );

  return (
    <div className="p-4 pt-14 sm:p-6 md:pt-6">
      <h1 className="mb-4 flex items-center gap-2 text-xl font-bold sm:text-2xl"><Music2 className="h-6 w-6 text-primary" /> Clone Dance</h1>

      <div className="grid gap-4 lg:grid-cols-3">
        <div><p className="mb-2 text-sm font-semibold">Character</p><Drop value={character} onChange={setCharacter} label="Upload character" /></div>
        <div><p className="mb-2 text-sm font-semibold">Pose Reference</p><Drop value={pose} onChange={setPose} label="Upload pose image" /></div>
        <div>
          <p className="mb-2 text-sm font-semibold">Result</p>
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-border bg-card">
            {busy ? <Loader2 className="h-10 w-10 animate-spin text-primary" /> :
             result ? <img src={result} alt="" className="h-full w-full object-contain" /> :
             <p className="text-xs text-muted-foreground">Result here</p>}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3 rounded-xl border border-border bg-card p-4">
        <Textarea rows={2} value={prompt} onChange={e => setPrompt(e.target.value)} />
        <div className="flex flex-wrap gap-2">
          <Button onClick={run} disabled={busy} className="gap-2">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} Clone Pose
          </Button>
          {result && (
            <>
              <Button variant="outline" onClick={async () => { try { await saveImageToLibrary({ dataUrl: result, source: "clone-dance" }); toast.success("Saved"); } catch (e: any) { toast.error(e.message); } }} className="gap-2"><Save className="h-4 w-4" /> Save</Button>
              <a href={result} download="dance.png"><Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Download</Button></a>
            </>
          )}
        </div>
        <p className="text-xs text-muted-foreground">Note: produces a single posed frame. Full motion video coming soon.</p>
      </div>
    </div>
  );
};

export default CloneDance;
