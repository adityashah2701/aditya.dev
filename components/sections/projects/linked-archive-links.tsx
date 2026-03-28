"use client";

import { ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { ArchiveProofItem } from "@/components/sections/archive/archive-proof-dialog";

interface LinkedArchiveLinksProps {
  items: ArchiveProofItem[];
  sectionIndex: string;
  onOpenProof: (item: ArchiveProofItem) => void;
}

export default function LinkedArchiveLinks({
  items,
  sectionIndex,
  onOpenProof,
}: LinkedArchiveLinksProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-primary font-mono text-xs">{sectionIndex}</span>
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Linked Archive
        </h3>
        <Separator className="flex-1 ml-1 bg-border-dark" />
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const isPdf =
            item.fileType === "application/pdf" || item.fileId.endsWith(".pdf");

          return (
            <div
              key={item._id ?? `${item.fileId}-${item.title}`}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono"
            >
              <span className="inline-flex items-center gap-2 text-primary uppercase tracking-widest">
                <FileText className="w-3.5 h-3.5" />
                {isPdf ? "PDF" : "IMAGE"}
              </span>
              <span className="text-slate-500 uppercase tracking-widest">
                {item.organization}
              </span>
              <span className="text-white uppercase tracking-tight font-bold">
                {item.title}
              </span>
              {item.fileUrl ? (
                <button
                  type="button"
                  onClick={() => onOpenProof(item)}
                  className="inline-flex items-center gap-1.5 text-primary hover:text-white transition-colors uppercase tracking-widest"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Proof
                </button>
              ) : null}
              {item.verificationUrl ? (
                <a
                  href={item.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verify
                </a>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
