"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-visitor-count";

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const current = stored ? parseInt(stored, 10) : 1000;
    const next = current + 1;
    localStorage.setItem(STORAGE_KEY, String(next));
    setCount(next);
  }, []);

  return count;
}
