"use client";

import { useMemo, useState } from "react";
import EntryRow from "@/components/EntryRow";
import { TAGS, type PostMeta, type Tag } from "@/lib/post-meta";

type Filter = "all" | Tag;

/** Consecutive posts sharing a series collapse into one connected segment. */
function segments(posts: PostMeta[]): { series?: string; posts: PostMeta[] }[] {
  const segs: { series?: string; posts: PostMeta[] }[] = [];
  for (const p of posts) {
    const tail = segs[segs.length - 1];
    if (p.series && tail?.series === p.series) tail.posts.push(p);
    else segs.push({ series: p.series, posts: [p] });
  }
  return segs;
}

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
        {filters.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`inline-flex items-center gap-[9px] rounded-[2px] border px-[14px] py-[7px] transition-colors active:translate-y-[1px] ${
                active
                  ? "border-accent bg-accent text-paper"
                  : "border-line bg-paper-2 text-tag hover:border-accent hover:text-accent"
              }`}
            >
              <span>{f === "all" ? "All" : f}</span>
              <span
                aria-hidden="true"
                className="h-[11px] w-px bg-current opacity-25"
              />
              <span
                className={`text-[11px] leading-none tabular-nums ${
                  active ? "text-paper" : "text-muted"
                }`}
              >
                {counts[f]}
              </span>
            </button>
          );
        })}
      </div>

      {/* key remount makes the list settle back in on every filter change */}
      <div key={filter} className="rise pb-10 pt-2 [animation-duration:0.45s]">
        {segments(visible).map((seg) =>
          seg.series && seg.posts.length > 1 ? (
            <section
              key={`series-${seg.series}`}
              aria-label={`${seg.series} — a ${seg.posts.length}-part story`}
            >
              <div className="flex items-center gap-[10px] pt-[26px] font-mono text-[11.5px] uppercase tracking-[0.5px] text-accent-soft">
                <span aria-hidden="true" className="h-px w-[26px] bg-accent-soft/60" />
                a {seg.posts.length}-part story · {seg.series}
              </div>
              {/* the rail ties the parts together as one thread */}
              <div className="border-l-2 border-accent/20 pl-[16px] sm:pl-[22px]">
                {seg.posts.map((post) => (
                  <EntryRow
                    key={post.slug}
                    post={post}
                    last={visible.indexOf(post) === visible.length - 1}
                  />
                ))}
              </div>
            </section>
          ) : (
            seg.posts.map((post) => (
              <EntryRow
                key={post.slug}
                post={post}
                last={visible.indexOf(post) === visible.length - 1}
              />
            ))
          ),
        )}
        {visible.length === 0 && (
          <p className="py-[26px] text-[18px] text-muted">
            Nothing here yet. Soon.
          </p>
        )}
      </div>
    </>
  );
}
