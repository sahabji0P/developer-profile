"use client"

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react"
import { site } from "@/content/site"
import styles from "./essay-home.module.css"

/**
 * Nested click-to-reveal, in the same spirit as ped.ro:
 * a pill word stays sharp; the sentence after it is blurred until you click.
 * Nested pills live inside the revealed chunk.
 */

type RevealCount = {
  register: () => () => void
  setOpen: (id: string, open: boolean) => void
}

const RevealCountContext = createContext<RevealCount | null>(null)

function Reveal({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  const id = useId()
  const counter = useContext(RevealCountContext)
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    if (!counter) return
    const unregister = counter.register()
    return unregister
  }, [counter])

  const toggle = () => {
    setOpen((current) => {
      const next = !current
      counter?.setOpen(id, next)
      return next
    })
  }

  const state = open ? "open" : "closed"

  return (
    <span data-state={state}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={id}
        data-state={state}
        onClick={toggle}
      >
        {label}
      </button>
      <span id={id} className={styles.content} data-state={state}>
        {children}
      </span>
    </span>
  )
}

const firstName = site.name.split(" ")[0] ?? site.name
const job = site.experience[0]
const school = site.education[0]
const pub = site.publication
const xSocial = site.socials.find((item) => item.label === "X")
const github = site.socials.find((item) => item.label === "GitHub")
const linkedin = site.socials.find((item) => item.label === "LinkedIn")

export function EssayHome() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())
  const [total, setTotal] = useState(0)

  const register = useCallback(() => {
    setTotal((value) => value + 1)
    return () => setTotal((value) => Math.max(0, value - 1))
  }, [])

  const setOpen = useCallback((id: string, open: boolean) => {
    setOpenIds((current) => {
      const next = new Set(current)
      if (open) next.add(id)
      else next.delete(id)
      return next
    })
  }, [])

  return (
    <RevealCountContext.Provider value={{ register, setOpen }}>
      <article className={`content-frame ${styles.essayHome}`}>
        <p className={styles.srIntro}>
          {site.shortBio} Recent work as {job.role} at {job.org}.{" "}
          {school.program} at {school.school}. {pub.title}, {pub.venue}.
        </p>

        <div className={styles.counter} aria-live="polite">
          R{openIds.size}/{total}
        </div>

        <div className={styles.body}>
          <p className={styles.block} style={{ "--delay": 0 } as never}>
            I am{" "}
            <Reveal label={firstName}>
              {" "}
              Jain, currently a final year Engineering student from{" "}
              <Reveal label={site.location}>
                , with majors in Computer Science. Professionally I am a
                Full-Stack Developer and AI Engineer specializing in delivering
                scalable and robust systems.
              </Reveal>
            </Reveal>
          </p>

          <p className={styles.block} style={{ "--delay": 1 } as never}>
            I recently worked at{" "}
            <Reveal label={job.org}>
              {" "}
              as {job.role}, shipping full-stack product work for client teams.
            </Reveal>
          </p>

          <p className={styles.block} style={{ "--delay": 2 } as never}>
            I presented{" "}
            <Reveal label="DeiT">
              {" "}
              research on {pub.title} at {pub.venue} ({pub.date}).
            </Reveal>
          </p>

          <p className={styles.block} style={{ "--delay": 3 } as never}>
            I&apos;m finishing {school.program} at{" "}
            <Reveal label={school.school}>
              {" "}
              ({school.start}–{school.end}).
            </Reveal>
          </p>

          {xSocial ? (
            <p className={styles.block} style={{ "--delay": 4 } as never}>
              You can find me on{" "}
              <Reveal label="X">
                {" "}
                —{" "}
                <a
                  className={styles.link}
                  href={xSocial.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{xSocial.href.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//i, "")}
                </a>
                {github ? (
                  <>
                    . Also on{" "}
                    <a
                      className={styles.link}
                      href={github.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </>
                ) : null}
                {linkedin ? (
                  <>
                    {" "}
                    and{" "}
                    <a
                      className={styles.link}
                      href={linkedin.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </>
                ) : null}
                .
              </Reveal>
            </p>
          ) : null}
        </div>
      </article>
    </RevealCountContext.Provider>
  )
}
