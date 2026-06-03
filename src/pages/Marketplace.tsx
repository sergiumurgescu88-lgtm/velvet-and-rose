import { useEffect, useState } from "react";
import { ShoppingBag, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Item { id: string; title: string; description: string | null; category: string; price_cents: number; preview_url: string | null; stars: number; downloads: number; seller_id: string; }

const Marketplace = () => {
  const [list, setList] = useState<Item[]>([]);
  const [me, setMe] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "model", price_cents: 0, preview_url: "" });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setMe(data.user?.id ?? ""));
    load();
  }, []);

  const load = async () => {
    const { data, error } = await supabase.from("marketplace_items").select("*").order("created_at", { ascending: false });
    if (error) return toast.error(error.message);
    setList((data ?? []) as Item[]);
  };

  const create = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("marketplace_items").insert({ ...form, seller_id: user.id });
    if (error) return toast.error(error.message);
    setOpen(false); load();
  };

  const del = async (id: string) => {
    await supabase.from("marketplace_items").delete().eq("id", id);
    load();
  };

  return (
    <div className="p-4 pt-14 sm:p-6 md:pt-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold sm:text-2xl"><ShoppingBag className="h-6 w-6 text-primary" /> Marketplace</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> List Item</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>List New Item</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label>Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
                <div><Label>Price (USD)</Label><Input type="number" value={form.price_cents / 100} onChange={e => setForm({ ...form, price_cents: Math.round(+e.target.value * 100) })} /></div>
              </div>
              <div><Label>Preview Image URL</Label><Input value={form.preview_url} onChange={e => setForm({ ...form, preview_url: e.target.value })} /></div>
              <Button onClick={create} className="w-full">Publish</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {list.map(i => (
          <div key={i.id} className="group relative overflow-hidden rounded-xl border border-border bg-card">
            <div className="aspect-square bg-muted">
              {i.preview_url ? <img src={i.preview_url} className="h-full w-full object-cover" alt="" />
                : <div className="flex h-full items-center justify-center text-muted-foreground"><ShoppingBag className="h-10 w-10" /></div>}
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold">{i.title}</p>
              <p className="text-xs text-muted-foreground">{i.category}</p>
              <p className="mt-1 text-sm font-bold text-primary">${(i.price_cents / 100).toFixed(2)}</p>
            </div>
            {i.seller_id === me && (
              <button onClick={() => del(i.id)} className="absolute right-2 top-2 rounded-md bg-background/80 p-1.5">
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </button>
            )}
          </div>
        ))}
        {list.length === 0 && <p className="col-span-full py-8 text-center text-sm text-muted-foreground">Marketplace is empty. Be the first to list!</p>}
      </div>
    </div>
  );
};

export default Marketplace;
