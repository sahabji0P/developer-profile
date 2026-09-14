"use client";

import Link from "next/link";
import * as Lucide from "lucide-react";
import { icons, Square, type LucideIcon } from "lucide-react";
import { useState } from "react";
import styles from "./scratchpad-grid.module.css";

export type ScratchpadNoteItem = {
  slug: string;
  title: string;
  date: string;
  icon?: string;
};

const HOME_LIMIT = 10;

function resolveIcon(name?: string): LucideIcon {
  if (!name) {
    return Square;
  }
  const fromMap = icons[name as keyof typeof icons];
  if (fromMap) {
    return fromMap as LucideIcon;
  }
  const fromNamed = (Lucide as Record<string, unknown>)[name];
  // Lucide icons may be function components or forwardRef objects.
  if (
    typeof fromNamed === "function" ||
    (typeof fromNamed === "object" && fromNamed !== null)
  ) {
    return fromNamed as LucideIcon;
  }
  return Square;
}

type ScratchpadGridProps = {
  notes: ScratchpadNoteItem[];
  /** Cap before More expands. Defaults to 10 (home). Pass 0 for no cap. */
  initialLimit?: number;
  showDates?: boolean;
  /** Link out to the Journal scratchpad section. */
  journalHref?: string;
};

export function ScratchpadGrid({
  notes,
  initialLimit = HOME_LIMIT,
  showDates = false,
  journalHref = "/journal#scratchpad",
}: ScratchpadGridProps) {
  const [expanded, setExpanded] = useState(false);
  const limited = initialLimit > 0;
  const visible =
    !limited || expanded ? notes : notes.slice(0, initialLimit);
  const hasMore = limited && notes.length > initialLimit;

  return (
    <div className={styles.wrap}>
      <ul className={styles.grid}>
        {visible.map((note) => {
          const Icon = resolveIcon(note.icon);
          return (
            <li key={note.slug} className={styles.item}>
              <Icon
                className={styles.icon}
                size={14}
                strokeWidth={1.75}
                aria-hidden
              />
              <Link href={`/scratchpad/${note.slug}`} className={styles.link}>
                {note.title}
              </Link>
              {showDates ? (
                <time className={styles.date} dateTime={note.date}>
                  {note.date.slice(0, 7)}
                </time>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className={styles.actions}>
        {hasMore ? (
          <button
            type="button"
            className={styles.moreBtn}
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
          >
            {expanded ? "Less" : "More"}
          </button>
        ) : null}
        <Link href={journalHref} className={styles.journalLink}>
          Journal
        </Link>
      </div>
    </div>
  );
}
