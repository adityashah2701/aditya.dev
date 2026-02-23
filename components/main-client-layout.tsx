"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import type { SidebarLink } from "@/types/sidebar";
import { MAIN_NAV_LINKS, PROJECT_DETAIL_NAV_LINKS } from "@/constants/nav";
import {
  TERMINAL_LOGS,
  PAGE_PATHS,
  SIDEBAR_TITLES,
  TERMINAL_HEADERS,
} from "@/constants/layout";

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
  let terminalHeader = TERMINAL_HEADERS.default;

  // Build the "waiting" span once so each branch can spread it in
  const waitingSpan = (key: string, extra?: string) => (
    <span key={key} className={`text-slate-400 ${extra ?? ""}`}>
      &gt; awaiting_user_interaction_
    </span>
  );

  let terminalLogs: React.ReactNode[] = [];
  let sidebarLinks: SidebarLink[] = MAIN_NAV_LINKS.map((link) => ({
    ...link,
    active: link.href === pathname,
  }));

  if (pathname === "/") {
    pagePath = PAGE_PATHS.home;
    terminalLogs = [...TERMINAL_LOGS.home, waitingSpan("home")];
  } else if (pathname === "/skills") {
    pagePath = PAGE_PATHS.skills;
    terminalLogs = [...TERMINAL_LOGS.skills, waitingSpan("skills")];
  } else if (pathname === "/projects") {
    pagePath = PAGE_PATHS.projects;
    terminalLogs = [...TERMINAL_LOGS.projects, waitingSpan("projects")];
  } else if (pathname === "/experience") {
    pagePath = PAGE_PATHS.experience;
    terminalLogs = [...TERMINAL_LOGS.experience, waitingSpan("experience")];
  } else if (pathname === "/contact") {
    pagePath = PAGE_PATHS.contact;
    terminalHeader = TERMINAL_HEADERS.contact;
    terminalLogs = [
      ...TERMINAL_LOGS.contact,
      <span key="contact-wait" className="text-slate-400 typing-cursor">
        &gt; awaiting_signal
      </span>,
    ];
  } else if (pathname.startsWith("/projects/")) {
    pagePath = PAGE_PATHS.projectDetail;
    sidebarTitle = SIDEBAR_TITLES.projectDetail;
    terminalHeader = TERMINAL_HEADERS.projectDetail;
    terminalLogs = [
      ...TERMINAL_LOGS.projectDetail,
      waitingSpan("project-detail"),
    ];
    sidebarLinks = PROJECT_DETAIL_NAV_LINKS;
  }

  return (
    <SidebarProvider className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen selection:bg-primary selection:text-white">
      <Sidebar
        title={sidebarTitle}
        links={sidebarLinks}
        terminalHeader={terminalHeader}
        terminalLogs={terminalLogs}
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
