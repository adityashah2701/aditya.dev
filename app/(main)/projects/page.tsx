import { preloadQuery } from "convex/nextjs";
import { Breadcrumb } from "@/components/sections/shared";
import { ProjectsHeader, ProjectList } from "@/components/sections/projects";
import { api } from "@/convex/_generated/api";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Repositories",
  description:
    "I'm Aditya Shah, and these are my projects across modern web apps, agentic AI products, mobile apps, and scalable digital experiences.",
  path: "/projects",
  ogTitle: "Repositories | aditya.dev",
  ogDescription:
    "I'm Aditya Shah. Explore my work across modern web apps, agentic AI products, mobile apps, and scalable digital experiences.",
});

export default async function Projects() {
  const preloadedProjects = await preloadQuery(api.projects.getAllProjects);
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "repositories", isLast: true },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <ProjectsHeader />
      <ProjectList preloadedProjects={preloadedProjects} />
    </>
  );
}
