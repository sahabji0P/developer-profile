"use client"

import { useState } from "react"

type BioLength = "default" | "long"

function BioParagraphs({ text }: { text: string }) {
  const parts = text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean)

  return (
    <>
      {parts.map((part) => (
        <p className="content-paragraph" key={part}>
          {part}
        </p>
      ))}
    </>
  )
}

export function BioToggle({
  shortBio,
  longBio,
}: {
  shortBio: string
  longBio: string
}) {
  const [length, setLength] = useState<BioLength>("default")

  return (
    <section className="bio-section">
      <div className="bio-toggle">
        <span>Bio</span>
        <div className="bio-toggle-options" aria-label="Bio length">
          <button
            type="button"
            aria-controls="bio-content"
            aria-pressed={length === "default"}
            onClick={() => setLength("default")}
          >
            Default
          </button>
          <button
            type="button"
            aria-controls="bio-content"
            aria-pressed={length === "long"}
            onClick={() => setLength("long")}
          >
            Long
          </button>
        </div>
      </div>
      <div id="bio-content">
        {length === "default" ? (
          <BioParagraphs text={shortBio} />
        ) : (
          <div className="long-bio">
            <BioParagraphs text={longBio} />
          </div>
        )}
      </div>
    </section>
  )
}
