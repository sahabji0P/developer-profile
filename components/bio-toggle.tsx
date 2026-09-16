"use client"

import { useState } from "react"
import {
  composeDetailedBio,
  composeResumeBullets,
  site,
} from "@/content/site"
import styles from "./bio-toggle.module.css"

type BioMode = "detailed" | "resume"

export function BioToggle() {
  const [mode, setMode] = useState<BioMode>("detailed")
  const detailedParagraphs = composeDetailedBio()
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean)
  const resumeBullets = composeResumeBullets()

  return (
    <section className="bio-section" aria-label="Bio">
      <div className={styles.toggle}>
        <span className={styles.label}>Bio</span>
        <div className={styles.options} role="group" aria-label="Bio view">
          <button
            type="button"
            className={styles.option}
            aria-controls="bio-content"
            aria-pressed={mode === "detailed"}
            onClick={() => setMode("detailed")}
          >
            Detailed
          </button>
          <button
            type="button"
            className={styles.option}
            aria-controls="bio-content"
            aria-pressed={mode === "resume"}
            onClick={() => setMode("resume")}
          >
            Resume
          </button>
        </div>
      </div>

      <div id="bio-content">
        {mode === "detailed" ? (
          detailedParagraphs.map((paragraph) => (
            <p className="content-paragraph" key={paragraph}>
              {paragraph}
            </p>
          ))
        ) : (
          <div className={styles.resumePanel}>
            <ul className={`content-list ${styles.resumeList}`}>
              {resumeBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <p className={styles.download}>
              <a href={site.resumeUrl} download>
                Download resume (PDF) →
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
