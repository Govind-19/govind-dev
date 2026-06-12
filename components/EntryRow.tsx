import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/post-meta";

export default function EntryRow({
  post,
  last = false,
}: {
  post: PostMeta;
  last?: boolean;
}) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className={`group relative block py-[26px] no-underline ${
        last ? "" : "border-b border-line"
      }`}
    >
      {/* rust rule grows in as the row makes room — same motif as the pull quote */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-1/2 h-9 w-[3px] -translate-y-1/2 scale-y-0 bg-accent transition-transform duration-300 ease-settle group-hover:scale-y-100"
      />
      {/* content shifts via transform (compositor), not padding (layout reflow) */}
      <div className="transition-transform duration-300 ease-settle group-hover:translate-x-[14px]">
        <div className="mb-[10px] flex items-center gap-[14px] font-mono text-[12px] text-muted">
          <span className="uppercase tracking-[0.5px] text-accent">
            {post.tag}
          </span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(post.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime} min</span>
          {post.part != null && post.seriesTotal != null && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-accent-soft">
                part {post.part} of {post.seriesTotal}
              </span>
            </>
          )}
        </div>
        <h3 className="mb-2 font-display text-[27px] font-medium leading-[1.2] tracking-[-0.5px] text-ink transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="max-w-[580px] text-[18px] text-muted">{post.summary}</p>
        {post.arc && (
          <div className="mt-3 font-mono text-[11px] tracking-[0.5px] text-accent-soft">
            arc: {post.arc}
          </div>
        )}
      </div>
    </Link>
  );
}
