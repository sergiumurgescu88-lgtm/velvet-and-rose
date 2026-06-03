import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Image, Users, TrendingUp, Sparkles, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ characters: 0, images: 0, ppv: 0, revenue: 0 });

  useEffect(() => {
    (async () => {
      const [c, m, p] = await Promise.all([
        supabase.from("characters").select("*", { count: "exact", head: true }),
        supabase.from("media_assets").select("*", { count: "exact", head: true }),
        supabase.from("ppv_content").select("revenue_cents"),
      ]);
      const revenue = (p.data ?? []).reduce((s: number, r: any) => s + (r.revenue_cents ?? 0), 0);
      setStats({ characters: c.count ?? 0, images: m.count ?? 0, ppv: p.data?.length ?? 0, revenue });
    })();
  }, []);

  const cards = [
    { label: "Characters", value: stats.characters, icon: Users },
    { label: "Media Assets", value: stats.images, icon: Image },
    { label: "PPV Items", value: stats.ppv, icon: DollarSign },
    { label: "Revenue", value: `$${(stats.revenue / 100).toFixed(2)}`, icon: TrendingUp },
  ];

  const actions = [
    { label: "New Character", path: "/characters" },
    { label: "Generate Image", path: "/generation" },
    { label: "Image Editor", path: "/image-editor" },
    { label: "Face Swap", path: "/face-swap" },
    { label: "Marketplace", path: "/marketplace" },
  ];

  return (
    <div className="p-4 pt-14 sm:p-6 md:p-8 md:pt-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6 flex items-center gap-3">
          <Zap className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold md:text-3xl">AI Influencer Studio</h1>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {cards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 text-2xl font-bold">{s.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-4 md:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold md:text-lg">
            <Sparkles className="h-5 w-5 text-primary" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {actions.map(a => (
              <button key={a.label} onClick={() => navigate(a.path)}
                className="rounded-lg border border-border bg-muted px-4 py-3 text-sm font-medium hover:border-primary/40 hover:bg-primary/5">
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
