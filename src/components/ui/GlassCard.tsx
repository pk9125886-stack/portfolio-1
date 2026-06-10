"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "rounded-2xl border border-theme bg-card p-6 shadow-card backdrop-blur-sm",
        "dark:bg-white/5 dark:border-white/10 dark:shadow-xl dark:backdrop-blur-xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
