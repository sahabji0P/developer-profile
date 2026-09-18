import { HomeView } from "@/components/home-view";
import { site } from "@/content/site";
import { getBlogPosts, getScratchpadNotes } from "@/lib/mdx";

export default function Home() {
  const featured = site.projects.filter((project) => project.featured).slice(0, 3);
  const posts = getBlogPosts().slice(0, 3).map(({ slug, title, date }) => ({
    slug,
    title,
    date,
  }));
  const notes = getScratchpadNotes().map(({ slug, title, date, icon }) => ({
    slug,
    title,
    date,
    icon,
  }));

  return <HomeView featured={featured} posts={posts} notes={notes} />;
}
