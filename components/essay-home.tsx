"use client"

import type { ReactNode } from "react"
import {
  useEssayReveal,
  type EssayTopicId,
} from "@/components/essay-reveal-context"
import { originFromElement } from "@/components/essay-motion"
import { EssayStageCard, useDesktopStage } from "@/components/essay-stage"
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

function markState({
  id,
  active,
  launching,
  revealed,
}: {
  id: EssayTopicId
  active: EssayTopicId | null
  launching: EssayTopicId | null
  revealed: Set<EssayTopicId>
}) {
  if (launching === id) return "launching"
  if (active === id) return "active"
  if (revealed.has(id)) return "open"
  return "closed"
}

function Mark({
  id,
  label,
  follow,
  children,
}: {
  id: EssayTopicId
  label: string
  follow?: string
  children: ReactNode
}) {
  const { active, launching, revealed, select } = useEssayReveal()
  const triggerState = markState({ id, active, launching, revealed })
  const asideOpen = revealed.has(id)

  return (
    <span className={styles.cluster} data-open={asideOpen ? "true" : "false"}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={asideOpen}
        aria-controls={`essay-${id}`}
        data-state={triggerState}
        onClick={(event) => {
          select(id, originFromElement(event.currentTarget))
        }}
      >
        {label}
      </button>
      <span
        id={`essay-${id}`}
        className={styles.aside}
        data-state={asideOpen ? (active === id ? "active" : "open") : "closed"}
      >
        {children}
      </span>
      {follow}
    </span>
  )
}

export function EssayHome() {
  const { revealed, phase, active, launching } = useEssayReveal()
  const desktop = useDesktopStage()
  const side = desktop === false ? "below" : "on the right"
  const engaged = revealed.size > 0 || phase !== "idle" || Boolean(launching)

  let kicker = "A short essay. Tap a word to open it."
  if (phase === "launch") kicker = `Opening ${side}…`
  else if (phase === "staged") kicker = `Open ${side} — the essay will catch up.`
  else if (phase === "settled" && active) kicker = `Open ${side} — tap again to close.`
  else if (revealed.size > 0) kicker = "The essay holds. Tap another word."

  return (
    <article
      className={`content-frame ${styles.essayHome}`}
      data-phase={phase}
      data-has-open={engaged ? "true" : "false"}
    >
      <p className={styles.srIntro}>
        {site.name} is a full-stack developer and AI engineer from {site.location}.{" "}
        {school.program} at {school.school}. Recent work at {job.org}. Presented{" "}
        {pub.title}.
      </p>

      <p className={styles.kicker}>{kicker}</p>

      <div className={styles.body}>
        <p className={styles.essay}>
          I am{" "}
          <Mark id="name" label={firstName} follow=",">
            {" "}
            Jain
          </Mark>{" "}
          a full-stack developer and AI engineer from{" "}
          <Mark id="india" label={site.location} follow=".">
            , currently a final-year Computer Science student
          </Mark>{" "}
          I study at{" "}
          <Mark id="school" label={school.school} follow=".">
            {" "}
            ({school.program}, {school.start}–{school.end})
          </Mark>{" "}
          I recently worked at{" "}
          <Mark id="work" label={job.org} follow=",">
            {" "}
            as {job.role}
          </Mark>{" "}
          and presented{" "}
          <Mark id="research" label="DeiT" follow=".">
            {" "}
            research at {pub.venue}
          </Mark>{" "}
          Find me on{" "}
          <Mark id="social" label="X" follow=".">
            {xHandle ? ` (@${xHandle}` : ""}
            {github ? " · GitHub" : ""}
            {linkedin ? " · LinkedIn" : ""}
            {xSocial ? ")" : ""}
          </Mark>
        </p>
      </div>

      <EssayStageCard variant="mobile" />
    </article>
  )
}
