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
