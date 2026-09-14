import { SITE_URL, site } from "@/content/site";
import { getBlogPosts, getScratchpadNotes } from "@/lib/mdx";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = [
    ...getBlogPosts().map((post) => ({
      ...post,
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
    ...getScratchpadNotes().map((note) => ({
      ...note,
      url: `${SITE_URL}/scratchpad/${note.slug}`,
    })),
  ].sort((a, b) => {
    if (a.date === b.date) {
      return a.slug < b.slug ? 1 : -1;
    }
    return a.date < b.date ? 1 : -1;
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(site.role)}</description>
    ${items
      .map((item) => {
        const description = item.description ?? "";
        return `<item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid>${item.url}</guid>
      <pubDate>${new Date(`${item.date}T00:00:00.000Z`).toUTCString()}</pubDate>
      ${description ? `<description>${escapeXml(description)}</description>` : ""}
    </item>`;
      })
      .join("\n    ")}
  </channel>
</rss>
`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
