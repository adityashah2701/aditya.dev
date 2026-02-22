import Link from "next/link";
import { Metadata } from "next";
import type { ExperienceEntry } from "@/types/experience";
import { EXPERIENCE_ENTRIES } from "@/constants/experience";

export const metadata: Metadata = {
  title: "Experience Logs",
};

export default function Experience() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-1.5 mb-6 md:mb-8 font-mono text-xs sm:text-sm text-slate-500">
        <Link href="/" className="hover:text-primary transition-colors">
          root
        </Link>
        <span>/</span>
        <span className="hover:text-primary transition-colors">sys</span>
        <span>/</span>
        <span className="text-primary font-bold bg-primary/10 px-1 rounded">
          experience
        </span>
      </div>

      {/* Page title */}
      <div className="mb-8 md:mb-12 border-b border-border-dark pb-6 md:pb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase">
          Deployment History
        </h1>
      </div>

      {/* Timeline */}
      <section className="mb-12 md:mb-20">
        <div className="flex flex-col gap-6 md:gap-0">
          {EXPERIENCE_ENTRIES.map((entry: ExperienceEntry, i: number) => (
            <div
              key={i}
              className="relative md:grid md:grid-cols-[8rem_1fr] md:gap-8 md:mb-14 group"
            >
              {/* ── Date column (desktop only) ── */}
              <div className="hidden md:flex flex-col items-end pt-2 pr-2">
                <span className="font-mono text-xs font-bold text-primary text-right leading-tight">
                  {entry.year}
                </span>
                <span className="text-[10px] text-slate-500 mt-1">
                  {entry.version}
                </span>
              </div>

              {/* ── Card column ── */}
              <div className="relative md:pl-10">
                {/* Timeline dot — desktop only */}
                <div className="hidden md:block absolute -left-[5px] top-3 size-2.5 rounded-full bg-surface-dark border-2 border-primary shadow-[0_0_8px_rgba(198,166,93,0.5)] group-hover:scale-125 transition-transform" />

                {/* Vertical connector line — desktop only, not on last card */}
                {i < EXPERIENCE_ENTRIES.length - 1 && (
                  <div className="hidden md:block absolute -left-px top-5 -bottom-14 w-px bg-border-dark" />
                )}

                {/* Card */}
                <div className="bg-surface-dark border border-border-dark hover:border-primary/40 rounded-xl transition-colors duration-300 overflow-hidden">
                  {/* Card header strip */}
                  <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3 border-b border-border-dark/60">
                    {/* Mobile: year + version inline */}
                    <div className="flex items-center gap-2 md:hidden">
                      <span className="font-mono text-[10px] font-bold text-primary">
                        {entry.year}
                      </span>
                      <span className="text-[10px] text-slate-600">
                        {entry.version}
                      </span>
                    </div>
                    {/* Status badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/20 rounded text-primary text-[10px] font-bold tracking-wider ml-auto whitespace-nowrap">
                      <span className="size-1.5 rounded-full bg-primary animate-pulse shrink-0" />
                      {entry.status}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4 sm:p-5 md:p-6">
                    {/* Role + context */}
                    <div className="mb-3">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                        {entry.role}
                      </h3>
                      <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs mt-1">
                        <span className="material-symbols-outlined text-xs">
                          code
                        </span>
                        <span>{entry.context}</span>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {entry.summary}
                    </p>

                    {/* Bullet points */}
                    <ul className="space-y-2 mb-5">
                      {entry.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-primary font-bold text-sm shrink-0 mt-0.5">
                            –
                          </span>
                          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                            {b}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {entry.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-background-dark border border-border-dark rounded text-[10px] font-mono text-slate-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
