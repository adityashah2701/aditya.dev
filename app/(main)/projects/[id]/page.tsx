import { Breadcrumb } from "@/components/sections/shared";
import {
  ProjectDetailHeader,
  ProjectStats,
  ProjectProblem,
  ProjectArchitecture,
  ProjectStack,
  ProjectHighlights,
} from "@/components/sections/project-detail";

export default function ProjectDetail() {
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "projects", href: "/projects" },
    { label: "neural_synthesis", isLast: true },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <ProjectDetailHeader />
      <ProjectStats />
      <ProjectProblem />
      <ProjectArchitecture />
      <ProjectStack />
      <ProjectHighlights />
    </>
  );
}
