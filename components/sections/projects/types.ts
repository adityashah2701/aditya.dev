import type { ArchiveProofItem } from "@/components/sections/archive/archive-proof-dialog";

export interface ProjectRecord {
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
}
