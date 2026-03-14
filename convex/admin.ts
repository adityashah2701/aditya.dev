import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Helper to check the admin secret
 */
function checkSecret(secret: string) {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    throw new Error("ADMIN_SECRET is not configured on the server.");
  }
  if (secret !== adminSecret) {
    throw new Error("Unauthorized: Invalid secret.");
  }
}

export const addProject = mutation({
  args: {
    secret: v.string(),
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
    const { secret, ...projectData } = args;
    checkSecret(secret);
    return await ctx.db.insert("projects", projectData);
  },
});

export const addTechStackCategory = mutation({
  args: {
    secret: v.string(),
    sectionTitle: v.string(),
    categoryId: v.string(),
    categoryTitle: v.string(),
    icon: v.string(),
    skills: v.array(
      v.object({
        name: v.string(),
      }),
    ),
    order: v.number(),
  },
  handler: async (ctx, args) => {

    const { secret, ...techStackData } = args;
    checkSecret(secret);
    return await ctx.db.insert("techstack", techStackData);
  },
});


export const addContactMessage = mutation({
  args: {
    secret: v.string(),
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const { secret, ...contactData } = args;
    checkSecret(secret);
    return await ctx.db.insert("contact", {
      ...contactData,
      read: false,
      createdAt: Date.now(),
    });
  },
});
