import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    slug: v.string(),
    category: v.optional(
      v.union(
        v.literal("repository"),
        v.literal("hackathon"),
        v.literal("internship"),
      ),
    ),
    description: v.string(),
    content: v.optional(v.string()), // Markdown or HTML content for the project detail page
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    image: v.optional(v.string()),
    confidential: v.optional(v.boolean()),
    contributions: v.optional(v.array(v.string())),
    linkedArchiveIds: v.optional(v.array(v.id("certificates"))),
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

  certificates: defineTable({
    title: v.string(),
    organization: v.string(),
    issuedDate: v.string(), // e.g. "2024-03-01"
    fileId: v.string(), // Convex Storage ID or fallback URL
    fileType: v.string(), // mime type (e.g. "image/png", "application/pdf")
    tags: v.array(v.string()),
    description: v.optional(v.string()),
    verificationUrl: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_issuedDate", ["issuedDate"]),

  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    createdAt: v.number(),
    ip: v.string(),
    userAgent: v.string(),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_email", ["email"])
    .index("by_ip", ["ip"])
    .index("by_email_createdAt", ["email", "createdAt"])
    .index("by_ip_createdAt", ["ip", "createdAt"]),
});
