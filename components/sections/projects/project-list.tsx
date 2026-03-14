"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import { Doc } from "@/convex/_generated/dataModel";
import ProjectRow from "./project-card";
import ProjectDrawer from "./project-drawer";
import { FolderX } from "lucide-react";

type Project = Doc<"projects">;

function SkeletonRow() {
  return (
    <div className="bg-background-dark border border-border-dark px-5 py-4 flex items-center gap-4 animate-pulse">
      <div className="w-5 h-5 bg-surface-dark rounded-none shrink-0" />
      <div className="w-6 h-3 bg-surface-dark rounded-none shrink-0" />
      <div className="h-3 bg-surface-dark rounded-none flex-1" />
      <div className="hidden sm:flex gap-2">
        <div className="w-14 h-4 bg-surface-dark rounded-none" />
        <div className="w-14 h-4 bg-surface-dark rounded-none" />
      </div>
      <div className="w-4 h-4 bg-surface-dark rounded-none shrink-0" />
    </div>
  );
}

export default function ProjectList() {
  const projects = useQuery(api.projects.getAllProjects);
  const [selected, setSelected] = useState<Project | null>(null);

  const isLoading = projects === undefined;
  const isEmpty = !isLoading && projects.length === 0;

  return (
    <section className="mb-12 md:mb-20">
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <span className="text-primary font-mono text-sm">01.</span>
        <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight uppercase">
          SELECTED PROJECTS
        </h2>
        <Separator className="flex-1 ml-4 bg-border-dark" />
        {!isLoading && !isEmpty && (
          <span className="font-mono text-xs text-slate-600 shrink-0">
            {projects.length}_REPOSITORIES
          </span>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col gap-px">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      )}

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
      {!isLoading && !isEmpty && (
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
