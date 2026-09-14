import Image from "next/image"
import type { ReactNode } from "react"
import type { Project } from "@/content/site"
import styles from "./project-list.module.css"

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
            className={
              showYear ? `${styles.item} ${styles.itemWithYear}` : styles.item
            }
            key={project.title}
          >
            <div className={styles.row}>
              {project.image ? (
                <div className={styles.media}>
                  <Image
                    src={project.image}
                    alt=""
                    width={variant === "teaser" ? 72 : 96}
                    height={variant === "teaser" ? 72 : 96}
                    className={styles.image}
                  />
                </div>
              ) : null}
              <div className={styles.copy}>
                <div className={styles.title}>{project.title}</div>
                <p className={styles.description}>{project.description}</p>
                <ProjectLinks project={project} />
              </div>
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
