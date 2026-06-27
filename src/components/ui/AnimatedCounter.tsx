"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: number | string;
  suffix?: string;
  label: string;
}

export function AnimatedCounter({ value, suffix = "", label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [count, setCount] = useState(0);

  const isNumber = typeof value === "number";
  const targetNum = isNumber ? value : parseFloat(value as string) || 0;
  const isValidNumber = isNumber || (!isNaN(targetNum) && !isNaN(Number(value)));

  useEffect(() => {
    if (!isInView || !isValidNumber) return;

    let start: number | null = null;
    const duration = 1500;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * targetNum));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, targetNum, isValidNumber]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-600 dark:text-cyan-400">
        {isValidNumber ? count : value}
        {isValidNumber ? suffix : ""}
      </div>
      <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-medium">{label}</p>
    </motion.div>
  );
}
