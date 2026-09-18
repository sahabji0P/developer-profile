"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { composeDetailedBio, site } from "@/content/site";
import styles from "./essay-home.module.css";

function Pill({
  children,
  href,
  external,
}: {
  children: ReactNode;
  href?: string;
  external?: boolean;
}) {
  const className = "essay-pill";

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return <span className={className}>{children}</span>;
}

const firstName = site.name.split(" ")[0] ?? site.name;
const xSocial = site.socials.find((item) => item.label === "X");
const job = site.experience[0];
const school = site.education[0];

export function EssayHome() {
  const blurredBio = composeDetailedBio();
  const blurredParagraphs = blurredBio
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <article className={`content-frame ${styles.essayHome}`}>
      <section className={styles.reveal} aria-label="Introduction">
        <p className={styles.srIntro}>
          {site.name} is a full-stack developer and AI engineer, currently at{" "}
          {job.org}, studying at {school.school} in {site.location}.
          {xSocial ? ` Find them on X at ${xSocial.href}.` : null}
        </p>

        <div className={styles.underlayer} aria-hidden="true">
          {blurredParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.lines}>
          <p className={styles.line}>
            I&apos;m <Pill>{firstName}</Pill>.
          </p>
          <p className={styles.line}>
            Full-stack developer and AI engineer at{" "}
            <Pill href="/work">{job.org}</Pill>.
          </p>
          <p className={styles.line}>
            {school.program} at <Pill>{school.school}</Pill>.
          </p>
          <p className={styles.line}>
            Based in <Pill>{site.location}</Pill>.
          </p>
          {xSocial ? (
            <p className={styles.line}>
              Say hello on{" "}
              <Pill href={xSocial.href} external>
                X
              </Pill>
              .
            </p>
          ) : null}
        </div>
      </section>
    </article>
  );
}
