import { query } from "./_generated/server";

export const getTechStack = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("techstack")
      .withIndex("by_order")
      .order("asc")
      .collect();
  },
});
