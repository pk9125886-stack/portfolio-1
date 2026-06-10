"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { GitHubIcon } from "@/components/ui/Icons";
import { projects, projectFilters } from "@/lib/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const featured = projects.filter((p) => p.featured);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.technologies.includes(filter));

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          subtitle="Real-world applications and creative experiments"
        />

        {featured.length > 0 && (
          <div className="mb-16">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold">
              <Star className="text-amber-400" size={20} />
              Featured Projects
            </h3>
            <div className="grid gap-6 lg:grid-cols-2">
              {featured.slice(0, 2).map((project, i) => (
                <ProjectCard key={project.id} project={project} featured index={i} />
              ))}
            </div>
          </div>
        )}

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {projectFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm transition-all",
                filter === f
                  ? "bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-400/50"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  featured,
  index,
}: {
  project: (typeof projects)[number];
  featured?: boolean;
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
    >
      <GlassCard className={cn("group overflow-hidden !p-0", featured && "lg:flex lg:flex-row")}>
        <div
          className={cn(
            "relative overflow-hidden bg-gradient-to-br from-cyan-500/20 to-violet-500/20",
            featured ? "h-48 lg:h-auto lg:w-2/5" : "h-44"
          )}
        >
          <div className="flex h-full items-center justify-center text-4xl font-bold text-gray-300 dark:text-white/20">
            {project.title.charAt(0)}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent opacity-0 transition group-hover:opacity-100 dark:from-[#060b1a]/80" />
        </div>
        <div className={cn("p-6", featured && "lg:w-3/5")}>
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs text-cyan-700 ring-1 ring-cyan-200 dark:bg-white/5 dark:text-cyan-400 dark:ring-cyan-400/20"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-cyan-400"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-cyan-400"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
