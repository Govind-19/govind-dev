"use client";

import { useMemo, useState } from "react";
import EntryRow from "@/components/EntryRow";
import { TAGS, type PostMeta, type Tag } from "@/lib/post-meta";

type Filter = "all" | Tag;

export default function JournalList({ posts }: { posts: PostMeta[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible =
    filter === "all" ? posts : posts.filter((p) => p.tag === filter);

  const filters: Filter[] = ["all", ...TAGS];

  const counts = useMemo(() => {
    const map: Record<Filter, number> = { all: posts.length } as Record<
      Filter,
      number
    >;
    for (const t of TAGS) map[t] = 0;
    for (const p of posts) map[p.tag] += 1;
    return map;
  }, [posts]);

  return (
    <>
      <div
        className="flex flex-wrap gap-[10px] border-b border-line py-[26px] font-mono text-[12.5px]"
        role="group"
        aria-label="Filter posts by tag"
      >
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-[2px] border px-[15px] py-[7px] transition-colors active:translate-y-[1px] ${
              filter === f
                ? "border-accent bg-accent text-paper"
                : "border-line bg-paper-2 text-tag hover:border-accent hover:text-accent"
            }`}
          >
            {f === "all" ? "All" : f}
            <span className="ml-[6px] opacity-50">{counts[f]}</span>
          </button>
        ))}
      </div>

      {/* key remount makes the list settle back in on every filter change */}
      <div key={filter} className="rise pb-10 pt-2 [animation-duration:0.45s]">
        {visible.map((post, i) => (
          <EntryRow key={post.slug} post={post} last={i === visible.length - 1} />
        ))}
        {visible.length === 0 && (
          <p className="py-[26px] text-[18px] text-muted">
            Nothing here yet. Soon.
          </p>
        )}
      </div>
    </>
  );
}
