import type { Metadata } from "next"
import Link from "next/link"
import {
  composeLongBio,
  experienceBullets,
  site,
} from "@/content/site"

export const metadata: Metadata = {
  title: "About",
}

const CONTACT_ORDER = ["Email", "GitHub", "X", "LinkedIn"] as const

export default function AboutPage() {
  const contactLinks = CONTACT_ORDER.map((label) =>
    site.socials.find((link) => link.label === label),
  ).filter((link): link is (typeof site.socials)[number] => Boolean(link))

  const aboutParagraphs = composeLongBio()
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean)

  return (
    <article className="content-frame">
      <h1 className="content-title">About</h1>
      <Link className="article-meta" href="/">
        {site.name}
      </Link>

      {aboutParagraphs.map((paragraph) => (
        <p className="content-paragraph" key={paragraph}>
          {paragraph}
        </p>
      ))}

      <section>
        <h2 className="content-heading">Experience</h2>
        {site.experience.map((job) => (
          <div key={`${job.org}-${job.start}`}>
            <p className="content-paragraph">
              <strong className="content-strong">{job.role}</strong>
              <br />
              {job.org}
              <br />
              <span className="date-range">
                {job.start}–{job.end}
              </span>
            </p>
            {job.description ? (
              <ul className="content-list">
                {experienceBullets(job.description).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </section>

      <section>
        <h2 className="content-heading">Education</h2>
        <ul className="content-list">
          {site.education.map((edu) => (
            <li key={edu.school}>
              <strong className="content-strong">{edu.program}</strong>
              {" — "}
              {edu.school}, {edu.start}–{edu.end}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="content-heading">Publication</h2>
        <p className="content-paragraph">
          <strong className="content-strong">{site.publication.title}</strong>
          <br />
          {site.publication.venue}, {site.publication.date}
        </p>
      </section>

      <section>
        <h2 className="content-heading">Certifications</h2>
        <ul className="content-list">
          {site.certifications.map((cert) => (
            <li key={cert.name}>
              {cert.name}
              {cert.issuer ? ` — ${cert.issuer}` : ""}, {cert.year}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="content-heading">Achievements</h2>
        <ul className="content-list">
          {site.achievements.map((item) => (
            <li key={item.title}>
              <strong className="content-strong">{item.title}</strong>
              {item.detail ? ` — ${item.detail}` : ""}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="content-heading">Contact</h2>
        <ul className="content-list">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
