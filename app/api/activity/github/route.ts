import { NextResponse } from "next/server";
import { getGitHubActivity } from "@/lib/activity";
import { GITHUB_USERNAME } from "@/constants/seo";

export const runtime = "nodejs";
export const revalidate = 3600; // Cache for 1 hour

// Username is fixed so this route cannot be used to proxy arbitrary lookups.
export async function GET() {
  const data = await getGitHubActivity(GITHUB_USERNAME);

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
