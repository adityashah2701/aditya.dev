import type { SidebarLink } from "@/types/sidebar";

// Default sidebar navigation links shown across all main routes
export const MAIN_NAV_LINKS: SidebarLink[] = [
  { href: "/", label: "HOME", icon: "home" },
  { href: "/skills", label: "TECH_STACK", icon: "terminal" },
  { href: "/projects", label: "REPOSITORIES", icon: "folder_open" },
  { href: "/experience", label: "EXPERIENCE_LOGS", icon: "history" },
  { href: "/contact", label: "INITIATE_CONTACT", icon: "mail" },
];

// Sidebar navigation links for the individual project detail view
export const PROJECT_DETAIL_NAV_LINKS: SidebarLink[] = [
  { href: "/projects", label: "BACK_TO_PORTFOLIO", icon: "arrow_back" },
  { href: "#problem", label: "Problem", icon: "warning", active: true },
  { href: "#architecture", label: "Architecture", icon: "schema" },
  { href: "#stack", label: "Tech_Stack", icon: "dns" },
  { href: "#implementation", label: "Implementation", icon: "code" },
];
