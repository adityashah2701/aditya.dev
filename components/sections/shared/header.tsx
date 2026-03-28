"use client";

import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Menu } from "lucide-react";

/* eslint-disable react/jsx-no-comment-textnodes */
export default function Header({ pagePath = "HOME" }: { pagePath?: string }) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-50 md:hidden flex items-center justify-between border-b border-border-dark bg-background-dark/95 backdrop-blur-md px-2 sm:px-4 md:px-5 py-3 gap-2 min-w-0">
      {/* Left: logo + page path */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 min-w-0 flex-1">
        <Link
          href="/"
          className="md:hidden flex items-center justify-start gap-4 sm:gap-5 group cursor-pointer px-2"
        >
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
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
