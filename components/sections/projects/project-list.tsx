"use client";

import { useState } from "react";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import ProjectRow from "./project-card";
import ProjectDrawer from "./project-drawer";
import { FolderX } from "lucide-react";
import type { ProjectRecord } from "./types";

interface ProjectListProps {
  preloadedProjects: Preloaded<typeof api.projects.getAllProjects>;
}

function ProjectSection({
  title,
  indexLabel,
  projects,
  onOpen,
}: {
  title: string;
  indexLabel: string;
  projects: ProjectRecord[];
  onOpen: (project: ProjectRecord) => void;
}) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4 md:space-y-6">
      <header className="flex items-center gap-3">
        <span className="text-primary font-mono text-sm">{indexLabel}</span>
        <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight uppercase">
          {title}
        </h2>
        <Separator className="flex-1 ml-4 bg-border-dark" />
        <span className="font-mono text-xs text-slate-600 shrink-0">
          {projects.length}_PROJECTS
        </span>
      </header>

      <ol className="m-0 flex list-none flex-col gap-px p-0">
        {projects.map((project, index) => (
          <li key={project._id}>
            <ProjectRow
              project={project}
              index={index}
              onOpen={onOpen}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function ProjectList({ preloadedProjects }: ProjectListProps) {
  const projects = usePreloadedQuery(preloadedProjects);
  const [selected, setSelected] = useState<ProjectRecord | null>(null);

  const isEmpty = projects.length === 0;
  const primaryProjects = projects.filter(
    (project) =>
      project.category !== "hackathon" && project.category !== "internship",
  );
  const internshipProjects = projects.filter(
    (project) => project.category === "internship",
  );
  const hackathonProjects = projects.filter(
    (project) => project.category === "hackathon",
  );
  const sections = [
    { title: "SELECTED PROJECTS", projects: primaryProjects },
    { title: "INTERNSHIP EXPERIENCE", projects: internshipProjects },
    { title: "HACKATHON PROJECTS", projects: hackathonProjects },
  ].filter((section) => section.projects.length > 0);

  return (
    <section className="mb-12 md:mb-20 space-y-10 md:space-y-12">
      {/* Empty */}
      {isEmpty && (
        <div className="border border-border-dark bg-background-dark p-12 flex flex-col items-center gap-3 text-center">
          <FolderX className="w-9 h-9 text-slate-600" />
          <p className="font-mono text-sm text-slate-500">
            NO_PROJECTS_FOUND
          </p>
        </div>
      )}

      {!isEmpty && (
        <>
          {sections.map((section, index) => (
            <ProjectSection
              key={section.title}
              title={section.title}
              indexLabel={`${String(index + 1).padStart(2, "0")}.`}
              projects={section.projects}
              onOpen={setSelected}
            />
          ))}
        </>
      )}

      {/* Drawer — detail view */}
      <ProjectDrawer
        project={selected}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
