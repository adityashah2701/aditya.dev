export interface SkillItem {
  name: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: SkillItem[];
}

export interface SkillSection {
  title: string;
  categories: SkillCategory[];
}

export const SKILL_SECTIONS: SkillSection[] = [
  {
    title: "Programming Languages",
    categories: [
      {
        id: "core-development",
        title: "LANGUAGES_&_DEVELOPMENT",
        icon: "code",
        skills: [
          { name: "JavaScript" },
          { name: "TypeScript" },
          { name: "Python" },
          { name: "Java" },
        ],
      },
      {
        id: "systems-data",
        title: "SYSTEMS_&_DB",
        icon: "dns",
        skills: [
          { name: "C" },
          { name: "C++" },
          { name: "SQL" },
          { name: "Bash / Shell" },
        ],
      },
      {
        id: "markup-config",
        title: "MARKUP_&_CONFIG",
        icon: "data_object",
        skills: [
          { name: "HTML" },
          { name: "CSS" },
          { name: "JSON" },
          { name: "YAML" },
          { name: "Markdown" },
        ],
      },
    ],
  },
  {
    title: "Frameworks & Libraries",
    categories: [
      {
        id: "frontend-frameworks",
        title: "FRONTEND_FRAMEWORKS_LIBRARIES",
        icon: "web",
        skills: [
          { name: "React.js" },
          { name: "Next.js" },
          { name: "Tailwind CSS" },
          { name: "shadcn/ui" },
        ],
      },
      {
        id: "backend-frameworks",
        title: "BACKEND_FRAMEWORKS",
        icon: "dns",
        skills: [
          { name: "Node.js" },
          { name: "Express.js" },
          { name: "Django" },
          { name: "Flask" },
          { name: "FastAPI" },
        ],
      },
      {
        id: "authentication",
        title: "AUTHENTICATION",
        icon: "smart_toy",
        skills: [
          { name: "Clerk" },
          { name: "NextAuth" },
          { name: "JWT" },
          { name: "OAuth" },
          { name: "BetterAuth" },
        ],
      },
    ],
  },
  {
    title: "Data & Intelligence",
    categories: [
      {
        id: "nosql-databases",
        title: "NOSQL_DATABASES",
        icon: "database",
        skills: [{ name: "MongoDB" }, { name: "DynamoDB" }],
      },
      {
        id: "sql-databases",
        title: "SQL_DATABASES",
        icon: "database",
        skills: [{ name: "PostgreSQL" }, { name: "MySQL" }],
      },
      {
        id: "reactive-databases",
        title: "REACTIVE_DATABASES",
        icon: "smart_toy",
        skills: [
          { name: "Supabase" },
          { name: "Firebase" },
          { name: "Convex" },
        ],
      },
    ],
  },
  {
    title: "Environment & Deployment",
    categories: [
      {
        id: "dev-tools",
        title: "DEV_TOOLS",
        icon: "build",
        skills: [
          { name: "Git" },
          { name: "GitHub" },
          { name: "Postman" },
          { name: "Chrome DevTools" },
        ],
      },
      {
        id: "deployment",
        title: "DEPLOYMENT_PLATFORMS",
        icon: "cloud",
        skills: [{ name: "Vercel" }, { name: "Render" }],
      },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    categories: [
      {
        id: "containerization",
        title: "CONTAINERIZATION",
        icon: "box",
        skills: [{ name: "Docker" }, { name: "Kubernetes" }],
      },
      {
        id: "messaging-caching",
        title: "MESSAGING_&_CACHING",
        icon: "storage",
        skills: [{ name: "Apache Kafka" }, { name: "Redis" }],
      },
      {
        id: "cloud-platforms",
        title: "CLOUD_PLATFORMS",
        icon: "cloud",
        skills: [{ name: "AWS" },{name:"Google Cloud Platform"}],
      },
      {
        id: "web-servers",
        title: "WEB_SERVERS_&_PROXY",
        icon: "globe",
        skills: [{ name: "NGINX" }],
      },
    ],
  },
];
