# Pankaj Kumar — Developer Portfolio

A world-class, production-ready developer portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## Features

- Premium glassmorphism + dark/light theme toggle
- Framer Motion animations, scroll reveals, magnetic buttons
- Hero with typing effect, parallax, profile glow ring
- About, Skills, Projects, Achievements, GitHub, Blog, Contact sections
- GitHub API integration with contribution graph
- Command palette (Ctrl+K), cursor glow, particle background
- SEO optimized with Open Graph, JSON-LD, sitemap, robots.txt
- Contact form API + resume download analytics

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) or GitHub Pages with `NEXT_PUBLIC_SITE_URL` set in environment variables.

## Customization

Edit content in `src/lib/data/`:

- `personal.ts` — bio, stats, education, experience
- `skills.ts` — skill categories and levels
- `projects.ts` — project showcase
- `achievements.ts` — certifications, hackathons
- `blog.ts` — blog posts

Replace `public/profile.svg` with your photo and `public/resume.pdf` with your resume.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React
