"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command } from "lucide-react";
import { useTheme } from "next-themes";
import { commandPaletteActions } from "@/lib/data/navigation";
import { personal } from "@/lib/data/personal";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { setTheme, theme } = useTheme();

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  const filtered = commandPaletteActions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: (typeof commandPaletteActions)[number]) => {
    if ("action" in item) {
      if (item.action === "theme") {
        setTheme(theme === "dark" ? "light" : "dark");
      }
      if (item.action === "resume") {
        window.open(personal.resumeUrl, "_blank");
        fetch("/api/analytics/resume", { method: "POST" }).catch(() => {});
      }
    } else {
      const el = document.querySelector(item.href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-muted-foreground backdrop-blur-xl transition hover:border-cyan-400/50 hover:text-cyan-400 sm:flex"
      >
        <Command size={14} />
        <span>Ctrl+K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex items-start justify-center bg-black/60 p-4 pt-[20vh] backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a1020] shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <Search size={18} className="text-muted-foreground" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd className="rounded border border-white/10 px-2 py-0.5 text-xs text-muted-foreground">
                  ESC
                </kbd>
              </div>
              <ul className="max-h-72 overflow-y-auto p-2">
                {filtered.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleSelect(item)}
                      className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-white/5"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No results found
                  </li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
