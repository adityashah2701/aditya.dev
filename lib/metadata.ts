import type { Metadata } from "next";
import {
  AUTHOR_JOB_TITLE,
  AUTHOR_LOCATION,
  AUTHOR_NAME,
  CONTACT_EMAIL,
  GITHUB_URL,
  LEETCODE_URL,
  LINKEDIN_URL,
  OG_IMAGE_ALT,
  OG_IMAGE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/constants/seo";

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  ogTitle?: string;
  ogDescription?: string;
  /** Use the title as-is instead of applying the "%s | Aditya Shah" template. */
  absoluteTitle?: boolean;
  image?: { url: string; alt: string };
};

export function createCanonicalUrl(path = "") {
  return path ? `${SITE_URL}${path}` : SITE_URL;
}

export function createPageMetadata({
  title,
  description,
  path = "",
  ogTitle,
  ogDescription,
  absoluteTitle = false,
  image = { url: OG_IMAGE_URL, alt: OG_IMAGE_ALT },
}: PageMetadataOptions): Metadata {
  const canonicalUrl = createCanonicalUrl(path);
  const socialTitle = ogTitle ?? (absoluteTitle ? title : `${title} | ${SITE_NAME}`);
  const socialDescription = ogDescription ?? description;

  // Page-level openGraph/twitter objects replace the root ones entirely, so
  // every field the root layout sets must be repeated here.
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title: socialTitle,
      description: socialDescription,
      url: canonicalUrl,
      images: [{ url: image.url, width: 1200, height: 630, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

// ── JSON-LD structured data ──────────────────────────────────────────

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const personJsonLd = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: AUTHOR_NAME,
  url: SITE_URL,
  image: OG_IMAGE_URL,
  email: `mailto:${CONTACT_EMAIL}`,
  jobTitle: AUTHOR_JOB_TITLE,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: AUTHOR_LOCATION.locality,
    addressRegion: AUTHOR_LOCATION.region,
    addressCountry: AUTHOR_LOCATION.country,
  },
  knowsAbout: [
    "Full Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Convex",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "AWS",
    "Agentic AI",
  ],
  sameAs: [GITHUB_URL, LINKEDIN_URL, LEETCODE_URL],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

export function createBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: createCanonicalUrl(item.path),
    })),
  };
}

export function serializeJsonLd(data: object | object[]) {
  const graph = Array.isArray(data) ? data : [data];
  // Escape "<" so content can never close the surrounding <script> tag.
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");
}
