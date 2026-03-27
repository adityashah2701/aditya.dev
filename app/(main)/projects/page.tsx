import { Metadata } from "next";
import { preloadQuery } from "convex/nextjs";
import { Breadcrumb } from "@/components/sections/shared";
import { ProjectsHeader, ProjectList } from "@/components/sections/projects";
import { SITE_URL, OG_IMAGE_URL } from "@/constants/seo";
import { api } from "@/convex/_generated/api";

export const metadata: Metadata = {
  title: "Repositories",
  description:
    "Browse Aditya Shah's software projects — full stack applications, AI tools, developer utilities, and open source contributions built with modern web technologies.",
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: "Repositories | aditya.dev",
    description:
      "Full stack apps, AI tools, and open source projects by Aditya Shah.",
    url: `${SITE_URL}/projects`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Repositories | aditya.dev",
    description:
      "Full stack apps, AI tools, and open source projects by Aditya Shah.",
    images: [OG_IMAGE_URL],
  },
};

export default async function Projects() {
  const preloadedProjects = await preloadQuery(api.projects.getAllProjects);
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "projects", isLast: true },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <ProjectsHeader />
      <ProjectList preloadedProjects={preloadedProjects} />
    </>
  );
}
