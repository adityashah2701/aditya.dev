import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { verifyAdminAuth } from "./auth";

export const getMessages = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("contact")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

export const markRead = mutation({
  args: {
    id: v.id("contact"),
    read: v.boolean(),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await verifyAdminAuth(args.token);

    const message = await ctx.db.get(args.id);
    if (!message) {
      throw new Error("Message not found");
    }

    await ctx.db.patch(args.id, {
      read: args.read,
    });
  },
});

export const deleteMessage = mutation({
  args: {
    id: v.id("contact"),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await verifyAdminAuth(args.token);

    const message = await ctx.db.get(args.id);
    if (!message) {
      throw new Error("Message not found");
    }

    await ctx.db.delete(args.id);
  },
});
