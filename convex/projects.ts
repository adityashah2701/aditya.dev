import { query } from "./_generated/server";

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
