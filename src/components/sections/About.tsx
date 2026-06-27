"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import { personal } from "@/lib/data/personal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="Passionate about crafting exceptional digital experiences"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center text-lg text-muted-foreground"
        >
          {personal.bio}
        </motion.p>

        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {personal.focus.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="h-full text-center">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mb-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          <AnimatedCounter value={personal.stats.projectsCompleted} label="Projects Completed" suffix="+" />
          <AnimatedCounter value={personal.stats.problemsSolved} label="Problems Solved" suffix="+" />
          <AnimatedCounter value={personal.stats.technologiesLearned} label="Technologies Learned" suffix="+" />
          <AnimatedCounter value={personal.stats.yearsOfExperience} label="Years of Experience" suffix=" Yr" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <GlassCard>
            <div className="mb-6 flex items-center gap-3">
              <GraduationCap className="text-cyan-400" size={24} />
              <h3 className="text-xl font-semibold">Education</h3>
            </div>
            <div className="space-y-6">
              {personal.education.map((edu) => (
                <div key={edu.degree} className="relative border-l-2 border-cyan-400/50 pl-6">
                  <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-cyan-400" />
                  <p className="text-sm text-cyan-400">{edu.period}</p>
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{edu.description}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="mb-6 flex items-center gap-3">
              <Briefcase className="text-violet-400" size={24} />
              <h3 className="text-xl font-semibold">Experience</h3>
            </div>
            <div className="space-y-6">
              {personal.experience.map((exp) => (
                <div key={exp.role} className="relative border-l-2 border-violet-400/50 pl-6">
                  <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-violet-400" />
                  <p className="text-sm text-violet-400">{exp.period}</p>
                  <h4 className="font-semibold">{exp.role}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
