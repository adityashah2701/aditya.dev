import type { ArchiveProofItem } from "@/components/sections/archive/archive-proof-dialog";

export interface ProjectRecord {
  _id: string;
  title: string;
  category?: "repository" | "hackathon" | "internship";
  description: string;
  content?: string;
  image?: string;
  confidential?: boolean;
  contributions?: string[];
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
  linkedArchiveItems: ArchiveProofItem[];
}
