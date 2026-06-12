/** Pure post metadata types & helpers — safe to import from client components. */

export const TAGS = ["Engineering", "Product", "Production", "Startup"] as const;
export type Tag = (typeof TAGS)[number];

export interface PostMeta {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO yyyy-mm-dd
  tag: Tag;
  arc?: string;
  readTime: number; // minutes
  featured: boolean;
  /** posts sharing a series name render as one connected story, ordered by part */
  series?: string;
  part?: number;
  seriesTotal?: number; // derived, not frontmatter
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
