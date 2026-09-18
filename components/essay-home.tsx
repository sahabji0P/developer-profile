"use client"

import type { ReactNode } from "react"
import {
  useEssayReveal,
  type EssayTopicId,
} from "@/components/essay-reveal-context"
import { EssayStageCard } from "@/components/essay-stage"
import { site } from "@/content/site"
import styles from "./essay-home.module.css"

const firstName = site.name.split(" ")[0] ?? site.name
const job = site.experience[0]
const school = site.education[0]
const pub = site.publication
const xSocial = site.socials.find((item) => item.label === "X")
const github = site.socials.find((item) => item.label === "GitHub")
const linkedin = site.socials.find((item) => item.label === "LinkedIn")
const xHandle = xSocial
  ? xSocial.href.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//i, "")
  : ""

function Mark({
  id,
  label,
  children,
}: {
  id: EssayTopicId
  label: string
  children: ReactNode
}) {
  const { active, revealed, select } = useEssayReveal()
  const isActive = active === id
  const isRevealed = revealed.has(id)
  const state = isActive ? "active" : isRevealed ? "open" : "closed"

  return (
    <span data-state={state}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={isRevealed}
        aria-controls={`essay-${id}`}
        data-state={state}
        onClick={() => select(id)}
      >
        {label}
      </button>
      <span id={`essay-${id}`} className={styles.aside} data-state={state}>
        {children}
      </span>
    </span>
  )
}

export function EssayHome() {
  const { revealed } = useEssayReveal()

  return (
    <article className={`content-frame ${styles.essayHome}`}>
      <p className={styles.srIntro}>
        {site.name} is a full-stack developer and AI engineer from {site.location}.
        {school.program} at {school.school}. Recent work at {job.org}. Presented{" "}
        {pub.title}.
      </p>

      <p className={styles.counter} aria-live="polite">
        {revealed.size}/6
      </p>

      <div className={styles.body}>
        <p className={styles.essay}>
          I am{" "}
          <Mark id="name" label={firstName}>
            {" "}
            Jain
          </Mark>
          , a full-stack developer and AI engineer from{" "}
          <Mark id="india" label={site.location}>
            , currently a final-year Computer Science student
          </Mark>
          . I study at{" "}
          <Mark id="school" label={school.school}>
            {" "}
            ({school.program}, {school.start}–{school.end})
          </Mark>
          . I recently worked at{" "}
          <Mark id="work" label={job.org}>
            {" "}
            as {job.role}
          </Mark>
          , and presented{" "}
          <Mark id="research" label="DeiT">
            {" "}
            research at {pub.venue}
          </Mark>
          . Find me on{" "}
          <Mark id="social" label="X">
            {xHandle ? ` (@${xHandle}` : ""}
            {github ? " · GitHub" : ""}
            {linkedin ? " · LinkedIn" : ""}
            {xSocial ? ")" : ""}
          </Mark>
          .
        </p>
      </div>

      <EssayStageCard variant="mobile" />
    </article>
  )
}
