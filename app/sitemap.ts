import type { MetadataRoute } from "next";
import { unstable_rethrow } from "next/navigation";
import { fetchQueryCached } from "@/lib/convex-server";
import { api } from "@/convex/_generated/api";
import { SITE_URL } from "@/constants/seo";

/**
 * Native Next.js App Router sitemap.
 *
 * lastModified is intentionally omitted for static pages: a value that changes
 * on every request teaches crawlers to ignore it.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/skills`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/archive`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/activity`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
  ];

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await fetchQueryCached(api.projects.getProjectSlugs);
    projectRoutes = projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: new Date(project._creationTime),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (error) {
    unstable_rethrow(error);
    console.error("Failed to load project slugs for sitemap", error);
  }

  return [...staticRoutes, ...projectRoutes];
}
