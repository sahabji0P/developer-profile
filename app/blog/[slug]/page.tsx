import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleMeta } from "@/components/article-meta";
import { CustomMDX } from "@/components/mdx";
import { getBlogPosts, getPost } from "@/lib/mdx";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("blog", slug);
  if (!post) {
    return { title: "Blog" };
  }
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost("blog", slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="content-frame">
      <h1 className="content-title">{post.title}</h1>
      <ArticleMeta date={post.date} />
      <CustomMDX source={post.content} />
    </article>
  );
}
