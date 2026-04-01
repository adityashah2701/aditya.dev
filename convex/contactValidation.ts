import { throwContactError } from "./contactErrors";

export const CONTACT_NAME_MAX_LENGTH = 100;
export const CONTACT_MESSAGE_MIN_LENGTH = 10;
export const CONTACT_MESSAGE_MAX_LENGTH = 2000;
export const CONTACT_IP_MAX_LENGTH = 128;
export const CONTACT_USER_AGENT_MAX_LENGTH = 512;
export const IP_HOURLY_LIMIT = 3;
export const EMAIL_DAILY_LIMIT = 5;
export const IP_COOLDOWN_MS = 60 * 1000;
export const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
export const IP_WINDOW_MS = 60 * 60 * 1000;
export const EMAIL_WINDOW_MS = 24 * 60 * 60 * 1000;
export const CONTACT_RETENTION_MS = 30 * 24 * 60 * 60 * 1000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPAM_PATTERNS = [
  /http:\/\//i,
  /https:\/\//i,
  /\bbuy now\b/i,
  /\bfree money\b/i,
] as const;

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  ip: string;
  userAgent: string;
};

export function sanitizeIp(ip: string | null | undefined): string {
  const value = ip?.trim();
  if (!value) {
    return "unknown";
  }

  return value.slice(0, CONTACT_IP_MAX_LENGTH);
}

export function sanitizeUserAgent(userAgent: string | null | undefined): string {
  const value = userAgent?.trim();
  if (!value) {
    return "unknown";
  }

  return value.slice(0, CONTACT_USER_AGENT_MAX_LENGTH);
}

export function normalizeMessageForComparison(message: string): string {
  return message.trim().replace(/\s+/g, " ");
}

export function normalizeContactSubmission(
  input: ContactSubmission,
): ContactSubmission {
  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    message: input.message.trim(),
    ip: sanitizeIp(input.ip),
    userAgent: sanitizeUserAgent(input.userAgent),
  };
}

export function validateContactSubmission(input: ContactSubmission): void {
  if (!input.name) {
    throwContactError("INVALID_INPUT", "Name is required.");
  }

  if (input.name.length > CONTACT_NAME_MAX_LENGTH) {
    throwContactError(
      "INVALID_INPUT",
      `Name must be ${CONTACT_NAME_MAX_LENGTH} characters or fewer.`,
    );
  }

  if (!EMAIL_REGEX.test(input.email)) {
    throwContactError("INVALID_INPUT", "A valid email address is required.");
  }

  if (input.message.length < CONTACT_MESSAGE_MIN_LENGTH) {
    throwContactError(
      "INVALID_INPUT",
      `Message must be at least ${CONTACT_MESSAGE_MIN_LENGTH} characters.`,
    );
  }

  if (input.message.length > CONTACT_MESSAGE_MAX_LENGTH) {
    throwContactError(
      "INVALID_INPUT",
      `Message must be ${CONTACT_MESSAGE_MAX_LENGTH} characters or fewer.`,
    );
  }
}

export function detectSpamPattern(
  input: Pick<ContactSubmission, "name" | "message">,
): string | null {
  const haystack = `${input.name}\n${input.message}`;
  const match = SPAM_PATTERNS.find((pattern) => pattern.test(haystack));

  return match ? match.source : null;
}
