"use client";

import { Badge } from "@/components/ui/badge";
import { Brain, LayoutGrid, Terminal, Network, Cpu, Rocket, Code, Cloud } from "lucide-react";
import type { ProjectRecord } from "./types";

interface ProjectRowProps {
  project: ProjectRecord;
  index: number;
  onOpen: (project: ProjectRecord) => void;
}

const ICONS = [
  Brain, LayoutGrid, Terminal, Network,
  Cpu, Rocket, Code, Cloud,
];

export default function ProjectRow({ project, index, onOpen }: ProjectRowProps) {
  const Icon = ICONS[index % ICONS.length];
  const isHackathonProject = project.category === "hackathon";

  return (
    <button
      onClick={() => onOpen(project)}
      className="group w-full text-left bg-background-dark border border-border-dark hover:border-primary transition-all duration-200 px-5 py-4 flex items-center gap-4"
    >
      {/* Icon */}
      <Icon className="w-5 h-5 text-primary shrink-0" />

      {/* Index */}
      <span className="font-mono text-xs text-slate-600 shrink-0 w-6">
        {String(index + 1).padStart(2, "0")}.
      </span>

      {/* Title */}
      <span className="font-bold text-sm uppercase tracking-tight text-white group-hover:text-primary transition-colors flex-1 truncate">
        {project.title}
      </span>

      {isHackathonProject ? (
        <Badge
          variant="outline"
          className="hidden md:inline-flex px-2 py-0.5 text-[10px] font-mono text-primary bg-primary/10 border-primary/30 rounded-none shrink-0"
        >
          HACKATHON
        </Badge>
      ) : null}

      {/* Tech stack — first 3 tags only */}
      <div className="hidden sm:flex items-center gap-2 shrink-0">
        {project.techStack.slice(0, 3).map((tech) => (
          <Badge
            key={tech}
            variant="outline"
            className="px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-surface-dark border-border-dark rounded-none"
          >
            {tech}
          </Badge>
        ))}
        {project.techStack.length > 3 && (
          <span className="text-[10px] font-mono text-slate-600">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>

      {/* Open arrow */}
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 group-hover:text-primary transition-colors shrink-0"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  );
}
