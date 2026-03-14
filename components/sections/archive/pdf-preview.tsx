"use client";

import dynamic from "next/dynamic";

// pdfjs-dist calls `new DOMMatrix()` at module evaluation time.
// DOMMatrix does not exist in Node.js, so importing this on the server causes:
//   "DOMMatrix is not defined"
// Wrapping with next/dynamic + ssr:false ensures the module is only ever
// evaluated in the browser.
export const PdfPreview = dynamic(
  () =>
    import("./pdf-preview-inner").then((m) => ({ default: m.PdfPreview })),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center gap-2 p-12">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          Loading…
        </span>
      </div>
    ),
  }
);
