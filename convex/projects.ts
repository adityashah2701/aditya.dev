import { mutation, query, type QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

async function resolveCertificateFileUrl(ctx: QueryCtx, fileId: string) {
  if (fileId.startsWith("http")) return fileId;
  return await ctx.storage.getUrl(fileId);
}

async function resolveLinkedArchiveItems(
  ctx: QueryCtx,
  linkedArchiveIds?: Id<"certificates">[],
) {
  if (!linkedArchiveIds || linkedArchiveIds.length === 0) {
    return [];
  }

  const certificates = await Promise.all(
    linkedArchiveIds.map((id) => ctx.db.get(id)),
  );

  const linkedCertificates = certificates.filter(
    (certificate) => certificate !== null,
  );

  return await Promise.all(
    linkedCertificates.map(async (certificate) => ({
      ...certificate,
      fileUrl: await resolveCertificateFileUrl(ctx, certificate.fileId),
    })),
  );
}

/**
 * Public query — fetch all projects ordered by the `order` field.
 * Used by the project explorer on /projects.
 */
export const getAllProjects = query({
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_order")
      .collect();

    return await Promise.all(
      projects.map(async (project) => ({
        ...project,
        linkedArchiveItems: await resolveLinkedArchiveItems(
          ctx,
          project.linkedArchiveIds,
        ),
      })),
    );
  },
});

export const addProject = mutation({
  args: {
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
    content: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    image: v.optional(v.string()),
    confidential: v.optional(v.boolean()),
    contributions: v.optional(v.array(v.string())),
    linkedArchiveIds: v.optional(v.array(v.id("certificates"))),
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
    category: v.optional(
      v.union(
        v.literal("repository"),
        v.literal("hackathon"),
        v.literal("internship"),
      ),
    ),
    description: v.string(),
    content: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    image: v.optional(v.string()),
    confidential: v.optional(v.boolean()),
    contributions: v.optional(v.array(v.string())),
    linkedArchiveIds: v.optional(v.array(v.id("certificates"))),
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
