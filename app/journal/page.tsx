import type { Metadata } from "next";
import Link from "next/link";
import { BlogRow } from "@/components/blog-row";
import { ScratchpadGrid } from "@/components/scratchpad-grid";
import { getBlogPosts, getScratchpadNotes } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Journal",
  description: "Writing and scratchpad notes by Shashwat Jain.",
};

export default function JournalPage() {
  const posts = getBlogPosts();
  const notes = getScratchpadNotes();

  return (
    <article className="content-frame">
      <h1 className="content-title">Journal</h1>
      <p className="content-paragraph">
        Longer posts in <Link href="/blog">Blog</Link>, shorter notes in{" "}
        <Link href="/scratchpad">Scratchpad</Link>.
      </p>

      <div className="writing-index">
        <section id="blog">
          <h2 className="content-heading">
            <Link href="/blog">Blog</Link>
          </h2>
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
        </section>

        <section id="scratchpad">
          <h2 className="content-heading">
            <Link href="/scratchpad">Scratchpad</Link>
          </h2>
          <ScratchpadGrid
            notes={notes}
            initialLimit={0}
            showDates
            showMoreLink={false}
          />
        </section>
      </div>
    </article>
  );
}
