export type EssayTopicId =
  | "name"
  | "india"
  | "school"
  | "work"
  | "research"
  | "social"

export type EssayPhase = "idle" | "launch" | "staged" | "settled"

export type EssayOrigin = {
  left: number
  top: number
  width: number
  height: number
}

/** Word clone travels from the mark to the right stage. */
export const ESSAY_FLY_MS = 520

/** Left essay restructures after the right card has landed. */
export const ESSAY_SETTLE_MS = 860

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function originFromElement(el: HTMLElement): EssayOrigin {
  const rect = el.getBoundingClientRect()
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  }
}

export function flyTarget(origin: EssayOrigin): { x: number; y: number } {
  if (typeof window === "undefined") {
    return { x: origin.left, y: origin.top }
  }

  const desktop = window.matchMedia("(min-width: 1100px)").matches
  if (desktop) {
    return {
      x: window.innerWidth * 0.74 - origin.width / 2,
      y: window.innerHeight * 0.4 - origin.height / 2,
    }
  }

  return {
    x: origin.left,
    y: origin.top + Math.max(96, origin.height * 4),
  }
}
