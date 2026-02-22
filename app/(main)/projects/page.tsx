import { Metadata } from "next";
import { Breadcrumb } from "@/components/sections/shared";
import { ProjectsHeader, ProjectList } from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "Repositories",
};

export default function Projects() {
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "projects", isLast: true },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <ProjectsHeader />
      <ProjectList />
    </>
  );
}
