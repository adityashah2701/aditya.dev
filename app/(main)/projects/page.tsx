import { Breadcrumb } from "@/components/sections/shared";
import { ProjectsHeader, ProjectList } from "@/components/sections/projects";
import { api } from "@/convex/_generated/api";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/metadata";
import { preloadQueryCached } from "@/lib/convex-server";

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: "Repositories",
  description:
    "Full stack projects by Aditya Shah: web apps, AI tools, internship and hackathon work built with React, Next.js, TypeScript, Node.js and Convex.",
  path: "/projects",
  ogDescription:
    "Explore Aditya Shah's full stack projects: web apps, AI tools, internship and hackathon work built with React, Next.js and TypeScript.",
});

export default async function Projects() {
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "repositories", isLast: true },
  ];

  const preloadedProjects = await preloadQueryCached(api.projects.getAllProjects);

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Repositories", path: "/projects" },
        ])}
      />
      <Breadcrumb items={breadcrumbItems} />
      <ProjectsHeader />
      <ProjectList preloadedProjects={preloadedProjects} />
    </>
  );
}
