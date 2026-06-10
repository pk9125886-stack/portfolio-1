"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] hidden md:block"
      animate={{ x: position.x - 200, y: position.y - 200 }}
      transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.5 }}
    >
      <div className="h-[400px] w-[400px] rounded-full bg-gradient-radial from-cyan-500/20 via-violet-500/10 to-transparent blur-3xl" />
    </motion.div>
  );
}
