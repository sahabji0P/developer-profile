"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type EssayTopicId =
  | "name"
  | "india"
  | "school"
  | "work"
  | "research"
  | "social"

type EssayRevealContextValue = {
  active: EssayTopicId | null
  revealed: Set<EssayTopicId>
  select: (id: EssayTopicId) => void
}

const EssayRevealContext = createContext<EssayRevealContextValue | null>(null)

export function EssayRevealProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<EssayTopicId | null>(null)
  const [revealed, setRevealed] = useState<Set<EssayTopicId>>(new Set())

  const select = useCallback((id: EssayTopicId) => {
    setActive((current) => {
      const next = current === id ? null : id
      if (next) {
        setRevealed((set) => {
          if (set.has(next)) return set
          const copy = new Set(set)
          copy.add(next)
          return copy
        })
      }
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ active, revealed, select }),
    [active, revealed, select],
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
