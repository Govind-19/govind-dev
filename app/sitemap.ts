import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/journal`, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/work`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/resume`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}/journal/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const projects: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...posts, ...projects];
}
