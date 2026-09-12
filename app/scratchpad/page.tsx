import type { Metadata } from "next";
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
      <h1>Scratchpad</h1>
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
