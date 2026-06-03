import { useState } from "react";
import { RefreshCw, Upload, Loader2, Download, Save, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { editImage, fileToDataUrl, saveImageToLibrary } from "@/lib/ai";
import { toast } from "sonner";

const Dropzone = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
  <label className="block">
    <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
      const f = e.target.files?.[0]; if (f) onChange(await fileToDataUrl(f));
    }} />
    <div className="flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-card hover:border-primary/40">
      {value ? <img src={value} className="h-full w-full object-contain" alt="" /> :
        <div className="text-center text-muted-foreground"><Upload className="mx-auto mb-2 h-8 w-8" /><p className="text-xs">{label}</p></div>}
    </div>
  </label>
);

const FaceSwap = () => {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);

  const swap = async () => {
    if (!source || !target) return toast.error("Upload both images");
    setBusy(true);
    try {
      const out = await editImage(
        "Take the face from the second image and seamlessly swap it onto the person in the first image. Keep the body, pose, lighting and background of the first image. Match skin tone and lighting naturally.",
        [source, target]
      );
      setResult(out);
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  const save = async () => {
    try { await saveImageToLibrary({ dataUrl: result, source: "face-swap" }); toast.success("Saved"); }
    catch (e: any) { toast.error(e.message); }
  };

  return (
    <div className="p-4 pt-14 sm:p-6 md:pt-6">
      <h1 className="mb-4 flex items-center gap-2 text-xl font-bold sm:text-2xl"><RefreshCw className="h-6 w-6 text-primary" /> Face Swap</h1>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
        <div><p className="mb-2 text-sm font-semibold">Source (body)</p><Dropzone value={source} onChange={setSource} label="Upload source image" /></div>
        <ArrowRight className="hidden h-6 w-6 text-primary lg:block" />
        <div><p className="mb-2 text-sm font-semibold">Target Face</p><Dropzone value={target} onChange={setTarget} label="Upload face image" /></div>
        <ArrowRight className="hidden h-6 w-6 text-primary lg:block" />
        <div>
          <p className="mb-2 text-sm font-semibold">Result</p>
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-border bg-card">
            {busy ? <Loader2 className="h-10 w-10 animate-spin text-primary" /> :
             result ? <img src={result} className="h-full w-full object-contain" alt="" /> :
             <p className="text-xs text-muted-foreground">Result here</p>}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={swap} disabled={busy} className="gap-2">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />} Swap Face
        </Button>
        {result && (
          <>
            <Button variant="outline" onClick={save} className="gap-2"><Save className="h-4 w-4" /> Save</Button>
            <a href={result} download="faceswap.png"><Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Download</Button></a>
          </>
        )}
      </div>
    </div>
  );
};

export default FaceSwap;
