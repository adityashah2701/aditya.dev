"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  Award,
  Building2,
  Calendar,
  ExternalLink,
  Info,
  Maximize2,
  Tag,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PdfPreview } from "./pdf-preview";

export interface ArchiveProofItem {
  _id?: string;
  title: string;
  organization: string;
  issuedDate: string;
  fileId: string;
  fileUrl: string | null;
  fileType: string;
  tags: string[];
  description?: string;
  verificationUrl?: string;
}

interface ArchiveProofDialogProps {
  item: ArchiveProofItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

function ArchiveProofDialogBody({ item }: { item: ArchiveProofItem }) {
  const isPdf =
    item.fileType === "application/pdf" || item.fileId.endsWith(".pdf");
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [containerWidth, setContainerWidth] = useState(500);
  const viewerRef = useRef<HTMLDivElement>(null);

  const measureViewer = useCallback(() => {
    if (viewerRef.current) {
      const padded = viewerRef.current.clientWidth - 96;
      setContainerWidth(Math.max(240, padded));
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(measureViewer, 50);
    const resizeObserver = new ResizeObserver(measureViewer);

    if (viewerRef.current) {
      resizeObserver.observe(viewerRef.current);
    }

    return () => {
      window.clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [measureViewer]);

  const modalPdfWidth = Math.round(containerWidth * zoom);

  return (
    <div className="relative flex h-full overflow-hidden">
      <div
        ref={viewerRef}
        className="relative flex flex-1 flex-col overflow-hidden bg-background-dark"
      >
        <ScrollArea className="flex-1 h-full">
          <div
            className="flex min-h-full items-center justify-center p-8 md:p-12"
            style={{ minHeight: "calc(88vh - 64px)" }}
          >
            {item.fileUrl ? (
              isPdf ? (
                <div className="rounded-xl overflow-hidden bg-white ring-1 ring-border-dark shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
                  <PdfPreview
                    fileUrl={item.fileUrl}
                    width={modalPdfWidth}
                    previewOnly={false}
                  />
                </div>
              ) : (
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-zoom-in rounded-xl overflow-hidden ring-1 ring-border-dark shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
                >
                  <Image
                    src={item.fileUrl}
                    alt={item.title}
                    width={1000}
                    height={800}
                    className="max-w-full max-h-[72vh] w-auto h-auto object-contain"
                  />
                </a>
              )
            ) : (
              <div className="flex flex-col items-center gap-3 text-border-dark">
                <Award className="w-12 h-12" />
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                  Loading document...
                </span>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border-dark bg-surface-dark/95 px-4 py-2 shadow-2xl backdrop-blur-xl">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom((current) => Math.max(0.5, current - 0.25))}
            className="w-7 h-7 rounded-full text-slate-500 hover:text-white"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <span className="min-w-[36px] text-center font-mono text-[10px] text-slate-500">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom((current) => Math.min(2, current + 0.25))}
            className="w-7 h-7 rounded-full text-slate-500 hover:text-white"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
          <div className="mx-1 h-4 w-px bg-border-dark" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowInfo((current) => !current)}
            className={`w-7 h-7 rounded-full transition-colors ${
              showInfo
                ? "bg-primary/10 text-primary"
                : "text-slate-500 hover:text-white"
            }`}
            title="Toggle details"
          >
            <Info className="w-3.5 h-3.5" />
          </Button>
          {item.fileUrl ? (
            <>
              <div className="mx-1 h-4 w-px bg-border-dark" />
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition-colors hover:text-primary"
                title="Open in new tab"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </a>
            </>
          ) : null}
        </div>
      </div>

      <AnimatePresence>
        {showInfo ? (
          <motion.div
            key="archive-info-drawer"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="absolute top-0 right-0 z-30 flex h-full w-[300px] flex-col border-l border-border-dark bg-surface-dark shadow-[-12px_0_40px_rgba(0,0,0,0.4)] md:w-[320px]"
          >
            <div className="flex items-center justify-between border-b border-border-dark px-6 py-4">
              <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-primary">
                <Award className="w-3 h-3" />
                Credential
              </div>
              <button
                type="button"
                onClick={() => setShowInfo(false)}
                className="rounded p-1 text-slate-500 transition-colors hover:text-white"
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Close archive info</span>
              </button>
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-6 p-6">
                <h2 className="text-base font-black uppercase tracking-tight leading-tight text-white">
                  {item.title}
                </h2>

                <div className="space-y-1.5">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Issued by
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-tight leading-tight text-white">
                      {item.organization}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Issue Date
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {item.issuedDate}
                  </div>
                </div>

                {item.description ? (
                  <div className="space-y-1.5">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      About
                    </p>
                    <p className="border-l-2 border-primary/25 pl-3 text-[12px] leading-relaxed text-slate-300">
                      {item.description}
                    </p>
                  </div>
                ) : null}

                {item.tags.length > 0 ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      <Tag className="w-3 h-3" />
                      Skills &amp; Tags
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="rounded-none border border-border-dark bg-background-dark px-2 py-0.5 font-mono text-[9px] font-bold text-slate-400 transition-colors hover:border-primary/30 hover:text-primary"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </ScrollArea>

            <div className="flex flex-col gap-2 border-t border-border-dark bg-background-dark/40 p-4">
              {item.verificationUrl ? (
                <a
                  href={item.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary py-2.5 text-[10px] font-black uppercase tracking-widest text-black shadow-lg shadow-primary/10 transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Verify Credential
                </a>
              ) : null}
              {item.fileUrl ? (
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-border-dark bg-surface-dark py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-300 transition-all hover:border-primary/30 hover:text-white"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  Open Original
                </a>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function ArchiveProofDialog({
  item,
  open,
  onOpenChange,
  children,
}: ArchiveProofDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children ? <DialogTrigger asChild>{children}</DialogTrigger> : null}
      <DialogContent className="max-w-[900px] w-[96vw] h-[88vh] p-0 overflow-hidden border border-border-dark bg-background-dark shadow-[0_32px_80px_rgba(0,0,0,0.7)]">
        <DialogTitle className="sr-only">{item.title}</DialogTitle>
        <DialogDescription className="sr-only">
          Preview of the selected archive proof item.
        </DialogDescription>
        <ArchiveProofDialogBody key={`${item.title}-${item.fileId}`} item={item} />
      </DialogContent>
    </Dialog>
  );
}
