"use client";

import { useState } from "react";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import type { ArchiveProofItem } from "@/components/sections/archive/archive-proof-dialog";
import ProjectRow from "./project-card";
import ProjectDrawer from "./project-drawer";
import { FolderX } from "lucide-react";

type Project = {
  _id: string;
  title: string;
  category?: "repository" | "hackathon";
  description: string;
  content?: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
  linkedArchiveItems: ArchiveProofItem[];
};

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
  projects: Project[];
  onOpen: (project: Project) => void;
}) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-primary font-mono text-sm">{indexLabel}</span>
        <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight uppercase">
          {title}
        </h2>
        <Separator className="flex-1 ml-4 bg-border-dark" />
        <span className="font-mono text-xs text-slate-600 shrink-0">
          {projects.length}_REPOSITORIES
        </span>
      </div>

      <div className="flex flex-col gap-px">
        {projects.map((project, index) => (
          <ProjectRow
            key={project._id}
            project={project}
            index={index}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectList({ preloadedProjects }: ProjectListProps) {
  const projects = usePreloadedQuery(preloadedProjects);
  const [selected, setSelected] = useState<Project | null>(null);

  const isEmpty = projects.length === 0;
  const primaryProjects = projects.filter(
    (project) => project.category !== "hackathon",
  );
  const hackathonProjects = projects.filter(
    (project) => project.category === "hackathon",
  );

  return (
    <section className="mb-12 md:mb-20 space-y-10 md:space-y-12">
      {/* Empty */}
      {isEmpty && (
        <div className="border border-border-dark bg-background-dark p-12 flex flex-col items-center gap-3 text-center">
          <FolderX className="w-9 h-9 text-slate-600" />
          <p className="font-mono text-sm text-slate-500">
            NO_REPOSITORIES_FOUND
          </p>
        </div>
      )}

      {!isEmpty && (
        <>
          <ProjectSection
            title="SELECTED PROJECTS"
            indexLabel="01."
            projects={primaryProjects}
            onOpen={setSelected}
          />
          <ProjectSection
            title="HACKATHON PROJECTS"
            indexLabel="02."
            projects={hackathonProjects}
            onOpen={setSelected}
          />
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
