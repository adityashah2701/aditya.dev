import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

/**
 * Public query — fetch all projects ordered by the `order` field.
 * Used by the project explorer on /projects.
 */
export const getAllProjects = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_order")
      .collect();
  },
});

export const addProject = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    image: v.optional(v.string()),
    order: v.number(),
    featured: v.boolean(),
    techStack: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("projects", args);
  },
});

export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    image: v.optional(v.string()),
    order: v.number(),
    featured: v.boolean(),
    techStack: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const deleteProject = mutation({
  args: {
    id: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) return;
    
    if (project.image && !project.image.startsWith("http")) {
      try {
        await ctx.storage.delete(project.image as Id<"_storage">);
      } catch {
        // ignore if not a valid storage id
      }
    }
    await ctx.db.delete(args.id);
  },
});
