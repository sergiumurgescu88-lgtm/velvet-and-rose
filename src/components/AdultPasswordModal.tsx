import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, ShieldAlert } from "lucide-react";
import { useAdultSection } from "@/hooks/use-adult-section";

interface AdultPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const AdultPasswordModal = ({ open, onClose }: AdultPasswordModalProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { unlock } = useAdultSection();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "pulamea") {
      unlock();
      setPassword("");
      setError(false);
      onClose();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md rounded-xl border border-adult/30 bg-card p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-adult-muted">
                <ShieldAlert className="h-7 w-7 text-adult" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                Adult Content Section
              </h2>
              <p className="text-center text-sm text-muted-foreground">
                Această secțiune conține conținut pentru adulți 18+. Introduceți parola pentru acces.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Introduceți parola..."
                  className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-adult focus:outline-none focus:ring-1 focus:ring-adult"
                  autoFocus
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-adult"
                  >
                    Parolă incorectă. Încercați din nou.
                  </motion.p>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-adult px-4 py-3 font-semibold text-adult-foreground transition-all hover:opacity-90 glow-adult"
              >
                <Lock className="mr-2 inline-block h-4 w-4" />
                Unlock Adult Section
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdultPasswordModal;
