export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "GitHub", href: "#github" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;

export const commandPaletteActions = [
  ...navLinks,
  { label: "Download Resume", href: "#resume-download", action: "resume" as const },
  { label: "Toggle Theme", href: "#", action: "theme" as const },
] as const;
