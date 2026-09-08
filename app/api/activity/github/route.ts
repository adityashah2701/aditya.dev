import { NextRequest, NextResponse } from "next/server";
import { getGitHubActivity } from "@/lib/activity";

export const runtime = "nodejs";
export const revalidate = 3600; // Cache for 1 hour

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "adityashah2701";

  const data = await getGitHubActivity(username);

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
