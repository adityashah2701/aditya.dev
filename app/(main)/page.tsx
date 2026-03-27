import { Metadata } from "next";
import { Breadcrumb } from "@/components/sections/shared";
import { HomeHero, PersonalIdentity } from "@/components/sections/home";
import { SITE_URL, SITE_TITLE, OG_IMAGE_URL } from "@/constants/seo";
import { Github, Network, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Aditya Shah's portfolio — Systems Engineer & Full Stack Architect building AI tools, web apps, and modern software with React, Next.js, and TypeScript.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    title: SITE_TITLE,
    description:
      "Aditya Shah — Systems Engineer & Full Stack Architect. Explore projects, skills, and experience.",
    url: SITE_URL,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "Aditya Shah — Systems Engineer & Full Stack Architect. Explore projects, skills, and experience.",
    images: [OG_IMAGE_URL],
  },
};

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
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-6 md:mb-10">
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
      </div>
    </>
  );
}
