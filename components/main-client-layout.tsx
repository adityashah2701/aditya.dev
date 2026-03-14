"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import type { SidebarLink } from "@/types/sidebar";
import { MAIN_NAV_LINKS, PROJECT_DETAIL_NAV_LINKS } from "@/constants/nav";
import { PAGE_PATHS, SIDEBAR_TITLES } from "@/constants/layout";

import { AnimatePresence, motion } from "motion/react";
import Sidebar from "./sections/shared/sidebar";
import Header from "./sections/shared/header";
import { FrozenRoute } from "./frozen-route";

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
  } else if (pathname === "/experience") {
    pagePath = PAGE_PATHS.experience;
  } else if (pathname === "/contact") {
    pagePath = PAGE_PATHS.contact;
  } else if (pathname.startsWith("/projects/")) {
    pagePath = PAGE_PATHS.projectDetail;
    sidebarTitle = SIDEBAR_TITLES.projectDetail;
    sidebarLinks = PROJECT_DETAIL_NAV_LINKS;
  }

  return (
    <SidebarProvider defaultOpen={true} className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen selection:bg-primary selection:text-white">
      <Sidebar
        title={sidebarTitle}
        links={sidebarLinks}
      />
      <SidebarInset className="relative flex flex-col flex-1 bg-transparent min-w-0 overflow-x-hidden">
        <Header pagePath={pagePath} />
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.07] bg-grid-pattern grid-bg"></div>
        <main className="flex-1 min-w-0 z-10 px-4 py-6 sm:px-6 md:px-10 md:py-8 lg:px-14 xl:px-16 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(2px)" }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <FrozenRoute>{children}</FrozenRoute>
            </motion.div>
          </AnimatePresence>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
