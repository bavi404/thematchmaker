"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Toast {
  id: string;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const reducedMotion = useReducedMotion();

  const showToast = useCallback((message: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-relevant="additions"
        className="pointer-events-none fixed inset-x-4 top-4 z-[100] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-4 sm:items-end"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              role="status"
              initial={reducedMotion ? false : { opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "pointer-events-auto w-full max-w-sm rounded-xl border border-cupid-primary/20",
                "bg-gradient-to-r from-white via-cupid-background to-cupid-secondary/30",
                "px-4 py-3 text-sm font-medium text-cupid-foreground shadow-lg shadow-cupid-primary/15"
              )}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
