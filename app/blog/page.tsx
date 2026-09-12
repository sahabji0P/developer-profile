import type { Metadata } from "next";
import { BlogRow } from "@/components/blog-row";
import { getBlogPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing by Shashwat Jain.",
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <article className="content-frame">
      <h1>Blog</h1>
      <div className="blogs-list">
        {posts.map((post) => (
          <BlogRow
            key={post.slug}
            href={`/blog/${post.slug}`}
            title={post.title}
            date={post.date}
          />
        ))}
      </div>
    </article>
  );
}
