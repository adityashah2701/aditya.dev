"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code, ExternalLink, FolderOpen } from "lucide-react";
import ArchiveProofDialog from "@/components/sections/archive/archive-proof-dialog";
import type { ArchiveProofItem } from "@/components/sections/archive/archive-proof-dialog";
import ProjectDetailBody, { getProjectLabel } from "./project-detail-body";
import type { ProjectRecord } from "./types";

export default function ProjectDetailView({ project }: { project: ProjectRecord }) {
  const [activeArchiveItem, setActiveArchiveItem] =
    useState<ArchiveProofItem | null>(null);

  return (
    <article className="mb-12 md:mb-20">
      <header className="flex flex-col gap-6 mb-8 md:mb-12">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-mono text-xs">
            <FolderOpen aria-hidden="true" className="w-4 h-4" />
            {getProjectLabel(project)}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white uppercase">
            {project.title}
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-300">
            {project.description}
          </p>
        </div>
        {project.githubUrl || project.liveUrl ? (
          <div className="flex flex-wrap gap-3">
            {project.liveUrl ? (
              <Button
                asChild
                size="sm"
                className="rounded-none bg-primary hover:bg-primary/90 text-white text-xs font-mono gap-2"
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink aria-hidden="true" className="w-4 h-4" />
                  LIVE_DEMO
                </a>
              </Button>
            ) : null}
            {project.githubUrl ? (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-none border-border-dark text-slate-300 hover:border-primary hover:text-primary bg-transparent text-xs font-mono gap-2"
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Code aria-hidden="true" className="w-4 h-4" />
                  SOURCE_CODE
                </a>
              </Button>
            ) : null}
          </div>
        ) : null}
        <Separator className="bg-border-dark" />
      </header>

      <div className="max-w-4xl space-y-8">
        <ProjectDetailBody
          project={project}
          onOpenProof={setActiveArchiveItem}
          headingLevel="h2"
          priorityImage
        />
      </div>

      {activeArchiveItem ? (
        <ArchiveProofDialog
          item={activeArchiveItem}
          open={activeArchiveItem !== null}
          onOpenChange={(nextOpen) => !nextOpen && setActiveArchiveItem(null)}
        />
      ) : null}
    </article>
  );
}
