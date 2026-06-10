"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import Image from "next/image";
import { personal } from "@/lib/data/personal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const current = personal.typingRoles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length + 1));
      }, 80);
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length - 1));
      }, 40);
    } else {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % personal.typingRoles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const handleResumeDownload = () => {
    fetch("/api/analytics/resume", { method: "POST" }).catch(() => {});
    window.open(personal.resumeUrl, "_blank");
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-16">
      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-cyan-400">
              Welcome to my portfolio
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Hello, I&apos;m{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {personal.name}
              </span>
            </h1>
            <div className="mt-4 h-8 text-xl text-muted-foreground sm:text-2xl">
              <span className="text-cyan-400">{displayText}</span>
              <span className="animate-pulse">|</span>
            </div>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{personal.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Hire Me
              </MagneticButton>
              <MagneticButton variant="secondary" onClick={handleResumeDownload}>
                <Download size={16} />
                Download Resume
              </MagneticButton>
              <MagneticButton
                variant="outline"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Projects
                <ArrowRight size={16} />
              </MagneticButton>
            </div>

            <div className="mt-10 flex items-center gap-5">
              <a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 p-3 text-muted-foreground transition hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                aria-label="GitHub"
              >
                <GitHubIcon className="h-[22px] w-[22px]" />
              </a>
              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 p-3 text-muted-foreground transition hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-[22px] w-[22px]" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 opacity-60 blur-sm"
              />
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white/20 sm:h-80 sm:w-80">
                <Image
                  src="/profile.svg"
                  alt={personal.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 256px, 320px"
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-2 -right-2 rounded-full border border-cyan-400/50 bg-[#060b1a] px-4 py-2 text-sm font-medium text-cyan-400 shadow-lg"
              >
                {personal.title}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
