import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ShoppingBag,
  Sparkles,
  Video,
  Pencil,
  RefreshCw,
  Music2,
  FileText,
  DollarSign,
  FolderOpen,
  Lock,
  Unlock,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useAdultSection } from "@/hooks/use-adult-section";
import AdultPasswordModal from "./AdultPasswordModal";

const safeItems = [
  { title: "Characters", url: "/characters", icon: Users },
  { title: "Marketplace", url: "/marketplace", icon: ShoppingBag },
  { title: "Generation", url: "/generation", icon: Sparkles },
  { title: "Create Video", url: "/create-video", icon: Video },
  { title: "Image Editor", url: "/image-editor", icon: Pencil },
  { title: "Face Swap", url: "/face-swap", icon: RefreshCw },
  { title: "Clone Dance", url: "/clone-dance", icon: Music2 },
  { title: "Prompts", url: "/prompts", icon: FileText },
  { title: "PPV Content", url: "/ppv-content", icon: DollarSign },
  { title: "Media Library", url: "/media-library", icon: FolderOpen },
];

const adultItems = [
  { title: "Adult Characters", url: "/adult/characters", icon: Users },
  { title: "Adult Marketplace", url: "/adult/marketplace", icon: ShoppingBag },
  { title: "Adult Generation", url: "/adult/generation", icon: Sparkles },
  { title: "Adult Videos", url: "/adult/videos", icon: Video },
  { title: "Adult Editor", url: "/adult/editor", icon: Pencil },
  { title: "Adult Face Swap", url: "/adult/face-swap", icon: RefreshCw },
  { title: "Adult Clone Dance", url: "/adult/clone-dance", icon: Music2 },
  { title: "Adult Prompts", url: "/adult/prompts", icon: FileText },
  { title: "PPV Adult Content", url: "/adult/ppv-content", icon: DollarSign },
  { title: "Adult Media Library", url: "/adult/media-library", icon: FolderOpen },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { isUnlocked, lock } = useAdultSection();
  const location = useLocation();

  const linkClass = (path: string) => {
    const active = location.pathname === path;
    return `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
      active
        ? "bg-primary/10 text-primary font-medium"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`;
  };

  const adultLinkClass = (path: string) => {
    const active = location.pathname === path;
    return `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
      active
        ? "bg-adult/10 text-adult font-medium"
        : "text-sidebar-foreground hover:bg-adult-muted hover:text-adult"
    }`;
  };

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 64 : 260 }}
        transition={{ duration: 0.2 }}
        className="relative flex h-screen flex-col border-r border-sidebar-border bg-sidebar"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sidebar-border p-4">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-sm font-bold text-foreground">
                AI Influencer Studio
              </span>
            </motion.div>
          )}
          {collapsed && <Zap className="mx-auto h-6 w-6 text-primary" />}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-md p-1 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Credits */}
        {!collapsed && (
          <div className="mx-4 mt-3 rounded-lg bg-muted px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Credits</span>
              <span className="text-sm font-bold text-primary">5</span>
            </div>
          </div>
        )}

        {/* Scrollable nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {/* Safe Section */}
          {!collapsed && (
            <div className="mb-2 flex items-center gap-2 px-3">
              <div className="h-2 w-2 rounded-full bg-safe" />
              <span className="text-xs font-semibold uppercase tracking-wider text-safe">
                Safe Content
              </span>
            </div>
          )}
          <div className="space-y-0.5">
            {safeItems.map((item) => (
              <NavLink key={item.url} to={item.url} className={linkClass(item.url)}>
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-sidebar-border" />

          {/* Adult Section */}
          {!collapsed && (
            <div className="mb-2 flex items-center gap-2 px-3">
              <div className="h-2 w-2 rounded-full bg-adult animate-pulse-glow" />
              <span className="text-xs font-semibold uppercase tracking-wider text-adult">
                Adult Content
              </span>
              {isUnlocked ? (
                <span className="ml-auto rounded bg-adult/20 px-1.5 py-0.5 text-[10px] font-bold text-adult">
                  ACTIVE
                </span>
              ) : (
                <Lock className="ml-auto h-3 w-3 text-adult" />
              )}
            </div>
          )}

          {isUnlocked ? (
            <>
              <div className="space-y-0.5">
                {adultItems.map((item) => (
                  <NavLink
                    key={item.url}
                    to={item.url}
                    className={adultLinkClass(item.url)}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </NavLink>
                ))}
              </div>
              <button
                onClick={lock}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-adult/30 px-3 py-2 text-xs text-adult transition-all hover:bg-adult-muted"
              >
                <Lock className="h-3 w-3" />
                {!collapsed && <span>Lock Adult Section</span>}
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-adult/30 bg-adult-muted px-3 py-2.5 text-sm text-adult transition-all hover:bg-adult/20"
            >
              <Unlock className="h-4 w-4" />
              {!collapsed && <span>Unlock Adult Section</span>}
            </button>
          )}
        </nav>
      </motion.aside>

      <AdultPasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  );
};

export default AppSidebar;
