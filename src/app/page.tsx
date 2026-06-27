import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { BackgroundBlobs } from "@/components/effects/BackgroundBlobs";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { RecentMessages } from "@/components/sections/RecentMessages";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <BackgroundBlobs />
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <GitHubSection />
        {/* <Blog /> */}
        <Contact />
        <RecentMessages />
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette />
      <a
        href="https://www.linkedin.com/in/pankaj-kumar-a87524383"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0a66c2] text-white shadow-lg shadow-blue-500/30 transition hover:scale-110 hover:shadow-blue-500/50 sm:bottom-6 sm:right-24"
        aria-label="Connect on LinkedIn"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
    </>
  );
}
