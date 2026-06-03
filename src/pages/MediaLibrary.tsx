import { useEffect, useState } from "react";
import { FolderOpen, Upload, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Asset { id: string; url: string; storage_path: string; size_bytes: number; prompt: string | null; created_at: string; }

const formatBytes = (b: number) => b < 1024 ? `${b} B` : b < 1024 ** 2 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 ** 2).toFixed(1)} MB`;

const MediaLibrary = () => {
  const [list, setList] = useState<Asset[]>([]);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data, error } = await supabase.from("media_assets").select("*").order("created_at", { ascending: false });
    if (error) return toast.error(error.message);
    setList((data ?? []) as Asset[]);
  };
  useEffect(() => { load(); }, []);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setUploading(false); return; }
    const path = `${user.id}/${crypto.randomUUID()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("media").upload(path, file);
    if (upErr) { toast.error(upErr.message); setUploading(false); return; }
    const { data: signed } = await supabase.storage.from("media").createSignedUrl(path, 60 * 60 * 24 * 365);
    await supabase.from("media_assets").insert({
      user_id: user.id, kind: "image", storage_path: path,
      url: signed?.signedUrl ?? "", size_bytes: file.size, source: "upload",
    });
    setUploading(false);
    toast.success("Uploaded");
    load();
  };

  const del = async (a: Asset) => {
    await supabase.storage.from("media").remove([a.storage_path]);
    await supabase.from("media_assets").delete().eq("id", a.id);
    load();
  };

  const totalBytes = list.reduce((s, a) => s + a.size_bytes, 0);

  return (
    <div className="p-4 pt-14 sm:p-6 md:pt-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold sm:text-2xl"><FolderOpen className="h-6 w-6 text-primary" /> Media Library</h1>
          <p className="text-xs text-muted-foreground">{list.length} files · {formatBytes(totalBytes)}</p>
        </div>
        <label>
          <input type="file" accept="image/*" className="hidden" onChange={upload} disabled={uploading} />
          <Button asChild className="gap-2"><span><Upload className="h-4 w-4" /> {uploading ? "Uploading..." : "Upload"}</span></Button>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {list.map(a => (
          <div key={a.id} className="group relative overflow-hidden rounded-xl border border-border bg-card">
            <img src={a.url} alt="" className="aspect-square w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex gap-1 bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100">
              <a href={a.url} download className="flex-1 rounded p-1 text-center hover:bg-muted"><Download className="mx-auto h-3.5 w-3.5" /></a>
              <button onClick={() => del(a)} className="flex-1 rounded p-1 hover:bg-muted"><Trash2 className="mx-auto h-3.5 w-3.5 text-destructive" /></button>
            </div>
          </div>
        ))}
        {list.length === 0 && <p className="col-span-full py-8 text-center text-sm text-muted-foreground">No media yet.</p>}
      </div>
    </div>
  );
};

export default MediaLibrary;
