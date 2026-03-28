import { preloadQuery } from "convex/nextjs";
import { Breadcrumb } from "@/components/sections/shared";
import { ArchiveHeader } from "@/components/sections/archive/archive-header";
import { ArchivePageClient } from "@/components/sections/archive/archive-page-client";
import { api } from "@/convex/_generated/api";
import { createPageMetadata } from "@/lib/metadata";
import "./masonry.css";

const BATCH_SIZE = 12;

export const metadata = createPageMetadata({
  title: "Archive",
  description:
    "Archive of certificates, achievements, publications, and proof of work by Aditya Shah.",
  path: "/archive",
  ogTitle: "Archive | aditya.dev",
  ogDescription:
    "Certificates, achievements, publications, and proof of work by Aditya Shah.",
});

export default async function ArchivePage({
  searchParams,
}: {
  searchParams?: Promise<{ certificate?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const highlightedCertificateId = resolvedSearchParams?.certificate;
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
    <>
      <Breadcrumb items={breadcrumbItems} />
      <ArchiveHeader />
      <ArchivePageClient
        preloadedArchivePage={preloadedArchivePage}
        highlightedCertificateId={highlightedCertificateId}
      />
    </>
  );
}
