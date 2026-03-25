"use client";

import { useState } from "react";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import { Doc } from "@/convex/_generated/dataModel";
import ProjectRow from "./project-card";
import ProjectDrawer from "./project-drawer";
import { FolderX } from "lucide-react";

type Project = Doc<"projects">;

interface ProjectListProps {
  preloadedProjects: Preloaded<typeof api.projects.getAllProjects>;
}

export default function ProjectList({ preloadedProjects }: ProjectListProps) {
  const projects = usePreloadedQuery(preloadedProjects);
  const [selected, setSelected] = useState<Project | null>(null);

  const isEmpty = projects.length === 0;

  return (
    <section className="mb-12 md:mb-20">
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <span className="text-primary font-mono text-sm">01.</span>
        <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight uppercase">
          SELECTED PROJECTS
        </h2>
        <Separator className="flex-1 ml-4 bg-border-dark" />
        {!isEmpty && (
          <span className="font-mono text-xs text-slate-600 shrink-0">
            {projects.length}_REPOSITORIES
          </span>
        )}
      </div>

      {/* Empty */}
      {isEmpty && (
        <div className="border border-border-dark bg-background-dark p-12 flex flex-col items-center gap-3 text-center">
          <FolderX className="w-9 h-9 text-slate-600" />
          <p className="font-mono text-sm text-slate-500">
            NO_REPOSITORIES_FOUND
          </p>
        </div>
      )}

      {/* Project list */}
      {!isEmpty && (
        <div className="flex flex-col gap-px">
          {projects.map((project, index) => (
            <ProjectRow
              key={project._id}
              project={project}
              index={index}
              onOpen={setSelected}
            />
          ))}
        </div>
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
