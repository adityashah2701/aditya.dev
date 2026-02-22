import type { ExperienceEntry } from "@/types/experience";

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    year: "2026 – PRESENT",
    version: "v4.0.0",
    role: "Systems Architect",
    context: "Independent Builder",
    status: "SCALING",
    summary:
      "Focused on building robust, scalable infrastructure for real-world automation and agentic systems. Transitioned from monolithic prototypes to modular, service-oriented architectures.",
    bullets: [
      "Designed an independent intelligent banking assistant architecture handling complex multi-step financial queries.",
      "Engineered scalable internal APIs with Next.js and Node, emphasizing latency reduction and reliable state management.",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    year: "2025",
    version: "v3.0.0",
    role: "Lead AI Engineer",
    context: "Product Development",
    status: "IN PRODUCTION",
    summary:
      "Developed and launched Finch AI, bridging modern LLMs with practical fintech applications. Expanded technical domain into deployment strategies and systems integration.",
    bullets: [
      "Implemented a fully automated WhatsApp AI assistant capable of digesting financial documents and responding with structured insights.",
      "Overhauled API endpoints to support multi-agent LLM interactions, significantly improving prompt performance and context management.",
    ],
    tech: ["Python", "LangChain", "Firebase", "Vercel"],
  },
  {
    year: "2024",
    version: "v2.0.0",
    role: "Full-Stack Developer",
    context: "Independent Builder",
    status: "DEPLOYED",
    summary:
      "Shifted focus from pure UI implementations towards constructing real backend logic. Learned database schemas, routing, and proper state synchronization.",
    bullets: [
      "Built custom authentication flows and integrated external APIs to construct fully-fledged dynamic applications.",
      "Developed internal financial dashboard prototype capable of visualizing local data streams utilizing componentized React structures.",
    ],
    tech: ["React", "Express.js", "MongoDB", "Tailwind CSS"],
  },
  {
    year: "2023",
    version: "v1.0.0",
    role: "Frontend Enthusiast",
    context: "Foundational Learning",
    status: "ITERATED",
    summary:
      "Began the development journey focusing heavily on browser interaction, clean markup, and CSS principles.",
    bullets: [
      "Mastered the core document object model logic using vanilla Javascript and CSS frameworks.",
      "Built interactive landing pages and conceptual web views emphasizing design constraints and UX patterns.",
    ],
    tech: ["JavaScript", "HTML5", "CSS3"],
  },
];
