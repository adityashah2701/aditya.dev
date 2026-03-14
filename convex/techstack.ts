import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("techstack", args);
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
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const deleteCategory = mutation({
  args: {
    id: v.id("techstack"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
