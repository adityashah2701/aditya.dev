import { Metadata } from "next";
import { preloadQuery } from "convex/nextjs";
import { Breadcrumb } from "@/components/sections/shared";
import { ArchivePageClient } from "@/components/sections/archive/archive-page-client";
import { SITE_URL, OG_IMAGE_URL } from "@/constants/seo";
import { api } from "@/convex/_generated/api";
import "./masonry.css";

const BATCH_SIZE = 12;

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Archive of certificates, achievements, publications, and proof of work by Aditya Shah.",
  alternates: {
    canonical: `${SITE_URL}/archive`,
  },
  openGraph: {
    type: "website",
    title: "Archive | aditya.dev",
    description:
      "Certificates, achievements, publications, and proof of work by Aditya Shah.",
    url: `${SITE_URL}/archive`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archive | aditya.dev",
    description:
      "Certificates, achievements, publications, and proof of work by Aditya Shah.",
    images: [OG_IMAGE_URL],
  },
};

export default async function ArchivePage() {
  const preloadedArchivePage = await preloadQuery(api.certificates.getArchivePage, {
    paginationOpts: {
      numItems: BATCH_SIZE,
      cursor: null,
    },
  });

  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "archive", isLast: true },
  ];

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Archive
        </h1>
        <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
          Proofs of Work
        </p>
      </div>

      <ArchivePageClient preloadedArchivePage={preloadedArchivePage} />
    </div>
  );
}
