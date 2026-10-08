import { Breadcrumb } from "@/components/sections/shared";
import { SkillsHeader, SkillCategoryList } from "@/components/sections/skills";
import { api } from "@/convex/_generated/api";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/metadata";
import { preloadQueryCached } from "@/lib/convex-server";

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: "Tech Stack",
  description:
    "Aditya Shah's tech stack: TypeScript, Python, React, Next.js, Node.js, FastAPI, PostgreSQL, MongoDB, Docker, AWS and more used to ship full stack apps.",
  path: "/skills",
  ogDescription:
    "The languages, frameworks, databases and cloud tools Aditya Shah uses to build full stack web apps and AI products.",
});

export default async function Skills() {
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "skills", isLast: true },
  ];

  const preloadedTechStack = await preloadQueryCached(api.techstack.getTechStack);

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Tech Stack", path: "/skills" },
        ])}
      />
      <Breadcrumb items={breadcrumbItems} />
      <SkillsHeader />
      <SkillCategoryList preloadedTechStack={preloadedTechStack} />
    </>
  );
}
