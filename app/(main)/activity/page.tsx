import { Breadcrumb } from "@/components/sections/shared";
import { ActivityTelemetry } from "@/components/sections/home";
import { createPageMetadata } from "@/lib/metadata";
import { getGitHubActivity, getLeetCodeActivity } from "@/lib/activity";

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: "Activity",
  description:
    "Aditya Shah's developer activity — GitHub contributions, LeetCode stats, and coding streaks.",
  path: "/activity",
  ogTitle: "Activity | adityashah27.dev",
  ogDescription:
    "Explore Aditya Shah's GitHub contributions, LeetCode stats, and coding activity.",
});

export default async function ActivityPage() {
  const [githubData, leetcodeData] = await Promise.all([
    getGitHubActivity("adityashah2701"),
    getLeetCodeActivity("adityashah27"),
  ]);

  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "activity", isLast: true },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <ActivityTelemetry
        initialGithub={githubData}
        initialLeetcode={leetcodeData}
      />
    </>
  );
}
