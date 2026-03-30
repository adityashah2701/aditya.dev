import { Breadcrumb } from "@/components/sections/shared";
import { HomeHero, PersonalIdentity } from "@/components/sections/home";
import { SITE_TITLE } from "@/constants/seo";
import { createPageMetadata } from "@/lib/metadata";
import { Github, Network, Mail } from "lucide-react";

export const metadata = createPageMetadata({
  title: "Aditya Shah",
  description:
    "I'm Aditya Shah, a full stack developer building modern web apps, agentic AI products, mobile apps, and scalable digital experiences.",
  ogTitle: SITE_TITLE,
  ogDescription:
    "I'm Aditya Shah, a full stack developer building modern web apps, agentic AI products, mobile apps, and scalable digital experiences. Explore my projects, skills, and experience.",
});

export default function Home() {
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "home", isLast: true },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <HomeHero />
      <PersonalIdentity />

      {/* ── Social Links ── */}
      <nav
        aria-label="Social links"
        className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-6 md:mb-10"
      >
        <a
          href="https://github.com/adityashah2701"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors group"
        >
          <Github className="w-3.5 h-3.5" />
          <span className="font-mono text-[11px] tracking-wide group-hover:text-primary">
            GITHUB
          </span>
        </a>
        <span className="text-border-dark font-mono text-xs">|</span>
        <a
          href="https://linkedin.com/in/adityashah2701"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors group"
        >
          <Network className="w-3.5 h-3.5" />
          <span className="font-mono text-[11px] tracking-wide group-hover:text-primary">
            LINKEDIN
          </span>
        </a>
        <span className="text-border-dark font-mono text-xs">|</span>
        <a
          href="mailto:adityashah2701.work@gmail.com"
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors group"
        >
          <Mail className="w-3.5 h-3.5" />
          <span className="font-mono text-[11px] tracking-wide group-hover:text-primary">
            EMAIL
          </span>
        </a>
      </nav>
    </>
  );
}
