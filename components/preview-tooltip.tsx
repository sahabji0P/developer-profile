"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PreviewTooltipProps {
  children: React.ReactNode
  preview: string
}

export function PreviewTooltip({ children, preview }: PreviewTooltipProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48"
          >
            <div className="bg-popover text-popover-foreground p-2 rounded-md shadow-lg text-sm">
              <div className="w-full h-24 bg-muted rounded-md mb-2 overflow-hidden">
                <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-center">{preview}</p>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-popover border-l-transparent border-r-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

