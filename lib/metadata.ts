import type { Metadata } from "next";
import { OG_IMAGE_URL, SITE_URL } from "@/constants/seo";

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  ogTitle?: string;
  ogDescription?: string;
};

function createCanonicalUrl(path = "") {
  return path ? `${SITE_URL}${path}` : SITE_URL;
}

export function createPageMetadata({
  title,
  description,
  path = "",
  ogTitle,
  ogDescription,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = createCanonicalUrl(path);
  const socialTitle = ogTitle ?? title;
  const socialDescription = ogDescription ?? description;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title: socialTitle,
      description: socialDescription,
      url: canonicalUrl,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [OG_IMAGE_URL],
    },
  };
}
