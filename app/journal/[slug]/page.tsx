import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Footer from "@/components/Footer";
import ShareRow from "@/components/ShareRow";
import { mdxComponents } from "@/components/mdx";
import { formatDate, getAdjacentPosts, getAllPosts, getPost } from "@/lib/posts";
import { site } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${site.url}/journal/${post.slug}`;
  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": `${site.url}/rss.xml` },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url,
      publishedTime: post.date,
      authors: [site.author],
      tags: [post.tag],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);
  const url = `${site.url}/journal/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    url,
    author: {
      "@type": "Person",
      name: site.author,
      url: site.url,
    },
    keywords: post.tag,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-[680px] px-7">
        <Link
          href="/journal"
          className="mt-[34px] inline-block font-mono text-[12.5px] text-muted no-underline hover:text-accent"
        >
          ← back to journal
        </Link>

        <article className="pb-[10px] pt-[30px]">
          <div className="mb-5 flex items-center gap-[14px] font-mono text-[12.5px] text-muted">
            <span className="uppercase tracking-[0.5px] text-accent">
              {post.tag}
            </span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min</span>
          </div>

          <h1 className="mb-[18px] font-display text-[32px] font-medium leading-[1.1] tracking-[-1px] sm:text-[42px]">
            {post.title}
          </h1>

          {post.arc && (
            <div className="mb-[34px] border-b border-line pb-7 font-mono text-[11.5px] tracking-[0.5px] text-accent-soft">
              arc: {post.arc}
            </div>
          )}

          <div className="post-body">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>

        <ShareRow url={url} />

        <nav
          className="flex justify-between gap-5 pb-[60px] pt-6"
          aria-label="Adjacent posts"
        >
          {prev ? (
            <Link
              href={`/journal/${prev.slug}`}
              className="group max-w-[46%] font-mono text-[12.5px] text-muted no-underline"
            >
              <span className="mb-[6px] block text-accent">← previous</span>
              <span className="font-display text-[17px] leading-[1.25] text-ink group-hover:text-accent">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/journal/${next.slug}`}
              className="group max-w-[46%] text-right font-mono text-[12.5px] text-muted no-underline"
            >
              <span className="mb-[6px] block text-accent">next →</span>
              <span className="font-display text-[17px] leading-[1.25] text-ink group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>

      <Footer />
    </>
  );
}
