"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-cyan-400">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
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
