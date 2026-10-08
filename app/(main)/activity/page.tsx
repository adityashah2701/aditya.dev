import { Breadcrumb } from "@/components/sections/shared";
import ActivityTelemetry from "@/components/sections/home/activity-telemetry";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/metadata";
import { getGitHubActivity, getLeetCodeActivity } from "@/lib/activity";
import { GITHUB_USERNAME, LEETCODE_USERNAME } from "@/constants/seo";

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: "Activity",
  description:
    "Aditya Shah's live coding activity: GitHub contribution heatmap, commit streaks and LeetCode problem-solving stats, refreshed every hour.",
  path: "/activity",
  ogDescription:
    "See Aditya Shah's GitHub contributions, coding streaks and LeetCode problem-solving stats.",
});

export default async function ActivityPage() {
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "activity", isLast: true },
  ];

  const [githubData, leetcodeData] = await Promise.all([
    getGitHubActivity(GITHUB_USERNAME),
    getLeetCodeActivity(LEETCODE_USERNAME),
  ]);

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Activity", path: "/activity" },
        ])}
      />
      <Breadcrumb items={breadcrumbItems} />
      <ActivityTelemetry
        initialGithub={githubData}
        initialLeetcode={leetcodeData}
      />
    </>
  );
}
