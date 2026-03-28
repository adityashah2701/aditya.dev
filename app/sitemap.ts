import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/seo";

/**
 * Native Next.js App Router sitemap.
 *
 * Static routes are always included. Dynamic /projects/[id] routes
 * are commented out below until a server-side Convex fetch is available.
 * To extend: fetch project slugs from the Convex HTTP API or a server
 * action and map each slug to a MetadataRoute.Sitemap entry.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/archive`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  /*
   * TODO: Extend with dynamic project routes once server-side Convex access is set up.
   *
   * Example:
   *   const response = await fetch(`${CONVEX_SITE_URL}/api/projects`);
   *   const projects = await response.json();
   *   const projectRoutes = projects.map((p: { slug: string }) => ({
   *     url: `${SITE_URL}/projects/${p.slug}`,
   *     lastModified: new Date(),
   *     changeFrequency: "monthly" as const,
   *     priority: 0.8,
   *   }));
   *   return [...staticRoutes, ...projectRoutes];
   */

  return staticRoutes;
}
