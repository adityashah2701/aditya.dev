// Per-route terminal log content and page path labels used by the main layout.
// Each entry maps to a specific pathname.
// Note: NOT `as const` so arrays are mutable string[] — compatible with React.ReactNode[].

export const TERMINAL_LOGS: Record<string, string[]> = {
  home: [
    "> sys_integrity_check_about",
    "> core_module... ACTIVE",
    "> rendering_bio... DONE",
  ],
  skills: [
    "> sys_integrity_check_skills",
    "> compiler_cache_found",
    "> computing_graph... OK",
  ],
  projects: [
    "> sys_integrity_check_projects",
    "> evaluating_repositories... OK",
  ],
  experience: ["> sys_integrity_check_history", "> loading_archives... OK"],
  contact: [
    "> checking_availability... OPEN",
    "> load_average: 0.14, 0.05, 0.01",
    "> connection_secure: TRUE",
  ],
  projectDetail: [
    "> init_sequence_start",
    "> loading_assets... OK",
    "> connecting_to_db... OK",
  ],
};

export const PAGE_PATHS: Record<string, string> = {
  home: "ABOUT",
  skills: "TECH STACK",
  projects: "REPOSITORIES",
  experience: "EXPERIENCE LOGS",
  contact: "CONTACT PROTOCOL",
  projectDetail: "PORTFOLIO",
};

export const SIDEBAR_TITLES: Record<string, string> = {
  default: "SYSTEM MODULES",
  projectDetail: "NAVIGATE MODULE",
};

export const TERMINAL_HEADERS: Record<string, string> = {
  default: "TERMINAL OUTPUT",
  contact: "SYSTEM STATUS",
  projectDetail: "SYSTEM LOGS",
};
