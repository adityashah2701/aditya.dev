"use client";

import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type { SidebarProps } from "@/types/sidebar";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import TimeLocationWidget from "./time-location-widget";

export default function Sidebar({ title, links }: SidebarProps) {
  const { setOpenMobile, toggleSidebar, open, isMobile } = useSidebar();

  return (
    <ShadcnSidebar
      collapsible="offcanvas"
      className="border-r border-border-dark bg-background-dark! **:data-[sidebar=sidebar]:bg-background-dark"
    >
      {/* ── Header ── */}
      <SidebarHeader className="h-11 border-b border-border-dark/50 flex py-7 flex-row items-center shrink-0 px-3 justify-between">
        <span className="text-[20px] font-bold text-slate-200 tracking-normal truncate">
          {title}
        </span>

        {/* Toggle button — mobile only */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
            className="flex items-center justify-center w-7 h-7 shrink-0 rounded text-slate-500 hover:text-primary hover:bg-surface-dark border border-transparent hover:border-border-dark transition-all duration-150"
          >
            {open ? (
              <PanelLeftClose className="w-[15px] h-[15px] shrink-0" />
            ) : (
              <PanelLeftOpen className="w-[15px] h-[15px] shrink-0" />
            )}
          </button>
        )}
      </SidebarHeader>

      {/* ── Nav ── */}
      <SidebarContent className="pt-1.5 pb-0">
        <nav className="flex flex-col gap-1.5 px-1.5">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={() => setOpenMobile(false)}
              className={[
                "flex items-center gap-2.5 px-2.5 py-1.5 justify-start transition-all duration-150 border rounded-sm",
                link.active
                  ? "bg-primary/10 border-primary/30"
                  : "border-transparent hover:bg-surface-dark hover:border-border-dark",
              ].join(" ")}
            >
              <span
                className={`flex items-center justify-center shrink-0 ${
                  link.active ? "text-primary" : "text-slate-500"
                }`}
              >
                {link.icon}
              </span>
              <span
                className={`text-[11px] font-medium tracking-wide truncate ${
                  link.active ? "text-white" : "text-slate-400"
                }`}
              >
                0{idx + 1}. {link.label}
              </span>
              {link.active && (
                <span className="ml-auto size-1.5 shrink-0 rounded-none bg-primary shadow-[0_0_6px_rgba(19,73,236,0.9)]" />
              )}
            </Link>
          ))}
        </nav>
      </SidebarContent>

      {/* ── Footer ── */}
      <SidebarFooter className="p-3 border-t border-border-dark">
        <p className="text-[9px] font-bold text-slate-600 mb-1.5 tracking-widest uppercase">
          SYSTEM_STATUS
        </p>
        <TimeLocationWidget />
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
