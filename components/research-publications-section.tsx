"use client"

import { Button } from "@/components/ui/button"
import { researchWorkData } from "@/data/research-work"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink, FileText } from "lucide-react"
import Link from "next/link"

export function ResearchPublicationsSection() {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'in review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'accepted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6" id="research">
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Research & Publications
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          My contributions to academic research and published works in technology
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {researchWorkData.map((research, index) => (
          <motion.div
            key={research.id}
            className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(research.status)}`}>
                {research.status}
              </span>
            </div>

            <div className="flex flex-col h-full">
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-grow pr-16">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {research.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {research.publicationDetails.journal}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {research.publicationDetails.date}
                  </p>
                </div>
              </div>

              {/* Abstract Preview */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                {research.abstract}
              </p>

              {/* Authors */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">Authors:</span> {research.authors.main.slice(0, 2).join(", ")}
                  {research.authors.main.length > 2 && " et al."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2 mt-auto">
                <Link href={`/research/${research.id}`}>
                  <Button
                    variant="default"
                    className="w-full group/btn hover:bg-primary/90 transition-all duration-200"
                  >
                    <span>View Research Details</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>

                <Link
                  href={research.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full group/btn hover:border-primary hover:text-primary transition-all duration-200"
                  >
                    <span>Verify Certificate</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
