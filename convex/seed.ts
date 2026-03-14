import { mutation } from "./_generated/server";
import { SKILL_SECTIONS } from "../constants/skills";

export const seedDrawAnything = mutation({
  handler: async (ctx) => {
    // Idempotent: skip if already seeded
    const existing = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", "draw-anything"))
      .unique();

    if (existing) {
      return "draw-anything already seeded.";
    }

    await ctx.db.insert("projects", {
      title: "Draw Anything",
      slug: "draw-anything",
      description:
        "A real-time collaborative drawing application where users can sketch anything on a shared canvas. Features live multi-user sync, stroke history, export to PNG, and a clean minimal UI.",
      content:
        "Draw Anything is a browser-based collaborative whiteboard built to be fast and frictionless. The core challenge was achieving sub-50ms latency for stroke broadcast across multiple clients while maintaining consistent state. The solution leverages WebSocket subscriptions via Convex for real-time sync, with optimistic local rendering so strokes feel instant.",
      githubUrl: "https://github.com/adityashah2701/draw-anything",
      liveUrl: "https://draw-anything-two.vercel.app/",
      image: undefined,
      order: 1,
      featured: true,
      techStack: [
        "Next.js",
        "TypeScript",
        "Convex",
        "React",
        "HTML Canvas",
        "Tailwind CSS",
      ],
    });

    return "draw-anything seeded successfully.";
  },
});

export const updateDrawAnythingImage = mutation({
  handler: async (ctx) => {
    const project = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", "draw-anything"))
      .unique();

    if (!project) return "draw-anything not found.";
    if (project.image) return `Image already set: ${project.image}`;

    await ctx.db.patch(project._id, { image: "/projects/draw-anything.png" });
    return "draw-anything image updated.";
  },
});

export const fixDrawAnything = mutation({
  handler: async (ctx) => {
    const all = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", "draw-anything"))
      .collect();

    if (all.length <= 1) return `Nothing to fix. Found ${all.length} record(s).`;

    // Keep the one with liveUrl, delete the rest
    const toDelete = all.filter((p) => !p.liveUrl);
    for (const p of toDelete) {
      await ctx.db.delete(p._id);
    }

    return `Deleted ${toDelete.length} duplicate(s). ${all.length - toDelete.length} record(s) remain.`;
  },
});

export const seedAdizzCodeEditor = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", "adizz-code-editor"))
      .unique();

    if (existing) return "adizz-code-editor already seeded.";

    await ctx.db.insert("projects", {
      title: "Adizz Code Editor",
      slug: "adizz-code-editor",
      description:
        "A feature-rich browser-based code editor with real-time syntax highlighting, multi-language support, and an integrated AI assistant for code suggestions and explanations.",
      content:
        "Adizz Code Editor is a fully in-browser IDE built to provide a smooth coding experience without any local setup. The editor supports multiple languages with Monaco Editor as the core engine, extended with a custom AI layer powered by a language model API for intelligent code completions, error explanations, and refactoring suggestions.",
      githubUrl: "https://github.com/adityashah2701/adizz",
      liveUrl: undefined,
      image: undefined,
      order: 2,
      featured: true,
      techStack: [
        "Next.js",
        "TypeScript",
        "Monaco Editor",
        "React",
        "Tailwind CSS",
        "AI/LLM API",
      ],
    });

    return "adizz-code-editor seeded successfully.";
  },
});

export const seedAutomateFlow = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", "automate-flow"))
      .unique();

    if (existing) return "automate-flow already seeded.";

    await ctx.db.insert("projects", {
      title: "Automate Flow",
      slug: "automate-flow",
      description:
        "A visual workflow automation platform that lets users build, connect, and deploy automated pipelines through an intuitive drag-and-drop interface — no code required.",
      content:
        "Automate Flow is a no-code workflow builder designed to eliminate repetitive tasks. Users design automation pipelines by connecting trigger and action nodes on a visual canvas. The engine evaluates the graph at runtime, executing each node in dependency order with error isolation so one failing step doesn't break the chain.",
      githubUrl: "https://github.com/adityashah2701/automate-flow",
      liveUrl: "https://automate-flow-beta.vercel.app/",
      image: "/projects/automate-flow.png",
      order: 3,
      featured: true,
      techStack: [
        "Next.js",
        "TypeScript",
        "React Flow",
        "React",
        "Tailwind CSS",
        "Node.js",
      ],
    });

    return "automate-flow seeded successfully.";
  },
});

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
