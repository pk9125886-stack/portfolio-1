"use client";

import { motion } from "framer-motion";
import { ExternalLink, Clock } from "lucide-react";
import { blogPosts } from "@/lib/data/blog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

export function Blog() {
  if (blogPosts.length === 0) return null;

  return (
    <section id="blog" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Blog"
          subtitle="Thoughts on development, design, and learning"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                <GlassCard className="group h-full">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
                      {post.platform}
                    </span>
                    <ExternalLink
                      size={16}
                      className="text-muted-foreground transition group-hover:text-cyan-400"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold group-hover:text-cyan-400">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                </GlassCard>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
