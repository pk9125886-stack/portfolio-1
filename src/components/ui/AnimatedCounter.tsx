"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function AnimatedCounter({ value, suffix = "", label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-4xl font-bold text-cyan-600 sm:text-5xl dark:text-cyan-400">
        {count}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}
