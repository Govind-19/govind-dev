import { ogCard, OG_SIZE } from "@/lib/og";
import { getAllPosts, getPost } from "@/lib/posts";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Post preview card";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return ogCard({
    title: post?.title ?? "Engineering journal",
    kicker: post?.tag ?? "Journal",
  });
}
