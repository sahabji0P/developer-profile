"use client"

import { useEssayReveal } from "@/components/essay-reveal-context"
import { ESSAY_FLY_MS, flyTarget } from "@/components/essay-motion"
import { site } from "@/content/site"
import styles from "./essay-fly.module.css"

const job = site.experience[0]
const school = site.education[0]
const firstName = site.name.split(" ")[0] ?? site.name

const LABELS = {
  name: firstName,
  india: site.location,
  school: school.school,
  work: job.org,
  research: "DeiT",
  social: "X",
} as const

export function EssayFly() {
  const { phase, origin, launching } = useEssayReveal()

  if (phase !== "launch" || !origin || !launching) return null

  const target = flyTarget(origin)
  const dx = target.x - origin.left
  const dy = target.y - origin.top

  return (
    <span
      className={styles.fly}
      aria-hidden="true"
      style={{
        left: origin.left,
        top: origin.top,
        animationDuration: `${ESSAY_FLY_MS}ms`,
        ["--dx" as string]: `${dx}px`,
        ["--dy" as string]: `${dy}px`,
      }}
    >
      {LABELS[launching]}
    </span>
  )
}
