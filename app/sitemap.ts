import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/seo";

/**
 * Native Next.js App Router sitemap.
 *
 * lastModified is intentionally omitted: a value that changes on every
 * request teaches crawlers to ignore it.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/skills`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/archive`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/activity`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
  ];
}
