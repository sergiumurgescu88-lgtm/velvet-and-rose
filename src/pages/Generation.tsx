import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, Save, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { streamImage, saveImageToLibrary } from "@/lib/ai";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface HistoryItem { id: string; url: string; prompt: string | null; }

const Generation = () => {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [busy, setBusy] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  const [final, setFinal] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const loadHistory = async () => {
    const { data } = await supabase
      .from("media_assets")
      .select("id,url,prompt")
      .eq("source", "ai-generation")
      .order("created_at", { ascending: false })
      .limit(12);
    setHistory((data ?? []) as HistoryItem[]);
  };
  useEffect(() => { loadHistory(); }, []);

  const generate = async () => {
    if (!prompt.trim()) return toast.error("Scrie un prompt");
    setBusy(true); setImg(null); setFinal(false);
    try {
      await streamImage(prompt, (dataUrl, isFinal) => {
        setImg(dataUrl);
        if (isFinal) setFinal(true);
      }, size);
    } catch (e: any) {
      toast.error(e.message || "Eroare la generare");
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    if (!img) return;
    try {
      await saveImageToLibrary({ dataUrl: img, prompt, source: "ai-generation" });
      toast.success("Salvat în Media Library");
      loadHistory();
    } catch (e: any) { toast.error(e.message); }
  };

  return (
    <div className="p-4 pt-14 sm:p-6 md:pt-6">
      <h1 className="mb-4 flex items-center gap-2 text-xl font-bold sm:text-2xl">
        <Sparkles className="h-6 w-6 text-primary" /> Generation
      </h1>

      <div className="grid gap-4 lg:grid-cols-[1fr_400px]">
        <div className="space-y-3">
          <Textarea
            placeholder="Describe the image you want to generate..."
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1024x1024">Square 1:1</SelectItem>
                <SelectItem value="1024x1536">Portrait</SelectItem>
                <SelectItem value="1536x1024">Landscape</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={generate} disabled={busy} className="gap-2">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Generate
            </Button>
            {img && final && (
              <>
                <Button variant="outline" onClick={save} className="gap-2"><Save className="h-4 w-4" /> Save</Button>
                <a href={img} download="generated.png">
                  <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Download</Button>
                </a>
              </>
            )}
          </div>

          <div className="flex aspect-square w-full max-w-2xl items-center justify-center overflow-hidden rounded-xl border border-border bg-card">
            {img ? (
              <motion.img
                src={img}
                alt="Generated"
                className={`h-full w-full object-contain transition-[filter] duration-500 ${final ? "" : "blur-xl"}`}
              />
            ) : busy ? (
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            ) : (
              <p className="text-sm text-muted-foreground">Your generated image will appear here</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold">History</h3>
          <div className="grid grid-cols-3 gap-2">
            {history.map((h) => (
              <button key={h.id} onClick={() => setImg(h.url)} className="aspect-square overflow-hidden rounded-lg border border-border">
                <img src={h.url} alt={h.prompt ?? ""} className="h-full w-full object-cover" />
              </button>
            ))}
            {history.length === 0 && <p className="col-span-3 text-xs text-muted-foreground">No generations yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generation;
