import { preloadQuery } from "convex/nextjs";
import { Breadcrumb } from "@/components/sections/shared";
import { ProjectsHeader, ProjectList } from "@/components/sections/projects";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { api } from "@/convex/_generated/api";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Repositories",
  description:
    "Browse Aditya Shah's software projects — full stack applications, AI tools, developer utilities, and open source contributions built with modern web technologies.",
  path: "/projects",
  ogTitle: "Repositories | aditya.dev",
  ogDescription:
    "Full stack apps, AI tools, and open source projects by Aditya Shah.",
});

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
      <ConvexClientProvider>
        <ProjectList preloadedProjects={preloadedProjects} />
      </ConvexClientProvider>
    </>
  );
}
