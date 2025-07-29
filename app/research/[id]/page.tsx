"use client"

import { researchWorkData } from "@/data/research-work"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Users, Calendar, FileText, Link as LinkIcon, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"

interface ResearchPageProps {
  params: {
    id: string
  }
}

export default function ResearchPage({ params }: ResearchPageProps) {
  const research = researchWorkData.find(item => item.id === params.id)

  if (!research) {
    notFound()
  }

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
    <main className="min-h-screen p-4 sm:p-8 pb-32 text-foreground">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link href="/#research">
            <Button variant="ghost" className="group hover:bg-primary/10 transition-all duration-200">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Research
            </Button>
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 mb-8"
        >
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <Badge className={getStatusColor(research.status)}>
              {research.status}
            </Badge>
            <div className="flex gap-2">
              <a href={research.link} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Full Paper
                </Button>
              </a>
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {research.title}
          </h1>

          {/* Publication Details */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Journal</p>
                  <p className="text-sm text-muted-foreground">{research.publicationDetails.journal}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Published</p>
                  <p className="text-sm text-muted-foreground">{research.publicationDetails.date}</p>
                </div>
              </div>
              {research.publicationDetails.doi && (
                <div className="flex items-center space-x-3">
                  <LinkIcon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">DOI</p>
                    <p className="text-sm text-muted-foreground">{research.publicationDetails.doi}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Authors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Authors</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-primary mb-2">Main Authors</p>
                <div className="flex flex-wrap gap-2">
                  {research.authors.main.map((author, index) => (
                    <Badge key={index} variant="secondary">
                      {author}
                    </Badge>
                  ))}
                </div>
              </div>
              {research.authors.coAuthors.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Co-Authors</p>
                  <div className="flex flex-wrap gap-2">
                    {research.authors.coAuthors.map((author, index) => (
                      <Badge key={index} variant="outline">
                        {author}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Abstract Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Abstract</h2>
            <p className="text-muted-foreground leading-relaxed">
              {research.abstract}
            </p>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Results & Findings</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {research.results.text}
            </p>
            
            {research.results.images && research.results.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {research.results.images.map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={image}
                      alt={`Research result ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/SJ8.jpg";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Future Work Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Future Work</h2>
            <p className="text-muted-foreground leading-relaxed">
              {research.futureWork}
            </p>
          </div>
        </motion.div>

        {/* Associated Projects Section */}
        {research.associatedProjects && research.associatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Associated Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {research.associatedProjects.map((project, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-primary">{project.title}</h3>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors duration-200" />
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
