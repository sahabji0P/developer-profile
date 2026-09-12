import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Collection = "blog" | "scratchpad";

export type Post = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  content: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function parsePost(collection: Collection, filename: string): Post {
  const slug = filename.replace(/\.mdx$/, "");
  const filePath = path.join(CONTENT_ROOT, collection, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const title = data.title;
  const date = data.date;

  if (typeof title !== "string" || title.length === 0) {
    throw new Error(`Missing title in ${collection}/${filename}`);
  }
  if (typeof date !== "string" || date.length === 0) {
    throw new Error(`Missing date in ${collection}/${filename}`);
  }

  const description =
    typeof data.description === "string" && data.description.length > 0
      ? data.description
      : undefined;

  return { slug, title, date, description, content };
}

function readCollection(collection: Collection): Post[] {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => parsePost(collection, filename))
    .sort((a, b) => {
      if (a.date === b.date) {
        return a.slug < b.slug ? 1 : -1;
      }
      return a.date < b.date ? 1 : -1;
    });
}

export function getBlogPosts(): Post[] {
  return readCollection("blog");
}

export function getScratchpadNotes(): Post[] {
  return readCollection("scratchpad");
}

export function getPost(collection: Collection, slug: string): Post | undefined {
  const filePath = path.join(CONTENT_ROOT, collection, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return undefined;
  }
  return parsePost(collection, `${slug}.mdx`);
}

export function formatMonthYear(date: string): string {
  const [year, month] = date.split("-").map(Number);
  return new Date(Date.UTC(year, (month ?? 1) - 1, 1)).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    },
  );
}
