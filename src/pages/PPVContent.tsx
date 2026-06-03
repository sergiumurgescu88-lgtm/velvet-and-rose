import { useEffect, useState } from "react";
import { DollarSign, Plus, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PPV { id: string; title: string; description: string | null; price_cents: number; views: number; revenue_cents: number; is_published: boolean; }

const PPVContent = () => {
  const [list, setList] = useState<PPV[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", price_cents: 999, is_published: false });

  const load = async () => {
    const { data, error } = await supabase.from("ppv_content").select("*").order("created_at", { ascending: false });
    if (error) return toast.error(error.message);
    setList((data ?? []) as PPV[]);
  };
  useEffect(() => { load(); }, []);

  const create = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("ppv_content").insert({ ...form, user_id: user.id });
    if (error) return toast.error(error.message);
    setOpen(false); load();
  };

  const del = async (id: string) => { await supabase.from("ppv_content").delete().eq("id", id); load(); };

  const total = list.reduce((s, p) => s + p.revenue_cents, 0);
  const views = list.reduce((s, p) => s + p.views, 0);

  return (
    <div className="p-4 pt-14 sm:p-6 md:pt-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold sm:text-2xl"><DollarSign className="h-6 w-6 text-primary" /> PPV Content</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> New PPV</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create PPV</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
              <div><Label>Price (USD)</Label><Input type="number" value={form.price_cents / 100} onChange={e => setForm({ ...form, price_cents: Math.round(+e.target.value * 100) })} /></div>
              <div className="flex items-center gap-2"><Switch checked={form.is_published} onCheckedChange={v => setForm({ ...form, is_published: v })} /><Label>Published</Label></div>
              <Button onClick={create} className="w-full">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground">Revenue</p><p className="text-xl font-bold text-primary">${(total / 100).toFixed(2)}</p></div>
        <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground">Views</p><p className="text-xl font-bold">{views}</p></div>
        <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground">Items</p><p className="text-xl font-bold">{list.length}</p></div>
      </div>

      <div className="space-y-2">
        {list.map(p => (
          <div key={p.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <p className="text-sm font-semibold">{p.title} {p.is_published && <span className="ml-2 rounded bg-primary/10 px-2 py-0.5 text-[10px] text-primary">PUBLISHED</span>}</p>
              <p className="text-xs text-muted-foreground">${(p.price_cents / 100).toFixed(2)} · {p.views} views · ${(p.revenue_cents / 100).toFixed(2)} earned</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1"><Eye className="h-3.5 w-3.5" /></Button>
              <Button variant="outline" size="sm" onClick={() => del(p.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {list.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No PPV content yet.</p>}
      </div>
    </div>
  );
};

export default PPVContent;
