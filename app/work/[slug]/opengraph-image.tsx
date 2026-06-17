import { ogCard, OG_SIZE } from "@/lib/og";
import { getAllProjects, getProject } from "@/lib/projects";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Project preview card";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return ogCard({
    title: project?.title ?? "Selected work",
    kicker: project?.kicker ?? "Project",
  });
}
