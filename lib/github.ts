// GitHub API utilities

const GITHUB_USERNAME = "chetanoli2012"; // Update this with actual username
const GITHUB_API_BASE = "https://api.github.com";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  created_at: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  created_at: string;
  payload: {
    commits?: Array<{
      message: string;
      sha: string;
    }>;
    action?: string;
    ref?: string;
    ref_type?: string;
  };
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// Fetch user profile
export async function fetchGitHubUser(): Promise<GitHubUser | null> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
}

// Fetch pinned/popular repositories
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) return [];
    const repos: GitHubRepo[] = await response.json();

    // Sort by stars and return top repos
    return repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

// Fetch recent activity
export async function fetchGitHubActivity(): Promise<GitHubEvent[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=10`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }
    );

    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
    return [];
  }
}

// Generate mock contribution data (GitHub doesn't provide this via REST API easily)
// In production, you'd use the GraphQL API or scrape the contribution graph
export function generateContributionData(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Generate realistic-looking contribution counts
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Lower probability of contributions on weekends
    const baseProbability = isWeekend ? 0.3 : 0.7;
    const hasContribution = Math.random() < baseProbability;

    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (hasContribution) {
      // Generate contribution count with exponential distribution
      const rand = Math.random();
      if (rand < 0.5) {
        count = Math.floor(Math.random() * 3) + 1; // 1-3
        level = 1;
      } else if (rand < 0.75) {
        count = Math.floor(Math.random() * 5) + 4; // 4-8
        level = 2;
      } else if (rand < 0.9) {
        count = Math.floor(Math.random() * 7) + 9; // 9-15
        level = 3;
      } else {
        count = Math.floor(Math.random() * 10) + 16; // 16+
        level = 4;
      }
    }

    days.push({
      date: date.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return days;
}

// Format event type for display
export function formatEventType(event: GitHubEvent): string {
  switch (event.type) {
    case "PushEvent":
      return "Pushed to";
    case "CreateEvent":
      return event.payload.ref_type === "repository"
        ? "Created repo"
        : `Created ${event.payload.ref_type}`;
    case "PullRequestEvent":
      return `${event.payload.action} PR in`;
    case "IssuesEvent":
      return `${event.payload.action} issue in`;
    case "WatchEvent":
      return "Starred";
    case "ForkEvent":
      return "Forked";
    case "IssueCommentEvent":
      return "Commented on";
    default:
      return event.type.replace("Event", "");
  }
}

// Format relative time
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 604800)}w ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
