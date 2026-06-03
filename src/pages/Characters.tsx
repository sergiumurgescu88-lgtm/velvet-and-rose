import { useEffect, useState } from "react";
import { Users, Plus, Sparkles, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { streamImage, saveImageToLibrary } from "@/lib/ai";
import { toast } from "sonner";

interface Character {
  id: string; name: string; bio: string | null; personality: string | null;
  voice: string | null; ethnicity: string | null; age: number | null;
  avatar_url: string | null; rating: "sfw" | "nsfw"; followers: number;
}

const Characters = () => {
  const [list, setList] = useState<Character[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState({
    name: "", bio: "", personality: "friendly", voice: "soft",
    ethnicity: "european", age: 25, avatar_url: "" as string,
  });

  const load = async () => {
    const { data, error } = await supabase.from("characters").select("*").order("created_at", { ascending: false });
    if (error) return toast.error(error.message);
    setList((data ?? []) as Character[]);
  };
  useEffect(() => { load(); }, []);

  const generateAvatar = async () => {
    if (!form.name) return toast.error("Set a name first");
    setGenerating(true);
    try {
      const prompt = `Professional portrait photo of ${form.name}, ${form.ethnicity} person, age ${form.age}, ${form.personality} expression, studio lighting, high quality, photorealistic`;
      let last = "";
      await streamImage(prompt, (url, final) => { if (final) last = url; }, "1024x1024");
      const saved = await saveImageToLibrary({ dataUrl: last, prompt, source: "character-avatar" });
      if (saved) setForm(f => ({ ...f, avatar_url: saved.url }));
      toast.success("Avatar generated");
    } catch (e: any) { toast.error(e.message); }
    finally { setGenerating(false); }
  };

  const create = async () => {
    if (!form.name) return toast.error("Name required");
    setBusy(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setBusy(false); return; }
    const { error } = await supabase.from("characters").insert({
      user_id: user.id, name: form.name, bio: form.bio,
      personality: form.personality, voice: form.voice,
      ethnicity: form.ethnicity, age: form.age,
      avatar_url: form.avatar_url || null,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Character created");
    setOpen(false);
    setForm({ name: "", bio: "", personality: "friendly", voice: "soft", ethnicity: "european", age: 25, avatar_url: "" });
    load();
  };

  const del = async (id: string) => {
    const { error } = await supabase.from("characters").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="p-4 pt-14 sm:p-6 md:pt-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
          <Users className="h-6 w-6 text-primary" /> Characters
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> New</Button></DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Create Character</DialogTitle></DialogHeader>
            <div className="space-y-3">
              {form.avatar_url && <img src={form.avatar_url} alt="" className="mx-auto h-40 w-40 rounded-full object-cover" />}
              <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>Bio</Label><Textarea rows={2} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label>Personality</Label>
                  <Select value={form.personality} onValueChange={v => setForm({ ...form, personality: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["friendly", "confident", "mysterious", "playful", "elegant"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Voice</Label>
                  <Select value={form.voice} onValueChange={v => setForm({ ...form, voice: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["soft", "deep", "warm", "energetic"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Ethnicity</Label>
                  <Select value={form.ethnicity} onValueChange={v => setForm({ ...form, ethnicity: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["european", "asian", "latina", "african", "mixed"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Age</Label><Input type="number" value={form.age} onChange={e => setForm({ ...form, age: +e.target.value })} /></div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={generateAvatar} disabled={generating} className="flex-1 gap-2">
                  {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} Generate Avatar
                </Button>
                <Button onClick={create} disabled={busy} className="flex-1">Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {list.map(c => (
          <div key={c.id} className="group relative overflow-hidden rounded-xl border border-border bg-card">
            <div className="aspect-square bg-muted">
              {c.avatar_url ? <img src={c.avatar_url} alt={c.name} className="h-full w-full object-cover" />
                : <div className="flex h-full items-center justify-center text-muted-foreground"><Users className="h-10 w-10" /></div>}
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{c.bio || c.personality}</p>
            </div>
            <button onClick={() => del(c.id)} className="absolute right-2 top-2 rounded-md bg-background/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </button>
          </div>
        ))}
        {list.length === 0 && <p className="col-span-full py-8 text-center text-sm text-muted-foreground">No characters yet. Click "New" to create one.</p>}
      </div>
    </div>
  );
};

export default Characters;
