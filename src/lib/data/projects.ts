export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  github?: string;
  live?: string;
  featured: boolean;
  image: string;
}

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "Personal responsive portfolio with modern UI and animations.",
    longDescription:
      "A premium developer portfolio showcasing projects, skills, and experience with glassmorphism design and smooth animations.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/pk9125886-stack/portfolio-1",
    live: "https://pk9125886-stack.github.io/portfolio-1",
    featured: true,
    image: "/projects/portfolio.png",
  },
  {
    id: "wastesense-ai",
    title: "WasteSense AI",
    description: "Smart predictive cleanliness intelligence platform.",
    longDescription:
      "An AI-powered platform for predictive waste management and cleanliness monitoring with real-time analytics.",
    technologies: ["JavaScript", "Firebase", "HTML", "CSS"],
    featured: true,
    image: "/projects/wastesense.png",
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    description: "JavaScript-based expense tracking application.",
    longDescription:
      "A clean expense management app with category tracking, visual summaries, and local storage persistence.",
    technologies: ["JavaScript", "HTML", "CSS", "LocalStorage"],
    featured: true,
    image: "/projects/expense.png",
  },
];

export const projectFilters = [
  "All",
  "Next.js",
  "JavaScript",
  "Firebase",
  "React",
  "TypeScript",
] as const;
