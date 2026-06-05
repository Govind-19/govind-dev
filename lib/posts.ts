import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { TAGS, type PostMeta, type Tag } from "@/lib/post-meta";

export { TAGS, formatDate, type PostMeta, type Tag } from "@/lib/post-meta";

export interface Post extends PostMeta {
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const WORDS_PER_MINUTE = 200;

function computeReadTime(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function isTag(value: unknown): value is Tag {
  return typeof value === "string" && (TAGS as readonly string[]).includes(value);
}

function parsePost(filename: string): Post | null {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  if (data.draft === true) return null;
  if (!isTag(data.tag)) {
    throw new Error(
      `Post "${filename}" has invalid tag "${data.tag}". Use one of: ${TAGS.join(", ")}`,
    );
  }

  return {
    slug,
    title: String(data.title),
    summary: String(data.summary),
    date: String(data.date),
    tag: data.tag,
    arc: typeof data.arc === "string" ? data.arc : undefined,
    readTime:
      typeof data.readTime === "number" ? data.readTime : computeReadTime(content),
    featured: data.featured === true,
    content,
  };
}

/** All published posts, featured first, then newest first. */
export function getAllPosts(): Post[] {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f));

  return files
    .map(parsePost)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.date.localeCompare(a.date);
    });
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Prev = older post, next = newer post, in plain date order. */
export function getAdjacentPosts(slug: string): {
  prev?: PostMeta;
  next?: PostMeta;
} {
  const byDate = getAllPosts()
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const i = byDate.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return {
    prev: byDate[i + 1] ? toMeta(byDate[i + 1]) : undefined,
    next: byDate[i - 1] ? toMeta(byDate[i - 1]) : undefined,
  };
}

/** Strip content so lists can be passed to client components. */
export function toMeta(post: Post): PostMeta {
  const { slug, title, summary, date, tag, arc, readTime, featured } = post;
  return { slug, title, summary, date, tag, arc, readTime, featured };
}
