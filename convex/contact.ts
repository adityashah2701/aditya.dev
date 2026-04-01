import { v } from "convex/values";
import { internal } from "./_generated/api";
import {
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import { enforceContactGuards } from "./contactRateLimit";
import { throwContactError } from "./contactErrors";
import {
  CONTACT_RETENTION_MS,
  detectSpamPattern,
  normalizeContactSubmission,
  sanitizeIp,
  sanitizeUserAgent,
  validateContactSubmission,
} from "./contactValidation";

const contactArgs = {
  name: v.string(),
  email: v.string(),
  message: v.string(),
  ip: v.string(),
  userAgent: v.string(),
};

export const getMessages = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("contacts")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

export const sendContactMessage = mutation({
  args: contactArgs,
  handler: async (ctx, args) => {
    const submission = normalizeContactSubmission(args);

    validateContactSubmission(submission);

    const spamPattern = detectSpamPattern(submission);
    if (spamPattern) {
      throwContactError(
        "SPAM_DETECTED",
        "Message contains blocked spam content.",
      );
    }

    const now = Date.now();
    await enforceContactGuards(ctx, submission, now);

    const contactId = await ctx.db.insert("contacts", {
      name: submission.name,
      email: submission.email,
      message: submission.message,
      createdAt: now,
      ip: sanitizeIp(submission.ip),
      userAgent: sanitizeUserAgent(submission.userAgent),
    });

    await ctx.scheduler.runAfter(
      0,
      internal.contactEmail.deliverContactNotification,
      {
        name: submission.name,
        email: submission.email,
        message: submission.message,
        createdAt: now,
        ip: submission.ip,
        userAgent: submission.userAgent,
      },
    );

    return {
      id: contactId,
      createdAt: now,
    };
  },
});

export const deleteMessage = mutation({
  args: {
    id: v.id("contacts"),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.id);
    if (!message) {
      throwContactError("INVALID_INPUT", "Message not found.");
    }

    await ctx.db.delete(args.id);
  },
});

export const cleanupExpiredContacts = internalMutation({
  args: {},
  handler: async (ctx) => {
    const cutoff = Date.now() - CONTACT_RETENTION_MS;
    let deleted = 0;

    while (true) {
      const expiredContacts = await ctx.db
        .query("contacts")
        .withIndex("by_createdAt", (q) => q.lt("createdAt", cutoff))
        .take(100);

      if (expiredContacts.length === 0) {
        break;
      }

      for (const contact of expiredContacts) {
        await ctx.db.delete(contact._id);
        deleted += 1;
      }

      if (expiredContacts.length < 100) {
        break;
      }
    }

    return { deleted };
  },
});
