import type { ReactNode } from "react";

// Shared type for a sidebar navigation link
export type SidebarLink = {
  href: string;
  label: string;
  icon: string;
  active?: boolean;
};

// Props for the Sidebar component
export type SidebarProps = {
  title: string;
  links: SidebarLink[];
  terminalHeader?: string;
  terminalLogs?: ReactNode[];
};
