export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  topics?: string[];
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
}

const GITHUB_USERNAME = "pk9125886-stack";

export async function fetchGitHubUser(): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data: GitHubRepo[] = await res.json();
    return data.filter((r) => !r.fork);
  } catch {
    return [];
  }
}

export function aggregateLanguages(repos: GitHubRepo[]): Record<string, number> {
  const langs: Record<string, number> = {};
  repos.forEach((repo) => {
    if (repo.language) {
      langs[repo.language] = (langs[repo.language] || 0) + 1;
    }
  });
  return langs;
}
