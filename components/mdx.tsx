import type { MDXRemoteProps } from "next-mdx-remote/rsc";

/**
 * Components available inside every post without imports.
 * <Pull> — Fraunces italic pull quote (same as blockquote).
 * <Ex>   — the mono "Ex:" callout block.
 */
export const mdxComponents: MDXRemoteProps["components"] = {
  Pull: ({ children }: { children?: React.ReactNode }) => (
    <div className="pull">{children}</div>
  ),
  Ex: ({ children }: { children?: React.ReactNode }) => (
    <div className="ex">{children}</div>
  ),
  // a row of small logo marks: <LogoRow items={[{src, alt, width?}]} />
  LogoRow: ({
    items,
  }: {
    items?: { src: string; alt: string; width?: number }[];
  }) => (
    <div className="logo-row">
      {(items ?? []).map((item, i) => (
        <span key={item.src} className="logo-row-item">
          {i > 0 && <span className="logo-row-arrow">→</span>}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.alt}
            style={{ width: item.width ?? 90 }}
          />
        </span>
      ))}
    </div>
  ),
  // external links open in a new tab; internal links stay in-tab
  a: ({ href = "", children }: { href?: string; children?: React.ReactNode }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  },
  // hashtag sign-off lines render in mono accent, like the reference design
  p: ({ children }: { children?: React.ReactNode }) => {
    if (typeof children === "string" && children.startsWith("#")) {
      return (
        <p className="!mb-0 mt-[14px] font-mono text-[14px] text-accent">
          {children}
        </p>
      );
    }
    return <p>{children}</p>;
  },
};
