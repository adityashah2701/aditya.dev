import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { verifyAdminAuth } from "./auth";

export const getTechStack = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("techstack")
      .withIndex("by_order")
      .order("asc")
      .collect();
  },
});

export const addCategory = mutation({
  args: {
    sectionTitle: v.string(),
    categoryId: v.string(),
    categoryTitle: v.string(),
    icon: v.string(),
    skills: v.array(v.object({ name: v.string() })),
    order: v.number(),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await verifyAdminAuth(args.token);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { token, ...data } = args;
    await ctx.db.insert("techstack", data);
  },
});

export const updateCategory = mutation({
  args: {
    id: v.id("techstack"),
    sectionTitle: v.string(),
    categoryId: v.string(),
    categoryTitle: v.string(),
    icon: v.string(),
    skills: v.array(v.object({ name: v.string() })),
    order: v.number(),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await verifyAdminAuth(args.token);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, token, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const deleteCategory = mutation({
  args: {
    id: v.id("techstack"),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await verifyAdminAuth(args.token);
    await ctx.db.delete(args.id);
  },
});
