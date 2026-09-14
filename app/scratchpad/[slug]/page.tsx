import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleMeta } from "@/components/article-meta";
import { CustomMDX } from "@/components/mdx";
import { getPost, getScratchpadNotes } from "@/lib/mdx";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getScratchpadNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getPost("scratchpad", slug);
  if (!note) {
    return { title: "Scratchpad" };
  }
  return {
    title: note.title,
    description: note.description,
  };
}

export default async function ScratchpadNotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = getPost("scratchpad", slug);
  if (!note) {
    notFound();
  }

  return (
    <article className="content-frame">
      <h1 className="content-title">{note.title}</h1>
      <ArticleMeta date={note.date} />
      <CustomMDX source={note.content} />
    </article>
  );
}
