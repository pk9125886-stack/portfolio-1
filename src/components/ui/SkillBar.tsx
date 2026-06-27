"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  return (
    <div className="w-full space-y-2">
      <div className="flex w-full items-center justify-between text-sm font-medium">
        <span className="text-foreground tracking-wide truncate pr-2">{name}</span>
        <span className="text-cyan-600 dark:text-cyan-400 font-mono text-xs sm:text-sm shrink-0">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_12px_rgba(0,229,255,0.5)]"
        />
      </div>
    </div>
  );
}
