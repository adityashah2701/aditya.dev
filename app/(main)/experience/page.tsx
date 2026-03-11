import { Metadata } from "next";
import { Breadcrumb } from "@/components/sections/shared";
import {
  ExperienceHeader,
  ExperienceTimeline,
} from "@/components/sections/experience";
import { SITE_URL, OG_IMAGE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Experience Logs",
  description:
    "Aditya Shah's professional experience — roles, companies, and achievements across software engineering, full stack development, and systems architecture.",
  alternates: {
    canonical: `${SITE_URL}/experience`,
  },
  openGraph: {
    title: "Experience Logs | aditya.dev",
    description:
      "Career history and professional experience of Aditya Shah — software engineering roles, projects, and achievements.",
    url: `${SITE_URL}/experience`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
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
