import { preloadQuery } from "convex/nextjs";
import { Breadcrumb } from "@/components/sections/shared";
import { SkillsHeader, SkillCategoryList } from "@/components/sections/skills";
import { api } from "@/convex/_generated/api";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Tech Stack",
  description:
    "I'm Aditya Shah, and this is the toolkit I use as a full stack developer to build modern web apps, agentic AI products, mobile apps, and scalable digital experiences.",
  path: "/skills",
  ogTitle: "Tech Stack | aditya.dev",
  ogDescription:
    "I'm Aditya Shah. See the tools and technologies I use to build modern web apps, agentic AI products, mobile apps, and scalable digital experiences.",
});

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
