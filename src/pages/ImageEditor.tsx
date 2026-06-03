import { useState } from "react";
import { Pencil, Upload, Sparkles, Loader2, Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { editImage, fileToDataUrl, saveImageToLibrary } from "@/lib/ai";
import { toast } from "sonner";

const presets = [
  "Remove the background, keep subject only",
  "Make the lighting cinematic with golden hour glow",
  "Convert to black and white film photo style",
  "Add a professional studio backdrop",
  "Enhance sharpness and colors",
];

const ImageEditor = () => {
  const [src, setSrc] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setSrc(await fileToDataUrl(f));
    setResult("");
  };

  const run = async () => {
    if (!src) return toast.error("Upload an image first");
    if (!prompt.trim()) return toast.error("Describe the edit");
    setBusy(true);
    try {
      const out = await editImage(prompt, [src]);
      setResult(out);
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  const save = async () => {
    if (!result) return;
    try {
      await saveImageToLibrary({ dataUrl: result, prompt, source: "image-editor" });
      toast.success("Saved");
    } catch (e: any) { toast.error(e.message); }
  };

  return (
    <div className="p-4 pt-14 sm:p-6 md:pt-6">
      <h1 className="mb-4 flex items-center gap-2 text-xl font-bold sm:text-2xl"><Pencil className="h-6 w-6 text-primary" /> Image Editor</h1>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="block">
            <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
            <div className="flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-card hover:border-primary/40">
              {src ? <img src={src} alt="" className="h-full w-full object-contain" /> : (
                <div className="text-center text-muted-foreground"><Upload className="mx-auto mb-2 h-10 w-10" /><p className="text-sm">Upload image</p></div>
              )}
            </div>
          </label>
        </div>

        <div>
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-border bg-card">
            {busy ? <Loader2 className="h-10 w-10 animate-spin text-primary" /> :
             result ? <img src={result} alt="" className="h-full w-full object-contain" /> :
             <p className="text-sm text-muted-foreground">Result appears here</p>}
          </div>
          {result && (
            <div className="mt-2 flex gap-2">
              <Button variant="outline" onClick={save} className="gap-2"><Save className="h-4 w-4" /> Save</Button>
              <a href={result} download="edited.png"><Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Download</Button></a>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-3 rounded-xl border border-border bg-card p-4">
        <Textarea rows={3} placeholder="Describe how to edit the image..." value={prompt} onChange={e => setPrompt(e.target.value)} />
        <div className="flex flex-wrap gap-2">
          {presets.map(p => (
            <button key={p} onClick={() => setPrompt(p)} className="rounded-full border border-border bg-muted px-3 py-1 text-xs hover:border-primary/40">{p}</button>
          ))}
        </div>
        <Button onClick={run} disabled={busy} className="gap-2">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} Apply Edit
        </Button>
      </div>
    </div>
  );
};

export default ImageEditor;
