import { ConvexError } from "convex/values";

export type ContactErrorCode =
  | "RATE_LIMIT_EXCEEDED"
  | "SPAM_DETECTED"
  | "INVALID_INPUT";

export type ContactErrorData = {
  code: ContactErrorCode;
  message: string;
};

export function throwContactError(
  code: ContactErrorCode,
  message: string,
): never {
  throw new ConvexError<ContactErrorData>({ code, message });
}

export function isContactErrorData(value: unknown): value is ContactErrorData {
  if (!value || typeof value !== "object") {
    return false;
  }

  const maybeError = value as Partial<ContactErrorData>;

  return (
    typeof maybeError.code === "string" &&
    typeof maybeError.message === "string" &&
    ["RATE_LIMIT_EXCEEDED", "SPAM_DETECTED", "INVALID_INPUT"].includes(
      maybeError.code,
    )
  );
}
