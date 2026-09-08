export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubActivityResponse {
  username: string;
  totalContributions: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  contributions: ContributionDay[];
}

export interface LeetCodeActivityResponse {
  username: string;
  streak: number;
  totalActiveDays: number;
  ranking: number;
  solved: {
    all: number;
    easy: number;
    medium: number;
    hard: number;
  };
  totalSubmissions: number;
  contributions: ContributionDay[];
}

function calculateGitHubStreaks(contributions: ContributionDay[]) {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (let i = 0; i < contributions.length; i++) {
    if (contributions[i].count > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }

  const today = new Date().toISOString().split("T")[0];
  let streakIndex = contributions.length - 1;

  if (
    streakIndex >= 0 &&
    contributions[streakIndex].date === today &&
    contributions[streakIndex].count === 0
  ) {
    streakIndex--;
  }

  while (streakIndex >= 0 && contributions[streakIndex].count > 0) {
    currentStreak++;
    streakIndex--;
  }

  return { currentStreak, longestStreak };
}

export async function getGitHubActivity(
  username = "adityashah2701"
): Promise<GitHubActivityResponse> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        headers: {
          "User-Agent": "portfolio-telemetry-engine",
        },
        next: { revalidate: 3600, tags: ["github-activity"] },
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}`);
    }

    const data = await res.json();
    const contributions: ContributionDay[] = (data.contributions || []).map(
      (c: { date: string; count: number; level: number }) => ({
        date: c.date,
        count: c.count,
        level: Math.min(Math.max(c.level, 0), 4) as 0 | 1 | 2 | 3 | 4,
      })
    );

    const totalContributions =
      data.total?.lastYear ??
      contributions.reduce((acc, curr) => acc + curr.count, 0);

    const activeDays = contributions.filter((c) => c.count > 0).length;
    const { currentStreak, longestStreak } = calculateGitHubStreaks(contributions);

    return {
      username,
      totalContributions,
      activeDays,
      currentStreak,
      longestStreak,
      contributions,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub activity:", error);
    return {
      username,
      totalContributions: 0,
      activeDays: 0,
      currentStreak: 0,
      longestStreak: 0,
      contributions: [],
    };
  }
}

const LEETCODE_GRAPHQL_ENDPOINT = "https://leetcode.com/graphql";

const LEETCODE_QUERY = `
  query userProfileCalendar($username: String!) {
    matchedUser(username: $username) {
      userCalendar {
        activeYears
        streak
        totalActiveDays
        submissionCalendar
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      profile {
        ranking
        reputation
      }
    }
  }
`;

function getLeetCodeLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function generatePastYearLeetCodeCalendar(
  submissionMap: Record<string, number>
): ContributionDay[] {
  const result: ContributionDay[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const count = submissionMap[dateStr] || 0;
    result.push({
      date: dateStr,
      count,
      level: getLeetCodeLevel(count),
    });
  }

  return result;
}

export async function getLeetCodeActivity(
  username = "adityashah27"
): Promise<LeetCodeActivityResponse> {
  try {
    const res = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/${username}/`,
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)",
      },
      body: JSON.stringify({
        query: LEETCODE_QUERY,
        variables: { username },
      }),
      next: { revalidate: 3600, tags: ["leetcode-activity"] },
    });

    if (!res.ok) {
      throw new Error(`LeetCode GraphQL error: status ${res.status}`);
    }

    const json = await res.json();
    const matchedUser = json?.data?.matchedUser;

    if (!matchedUser) {
      throw new Error(`User ${username} not found on LeetCode`);
    }

    const calendar = matchedUser.userCalendar || {};
    const rawCalendarStr = calendar.submissionCalendar || "{}";
    let parsedCalendar: Record<string, number> = {};

    try {
      parsedCalendar = JSON.parse(rawCalendarStr);
    } catch {
      parsedCalendar = {};
    }

    const submissionMap: Record<string, number> = {};
    let totalSubmissions = 0;

    for (const [timestamp, count] of Object.entries(parsedCalendar)) {
      const date = new Date(parseInt(timestamp, 10) * 1000)
        .toISOString()
        .split("T")[0];
      submissionMap[date] = (submissionMap[date] || 0) + (count as number);
      totalSubmissions += count as number;
    }

    const contributions = generatePastYearLeetCodeCalendar(submissionMap);
    const acSubmissions = matchedUser.submitStatsGlobal?.acSubmissionNum || [];

    const solved = {
      all:
        acSubmissions.find(
          (s: { difficulty: string }) => s.difficulty === "All"
        )?.count || 0,
      easy:
        acSubmissions.find(
          (s: { difficulty: string }) => s.difficulty === "Easy"
        )?.count || 0,
      medium:
        acSubmissions.find(
          (s: { difficulty: string }) => s.difficulty === "Medium"
        )?.count || 0,
      hard:
        acSubmissions.find(
          (s: { difficulty: string }) => s.difficulty === "Hard"
        )?.count || 0,
    };

    return {
      username,
      streak: calendar.streak || 0,
      totalActiveDays: calendar.totalActiveDays || 0,
      ranking: matchedUser.profile?.ranking || 0,
      solved,
      totalSubmissions,
      contributions,
    };
  } catch (error) {
    console.error("Failed to fetch LeetCode activity:", error);
    return {
      username,
      streak: 0,
      totalActiveDays: 0,
      ranking: 0,
      solved: { all: 0, easy: 0, medium: 0, hard: 0 },
      totalSubmissions: 0,
      contributions: [],
    };
  }
}
