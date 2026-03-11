import { Metadata } from "next";
import { Breadcrumb } from "@/components/sections/shared";
import { HomeHero, PersonalIdentity } from "@/components/sections/home";
import { SITE_URL, SITE_TITLE, OG_IMAGE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Aditya Shah's portfolio — Systems Engineer & Full Stack Architect building AI tools, web apps, and modern software with React, Next.js, and TypeScript.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description:
      "Aditya Shah — Systems Engineer & Full Stack Architect. Explore projects, skills, and experience.",
    url: SITE_URL,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
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
    </>
  );
}
