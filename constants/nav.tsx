import type { SidebarLink } from "@/types/sidebar";
import { Home, Terminal, FolderOpen, History, Mail, ArrowLeft, AlertTriangle, Box, Database, Code } from "lucide-react";
import React from "react";
export const MAIN_NAV_LINKS: SidebarLink[] = [
  { href: "/", label: "HOME", icon: <Home className="w-[16px] h-[16px]" /> },
  { href: "/skills", label: "TECH_STACK", icon: <Terminal className="w-[16px] h-[16px]" /> },
  { href: "/projects", label: "REPOSITORIES", icon: <FolderOpen className="w-[16px] h-[16px]" /> },
  { href: "/experience", label: "EXPERIENCE_LOGS", icon: <History className="w-[16px] h-[16px]" /> },
  { href: "/contact", label: "INITIATE_CONTACT", icon: <Mail className="w-[16px] h-[16px]" /> },
];

// Sidebar navigation links for the individual project detail view
export const PROJECT_DETAIL_NAV_LINKS: SidebarLink[] = [
  { href: "/projects", label: "BACK_TO_PORTFOLIO", icon: <ArrowLeft className="w-[16px] h-[16px]" /> },
  { href: "#problem", label: "Problem", icon: <AlertTriangle className="w-[16px] h-[16px]" />, active: true },
  { href: "#architecture", label: "Architecture", icon: <Box className="w-[16px] h-[16px]" /> },
  { href: "#stack", label: "Tech_Stack", icon: <Database className="w-[16px] h-[16px]" /> },
  { href: "#implementation", label: "Implementation", icon: <Code className="w-[16px] h-[16px]" /> },
];
