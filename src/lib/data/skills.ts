export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Programming Languages"
  | "Databases"
  | "Tools";

export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export const skillCategories: Record<SkillCategory, Skill[]> = {
  Frontend: [
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 90 },
    { name: "JavaScript", level: 88 },
    { name: "React", level: 82 },
    { name: "Next.js", level: 78 },
    { name: "Tailwind CSS", level: 85 },
  ],
  Backend: [
    { name: "Node.js", level: 70 },
    { name: "Express", level: 65 },
    { name: "REST APIs", level: 72 },
    { name: "Firebase", level: 75 },
  ],
  "Programming Languages": [
    { name: "JavaScript", level: 88 },
    { name: "TypeScript", level: 75 },
    { name: "C++", level: 70 },
    { name: "Java", level: 65 },
  ],
  Databases: [
    { name: "Firebase", level: 75 },
    { name: "MongoDB", level: 60 },
    { name: "MySQL", level: 55 },
  ],
  Tools: [
    { name: "Git", level: 85 },
    { name: "GitHub", level: 90 },
    { name: "VS Code", level: 92 },
    { name: "Figma", level: 70 },
    { name: "Vercel", level: 75 },
  ],
};

export const allSkillCategories = Object.keys(skillCategories) as SkillCategory[];
