export const personal = {
  name: "Pankaj Kumar",
  firstName: "Pankaj",
  lastName: "Kumar",
  title: "Website Developer",
  tagline:
    "Website Developer focused on modern UI, animations, and real-world web products.",
  bio: "I am a passionate website developer who loves building interactive, visually appealing, and user-focused web applications.",
  profileImage: "/profile.png",
  location: "India",
  email: "pankaj.kumar1@rungta.org",
  resumeUrl: "/resume.pdf",
  typingRoles: [
    "Website Developer",
    "UI/UX Enthusiast",
    "Student",
    "Tech Enthusiast",
  ],
  social: {
    github: "https://github.com/pk9125886-stack",
    linkedin: "https://www.linkedin.com/in/pankaj-kumar-a87524383",
    twitter: "",
    leetcode: "",
    codeforces: "",
  },
  stats: {
    projectsCompleted: 12,
    problemsSolved: 150,
    technologiesLearned: 18,
    yearsOfExperience: "<1",
  },
  focus: [
    { icon: "🎯", title: "Focus", text: "UI/UX, animations, performance, clean code" },
    { icon: "💡", title: "Mindset", text: "Learn fast, build real projects, improve daily" },
    { icon: "🛠", title: "Tools", text: "HTML, CSS, JavaScript, Git, Firebase" },
    { icon: "🚀", title: "Goal", text: "Become a world-class website developer" },
  ],
  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      institution: "Rungta International Skills University",
      period: "2025 — Present",
      description: "Currently in 2nd semester, pursuing degree with focus on software development and web technologies.",
    },
  ],
  experience: [
    {
      role: "Website Developer",
      company: "Freelance / Personal Projects",
      period: "2026 — Present",
      description:
        "Building responsive web applications with modern UI, animations, and performance optimization.",
    },
  ],
} as const;
