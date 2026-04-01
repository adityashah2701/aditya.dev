import type { MutationCtx } from "./_generated/server";
import { throwContactError } from "./contactErrors";
import {
  DUPLICATE_WINDOW_MS,
  EMAIL_DAILY_LIMIT,
  EMAIL_WINDOW_MS,
  IP_COOLDOWN_MS,
  IP_HOURLY_LIMIT,
  IP_WINDOW_MS,
  normalizeMessageForComparison,
  type ContactSubmission,
} from "./contactValidation";

type StoredContactGuardInput = Pick<ContactSubmission, "email" | "ip" | "message">;

export async function enforceContactGuards(
  ctx: MutationCtx,
  submission: StoredContactGuardInput,
  now: number,
): Promise<void> {
  const hourlyIpMessages = await ctx.db
    .query("contacts")
    .withIndex("by_ip_createdAt", (q) =>
      q.eq("ip", submission.ip).gte("createdAt", now - IP_WINDOW_MS),
    )
    .collect();

  if (hourlyIpMessages.length >= IP_HOURLY_LIMIT) {
    throwContactError(
      "RATE_LIMIT_EXCEEDED",
      "Too many messages from this IP. Please try again in an hour.",
    );
  }

  const latestIpMessage = hourlyIpMessages.reduce<number | null>(
    (latest, contact) =>
      latest === null || contact.createdAt > latest ? contact.createdAt : latest,
    null,
  );

  if (latestIpMessage !== null && now - latestIpMessage < IP_COOLDOWN_MS) {
    throwContactError(
      "RATE_LIMIT_EXCEEDED",
      "Please wait at least 60 seconds before sending another message.",
    );
  }

  const dailyEmailMessages = await ctx.db
    .query("contacts")
    .withIndex("by_email_createdAt", (q) =>
      q.eq("email", submission.email).gte("createdAt", now - EMAIL_WINDOW_MS),
    )
    .collect();

  if (dailyEmailMessages.length >= EMAIL_DAILY_LIMIT) {
    throwContactError(
      "RATE_LIMIT_EXCEEDED",
      "Too many messages from this email address. Please try again tomorrow.",
    );
  }

  const normalizedIncomingMessage = normalizeMessageForComparison(
    submission.message,
  );

  const hasRecentDuplicate = dailyEmailMessages.some(
    (contact) =>
      contact.createdAt >= now - DUPLICATE_WINDOW_MS &&
      normalizeMessageForComparison(contact.message) ===
        normalizedIncomingMessage,
  );

  if (hasRecentDuplicate) {
    throwContactError(
      "SPAM_DETECTED",
      "Duplicate message detected. Please wait before resending.",
    );
  }
}
