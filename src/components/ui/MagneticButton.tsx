"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit";
  disabled?: boolean;
}

const variants = {
  primary:
    "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40",
  secondary:
    "bg-gray-100 text-foreground border border-theme hover:bg-gray-200 dark:bg-white/10 dark:border-white/20 dark:hover:bg-white/15",
  outline:
    "border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10",
};

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
  type = "button",
  disabled,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors",
    variants[variant],
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(classes, disabled && "opacity-50 cursor-not-allowed")}
    >
      {children}
    </motion.button>
  );
}
