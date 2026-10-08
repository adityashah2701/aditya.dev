import { Breadcrumb } from "@/components/sections/shared";
import {
  HomeHero,
  PersonalIdentity,
} from "@/components/sections/home";
import { JsonLd } from "@/components/seo/json-ld";
import {
  GITHUB_URL,
  LEETCODE_URL,
  LINKEDIN_URL,
  PROFILE_LINK_REL,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/constants/seo";
import { PERSON_ID, WEBSITE_ID, createBreadcrumbJsonLd, createPageMetadata } from "@/lib/metadata";
import { Github, Network, Mail, Code2 } from "lucide-react";

export const revalidate = 3600; // Revalidate at most every hour (ISR for SEO & performance)

export const metadata = createPageMetadata({
  title: SITE_TITLE,
  absoluteTitle: true,
  description: SITE_DESCRIPTION,
  ogDescription:
    "Portfolio of Aditya Shah, a Full Stack Developer in Navi Mumbai, India. Explore projects in React, Next.js, TypeScript and AI, plus skills and certificates.",
});

const profilePageJsonLd = {
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: SITE_TITLE,
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: { "@id": PERSON_ID },
  about: { "@id": PERSON_ID },
};

export default async function Home() {
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "home", isLast: true },
  ];

  return (
    <>
      <JsonLd data={[profilePageJsonLd, createBreadcrumbJsonLd([{ name: "Home", path: "" }])]} />
      <Breadcrumb items={breadcrumbItems} />
      <HomeHero />
      <PersonalIdentity />

      {/* ── Social Links ── */}
      <nav
        aria-label="Social links"
        className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-6 md:mb-10"
      >
        <a
          href={GITHUB_URL}
          target="_blank"
          rel={PROFILE_LINK_REL}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors group"
        >
          <Github className="w-3.5 h-3.5" />
          <span className="font-mono text-[11px] tracking-wide group-hover:text-primary">
            GITHUB
          </span>
        </a>
        <span className="text-border-dark font-mono text-xs">|</span>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel={PROFILE_LINK_REL}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors group"
        >
          <Network className="w-3.5 h-3.5" />
          <span className="font-mono text-[11px] tracking-wide group-hover:text-primary">
            LINKEDIN
          </span>
        </a>
        <span className="text-border-dark font-mono text-xs">|</span>
        <a
          href={LEETCODE_URL}
          target="_blank"
          rel={PROFILE_LINK_REL}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors group"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span className="font-mono text-[11px] tracking-wide group-hover:text-primary">
            LEETCODE
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
