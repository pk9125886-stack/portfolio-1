"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const toast = useMemo(() => ({
    success: (message: string) => addToast(message, "success"),
    error: (message: string) => addToast(message, "error"),
    info: (message: string) => addToast(message, "info"),
  }), [addToast]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
              layout
              className={`flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-lg pointer-events-auto w-full transition-all duration-300 ${
                t.type === "success"
                  ? "bg-emerald-950/85 border-emerald-500/20 text-emerald-200 dark:bg-emerald-950/85 dark:border-emerald-500/30"
                  : t.type === "error"
                  ? "bg-rose-950/85 border-rose-500/20 text-rose-200 dark:bg-rose-950/85 dark:border-rose-500/30"
                  : "bg-cyan-950/85 border-cyan-500/20 text-cyan-200 dark:bg-cyan-950/85 dark:border-cyan-500/30"
              }`}
            >
              <div className="flex-shrink-0">
                {t.type === "success" && <CheckCircle size={18} className="text-emerald-400" />}
                {t.type === "error" && <AlertCircle size={18} className="text-rose-400" />}
                {t.type === "info" && <Info size={18} className="text-cyan-400" />}
              </div>
              
              <div className="text-sm font-medium flex-grow">{t.message}</div>
              
              <button
                onClick={() => removeToast(t.id)}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/10 transition-colors p-1 rounded-lg"
                aria-label="Dismiss toast"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
