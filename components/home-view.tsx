"use client";

import Link from "next/link";
import { BioToggle } from "@/components/bio-toggle";
import { BlogRow } from "@/components/blog-row";
import { EssayHome } from "@/components/essay-home";
import { ProjectList } from "@/components/project-list";
import { ScratchpadGrid } from "@/components/scratchpad-grid";
import { useDesignVariant } from "@/components/design-variant-provider";
import { site, type Project } from "@/content/site";
import styles from "@/app/page.module.css";

export type HomePost = {
  slug: string;
  title: string;
  date: string;
  icon?: string;
};

type HomeViewProps = {
  featured: Project[];
  posts: HomePost[];
  notes: HomePost[];
};

function StudioHome({ featured, posts, notes }: HomeViewProps) {
  return (
    <article className="content-frame">
      <div className="home-copy">
        <header className={styles.identity}>
          <h1 className="site-title">
            <Link href="/" className="site-title-link">
              {site.name}
            </Link>
          </h1>
          <p className={styles.role}>{site.role}</p>
        </header>

        <BioToggle />

        <div className="writing-index">
          <section>
            <h2 className="section-label">
              <Link href="/work">Selected work</Link>
            </h2>
            <ProjectList projects={featured} variant="teaser" />
          </section>

          <section>
            <h2 className="section-label">
              <Link href="/journal#blog">Writing</Link>
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
            <p className={styles.moreRow}>
              <Link href="/journal#blog">More →</Link>
            </p>
          </section>

          <section>
            <h2 className="section-label">
              <Link href="/journal#scratchpad">Scratchpad</Link>
            </h2>
            <ScratchpadGrid notes={notes} />
          </section>
        </div>
      </div>
    </article>
  );
}

export function HomeView({ featured, posts, notes }: HomeViewProps) {
  const { variant } = useDesignVariant();

  if (variant === "essay") {
    return <EssayHome />;
  }

  return <StudioHome featured={featured} posts={posts} notes={notes} />;
}
