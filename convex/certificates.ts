import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const getCertificates = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("certificates")
      .withIndex("by_issuedDate")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getLatestCertificates = query({
  args: { limit: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("certificates")
      .withIndex("by_issuedDate")
      .order("desc")
      .take(args.limit);
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const createCertificate = mutation({
  args: {
    title: v.string(),
    organization: v.string(),
    issuedDate: v.string(),
    fileId: v.string(),
    fileType: v.string(),
    tags: v.array(v.string()),
    description: v.optional(v.string()),
    verificationUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("certificates", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const deleteCertificate = mutation({
  args: { 
    id: v.id("certificates"),
  },
  handler: async (ctx, args) => {
    const certificate = await ctx.db.get(args.id);
    if (!certificate) {
      throw new Error("Certificate not found");
    }

    // Delete file from storage if it exists
    if (certificate.fileId && !certificate.fileId.startsWith("http")) {
      await ctx.storage.delete(certificate.fileId);
    }

    await ctx.db.delete(args.id);
  },
});

export const getFileUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    if (args.storageId.startsWith("http")) return args.storageId;
    return await ctx.storage.getUrl(args.storageId);
  },
});
