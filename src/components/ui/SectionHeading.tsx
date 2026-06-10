"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn("mb-12 text-center", className)}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        <span className="bg-gradient-to-r from-cyan-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-violet-400 dark:to-fuchsia-400">
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
    </motion.div>
  );
}
