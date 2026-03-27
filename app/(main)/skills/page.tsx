import { Metadata } from "next";
import { preloadQuery } from "convex/nextjs";
import { Breadcrumb } from "@/components/sections/shared";
import { SkillsHeader, SkillCategoryList } from "@/components/sections/skills";
import { SITE_URL, OG_IMAGE_URL } from "@/constants/seo";
import { api } from "@/convex/_generated/api";

export const metadata: Metadata = {
  title: "Tech Stack",
  description:
    "Aditya Shah's technology stack — React, Next.js, TypeScript, Node.js, Python, cloud infrastructure, databases, and the full ecosystem of tools used to build modern software.",
  alternates: {
    canonical: `${SITE_URL}/skills`,
  },
  openGraph: {
    type: "website",
    title: "Tech Stack | aditya.dev",
    description:
      "The tools, languages, and frameworks Aditya Shah uses to build software — React, Next.js, TypeScript, Python, and more.",
    url: `${SITE_URL}/skills`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Stack | aditya.dev",
    description:
      "The tools, languages, and frameworks Aditya Shah uses to build software — React, Next.js, TypeScript, Python, and more.",
    images: [OG_IMAGE_URL],
  },
};

export default async function Skills() {
  const preloadedTechStack = await preloadQuery(api.techstack.getTechStack);
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "skills", isLast: true },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <SkillsHeader />
      <SkillCategoryList preloadedTechStack={preloadedTechStack} />
    </>
  );
}
