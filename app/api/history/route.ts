import { NextResponse } from "next/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret) {
      return NextResponse.json(
        { error: "Server misconfiguration. ADMIN_SECRET is missing." },
        { status: 500 },
      );
    }

    if (authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const historyId = await fetchMutation(api.admin.addHistory, {
      secret: adminSecret,
      ...body,
    });

    return NextResponse.json({ success: true, id: historyId }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create history entry";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
