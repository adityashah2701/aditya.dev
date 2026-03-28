"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import type { SidebarLink } from "@/types/sidebar";
import { MAIN_NAV_LINKS, PROJECT_DETAIL_NAV_LINKS } from "@/constants/nav";
import { PAGE_PATHS, SIDEBAR_TITLES } from "@/constants/layout";
import { cn } from "@/lib/utils";

import Sidebar from "./sections/shared/sidebar";
import Header from "./sections/shared/header";

export default function MainClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  let pagePath = PAGE_PATHS.home;
  let sidebarTitle = SIDEBAR_TITLES.default;

  let sidebarLinks: SidebarLink[] = MAIN_NAV_LINKS.map((link) => ({
    ...link,
    active: link.href === pathname,
  }));

  if (pathname === "/") {
    pagePath = PAGE_PATHS.home;
  } else if (pathname === "/skills") {
    pagePath = PAGE_PATHS.skills;
  } else if (pathname === "/projects") {
    pagePath = PAGE_PATHS.projects;
  } else if (pathname === "/archive") {
    pagePath = PAGE_PATHS.archive;
  } else if (pathname === "/contact") {
    pagePath = PAGE_PATHS.contact;
  } else if (pathname.startsWith("/projects/")) {
    pagePath = PAGE_PATHS.projectDetail;
    sidebarTitle = SIDEBAR_TITLES.projectDetail;
    sidebarLinks = PROJECT_DETAIL_NAV_LINKS;
  }

  const isArchivePage = pathname === "/archive";

  return (
    <SidebarProvider
      defaultOpen={true}
      className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen selection:bg-primary selection:text-white"
    >
      <Sidebar title={sidebarTitle} links={sidebarLinks} />
      <SidebarInset className="relative flex flex-col flex-1 bg-transparent min-w-0 overflow-x-hidden">
        <Header pagePath={pagePath} />
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.07] bg-grid-pattern grid-bg"></div>
        <main
          className={cn(
            "flex-1 min-w-0 z-10 py-6 md:py-8 w-full",
            isArchivePage
              ? "px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 max-w-none"
              : "px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 max-w-7xl mx-auto",
          )}
        >
          <div
            key={pathname}
            className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-200"
          >
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
