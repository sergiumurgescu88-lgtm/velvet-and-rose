import { motion } from "framer-motion";
import { Zap, Image, Video, Users, TrendingUp, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Characters", value: "12", icon: Users, color: "text-primary" },
  { label: "Images Generated", value: "847", icon: Image, color: "text-primary" },
  { label: "Videos Created", value: "56", icon: Video, color: "text-primary" },
  { label: "Revenue", value: "$2.4k", icon: TrendingUp, color: "text-safe" },
];

const quickActions = [
  { label: "New Character", path: "/characters" },
  { label: "Generate Image", path: "/generation" },
  { label: "Create Video", path: "/create-video" },
  { label: "Face Swap", path: "/face-swap" },
  { label: "Marketplace", path: "/marketplace" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 pt-14 sm:p-6 md:p-8 md:pt-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">AI Influencer Studio</h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">Creează, generează și monetizează conținut AI influencer.</p>
        </div>

        <div className="mb-6 md:mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-4 md:p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-muted-foreground">{stat.label}</span>
                <stat.icon className={`h-4 w-4 md:h-5 md:w-5 ${stat.color}`} />
              </div>
              <p className="mt-1 md:mt-2 text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-4 md:p-6">
          <h2 className="mb-3 md:mb-4 text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 md:gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="rounded-lg border border-border bg-muted px-3 py-2.5 md:px-4 md:py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
