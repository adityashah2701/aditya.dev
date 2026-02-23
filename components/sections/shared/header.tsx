"use client";

import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

/* eslint-disable react/jsx-no-comment-textnodes */
export default function Header({ pagePath = "HOME" }: { pagePath?: string }) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border-dark bg-background-dark/95 backdrop-blur-md px-3 sm:px-5 md:px-6 py-3 gap-2 min-w-0">
      {/* Left: logo + page path */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 group cursor-pointer shrink-0"
        >
          <div className="size-5 sm:size-6 text-primary group-hover:scale-110 transition-transform shrink-0">
            <span className="material-symbols-outlined text-xl sm:text-2xl">
              hub
            </span>
          </div>
          {/* Brand — always visible */}
          <span className="text-xs sm:text-sm font-bold tracking-widest lowercase text-slate-200 group-hover:text-white transition-colors whitespace-nowrap shrink-0">
            aditya.dev
          </span>
        </Link>

        {/* Separator + page path — hidden on very small screens */}
        <div className="hidden xs:flex items-center gap-1.5 min-w-0 overflow-hidden">
          <span className="text-slate-600 text-xs font-mono shrink-0">//</span>
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-400 truncate">
            {pagePath}
          </span>
        </div>
      </div>

      {/* Right: status badges (desktop) + hamburger (mobile) */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="hidden md:flex gap-2">
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-none bg-surface-dark border border-border-dark text-[10px] font-mono text-primary whitespace-nowrap"
          >
            <span className="size-1.5 rounded-none bg-primary animate-pulse"></span>
            STATUS: ONLINE
          </Badge>
          <Badge
            variant="outline"
            className="hidden lg:flex items-center px-2.5 py-1.5 rounded-none bg-surface-dark border border-border-dark text-[10px] text-slate-400 whitespace-nowrap outline-none"
          >
            BUILD: v2.4.0
          </Badge>
        </div>

        {/* Mobile: compact status dot */}
        <Badge
          variant="outline"
          className="flex md:hidden items-center gap-1.5 px-2 py-1 rounded-none bg-surface-dark border border-border-dark text-[10px] font-mono text-primary whitespace-nowrap"
        >
          <span className="size-1.5 rounded-none bg-primary animate-pulse"></span>
          <span className="hidden sm:inline">ONLINE</span>
        </Badge>

        <button
          className="md:hidden flex items-center justify-center size-8 rounded-none hover:bg-surface-dark text-slate-300 hover:text-white transition-colors border border-transparent hover:border-border-dark"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span className="material-symbols-outlined text-xl">menu</span>
        </button>
      </div>
    </header>
  );
}
