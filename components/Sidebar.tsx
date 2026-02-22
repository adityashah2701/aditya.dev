"use client";

import Link from "next/link";
import type { SidebarProps } from "@/types/sidebar";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

export default function Sidebar({
  title,
  links,
  terminalHeader = "SYSTEM_TERMINAL",
  terminalLogs = [],
}: SidebarProps) {
  const { setOpenMobile } = useSidebar();

  return (
    <ShadcnSidebar className="border-r border-border-dark bg-background-dark! **:data-[sidebar=sidebar]:bg-background-dark">
      <SidebarHeader className="p-6 pb-2">
        <h2 className="text-xs font-bold text-slate-500 tracking-widest">
          {title}
        </h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-3 py-2">
          <SidebarMenu className="gap-1">
            {links.map((link, idx) => (
              <SidebarMenuItem key={idx}>
                <SidebarMenuButton
                  asChild
                  isActive={link.active}
                  className="group flex items-center justify-between px-3 py-5 rounded-none transition-all data-[active=true]:bg-primary/10 data-[active=true]:border data-[active=true]:border-primary/20 hover:bg-surface-dark border border-transparent hover:border-border-dark!"
                >
                  <Link href={link.href} onClick={() => setOpenMobile(false)}>
                    <div className="flex items-center gap-3">
                      <span
                        className={`material-symbols-outlined text-sm ${
                          link.active
                            ? "text-primary"
                            : "text-slate-500 group-hover:text-primary"
                        }`}
                      >
                        {link.icon}
                      </span>
                      <span
                        className={`text-sm font-medium whitespace-nowrap truncate ${
                          link.active
                            ? "text-white"
                            : "text-slate-300 group-hover:text-white"
                        }`}
                      >
                        0{idx + 1}. {link.label}
                      </span>
                    </div>
                    {link.active && (
                      <span className="size-1.5 rounded-none bg-primary shadow-[0_0_8px_rgba(19,73,236,0.8)]"></span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-border-dark">
        <h2 className="text-xs font-bold text-slate-500 mb-4 tracking-widest">
          {terminalHeader}
        </h2>
        <div className="font-mono text-[10px] leading-relaxed text-slate-500 space-y-1">
          {terminalLogs.map((log, idx) => (
            <p key={idx}>{log}</p>
          ))}
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
