"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "left" | "middle" | "right"
}

export function Dock({ direction = "middle", className, children, ...props }: DockProps) {
  const mouseX = useMotionValue(0)
  const springConfig = { stiffness: 400, damping: 28 }
  const springX = useSpring(mouseX, springConfig)

  const children_count = React.Children.count(children)
  const child_width = 48 // size-12 = 3rem = 48px

  const dock_width = children_count * child_width + (children_count - 1) * 16 // gap-4 = 1rem = 16px

  return (
    <motion.div
      className={cn(
        "fixed bottom-8 flex items-center gap-4 rounded-full bg-black/10 p-4 backdrop-blur-md dark:bg-white/10",
        direction === "left" && "left-8",
        direction === "middle" && "left-1/2 -translate-x-1/2",
        direction === "right" && "right-8",
        className,
      )}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        mouseX.set(x)
      }}
      onMouseLeave={() => mouseX.set(dock_width / 2)}
      style={{ width: dock_width }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function DockIcon({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const distance = useMotionValue(0)
  const springConfig = { stiffness: 400, damping: 28 }

  const scale = useTransform(distance, [-100, 0, 100], [1, 1.5, 1])

  return (
    <motion.div ref={ref} style={{ scale }}>
      {children}
    </motion.div>
  )
}

