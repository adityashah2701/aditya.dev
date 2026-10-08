import { Breadcrumb } from "@/components/sections/shared";
import { ArchiveHeader } from "@/components/sections/archive/archive-header";
import { ArchivePageClient } from "@/components/sections/archive/archive-page-client";
import { api } from "@/convex/_generated/api";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/metadata";
import { preloadQueryCached } from "@/lib/convex-server";
import "./masonry.css";

const BATCH_SIZE = 12;

export const metadata = createPageMetadata({
  title: "Archive",
  description:
    "Certificates, achievements and proof of work earned by Aditya Shah, Full Stack Developer, across web development, cloud, AI and hackathons.",
  path: "/archive",
  ogDescription:
    "Browse Aditya Shah's certificates, achievements and proof of work across web development, cloud and AI.",
});

export const revalidate = 3600;

export default async function ArchivePage() {
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "archive", isLast: true },
  ];

  const preloadedArchivePage = await preloadQueryCached(api.certificates.getArchivePage, {
    paginationOpts: {
      numItems: BATCH_SIZE,
      cursor: null,
    },
  });

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Archive", path: "/archive" },
        ])}
      />
      <Breadcrumb items={breadcrumbItems} />
      <ArchiveHeader />
      <ArchivePageClient
        preloadedArchivePage={preloadedArchivePage}
      />
    </>
  );
}
