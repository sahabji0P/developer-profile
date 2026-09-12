import type { Metadata } from "next"
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
      <a className="article-meta" href="/">
        {site.name}
      </a>

      <p className="content-paragraph">{site.longBio}</p>

      <section>
        <h2 className="content-heading">Experience</h2>
        {site.experience.map((job) => (
          <div key={`${job.org}-${job.start}`}>
            <div className="blog-row">
              <span>
                {job.org}, {job.role}
              </span>
              <time>
                {job.start}–{job.end}
              </time>
            </div>
            {job.description ? (
              <p className="content-paragraph">{job.description}</p>
            ) : null}
          </div>
        ))}
      </section>

      <section>
        <h2 className="content-heading">Education</h2>
        <div className="blogs-list">
          {site.education.map((edu) => (
            <div className="blog-row" key={edu.school}>
              <span>
                {edu.school} — {edu.program}
              </span>
              <time>
                {edu.start}–{edu.end}
              </time>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="content-heading">Publication</h2>
        <div className="blog-row">
          <span>
            {site.publication.title}; {site.publication.venue}
          </span>
          <time>{site.publication.date}</time>
        </div>
      </section>

      <section>
        <h2 className="content-heading">Certifications</h2>
        <div className="blogs-list">
          {site.certifications.map((cert) => (
            <div className="blog-row" key={cert.name}>
              <span>
                {cert.name}
                {cert.issuer ? ` — ${cert.issuer}` : ""}
              </span>
              <time>{cert.year}</time>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="content-heading">Achievements</h2>
        <ul className="content-list">
          {site.achievements.map((item) => (
            <li key={item.title}>
              {item.detail ? (
                <>
                  {item.title} — {item.detail}
                </>
              ) : (
                item.title
              )}
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
