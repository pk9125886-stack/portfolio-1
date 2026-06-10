"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { personal } from "@/lib/data/personal";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return p + 4;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#060b1a]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-8 h-16 w-16 rounded-full border-2 border-cyan-400/30 border-t-cyan-400"
          />
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold"
          >
            {personal.firstName}
            <span className="text-cyan-400">.</span>
          </motion.h2>
          <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-violet-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-white/50">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
