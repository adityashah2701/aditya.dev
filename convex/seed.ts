import { mutation } from "./_generated/server";
import { SKILL_SECTIONS } from "../constants/skills";

export const seedTechStack = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("techstack").collect();
    if (existing.length > 0) {
      return "Tech stack data already seeded.";
    }

    let globalOrder = 0;

    for (const section of SKILL_SECTIONS) {
      for (const category of section.categories) {
        await ctx.db.insert("techstack", {
          sectionTitle: section.title,
          categoryId: category.id,
          categoryTitle: category.title,
          icon: category.icon,
          skills: category.skills,
          order: globalOrder++,
        });
      }
    }
    return "Successfully seeded tech stack data.";
  },
});
