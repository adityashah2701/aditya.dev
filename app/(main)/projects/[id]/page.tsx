import { Breadcrumb } from "@/components/sections/shared";
import {
  ProjectDetailHeader,
  ProjectStats,
  ProjectProblem,
  ProjectArchitecture,
  ProjectStack,
  ProjectHighlights,
} from "@/components/sections/project-detail";
import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE_URL, SITE_NAME } from "@/constants/seo";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * generateMetadata — produces per-project SEO metadata.
 * The `id` param is the project slug (e.g. "ai-workflow-builder").
 * When Convex project queries are available server-side, swap the
 * placeholder values below for real project.title / project.description.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // Format slug → readable title: "ai-workflow-builder" → "Ai Workflow Builder"
  const readableTitle = id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const title = readableTitle;
  const description = `Explore ${readableTitle} — a project by Aditya Shah. Detailed breakdown of the problem, architecture, tech stack, and implementation highlights.`;
  const url = `${SITE_URL}/projects/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${readableTitle} | ${SITE_NAME}`,
      description,
      url,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    },
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { id } = await params;

  const readableTitle = id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const breadcrumbItems = [
    { label: "root", href: "/" },
    { label: "sys" },
    { label: "projects", href: "/projects" },
    { label: readableTitle.toLowerCase().replace(/ /g, "_"), isLast: true },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <ProjectDetailHeader />
      <ProjectStats />
      <ProjectProblem />
      <ProjectArchitecture />
      <ProjectStack />
      <ProjectHighlights />
    </>
  );
}
