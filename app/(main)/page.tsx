import { Metadata } from "next";
import { Breadcrumb } from "@/components/sections/shared";
import { HomeHero, PersonalIdentity } from "@/components/sections/home";

export const metadata: Metadata = {
  title: "Home",
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
