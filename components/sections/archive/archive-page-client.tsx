"use client";

import React, { useMemo, useState, useSyncExternalStore } from "react";
import {
  type Preloaded,
  useConvex,
  useQuery,
  usePreloadedQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
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

// The ?certificate= deep link is read on the client so the page itself stays
// statically cacheable. The server snapshot is null, so hydration matches.
const subscribeToNothing = () => () => {};
const getHighlightedIdFromUrl = () =>
  new URLSearchParams(window.location.search).get("certificate");
const getServerHighlightedId = () => null;

function sortCertificates<T extends { _id: Id<"certificates"> }>(certificates: T[]): T[] {
  return [...certificates].sort((a, b) => {
    const hashA = stableHash(String(a._id));
    const hashB = stableHash(String(b._id));

    if (hashA !== hashB) return hashA - hashB;
    return String(a._id).localeCompare(String(b._id));
  });
}

export function ArchivePageClient({
  preloadedArchivePage,
}: ArchivePageClientProps) {
  const highlightedCertificateId = useSyncExternalStore(
    subscribeToNothing,
    getHighlightedIdFromUrl,
    getServerHighlightedId,
  );
  const convex = useConvex();
  const initialArchivePage = usePreloadedQuery(preloadedArchivePage);
  
  // Pages fetched via "Load more". Tagged with the first page they were
  // loaded after, so a live update of the first page starts the list fresh.
  const [loadedMore, setLoadedMore] = useState<{
    base: typeof initialArchivePage;
    page: typeof initialArchivePage.page;
    continueCursor: string;
    isDone: boolean;
  } | null>(null);
  const currentLoadedMore =
    loadedMore?.base === initialArchivePage ? loadedMore : null;

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const highlightedCertificate = useQuery(
    api.certificates.getCertificateById,
    highlightedCertificateId
      ? { id: highlightedCertificateId as Id<"certificates"> }
      : "skip",
  );

  const certificates = useMemo(() => {
    const loaded = [
      ...sortCertificates(initialArchivePage.page),
      ...(currentLoadedMore?.page ?? []),
    ];

    // A deep-linked certificate may not be in the loaded pages yet.
    if (
      highlightedCertificate &&
      !loaded.some((certificate) => certificate._id === highlightedCertificate._id)
    ) {
      return [highlightedCertificate, ...loaded];
    }

    return loaded;
  }, [initialArchivePage, currentLoadedMore, highlightedCertificate]);

  const continueCursor =
    currentLoadedMore?.continueCursor ?? initialArchivePage.continueCursor;

  const breakpointColumnsObj = {
    default: 6,
    1700: 5,
    1400: 4,
    1080: 3,
    700: 2,
    520: 2,
    0: 1,
  };

  const isExhausted = currentLoadedMore?.isDone ?? initialArchivePage.isDone;

  const loadMore = async () => {
    if (isLoadingMore || continueCursor === null) return;

    setIsLoadingMore(true);

    try {
      const nextPage = await convex.query(api.certificates.getArchivePage, {
        paginationOpts: {
          numItems: BATCH_SIZE,
          cursor: continueCursor,
        },
      });

      const sortedNextPage = sortCertificates(nextPage.page);

      setLoadedMore((current) => ({
        base: initialArchivePage,
        page: [
          ...(current?.base === initialArchivePage ? current.page : []),
          ...sortedNextPage,
        ],
        continueCursor: nextPage.continueCursor,
        isDone: nextPage.isDone,
      }));
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (certificates.length === 0) {
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
        {certificates.map((cert, i) => (
          <motion.div
            key={cert._id}
            className="archive-masonry-item"
            // The first batch is server-rendered and must be visible on first
            // paint; only batches loaded later fade in.
            initial={i < BATCH_SIZE ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i % BATCH_SIZE) * 0.04, duration: 0.3, ease: "easeOut" }}
          >
            <CertificateCard
              certificateId={String(cert._id)}
              title={cert.title}
              organization={cert.organization}
              issuedDate={cert.issuedDate}
              fileId={cert.fileId}
              fileUrl={cert.fileUrl}
              fileType={cert.fileType}
              tags={cert.tags}
              description={cert.description}
              verificationUrl={cert.verificationUrl}
              autoOpen={highlightedCertificateId === String(cert._id)}
              priority={i < 4}
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
