"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AlertTriangle, Send } from "lucide-react"

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8 rounded-lg max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-background/70 backdrop-blur-sm border border-primary/20 rounded-lg p-6 mb-6 max-w-2xl"
        >
          <div className="flex items-center justify-center gap-3 mb-4 text-amber-500">
            <AlertTriangle className="size-8" />
            <h2 className="text-2xl md:text-3xl font-bold">Journal Under Maintenance</h2>
          </div>
          <p className="text-lg text-center text-muted-foreground mb-4">
            I'm currently working on improving the journal experience. Please check back soon to see the new updates!
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {["Coming Soon", "New Features", "Better Experience"].map((tag, index) => (
              <Badge key={index} className="text-sm font-normal" variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-center text-muted-foreground">
            Expected completion: Soon™
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            className="hover:bg-violet-500/50 hover:text-white transition-colors"
            onClick={() => {
              const contactSection = document.getElementById("contact-section")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Notify me when it's ready <Send className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}