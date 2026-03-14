"use client";

import React from "react";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CertificateCard } from "@/components/sections/archive/certificate-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderArchive, Loader2 } from "lucide-react";
import { Breadcrumb } from "@/components/sections/shared";
import { motion } from "motion/react";
import Masonry from "react-masonry-css";
import "./masonry.css";

const BATCH_SIZE = 12;

export default function ArchivePage() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.certificates.getCertificates,
    {},
    { initialNumItems: 12 }
  );

  const certificates = results || [];

  // Pinterest-style: more columns, tighter cards
  const breakpointColumnsObj = {
    default: 5,
    1400: 4,
    1100: 3,
    700: 2,
    480: 2,
  };

  const isLoadingInitial = status === "LoadingFirstPage";
  const isLoadingMore = status === "LoadingMore";
  const isExhausted = status === "Exhausted";

  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "archive", isLast: true },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-white">
          Archive
        </h1>
        <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">
          {certificates.length} Proofs of Work
        </p>
      </div>

      {isLoadingInitial ? (
        /* Skeleton grid mimics Pinterest columns */
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="mb-3 break-inside-avoid">
              <Skeleton
                className="w-full rounded-xl bg-surface-dark border border-border-dark"
                style={{ height: `${160 + (i % 4) * 60}px` }}
              />
              <Skeleton className="mt-2 h-3 w-3/4 rounded bg-surface-dark" />
            </div>
          ))}
        </div>
      ) : certificates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 rounded-xl border border-border-dark bg-surface-dark">
          <div className="p-4 bg-background-dark rounded-full shadow-lg ring-1 ring-border-dark">
            <FolderArchive className="w-12 h-12 text-primary/60" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black uppercase text-white tracking-tight">
              No entries yet
            </h3>
            <p className="text-slate-500 max-w-xs mx-auto font-mono text-xs">
              The archive is currently empty. Check back later for updates!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {certificates.map((cert, i) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
              >
                <CertificateCard
                  title={cert.title}
                  organization={cert.organization}
                  issuedDate={cert.issuedDate}
                  fileId={cert.fileId}
                  fileType={cert.fileType}
                  tags={cert.tags}
                  description={cert.description}
                  verificationUrl={cert.verificationUrl}
                />
              </motion.div>
            ))}
          </Masonry>

          {!isExhausted && (
            <div className="flex justify-center pt-4 pb-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => loadMore(BATCH_SIZE)}
                disabled={isLoadingMore}
                className="group px-10 py-6 rounded-sm border-border-dark bg-surface-dark hover:border-primary/40 font-mono text-xs font-bold tracking-widest uppercase transition-all"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading More...
                  </>
                ) : (
                  <>
                    Load More
                    <span className="ml-2 group-hover:translate-y-0.5 transition-transform duration-300">
                      ↓
                    </span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
