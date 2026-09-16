import type { Metadata } from "next";
import Link from "next/link";
import { BlogRow } from "@/components/blog-row";
import { getScratchpadNotes } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Scratchpad",
  description: "Notes by Shashwat Jain.",
};

export default function ScratchpadIndexPage() {
  const notes = getScratchpadNotes();

  return (
    <article className="content-frame">
      <h1 className="content-title">Scratchpad</h1>
      <p className="content-paragraph">
        Short notes. Also listed under{" "}
        <Link href="/journal#scratchpad">Journal</Link>.
      </p>
      <div className="blogs-list">
        {notes.map((note) => (
          <BlogRow
            key={note.slug}
            href={`/scratchpad/${note.slug}`}
            title={note.title}
            date={note.date}
          />
        ))}
      </div>
    </article>
  );
}
