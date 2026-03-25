"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  type Preloaded,
  useConvex,
  usePreloadedQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { CertificateCard } from "./certificate-card";
import { Button } from "@/components/ui/button";
import { FolderArchive, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import Masonry from "react-masonry-css";

const BATCH_SIZE = 12;

function stableHash(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

interface ArchivePageClientProps {
  preloadedArchivePage: Preloaded<typeof api.certificates.getArchivePage>;
}

export function ArchivePageClient({
  preloadedArchivePage,
}: ArchivePageClientProps) {
  const convex = useConvex();
  const initialArchivePage = usePreloadedQuery(preloadedArchivePage);
  const [archivePage, setArchivePage] = useState(initialArchivePage);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setArchivePage(initialArchivePage);
  }, [initialArchivePage]);

  const shuffledCertificates = useMemo(
    () =>
      [...archivePage.page].sort((a, b) => {
        const hashA = stableHash(String(a._id));
        const hashB = stableHash(String(b._id));

        if (hashA !== hashB) return hashA - hashB;
        return String(a._id).localeCompare(String(b._id));
      }),
    [archivePage.page]
  );

  const breakpointColumnsObj = {
    default: 6,
    1700: 5,
    1400: 4,
    1080: 3,
    700: 2,
    520: 2,
    0: 1,
  };

  const isExhausted = archivePage.isDone;

  const loadMore = async () => {
    if (isLoadingMore || archivePage.continueCursor === null) return;

    setIsLoadingMore(true);

    try {
      const nextPage = await convex.query(api.certificates.getArchivePage, {
        paginationOpts: {
          numItems: BATCH_SIZE,
          cursor: archivePage.continueCursor,
        },
      });

      setArchivePage((current) => ({
        ...nextPage,
        page: [...current.page, ...nextPage.page],
      }));
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (shuffledCertificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-border-dark bg-surface-dark py-24 text-center">
        <div className="rounded-full bg-background-dark p-4 shadow-lg ring-1 ring-border-dark">
          <FolderArchive className="h-12 w-12 text-primary/60" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-black uppercase tracking-tight text-white">
            No entries yet
          </h3>
          <p className="mx-auto max-w-xs font-mono text-xs text-slate-500">
            The archive is currently empty. Check back later for updates!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {shuffledCertificates.map((cert, i) => (
          <motion.div
            key={cert._id}
            className="archive-masonry-item"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
          >
            <CertificateCard
              title={cert.title}
              organization={cert.organization}
              issuedDate={cert.issuedDate}
              fileId={cert.fileId}
              fileUrl={cert.fileUrl}
              fileType={cert.fileType}
              tags={cert.tags}
              description={cert.description}
              verificationUrl={cert.verificationUrl}
            />
          </motion.div>
        ))}
      </Masonry>

      {!isExhausted && (
        <div className="flex justify-center pb-12 pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={loadMore}
            disabled={isLoadingMore}
            className="group rounded-sm border-border-dark bg-surface-dark px-10 py-6 font-mono text-xs font-bold uppercase tracking-widest transition-all hover:border-primary/40"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading More...
              </>
            ) : (
              <>
                Load More
                <span className="ml-2 transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
