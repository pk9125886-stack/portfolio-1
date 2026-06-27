"use client";

import { Award, Trophy, Code2, Medal } from "lucide-react";
import { achievements } from "@/lib/data/achievements";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

export function Achievements() {
  return (
    <section id="achievements" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Achievements"
          subtitle="Certifications, coding profiles, and milestones"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard>
            <div className="mb-4 flex items-center gap-2">
              <Award className="text-amber-400" size={22} />
              <h3 className="font-semibold">Certifications</h3>
            </div>
            <ul className="space-y-4">
              {achievements.certifications.map((cert) => (
                <li key={cert.title} className="border-b border-theme pb-3 last:border-0">
                  <p className="font-medium">{cert.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer} · {cert.year}
                  </p>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard>
            <div className="mb-4 flex items-center gap-2">
              <Code2 className="text-cyan-400" size={22} />
              <h3 className="font-semibold">Coding Profiles</h3>
            </div>
            <ul className="space-y-4">
              {achievements.codingProfiles.filter((profile) => profile.url && profile.url !== "#").map((profile) => (
                <li key={profile.platform}>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg p-2 transition hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <p className="font-medium">{profile.platform}</p>
                    <p className="text-sm text-cyan-400">@{profile.username}</p>
                    <p className="text-sm text-muted-foreground">{profile.stats}</p>
                  </a>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard>
            <div className="mb-4 flex items-center gap-2">
              <Trophy className="text-violet-400" size={22} />
              <h3 className="font-semibold">Competitive Programming</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-cyan-400">
                  {achievements.competitiveProgramming.problemsSolved}
                </p>
                <p className="text-xs text-muted-foreground">Problems Solved</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-violet-400">
                  {achievements.competitiveProgramming.contests}
                </p>
                <p className="text-xs text-muted-foreground">Contests</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-fuchsia-400">
                  {achievements.competitiveProgramming.rating}
                </p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="mb-4 flex items-center gap-2">
              <Medal className="text-fuchsia-400" size={22} />
              <h3 className="font-semibold">Hackathons & Awards</h3>
            </div>
            <ul className="space-y-4">
              {achievements.hackathons.map((h) => (
                <li key={h.name} className="border-b border-theme pb-3">
                  <p className="font-medium">{h.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {h.result} · {h.year}
                  </p>
                  <p className="text-sm text-muted-foreground">{h.description}</p>
                </li>
              ))}
              {achievements.awards.map((a) => (
                <li key={a.title}>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {a.event} · {a.year}
                  </p>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
