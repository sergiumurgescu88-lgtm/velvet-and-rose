import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign, Plus, Eye, ShoppingCart, TrendingUp,
  Calendar, Users, Upload, X, Image, Clock,
  BarChart3, CreditCard, MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const mockPPV = [
  { id: 1, title: "Exclusive Fashion Shoot", price: 9.99, views: 1240, purchases: 89, revenue: 889.11, status: "published", date: "2026-02-20" },
  { id: 2, title: "Behind the Scenes Vlog", price: 4.99, views: 870, purchases: 56, revenue: 279.44, status: "published", date: "2026-02-18" },
  { id: 3, title: "Premium Dance Tutorial", price: 14.99, views: 430, purchases: 23, revenue: 344.77, status: "scheduled", date: "2026-02-25" },
];

const PPVContent = () => {
  const [tab, setTab] = useState("content");
  const [showCreate, setShowCreate] = useState(false);

  const totalRevenue = mockPPV.reduce((a, b) => a + b.revenue, 0);
  const totalViews = mockPPV.reduce((a, b) => a + b.views, 0);
  const totalPurchases = mockPPV.reduce((a, b) => a + b.purchases, 0);

  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="border-b border-border bg-card/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-foreground">
              <DollarSign className="h-7 w-7 text-primary" /> PPV Content
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Conținut pay-per-view.</p>
          </div>
          <Button onClick={() => setShowCreate(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Create PPV Post
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {[
            { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: TrendingUp, color: "text-safe" },
            { label: "Total Views", value: totalViews.toLocaleString(), icon: Eye, color: "text-primary" },
            { label: "Total Purchases", value: totalPurchases, icon: ShoppingCart, color: "text-primary" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <p className="mt-1 text-xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="content">My PPV</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="payout">Payout Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-6">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="p-4">Content</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Views</th>
                    <th className="p-4">Purchases</th>
                    <th className="p-4">Revenue</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPPV.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="p-4 text-sm font-medium text-foreground">{item.title}</td>
                      <td className="p-4 text-sm text-safe font-semibold">${item.price}</td>
                      <td className="p-4 text-sm text-muted-foreground">{item.views.toLocaleString()}</td>
                      <td className="p-4 text-sm text-muted-foreground">{item.purchases}</td>
                      <td className="p-4 text-sm font-semibold text-safe">${item.revenue.toFixed(2)}</td>
                      <td className="p-4">
                        <Badge variant="outline" className={item.status === "published" ? "bg-safe/10 text-safe" : "bg-primary/10 text-primary"}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Revenue Over Time</h3>
              </div>
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                Chart placeholder — connect data source to display analytics
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payout" className="mt-6">
            <div className="max-w-md space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CreditCard className="h-4 w-4 text-primary" /> Payment Method
                </h3>
                <Button variant="outline" className="w-full">Connect Payment Method</Button>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Withdrawal History</h3>
                <p className="text-xs text-muted-foreground">No withdrawals yet.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6"
          >
            <button onClick={() => setShowCreate(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            <h2 className="mb-4 text-xl font-bold text-foreground">Create PPV Post</h2>
            <div className="space-y-4">
              <div className="flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:border-primary/30">
                <div className="text-center text-muted-foreground">
                  <Upload className="mx-auto mb-1 h-6 w-6" />
                  <p className="text-xs">Upload media or select from library</p>
                </div>
              </div>
              <Input placeholder="Title" />
              <textarea
                placeholder="Description..."
                className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 text-xs text-muted-foreground">Price ($)</label>
                  <Input type="number" placeholder="9.99" />
                </div>
                <div>
                  <label className="mb-1 text-xs text-muted-foreground">Unlock Type</label>
                  <Select defaultValue="onetime">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onetime">One-time Purchase</SelectItem>
                      <SelectItem value="subscription">Subscription Tier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Schedule or publish now</span>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button onClick={() => setShowCreate(false)}>Publish</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PPVContent;
