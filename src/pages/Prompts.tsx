import { useEffect, useState } from "react";
import { FileText, Plus, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Prompt { id: string; title: string; body: string; category: string | null; is_public: boolean; user_id: string; }

const Prompts = () => {
  const [list, setList] = useState<Prompt[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", category: "general", is_public: false });

  const load = async () => {
    const { data, error } = await supabase.from("prompts").select("*").order("created_at", { ascending: false });
    if (error) return toast.error(error.message);
    setList((data ?? []) as Prompt[]);
  };
  useEffect(() => { load(); }, []);

  const create = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("prompts").insert({ ...form, user_id: user.id });
    if (error) return toast.error(error.message);
    setOpen(false);
    setForm({ title: "", body: "", category: "general", is_public: false });
    load();
  };

  const del = async (id: string) => {
    const { error } = await supabase.from("prompts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="p-4 pt-14 sm:p-6 md:pt-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold sm:text-2xl"><FileText className="h-6 w-6 text-primary" /> Prompts</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> New</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Prompt</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label>Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
              <div><Label>Prompt body (use {"{{variable}}"})</Label><Textarea rows={5} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} /></div>
              <div className="flex items-center gap-2"><Switch checked={form.is_public} onCheckedChange={v => setForm({ ...form, is_public: v })} /><Label>Share publicly</Label></div>
              <Button onClick={create} className="w-full">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(p => (
          <div key={p.id} className="rounded-xl border border-border bg-card p-4">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.category}{p.is_public && " · public"}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { navigator.clipboard.writeText(p.body); toast.success("Copied"); }} className="rounded p-1 hover:bg-muted"><Copy className="h-3.5 w-3.5" /></button>
                <button onClick={() => del(p.id)} className="rounded p-1 hover:bg-muted"><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
              </div>
            </div>
            <p className="line-clamp-4 whitespace-pre-wrap text-xs text-muted-foreground">{p.body}</p>
          </div>
        ))}
        {list.length === 0 && <p className="col-span-full py-8 text-center text-sm text-muted-foreground">No prompts yet.</p>}
      </div>
    </div>
  );
};

export default Prompts;
