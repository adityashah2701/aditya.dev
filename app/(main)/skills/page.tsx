import { preloadQuery } from "convex/nextjs";
import { Breadcrumb } from "@/components/sections/shared";
import { SkillsHeader, SkillCategoryList } from "@/components/sections/skills";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { api } from "@/convex/_generated/api";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Tech Stack",
  description:
    "Aditya Shah's technology stack — React, Next.js, TypeScript, Node.js, Python, cloud infrastructure, databases, and the full ecosystem of tools used to build modern software.",
  path: "/skills",
  ogTitle: "Tech Stack | aditya.dev",
  ogDescription:
    "The tools, languages, and frameworks Aditya Shah uses to build software — React, Next.js, TypeScript, Python, and more.",
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
      <ConvexClientProvider>
        <SkillCategoryList preloadedTechStack={preloadedTechStack} />
      </ConvexClientProvider>
    </>
  );
}
