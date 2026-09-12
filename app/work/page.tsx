import type { Metadata } from "next"
import { ProjectList } from "@/components/project-list"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: "Work — Shashwat Jain",
}

export default function WorkPage() {
  return (
    <article className="content-frame">
      <h1 className="content-title">Work</h1>
      <a className="article-meta" href="/">
        {site.name}
      </a>
      <ProjectList projects={site.projects} variant="full" />
    </article>
  )
}
