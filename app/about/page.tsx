import type { Metadata } from "next"
import Link from "next/link"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: "About — Shashwat Jain",
}

const CONTACT_ORDER = ["Email", "GitHub", "X", "LinkedIn"] as const

export default function AboutPage() {
  const contactLinks = CONTACT_ORDER.map((label) =>
    site.socials.find((link) => link.label === label),
  ).filter((link): link is (typeof site.socials)[number] => Boolean(link))

  return (
    <article className="content-frame">
      <h1 className="content-title">About</h1>
      <Link className="article-meta" href="/">
        {site.name}
      </Link>

      <p className="content-paragraph">{site.longBio}</p>

      <section>
        <h2 className="content-heading">Experience</h2>
        {site.experience.map((job) => (
          <div key={`${job.org}-${job.start}`}>
            <p className="content-paragraph">
              {job.org}, {job.role}, {job.start}–{job.end}
            </p>
            {job.description ? (
              <p className="content-paragraph">{job.description}</p>
            ) : null}
          </div>
        ))}
      </section>

      <section>
        <h2 className="content-heading">Education</h2>
        <ul className="content-list">
          {site.education.map((edu) => (
            <li key={edu.school}>
              {edu.school} — {edu.program}, {edu.start}–{edu.end}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="content-heading">Publication</h2>
        <p className="content-paragraph">
          {site.publication.title}; {site.publication.venue},{" "}
          {site.publication.date}
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
              {item.detail ? `${item.title} — ${item.detail}` : item.title}
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
