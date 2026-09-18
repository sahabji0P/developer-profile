"use client"

import { usePathname } from "next/navigation"
import { useEssayReveal, type EssayTopicId } from "@/components/essay-reveal-context"
import { experienceBullets, site } from "@/content/site"
import styles from "./essay-stage.module.css"

const job = site.experience[0]
const school = site.education[0]
const pub = site.publication
const xSocial = site.socials.find((item) => item.label === "X")
const github = site.socials.find((item) => item.label === "GitHub")
const linkedin = site.socials.find((item) => item.label === "LinkedIn")
const xHandle = xSocial
  ? xSocial.href.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//i, "")
  : ""
const workBullets = job.description
  ? experienceBullets(job.description).slice(0, 4)
  : []

type StageCopy = {
  kicker: string
  title: string
  body: string
  meta?: string
  bullets?: string[]
  links?: { label: string; href: string }[]
}

const STAGE: Record<EssayTopicId, StageCopy> = {
  name: {
    kicker: "Identity",
    title: site.name,
    body: site.role,
    meta: site.location,
  },
  india: {
    kicker: "Based in",
    title: site.location,
    body: "Final-year Computer Science student. Full-stack developer and AI engineer.",
  },
  school: {
    kicker: "Education",
    title: school.school,
    body: school.program,
    meta: `${school.start}–${school.end}`,
  },
  work: {
    kicker: "Recent work",
    title: job.org,
    body: job.role,
    meta: `${job.start}–${job.end}`,
    bullets: workBullets,
  },
  research: {
    kicker: "Research",
    title: pub.title,
    body: pub.venue,
    meta: pub.date,
  },
  social: {
    kicker: "Elsewhere",
    title: "Say hello",
    body: site.email,
    links: [xSocial, github, linkedin].filter(
      (item): item is { label: string; href: string } => Boolean(item),
    ),
  },
}

export function EssayStageCard({ variant }: { variant: "desktop" | "mobile" }) {
  const { active } = useEssayReveal()
  const pathname = usePathname() ?? "/"
  const copy = active ? STAGE[active] : null
  const showHint = !copy && pathname === "/" && variant === "desktop"

  return (
    <div
      className={`${styles.frame} ${variant === "mobile" ? styles.mobile : styles.desktop}`}
      data-active={copy ? "true" : "false"}
    >
      {copy ? (
        <article className={styles.card} key={active} aria-live="polite">
          <p className={styles.kicker}>{copy.kicker}</p>
          <h2 className={styles.title}>{copy.title}</h2>
          {copy.meta ? <p className={styles.meta}>{copy.meta}</p> : null}
          <p className={styles.body}>{copy.body}</p>
          {copy.bullets?.length ? (
            <ul className={styles.list}>
              {copy.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {copy.links?.length ? (
            <p className={styles.links}>
              {copy.links.map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? " · " : null}
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label === "X" && xHandle ? `@${xHandle}` : link.label}
                  </a>
                </span>
              ))}
            </p>
          ) : null}
        </article>
      ) : showHint ? (
        <p className={styles.hint}>Tap a word in the essay.</p>
      ) : null}
    </div>
  )
}
