"use client";

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
import { Doc } from "@/convex/_generated/dataModel";
import { FolderOpen, Code, ExternalLink } from "lucide-react";

type Project = Doc<"projects">;

interface ProjectDrawerProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export default function ProjectDrawer({
  project,
  open,
  onClose,
}: ProjectDrawerProps) {
  if (!project) return null;

  return (
    <Drawer open={open} onOpenChange={(v) => !v && onClose()} direction="right">
      <DrawerContent
        style={{ width: "650px", maxWidth: "95vw" }}
        className="bg-background-dark border-l border-border-dark text-slate-100 h-full ml-auto rounded-none flex flex-col"
      >
        {/* Header */}
        <DrawerHeader className="border-b border-border-dark px-6 py-5 shrink-0">
          <div className="flex items-center gap-2 text-primary font-mono text-xs mb-1">
            <FolderOpen className="w-4 h-4" />
            PROJECT_DETAIL
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
                Preview
              </h3>
              <Separator className="flex-1 ml-1 bg-border-dark" />
            </div>
            {project.image ? (
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
          {project.content && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-primary font-mono text-xs">02.</span>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Overview
                </h3>
                <Separator className="flex-1 ml-1 bg-border-dark" />
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.content}
              </p>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-primary font-mono text-xs">
                {project.content ? "03." : "02."}
              </span>
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
  );
}
