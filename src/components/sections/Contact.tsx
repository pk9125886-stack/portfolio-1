"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/Icons";
import { personal } from "@/lib/data/personal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useToast } from "@/components/providers/ToastProvider";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const { toast } = useToast();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Honeypot field for spam prevention
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Client-side Validation: check for empty fields
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    // 2. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Prevent duplicate submissions if already loading
    if (status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      toast.success("Message sent successfully!");
      setStatus("success");
      
      // Clear all form fields
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to send message. Please try again.");
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
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
              {/* Honeypot field (hidden from users, will be filled by spambots) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    disabled={status === "loading"}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-theme bg-input px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 dark:focus:border-cyan-400/50 dark:focus:ring-cyan-400/30 disabled:opacity-50"
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
                    disabled={status === "loading"}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-theme bg-input px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 dark:focus:border-cyan-400/50 dark:focus:ring-cyan-400/30 disabled:opacity-50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  disabled={status === "loading"}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full rounded-xl border border-theme bg-input px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 dark:focus:border-cyan-400/50 dark:focus:ring-cyan-400/30 disabled:opacity-50"
                  placeholder="What is this about?"
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
                  disabled={status === "loading"}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-theme bg-input px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 dark:focus:border-cyan-400/50 dark:focus:ring-cyan-400/30 disabled:opacity-50"
                  placeholder="Your message..."
                />
              </div>

              <MagneticButton type="submit" disabled={status === "loading"} className="w-full">
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </MagneticButton>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
