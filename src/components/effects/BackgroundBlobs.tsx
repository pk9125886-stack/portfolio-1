"use client";

import { motion } from "framer-motion";

export function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-600/20"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/15"
      />
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-400/8 blur-3xl dark:bg-fuchsia-500/10"
      />
    </div>
  );
}
