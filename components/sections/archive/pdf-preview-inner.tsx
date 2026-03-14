"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Loader2, AlertCircle } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfPreviewProps {
  fileUrl: string;
  width?: number;
  className?: string;
  onLoadSuccess?: (numPages: number) => void;
  previewOnly?: boolean;
}

export function PdfPreview({ 
  fileUrl, 
  width = 300, 
  className = "", 
  onLoadSuccess,
  previewOnly = true 
}: PdfPreviewProps) {
  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    onLoadSuccess?.(numPages);
  }

  return (
    <div className={`relative overflow-hidden flex justify-center items-center bg-background-dark/30 ${className}`}>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex flex-col items-center gap-2 p-12">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Loading PDF...</span>
          </div>
        }
        error={
          <div className="flex flex-col items-center gap-2 p-12 text-destructive">
            <AlertCircle className="w-6 h-6" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-center">Failed to load document</span>
          </div>
        }
      >
        {previewOnly ? (
          <Page 
            pageNumber={1} 
            width={width}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className="shadow-2xl [&_.react-pdf__Page__canvas]:max-h-[420px] [&_.react-pdf__Page__canvas]:w-auto [&_.react-pdf__Page__canvas]:max-w-full!"
          />
        ) : (
          <div className="space-y-4 p-4 flex flex-col items-center">
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={width}
                className="shadow-2xl mb-8 last:mb-0 [&_.react-pdf__Page__canvas]:max-h-[80vh] [&_.react-pdf__Page__canvas]:object-contain [&_.react-pdf__Page__canvas]:w-auto"
              />
            ))}
          </div>
        )}
      </Document>
    </div>
  );
}
