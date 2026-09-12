import type { ReactNode } from "react"
import Link from "next/link"
import type { Project } from "@/content/site"
import styles from "./project-list.module.css"

function projectHref(project: Project): string {
  return project.live ?? project.github ?? "/work"
}

function ProjectTitle({ project }: { project: Project }) {
  const href = projectHref(project)
  if (href.startsWith("/")) {
    return <Link href={href}>{project.title}</Link>
  }
  return <a href={href}>{project.title}</a>
}

function ProjectLinks({ project }: { project: Project }) {
  const parts: ReactNode[] = []
  if (project.github) {
    parts.push(
      <a href={project.github} key="github">
        GitHub
      </a>,
    )
  }
  if (project.live) {
    parts.push(
      <a href={project.live} key="live">
        Live
      </a>,
    )
  }
  if (parts.length === 0) return null

  return (
    <p className={styles.links}>
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 ? " · " : null}
          {part}
        </span>
      ))}
    </p>
  )
}

export function ProjectList({
  projects,
  variant,
}: {
  projects: Project[]
  variant: "teaser" | "full"
}) {
  return (
    <div className={styles.list}>
      {projects.map((project) => {
        const showYear = variant === "full" && project.year != null
        return (
          <div
            className={showYear ? `${styles.item} ${styles.itemWithYear}` : styles.item}
            key={project.title}
          >
            <div>
              <div className={styles.title}>
                {variant === "teaser" ? (
                  <ProjectTitle project={project} />
                ) : (
                  project.title
                )}
              </div>
              <p className={styles.description}>{project.description}</p>
              {variant === "full" ? <ProjectLinks project={project} /> : null}
            </div>
            {showYear ? (
              <time className={styles.year} dateTime={String(project.year)}>
                {project.year}
              </time>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
