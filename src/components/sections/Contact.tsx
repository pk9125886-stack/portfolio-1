"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/Icons";
import { personal } from "@/lib/data/personal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Contact"
          subtitle="Let's build something amazing together"
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <GlassCard>
              <Mail className="text-cyan-400" size={24} />
              <h3 className="mt-3 font-semibold">Email</h3>
              <a
                href={`mailto:${personal.email}`}
                className="text-sm text-muted-foreground transition hover:text-cyan-400"
              >
                {personal.email}
              </a>
            </GlassCard>
            <GlassCard>
              <MapPin className="text-violet-400" size={24} />
              <h3 className="mt-3 font-semibold">Location</h3>
              <p className="text-sm text-muted-foreground">{personal.location}</p>
            </GlassCard>
            <GlassCard>
              <LinkedInIcon className="h-6 w-6 text-blue-400" />
              <h3 className="mt-3 font-semibold">LinkedIn</h3>
              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition hover:text-cyan-400"
              >
                Connect with me
              </a>
            </GlassCard>
          </div>

          <GlassCard className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
                  placeholder="Your message..."
                />
              </div>
              <MagneticButton type="submit" disabled={status === "loading"} className="w-full">
                <Send size={16} />
                {status === "loading" ? "Sending..." : "Send Message"}
              </MagneticButton>

              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-sm text-green-400"
                  >
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-sm text-red-400"
                  >
                    Something went wrong. Please try again or email me directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
