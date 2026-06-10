"use client";

import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { personal } from "@/lib/data/personal";
import { useVisitorCount } from "@/hooks/useVisitorCount";

export function Footer() {
  const visitors = useVisitorCount();

  return (
    <footer className="border-t border-theme bg-gray-50 py-8 dark:bg-white/5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {personal.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition hover:text-cyan-400"
            aria-label="GitHub"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition hover:text-cyan-400"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
          {visitors !== null && (
            <span className="text-xs text-muted-foreground">
              {visitors.toLocaleString()} visits
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
