import { NextResponse } from "next/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const techStackId = await fetchMutation(api.techstack.addCategory, body);

    return NextResponse.json(
      { success: true, id: techStackId },
      { status: 201 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to create techstack category";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
