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

### Deploy to Vercel (recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import **pk9125886-stack/portfolio-1** from GitHub
3. Add environment variable: `NEXT_PUBLIC_SITE_URL` = your Vercel URL (e.g. `https://portfolio-1.vercel.app`)
4. Click **Deploy**

Auto-deploy on every push to `main` is enabled once the repo is connected.

### CLI deploy

```bash
npx vercel login
npx vercel --prod
```

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
