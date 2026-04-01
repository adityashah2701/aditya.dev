import { fetchMutation } from "convex/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import {
  isContactErrorData,
  type ContactErrorCode,
} from "@/convex/contactErrors";
import {
  sanitizeIp,
  sanitizeUserAgent,
} from "@/convex/contactValidation";

export const runtime = "nodejs";

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

const SUCCESS_RESPONSE = {
  success: true,
  message: "Transmission received.",
};

function readString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function extractClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return sanitizeIp(forwardedFor.split(",")[0]);
  }

  return sanitizeIp(
    request.headers.get("cf-connecting-ip") ?? request.headers.get("x-real-ip"),
  );
}

function extractUserAgent(request: NextRequest): string {
  return sanitizeUserAgent(request.headers.get("user-agent"));
}

function getErrorStatus(code: ContactErrorCode): number {
  switch (code) {
    case "RATE_LIMIT_EXCEEDED":
      return 429;
    case "SPAM_DETECTED":
      return 400;
    case "INVALID_INPUT":
      return 400;
  }
}

function getContactErrorData(error: unknown) {
  if (!error || typeof error !== "object" || !("data" in error)) {
    return null;
  }

  const data = (error as { data?: unknown }).data;
  return isContactErrorData(data) ? data : null;
}

export async function POST(request: NextRequest) {
  let body: ContactRequestBody;

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_INPUT",
          message: "Request body must be valid JSON.",
        },
      },
      { status: 400 },
    );
  }

  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json(SUCCESS_RESPONSE, { status: 200 });
  }

  try {
    const result = await fetchMutation(api.contact.sendContactMessage, {
      name: readString(body.name),
      email: readString(body.email),
      message: readString(body.message),
      ip: extractClientIp(request),
      userAgent: extractUserAgent(request),
    });

    return NextResponse.json(
      {
        ...SUCCESS_RESPONSE,
        id: result.id,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    const contactError = getContactErrorData(error);
    if (contactError) {
      return NextResponse.json(
        {
          success: false,
          error: contactError,
        },
        { status: getErrorStatus(contactError.code) },
      );
    }

    console.error("Failed to process contact submission", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_INPUT",
          message: "Unable to process contact message at this time.",
        },
      },
      { status: 500 },
    );
  }
}
