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
    <section>
      <header className="flex items-center gap-3 mb-3">
        <span className="text-primary font-mono text-xs">{sectionIndex}</span>
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Documents & Proof
        </h3>
        <Separator className="flex-1 ml-1 bg-border-dark" />
      </header>
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const isPdf =
            item.fileType === "application/pdf" || item.fileId.endsWith(".pdf");
          const isClickable = Boolean(item.fileUrl);

          return (
            <article
              key={item._id ?? `${item.fileId}-${item.title}`}
              role={isClickable ? "button" : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onClick={isClickable ? () => onOpenProof(item) : undefined}
              onKeyDown={
                isClickable
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onOpenProof(item);
                      }
                    }
                  : undefined
              }
              className={`min-w-0 border bg-surface-dark/60 p-3 transition-colors ${
                isClickable
                  ? "cursor-pointer border-border-dark hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  : "border-border-dark"
              }`}
            >
              <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-mono">
                <span className="inline-flex items-center gap-2 text-primary uppercase tracking-widest">
                  <FileText className="w-3.5 h-3.5" />
                  {isPdf ? "PDF" : "IMAGE"}
                </span>
                <span className="text-slate-500 uppercase tracking-widest">
                  {item.organization}
                </span>
              </div>

              <p className="mt-2 break-words text-sm font-bold uppercase tracking-tight text-white">
                {item.title}
              </p>

              {(item.fileUrl || item.verificationUrl) ? (
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono">
                  {item.fileUrl ? (
                    <span className="inline-flex items-center gap-1.5 text-primary uppercase tracking-widest">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open Document
                    </span>
                  ) : null}
                  {item.verificationUrl ? (
                    <a
                      href={item.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white uppercase tracking-widest"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verify
                    </a>
                  ) : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
