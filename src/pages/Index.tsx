import { motion } from "framer-motion";
import { Zap, Image, Video, Users, TrendingUp, Sparkles } from "lucide-react";

const stats = [
  { label: "Characters", value: "12", icon: Users, color: "text-primary" },
  { label: "Images Generated", value: "847", icon: Image, color: "text-primary" },
  { label: "Videos Created", value: "56", icon: Video, color: "text-primary" },
  { label: "Revenue", value: "$2.4k", icon: TrendingUp, color: "text-safe" },
];

const Index = () => {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              AI Influencer Studio
            </h1>
          </div>
          <p className="text-muted-foreground">
            Creează, generează și monetizează conținut AI influencer.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              "New Character",
              "Generate Image",
              "Create Video",
              "Face Swap",
              "Browse Marketplace",
            ].map((action) => (
              <button
                key={action}
                className="rounded-lg border border-border bg-muted px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
