import { jwtVerify } from "jose";

/**
 * Validates the custom admin JWT token.
 * Throws an error if the token is invalid, expired, or missing.
 */
export const verifyAdminAuth = async (token?: string) => {
  if (!token) {
    throw new Error("Unauthenticated: No token provided");
  }

  // Convex environment variables are accessed via process.env.
  // Warning: This falls back to the development token if missing.
  // You MUST set JWT_SECRET in your Convex Dashboard for production.
  const secretKey = process.env.JWT_SECRET || "super-secret-fallback-key-for-development-only-change-in-prod";

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(secretKey)
    );
    
    if (verified.payload.role !== "admin") {
      throw new Error("Unauthorized: Invalid role");
    }

    return true;
  } catch {
    throw new Error("Unauthenticated: Invalid or expired token");
  }
};
