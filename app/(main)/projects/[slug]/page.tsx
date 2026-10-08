import { notFound, unstable_rethrow } from "next/navigation";
import { Breadcrumb } from "@/components/sections/shared";
import ProjectDetailView from "@/components/sections/projects/project-detail-view";
import { JsonLd } from "@/components/seo/json-ld";
import { api } from "@/convex/_generated/api";
import { SITE_URL } from "@/constants/seo";
import { fetchQueryCached } from "@/lib/convex-server";
import {
  PERSON_ID,
  createBreadcrumbJsonLd,
  createCanonicalUrl,
  createPageMetadata,
} from "@/lib/metadata";

export const revalidate = 3600;

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const getProject = (slug: string) =>
  fetchQueryCached(api.projects.getProjectBySlug, { slug });

export async function generateStaticParams() {
  try {
    const projects = await fetchQueryCached(api.projects.getProjectSlugs);
    return projects.map((project) => ({ slug: project.slug }));
  } catch (error) {
    unstable_rethrow(error);
    // Fall back to on-demand rendering (ISR) if Convex is unreachable at build.
    console.error("Failed to prerender project pages", error);
    return [];
  }
}

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).replace(/\s+\S*$/, "")}…`;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project not found", robots: { index: false } };
  }

  const imageUrl =
    project.image && !project.confidential
      ? new URL(project.image, SITE_URL).toString()
      : undefined;

  return createPageMetadata({
    title: `${project.title} – Project by Aditya Shah`,
    description: truncate(project.description, 158),
    path: `/projects/${project.slug}`,
    image: imageUrl
      ? { url: imageUrl, alt: `Screenshot of ${project.title}` }
      : undefined,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const projectUrl = createCanonicalUrl(`/projects/${project.slug}`);
  const projectJsonLd = {
    "@type": project.githubUrl ? "SoftwareSourceCode" : "CreativeWork",
    "@id": `${projectUrl}#project`,
    name: project.title,
    description: project.description,
    url: projectUrl,
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    keywords: project.techStack.join(", "),
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    ...(project.image && !project.confidential
      ? { image: new URL(project.image, SITE_URL).toString() }
      : {}),
  };

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Repositories", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "root", href: "/" },
          { label: "repositories", href: "/projects" },
          { label: project.slug, isLast: true },
        ]}
      />
      <ProjectDetailView project={project} />
    </>
  );
}
