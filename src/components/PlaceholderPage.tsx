import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isAdult?: boolean;
}

const PlaceholderPage = ({ title, description, icon: Icon, isAdult }: PlaceholderPageProps) => {
  return (
    <div className="flex h-full min-h-[calc(100vh-2rem)] items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div
          className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${
            isAdult ? "bg-adult-muted" : "bg-primary/10"
          }`}
        >
          <Icon
            className={`h-10 w-10 ${isAdult ? "text-adult" : "text-primary"}`}
          />
        </div>
        <h1 className="mb-3 text-3xl font-bold text-foreground">{title}</h1>
        <p className="max-w-md text-muted-foreground">{description}</p>
        <div
          className={`mt-8 inline-block rounded-full px-4 py-1.5 text-xs font-semibold ${
            isAdult
              ? "bg-adult-muted text-adult"
              : "bg-primary/10 text-primary"
          }`}
        >
          Coming Soon
        </div>
      </motion.div>
    </div>
  );
};

export default PlaceholderPage;
