import { Metadata } from "next";
import { Breadcrumb } from "@/components/sections/shared";
import {
  ExperienceHeader,
  ExperienceTimeline,
} from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "Experience Logs",
};

export default function Experience() {
  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "experience", isLast: true },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <ExperienceHeader />
      <ExperienceTimeline />
    </>
  );
}
