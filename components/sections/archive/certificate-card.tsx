"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Award, Maximize2 } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ArchiveProofDialog from "./archive-proof-dialog";
import { PdfPreview } from "./pdf-preview";

interface CertificateCardProps {
  certificateId: string;
  title: string;
  organization: string;
  issuedDate: string;
  fileId: string;
  fileUrl?: string | null;
  fileType: string;
  tags: string[];
  description?: string;
  verificationUrl?: string;
  autoOpen?: boolean;
}

export function CertificateCard({
  certificateId,
  title,
  organization,
  issuedDate,
  fileId,
  fileUrl: preloadedFileUrl,
  fileType,
  tags,
  description,
  verificationUrl,
  autoOpen = false,
}: CertificateCardProps) {
  const queriedFileUrl = useQuery(
    api.certificates.getFileUrl,
    preloadedFileUrl ? "skip" : { storageId: fileId }
  );
  const fileUrl = preloadedFileUrl ?? queriedFileUrl;
  const isPdf = fileType === "application/pdf" || fileId.endsWith(".pdf");
  const [isOpen, setIsOpen] = useState(autoOpen);

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArchiveProofDialog
        item={{
          title,
          organization,
          issuedDate,
          fileId,
          fileUrl: fileUrl ?? null,
          fileType,
          tags,
          description,
          verificationUrl,
        }}
        open={isOpen}
        onOpenChange={handleOpenChange}
      >
        <motion.article
          id={`certificate-${certificateId}`}
          ref={cardRef}
          layout
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="group cursor-pointer break-inside-avoid w-full"
        >
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
                    <Image
                      src={fileUrl}
                      alt={title}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover object-top transition-transform duration-500 group-hover:scale-105"
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

            <div className="absolute inset-0 bg-linear-to-t from-background-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-mono font-bold text-white uppercase tracking-widest">
                  View
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2.5 px-1">
            <h3 className="font-bold text-[11px] text-white uppercase tracking-tight leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {title}
            </h3>
          </div>
        </motion.article>
      </ArchiveProofDialog>
    </>
  );
}
