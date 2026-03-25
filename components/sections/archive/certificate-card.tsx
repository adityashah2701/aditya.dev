"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Calendar,
  Award,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Building2,
  Tag,
  Info,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import dynamic from "next/dynamic";
const PdfPreview = dynamic(() => import("./pdf-preview").then(mod => mod.PdfPreview), { ssr: false });
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CertificateCardProps {
  title: string;
  organization: string;
  issuedDate: string;
  fileId: string;
  fileType: string;
  tags: string[];
  description?: string;
  verificationUrl?: string;
}

export function CertificateCard({
  title,
  organization,
  issuedDate,
  fileId,
  fileType,
  tags,
  description,
  verificationUrl,
}: CertificateCardProps) {
  const fileUrl = useQuery(api.certificates.getFileUrl, { storageId: fileId });
  const isPdf = fileType === "application/pdf" || fileId.endsWith(".pdf");
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [containerWidth, setContainerWidth] = useState(500);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Measure viewer panel so PDF fits by default
  const measureViewer = useCallback(() => {
    if (viewerRef.current) {
      // subtract horizontal padding (64px each side = 128px for p-8, 96px for p-12)
      const padded = viewerRef.current.clientWidth - 96;
      setContainerWidth(Math.max(240, padded));
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    // small delay to let dialog render
    const t = setTimeout(measureViewer, 50);
    const ro = new ResizeObserver(measureViewer);
    if (viewerRef.current) ro.observe(viewerRef.current);
    return () => { clearTimeout(t); ro.disconnect(); };
  }, [isOpen, measureViewer]);


  // Lazy load: only render PDF when card enters viewport
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setZoom(1);
      setShowInfo(false);
    }
  };

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: title,
    credentialCategory: "Certificate",
    recognizedBy: { "@type": "Organization", name: organization },
    datePublished: issuedDate,
    image: fileUrl,
    description: description || title,
    ...(verificationUrl && { url: verificationUrl }),
  };

  const modalPdfWidth = Math.round(containerWidth * zoom);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Gallery Card ─────────────────────────────── */}
      <DialogTrigger asChild>
        <motion.div
          ref={cardRef}
          layout
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="group cursor-pointer break-inside-avoid w-full"
        >
          {/* Preview: no fixed ratio — let content determine height like Pinterest */}
          <div className="relative overflow-hidden rounded-xl bg-background-dark border border-border-dark hover:border-primary/40 transition-all duration-300 shadow-md hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)] hover:-translate-y-0.5">
            <AnimatePresence mode="wait">
              {fileUrl && inView ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full"
                >
                  {isPdf ? (
                    <PdfPreview fileUrl={fileUrl} width={220} previewOnly />
                  ) : (
                    // Use width+h-auto so image renders at its natural ratio
                    // (fill requires parent height, which we removed for Pinterest variable heights)
                    <Image
                      src={fileUrl}
                      alt={title}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full min-h-[180px] flex items-center justify-center bg-background-dark animate-pulse"
                >
                  <Award className="w-10 h-10 text-border-dark" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hover overlay — just a gradient + CTA text */}
            <div className="absolute inset-0 bg-linear-to-t from-background-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-mono font-bold text-white uppercase tracking-widest">
                  View
                </span>
              </div>
            </div>
          </div>

          {/* Title only — tight and minimal */}
          <div className="pt-2.5 px-1">
            <h3 className="font-bold text-[11px] text-white uppercase tracking-tight leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {title}
            </h3>
          </div>
        </motion.div>
      </DialogTrigger>

      {/* ── Modal: Full-width viewer + slide-in info drawer ── */}
      <DialogContent className="max-w-[900px] w-[96vw] h-[88vh] p-0 bg-background-dark border border-border-dark overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)]">
        {/* Always-present title for screen readers (Radix requires DialogTitle in every DialogContent) */}
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="relative flex h-full overflow-hidden">

          {/* Full-width Document Viewer */}
          <div ref={viewerRef} className="relative flex-1 flex flex-col bg-background-dark overflow-hidden">
            <ScrollArea className="flex-1 h-full">
              <div
                className="min-h-full flex items-center justify-center p-8 md:p-12"
                style={{ minHeight: "calc(88vh - 64px)" }}
              >
                {fileUrl ? (
                  isPdf ? (
                    <div className="rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)] ring-1 ring-border-dark bg-white">
                      <PdfPreview
                        fileUrl={fileUrl}
                        width={modalPdfWidth}
                        previewOnly={false}
                      />
                    </div>
                  ) : (
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-zoom-in rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)] ring-1 ring-border-dark"
                    >
                      <Image
                        src={fileUrl}
                        alt={title}
                        width={1000}
                        height={800}
                        className="max-w-full max-h-[72vh] w-auto h-auto object-contain"
                      />
                    </a>
                  )
                ) : (
                  <div className="flex flex-col items-center gap-3 text-border-dark">
                    <Award className="w-12 h-12" />
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                      Loading document…
                    </span>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Floating viewer toolbar */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-4 py-2 rounded-full bg-surface-dark/95 border border-border-dark backdrop-blur-xl shadow-2xl">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
                className="w-7 h-7 rounded-full text-slate-500 hover:text-white"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </Button>
              <span className="text-[10px] font-mono text-slate-500 min-w-[36px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
                className="w-7 h-7 rounded-full text-slate-500 hover:text-white"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </Button>
              <div className="w-px h-4 bg-border-dark mx-1" />
              {/* Info toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowInfo((v) => !v)}
                className={`w-7 h-7 rounded-full transition-colors ${showInfo ? "text-primary bg-primary/10" : "text-slate-500 hover:text-white"}`}
                title="Toggle details"
              >
                <Info className="w-3.5 h-3.5" />
              </Button>
              {fileUrl && (
                <>
                  <div className="w-px h-4 bg-border-dark mx-1" />
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 flex items-center justify-center rounded-full text-slate-500 hover:text-primary transition-colors"
                    title="Open in new tab"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Slide-in Info Drawer */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                key="info-drawer"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="absolute top-0 right-0 h-full w-[300px] md:w-[320px] flex flex-col bg-surface-dark border-l border-border-dark z-30 shadow-[-12px_0_40px_rgba(0,0,0,0.4)]"
              >
                {/* Drawer header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border-dark">
                  <div className="flex items-center gap-2 text-[9px] font-mono font-bold text-primary uppercase tracking-[0.25em]">
                    <Award className="w-3 h-3" />
                    Credential
                  </div>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="p-1 rounded text-slate-500 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-6 space-y-6">
                    {/* Title — plain h2, not DialogTitle (that's already sr-only at DialogContent root) */}
                    <h2 className="text-base font-black text-white uppercase tracking-tight leading-tight">
                      {title}
                    </h2>

                    {/* Issuer */}
                    <div className="space-y-1.5">
                      <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-[0.2em]">
                        Issued by
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-sm font-bold text-white uppercase tracking-tight leading-tight">
                          {organization}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-1.5">
                      <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-[0.2em]">
                        Issue Date
                      </p>
                      <div className="flex items-center gap-2 text-sm font-bold text-white">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {issuedDate}
                      </div>
                    </div>

                    {/* Description */}
                    {description && (
                      <div className="space-y-1.5">
                        <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-[0.2em]">
                          About
                        </p>
                        <p className="text-[12px] leading-relaxed text-slate-300 border-l-2 border-primary/25 pl-3">
                          {description}
                        </p>
                      </div>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-slate-500 uppercase tracking-[0.2em]">
                          <Tag className="w-3 h-3" />
                          Skills &amp; Tags
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {tags.map((tag) => (
                            <Badge
                              key={tag}
                              className="px-2 py-0.5 bg-background-dark border border-border-dark rounded text-[9px] font-mono font-bold text-slate-400 hover:text-primary hover:border-primary/30 transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Actions */}
                <div className="p-4 border-t border-border-dark bg-background-dark/40 flex flex-col gap-2">
                  {verificationUrl && (
                    <a
                      href={verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-black rounded-sm font-black text-[10px] uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/10"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Verify Credential
                    </a>
                  )}
                  {fileUrl && (
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-surface-dark border border-border-dark text-slate-300 rounded-sm font-black text-[10px] uppercase tracking-widest hover:text-white hover:border-primary/30 transition-all"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      Open Original
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
