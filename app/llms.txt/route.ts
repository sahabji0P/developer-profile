import { SITE_URL, site } from "@/content/site";

export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    site.role,
    "",
    `Site: ${SITE_URL}`,
    `Location: ${site.location}`,
    "",
    "## Routes",
    "- / — Home",
    "- /work — Work",
    "- /about — About",
    "- /blog — Blog",
    "- /scratchpad — Scratchpad",
    "",
    "## Contact",
    `- Email: ${site.email}`,
    ...site.socials
      .filter((item) => item.label !== "Email")
      .map((item) => `- ${item.label}: ${item.href}`),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
