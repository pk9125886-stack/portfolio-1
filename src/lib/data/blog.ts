export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  platform: "Medium" | "Dev.to";
  url: string;
  date: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Modern UIs with CSS Animations",
    excerpt:
      "A practical guide to creating smooth, performant animations for web interfaces.",
    platform: "Dev.to",
    url: "https://dev.to",
    date: "2025-08-15",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "From HTML to React: My Frontend Journey",
    excerpt:
      "Lessons learned while transitioning from vanilla web development to modern frameworks.",
    platform: "Medium",
    url: "https://medium.com",
    date: "2025-06-20",
    readTime: "7 min read",
  },
];
