import Link from "next/link"
import { BlogRow } from "@/components/blog-row"
import { ProjectList } from "@/components/project-list"
import { homeBioLines, site } from "@/content/site"
import { getBlogPosts, getScratchpadNotes } from "@/lib/mdx"
import styles from "./page.module.css"

export default function Home() {
  const featured = site.projects.filter((project) => project.featured).slice(0, 3)
  const posts = getBlogPosts().slice(0, 3)
  const notes = getScratchpadNotes().slice(0, 3)
  const bioLines = homeBioLines()

  return (
    <article className="content-frame">
      {/*
        Home visual collage (.home-visual) is omitted: we have no SF/Iowa
        illustration. Home is a single 600px column at all widths.
      */}
      <div className="home-copy">
        <header className={styles.identity}>
          <h1 className="site-title">
            <Link href="/" className="site-title-link">
              {site.name}
            </Link>
          </h1>
          <p className={`content-paragraph ${styles.role}`}>{site.role}</p>
        </header>

        <section className="bio-section" aria-label="Bio">
          {bioLines.map((line) => (
            <p className="content-paragraph" key={line}>
              {line}
            </p>
          ))}
        </section>

        <div className="writing-index">
          <section>
            <h2 className="content-heading">
              <Link href="/work">Selected work</Link>
            </h2>
            <ProjectList projects={featured} variant="teaser" />
          </section>

          <section>
            <h2 className="content-heading">
              <Link href="/blog">Writing</Link>
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

          <section>
            <h2 className="content-heading">
              <Link href="/scratchpad">Scratchpad</Link>
            </h2>
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
          </section>
        </div>
      </div>
    </article>
  )
}
