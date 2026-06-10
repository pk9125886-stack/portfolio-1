"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/Icons";
import type { GitHubRepo, GitHubUser } from "@/lib/github";
import { aggregateLanguages } from "@/lib/github";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

export function GitHubSection() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/github/user").then((r) => r.json()),
      fetch("/api/github/repos").then((r) => r.json()),
    ])
      .then(([userData, reposData]) => {
        setUser(userData);
        setRepos(Array.isArray(reposData) ? reposData : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const languages = aggregateLanguages(repos);
  const langEntries = Object.entries(languages).sort((a, b) => b[1] - a[1]);

  return (
    <section id="github" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="GitHub Activity"
          subtitle="Open source contributions and repository highlights"
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-400" />
          </div>
        ) : (
          <>
            {user && (
              <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <GlassCard className="text-center">
                  <p className="text-3xl font-bold text-cyan-400">{user.public_repos}</p>
                  <p className="text-sm text-muted-foreground">Repositories</p>
                </GlassCard>
                <GlassCard className="text-center">
                  <p className="text-3xl font-bold text-violet-400">{user.followers}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </GlassCard>
                <GlassCard className="text-center">
                  <p className="text-3xl font-bold text-fuchsia-400">{user.following}</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </GlassCard>
                <GlassCard className="text-center">
                  <p className="text-3xl font-bold text-amber-400">{repos.length}</p>
                  <p className="text-sm text-muted-foreground">Active Repos</p>
                </GlassCard>
              </div>
            )}

            {langEntries.length > 0 && (
              <GlassCard className="mb-10">
                <h3 className="mb-4 font-semibold">Most Used Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {langEntries.map(([lang, count]) => (
                    <span
                      key={lang}
                      className="rounded-full bg-gray-50 px-4 py-2 text-sm ring-1 ring-gray-200 dark:bg-white/5 dark:ring-white/10"
                    >
                      {lang}{" "}
                      <span className="text-cyan-400">({count})</span>
                    </span>
                  ))}
                </div>
              </GlassCard>
            )}

            <div className="mb-10 overflow-hidden rounded-2xl border border-theme">
              <img
                src="https://ghchart.rshah.org/pk9125886-stack"
                alt="GitHub contribution graph"
                className="w-full"
                loading="lazy"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo, i) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassCard className="h-full">
                    <div className="flex items-start justify-between">
                      <GitHubIcon className="h-5 w-5 text-muted-foreground" />
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-cyan-400"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    <h3 className="mt-3 font-semibold">{repo.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {repo.description || "No description provided."}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star size={14} />
                        {repo.stargazers_count}
                      </span>
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-cyan-400" />
                          {repo.language}
                        </span>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
