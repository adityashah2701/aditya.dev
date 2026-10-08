"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { LockKeyhole } from "lucide-react";
import LinkedArchiveLinks from "./linked-archive-links";
import type { ArchiveProofItem } from "@/components/sections/archive/archive-proof-dialog";
import type { ProjectRecord } from "./types";

interface ProjectDetailBodyProps {
  project: ProjectRecord;
  onOpenProof: (item: ArchiveProofItem) => void;
  /** h2 on the standalone project page, h3 inside the drawer. */
  headingLevel?: "h2" | "h3";
  /** Eager-load the preview on the standalone page, where it is the LCP image. */
  priorityImage?: boolean;
}

export function getProjectLabel(project: ProjectRecord) {
  if (project.category === "internship") {
    return project.confidential ? "CONFIDENTIAL_INTERNSHIP" : "INTERNSHIP_PROJECT";
  }
  return project.category === "hackathon" ? "HACKATHON_PROJECT" : "PROJECT_DETAIL";
}

function SectionHeading({
  index,
  children,
  as: Heading,
}: {
  index: string;
  children: React.ReactNode;
  as: "h2" | "h3";
}) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-primary font-mono text-xs">{index}</span>
      <Heading className="text-xs font-bold text-white uppercase tracking-wider">
        {children}
      </Heading>
      <Separator className="flex-1 ml-1 bg-border-dark" />
    </div>
  );
}

export default function ProjectDetailBody({
  project,
  onOpenProof,
  headingLevel = "h3",
  priorityImage = false,
}: ProjectDetailBodyProps) {
  const isInternshipProject = project.category === "internship";
  const isConfidentialProject = Boolean(project.confidential);
  const linkedArchiveItems = project.linkedArchiveItems ?? [];
  const hasLinkedArchiveItems = linkedArchiveItems.length > 0;
  const hasContributions =
    project.contributions !== undefined && project.contributions.length > 0;
  const formatSectionIndex = (value: number) =>
    `${String(value).padStart(2, "0")}.`;
  let nextSectionNumber = 2;
  const overviewIndex = project.content
    ? formatSectionIndex(nextSectionNumber++)
    : null;
  const contributionsIndex = hasContributions
    ? formatSectionIndex(nextSectionNumber++)
    : null;
  const documentsIndex = hasLinkedArchiveItems
    ? formatSectionIndex(nextSectionNumber++)
    : null;
  const techStackIndex = formatSectionIndex(nextSectionNumber);

  return (
    <>
      {/* Preview image */}
      <div>
        <SectionHeading index="01." as={headingLevel}>
          {isConfidentialProject ? "Confidential Preview" : "Preview"}
        </SectionHeading>
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
              alt={`Screenshot of ${project.title}, a project by Aditya Shah built with ${project.techStack.slice(0, 3).join(", ")}`}
              fill
              sizes={
                priorityImage
                  ? "(max-width: 768px) 100vw, 900px"
                  : "(max-width: 768px) 95vw, 650px"
              }
              className="object-cover object-top"
              priority={priorityImage}
            />
          </div>
        ) : (
          <div className="relative w-full aspect-video border border-border-dark bg-surface-dark overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span
                aria-hidden="true"
                className="text-6xl font-black text-primary/20 select-none tracking-tighter"
              >
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
          <SectionHeading index={overviewIndex} as={headingLevel}>
            {isInternshipProject ? "Role Summary" : "Overview"}
          </SectionHeading>
          <p className="text-slate-300 text-sm leading-relaxed">
            {project.content}
          </p>
        </div>
      ) : null}

      {hasContributions && contributionsIndex ? (
        <div>
          <SectionHeading index={contributionsIndex} as={headingLevel}>
            Key Contributions
          </SectionHeading>
          <ul className="space-y-3 pl-5 text-slate-300 marker:text-primary list-[square]">
            {project.contributions?.map((contribution) => (
              <li key={contribution} className="pl-1 text-sm leading-relaxed">
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
          onOpenProof={onOpenProof}
        />
      ) : null}

      {/* Tech Stack */}
      <div>
        <SectionHeading index={techStackIndex} as={headingLevel}>
          Tech Stack
        </SectionHeading>
        <ul className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="px-3 py-1.5 bg-surface-dark border border-border-dark text-xs font-mono text-slate-300"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
