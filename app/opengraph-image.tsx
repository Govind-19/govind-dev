import { ogCard, OG_SIZE } from "@/lib/og";
import { site } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = site.title;

export default function Image() {
  return ogCard({
    title: "I'm learning to build software the way it's actually built.",
    kicker: "Engineering journal · build in public",
  });
}
