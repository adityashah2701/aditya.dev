"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { FolderOpen, Code, ExternalLink, LockKeyhole } from "lucide-react";
import LinkedArchiveLinks from "./linked-archive-links";
import ArchiveProofDialog from "@/components/sections/archive/archive-proof-dialog";
import type { ArchiveProofItem } from "@/components/sections/archive/archive-proof-dialog";
import type { ProjectRecord } from "./types";

interface ProjectDrawerProps {
  project: ProjectRecord | null;
  open: boolean;
  onClose: () => void;
}

export default function ProjectDrawer({
  project,
  open,
  onClose,
}: ProjectDrawerProps) {
  const [activeArchiveItem, setActiveArchiveItem] =
    useState<ArchiveProofItem | null>(null);

  if (!project) return null;

  const isHackathonProject = project.category === "hackathon";
  const isInternshipProject = project.category === "internship";
  const isConfidentialProject = Boolean(project.confidential);
  const projectLabel = isInternshipProject
    ? isConfidentialProject
      ? "CONFIDENTIAL_INTERNSHIP"
      : "INTERNSHIP_PROJECT"
    : isHackathonProject
      ? "HACKATHON_PROJECT"
      : "PROJECT_DETAIL";
  const linkedArchiveItems = project.linkedArchiveItems ?? [];
  const hasLinkedArchiveItems = linkedArchiveItems.length > 0;
  const hasContributions =
    project.contributions !== undefined && project.contributions.length > 0;
  const formatSectionIndex = (value: number) => `${String(value).padStart(2, "0")}.`;
  let nextSectionNumber = 2;
  const overviewIndex = project.content ? formatSectionIndex(nextSectionNumber++) : null;
  const contributionsIndex = hasContributions
    ? formatSectionIndex(nextSectionNumber++)
    : null;
  const documentsIndex = hasLinkedArchiveItems
    ? formatSectionIndex(nextSectionNumber++)
    : null;
  const techStackIndex = formatSectionIndex(nextSectionNumber);

  return (
    <>
      <Drawer open={open} onOpenChange={(v) => !v && onClose()} direction="right">
        <DrawerContent
          style={{ width: "650px", maxWidth: "95vw" }}
          className="bg-background-dark border-l border-border-dark text-slate-100 h-full ml-auto rounded-none flex flex-col"
        >
        {/* Header */}
          <DrawerHeader className="border-b border-border-dark px-6 py-5 shrink-0">
            <div className="flex items-center gap-2 text-primary font-mono text-xs mb-1">
              <FolderOpen className="w-4 h-4" />
              {projectLabel}
            </div>
            <DrawerTitle className="text-2xl font-black uppercase tracking-tight text-white">
              {project.title}
            </DrawerTitle>
            <DrawerDescription className="text-slate-400 text-sm leading-relaxed mt-1">
              {project.description}
            </DrawerDescription>
          </DrawerHeader>

        {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* Preview image */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-primary font-mono text-xs">01.</span>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {isConfidentialProject ? "Confidential Preview" : "Preview"}
                </h3>
                <Separator className="flex-1 ml-1 bg-border-dark" />
              </div>
              {isConfidentialProject ? (
                <div className="relative w-full aspect-video border border-border-dark bg-surface-dark overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                  <div className="relative z-10 flex max-w-md flex-col items-center gap-3 px-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300">
                      <LockKeyhole className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                        Preview Restricted
                      </p>
                      <p className="text-xs font-mono text-slate-500">
                        CONFIDENTIAL_WORK_PRODUCT
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">
                      Screens, source access, and public demos are intentionally
                      withheld, but the contribution summary and supporting
                      documents below remain available.
                    </p>
                  </div>
                </div>
              ) : project.image ? (
                <div className="relative w-full aspect-video border border-border-dark overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-video border border-border-dark bg-surface-dark overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <span className="text-6xl font-black text-primary/20 select-none tracking-tighter">
                      {project.title.charAt(0).toUpperCase()}
                    </span>
                    <p className="text-xs font-mono text-slate-600">
                      NO_PREVIEW_AVAILABLE
                    </p>
                  </div>
                </div>
              )}
            </div>

          {/* Overview */}
            {project.content && overviewIndex ? (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-primary font-mono text-xs">{overviewIndex}</span>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    {isInternshipProject ? "Role Summary" : "Overview"}
                  </h3>
                  <Separator className="flex-1 ml-1 bg-border-dark" />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.content}
                </p>
              </div>
            ) : null}

            {hasContributions && contributionsIndex ? (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-primary font-mono text-xs">
                    {contributionsIndex}
                  </span>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Key Contributions
                  </h3>
                  <Separator className="flex-1 ml-1 bg-border-dark" />
                </div>
                <ul className="space-y-3 pl-5 text-slate-300 marker:text-primary [list-style-type:square]">
                  {project.contributions?.map((contribution) => (
                    <li
                      key={contribution}
                      className="pl-1 text-sm leading-relaxed"
                    >
                      <span>{contribution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {hasLinkedArchiveItems && documentsIndex ? (
              <LinkedArchiveLinks
                items={linkedArchiveItems}
                sectionIndex={documentsIndex}
                onOpenProof={setActiveArchiveItem}
              />
            ) : null}

          {/* Tech Stack */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-primary font-mono text-xs">{techStackIndex}</span>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Tech Stack
                </h3>
                <Separator className="flex-1 ml-1 bg-border-dark" />
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-surface-dark border border-border-dark text-xs font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        {/* Footer — links */}
          <DrawerFooter className="border-t border-border-dark px-6 py-4 shrink-0 flex-row gap-3">
            {project.githubUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex-1 rounded-none border-border-dark text-slate-300 hover:border-primary hover:text-primary bg-transparent text-xs font-mono gap-2"
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  REPOSITORY
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button
                asChild
                size="sm"
                className="flex-1 rounded-none bg-primary hover:bg-primary/90 text-white text-xs font-mono gap-2"
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  LIVE_DEMO
                </a>
              </Button>
            )}
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-none text-slate-500 hover:text-white text-xs font-mono"
              >
                CLOSE
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {activeArchiveItem ? (
        <ArchiveProofDialog
          item={activeArchiveItem}
          open={activeArchiveItem !== null}
          onOpenChange={(nextOpen) => !nextOpen && setActiveArchiveItem(null)}
        />
      ) : null}
    </>
  );
}
