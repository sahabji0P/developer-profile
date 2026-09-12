import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type EmphasisProps = ComponentPropsWithoutRef<"em">;
type StrongProps = ComponentPropsWithoutRef<"strong">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

function cx(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const mdxComponents = {
  h1: ({ className, ...props }: HeadingProps) => (
    <h1 className={cx("content-heading", className)} {...props} />
  ),
  h2: ({ className, ...props }: HeadingProps) => (
    <h2 className={cx("content-heading", className)} {...props} />
  ),
  p: ({ className, ...props }: ParagraphProps) => (
    <p className={cx("content-paragraph", className)} {...props} />
  ),
  ul: ({ className, ...props }: ListProps) => (
    <ul className={cx("content-list", className)} {...props} />
  ),
  ol: ({ className, ...props }: ListProps) => (
    <ol className={cx("content-ordered-list", className)} {...props} />
  ),
  em: ({ className, ...props }: EmphasisProps) => (
    <em className={cx("content-emphasis", className)} {...props} />
  ),
  strong: ({ className, ...props }: StrongProps) => (
    <strong className={cx("content-strong", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: BlockquoteProps) => (
    <blockquote className={cx("content-blockquote", className)} {...props} />
  ),
  a: ({ href, className, children, ...props }: AnchorProps) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }

    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }

    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
};

export async function CustomMDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={mdxComponents} />;
}
