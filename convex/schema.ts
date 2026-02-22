import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.optional(v.string()), // Markdown or HTML content for the project detail page
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    image: v.optional(v.string()),
    order: v.number(), // For custom sorting
    featured: v.boolean(),
    techStack: v.array(v.string()), // e.g. ["React.js", "Next.js", "Tailwind CSS"]
  })
    .index("by_order", ["order"])
    .index("by_slug", ["slug"]),

  techstack: defineTable({
    sectionTitle: v.string(), // e.g. "Programming Languages"
    categoryId: v.string(), // e.g. "core-development"
    categoryTitle: v.string(), // e.g. "LANGUAGES_&_DEVELOPMENT"
    icon: v.string(), // e.g. "code"
    skills: v.array(
      v.object({
        name: v.string(),
      }),
    ),
    order: v.number(), // For custom sorting of categories globally
  }).index("by_order", ["order"]),

  history: defineTable({
    role: v.string(),
    company: v.string(),
    location: v.optional(v.string()),
    companyUrl: v.optional(v.string()),
    startDate: v.string(), // e.g. "2023-01-01" or "Jan 2023"
    endDate: v.optional(v.string()), // Omit or null if it's the current job
    current: v.boolean(),
    description: v.array(v.string()), // Bullet points of achievements/responsibilities
    order: v.number(), // For custom chronological or specific sorting
  }).index("by_order", ["order"]),

  contact: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    read: v.boolean(), // To mark messages as read/unread in an admin dashboard
    createdAt: v.number(), // Unix timestamp
  }).index("by_createdAt", ["createdAt"]),
});
