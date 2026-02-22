import { Metadata } from "next";
import { Breadcrumb } from "@/components/sections/shared";
import { SkillsHeader, SkillCategoryList } from "@/components/sections/skills";

export const metadata: Metadata = {
  title: "Tech Stack",
};

export default function Skills() {
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "skills", isLast: true },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <SkillsHeader />
      <SkillCategoryList />
    </>
  );
}
