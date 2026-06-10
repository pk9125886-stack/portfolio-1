"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, allSkillCategories, type SkillCategory } from "@/lib/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { SkillBar } from "@/components/ui/SkillBar";
import { cn } from "@/lib/utils";

export function Skills() {
  const [active, setActive] = useState<SkillCategory>("Frontend");

  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills"
          subtitle="Technologies and tools I work with daily"
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {allSkillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all",
                active === cat
                  ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25"
                  : "border border-white/10 bg-white/5 text-muted-foreground hover:border-cyan-400/30"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skillCategories[active].map((skill, i) => (
                <GlassCard key={skill.name} className="!p-5">
                  <SkillBar name={skill.name} level={skill.level} delay={i * 0.05} />
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
