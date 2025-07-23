"use client"

import { researchWorkData } from "@/data/research-work"
import { motion } from "framer-motion"
import { ExternalLink, FileText } from "lucide-react"

export function ResearchPublicationsSection() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Research & Publications
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          My contributions to academic research and published works in technology
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {researchWorkData.map((research, index) => (
          <motion.div
            key={research.title}
            className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                  {research.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {research.description}
                </p>
                <a
                  href={research.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200 text-sm font-medium"
                >
                  <span>View Publication</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
