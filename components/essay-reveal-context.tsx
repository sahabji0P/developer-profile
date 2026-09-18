"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import {
  ESSAY_FLY_MS,
  ESSAY_SETTLE_MS,
  prefersReducedMotion,
  type EssayOrigin,
  type EssayPhase,
  type EssayTopicId,
} from "@/components/essay-motion"

export type { EssayOrigin, EssayPhase, EssayTopicId }

type EssayRevealContextValue = {
  active: EssayTopicId | null
  launching: EssayTopicId | null
  revealed: Set<EssayTopicId>
  phase: EssayPhase
  origin: EssayOrigin | null
  select: (id: EssayTopicId, origin?: EssayOrigin | null) => void
}

const EssayRevealContext = createContext<EssayRevealContextValue | null>(null)

export function EssayRevealProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<EssayTopicId | null>(null)
  const [launching, setLaunching] = useState<EssayTopicId | null>(null)
  const [revealed, setRevealed] = useState<Set<EssayTopicId>>(() => new Set())
  const [phase, setPhase] = useState<EssayPhase>("idle")
  const [origin, setOrigin] = useState<EssayOrigin | null>(null)
  const timers = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    for (const id of timers.current) window.clearTimeout(id)
    timers.current = []
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const commitReveal = useCallback((id: EssayTopicId) => {
    setRevealed((current) => {
      if (current.has(id)) return current
      const next = new Set(current)
      next.add(id)
      return next
    })
  }, [])

  const select = useCallback(
    (id: EssayTopicId, nextOrigin?: EssayOrigin | null) => {
      if (phase !== "launch" && active === id) {
        clearTimers()
        setActive(null)
        setLaunching(null)
        setPhase("idle")
        setOrigin(null)
        return
      }

      clearTimers()
      setOrigin(nextOrigin ?? null)
      setLaunching(id)

      const skipFly = prefersReducedMotion() || !nextOrigin

      if (skipFly) {
        setActive(id)
        setLaunching(null)
        setPhase("settled")
        setOrigin(null)
        commitReveal(id)
        return
      }

      setActive(null)
      setPhase("launch")

      const stageTimer = window.setTimeout(() => {
        setActive(id)
        setLaunching(null)
        setPhase("staged")
      }, ESSAY_FLY_MS)

      const settleTimer = window.setTimeout(() => {
        setPhase("settled")
        setOrigin(null)
        commitReveal(id)
      }, ESSAY_SETTLE_MS)

      timers.current = [stageTimer, settleTimer]
    },
    [active, phase, clearTimers, commitReveal],
  )

  const value = useMemo(
    () => ({ active, launching, revealed, phase, origin, select }),
    [active, launching, revealed, phase, origin, select],
  )

  return (
    <EssayRevealContext.Provider value={value}>
      {children}
    </EssayRevealContext.Provider>
  )
}

export function useEssayReveal() {
  const context = useContext(EssayRevealContext)
  if (!context) {
    throw new Error("useEssayReveal must be used within EssayRevealProvider")
  }
  return context
}
