"use client"

import { PreviewTooltip } from "@/components/preview-tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projectsData } from "@/data/projects"
import { useIsMobile } from "@/hooks/use-mobile"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, ExternalLink, Github, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function ShowcaseLayout() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const isMobile = useIsMobile()
  const [viewportHeight, setViewportHeight] = useState(800)

  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight)
    }
    
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  // Calculate dynamic max height based on viewport and device type
  const getMaxHeight = () => {
    if (isMobile) {
      // On mobile, use 80% of viewport height minus some padding
      return Math.min(viewportHeight * 0.8, 600)
    }
    return 800
  }

  const handleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
    
    // On mobile, scroll to the expanded card after a short delay
    if (isMobile && expandedIndex !== index) {
      setTimeout(() => {
        const element = document.getElementById(`project-${index}`)
        element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 300)
    }
  }

  return (
    <section className="space-y-6">
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pb-2">
          Projects
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          A showcase of my technical skills through real-world applications and innovative solutions
        </p>
      </div>
      
      {projectsData.map((project, index) => (
        <motion.div
          key={project.title}
          id={`project-${index}`}
          className={`rounded-2xl overflow-hidden ${
            project.featured ? "border-2 border-violet-500/50" : "border-2 border-white/30"
          } ${isMobile ? 'mx-2' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
        >
          {/* Header - Always Visible */}
          <div 
            className="p-4 cursor-pointer hover:bg-card/50 transition-colors duration-200" 
            onClick={() => handleExpand(index)}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 overflow-hidden flex-shrink-0">
                <Image 
                  src={project.logo || "/SJ8.jpg"} 
                  alt={project.title} 
                  width={64} 
                  height={64} 
                  className="object-contain w-full h-full" 
                />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="text-lg sm:text-xl font-bold truncate">{project.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                  {project.shortDescription}
                </p>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                {project.featured && (
                  <Badge className="hidden sm:block bg-primary text-primary-foreground text-xs">
                    Featured
                  </Badge>
                )}
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform duration-200 ease-out ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                  style={{ willChange: 'transform' }}
                />
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence mode="wait">
            {expandedIndex === index && (
              <motion.div
                initial={{ maxHeight: 0, opacity: 0 }}
                animate={{ maxHeight: getMaxHeight(), opacity: 1 }}
                exit={{ maxHeight: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`${isMobile ? 'overflow-y-auto' : 'overflow-hidden'}`}
                style={{ willChange: 'max-height, opacity' }}
              >
                <div className="px-4 pb-4 space-y-6">
                  {/* Close button for mobile */}
                  {isMobile && (
                    <div className="flex justify-end pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedIndex(null)
                        }}
                        className="p-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {/* Main Content Layout - Responsive Design */}
                  {isMobile ? (
                    /* Mobile Layout - Single Column with Full Details */
                    <div className="flex flex-col space-y-6">
                      {/* Project Image - Full width on mobile */}
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={project.image || "/SJ8.jpg"}
                          alt={project.title}
                          fill
                          className="object-contain bg-muted"
                          priority={index < 2}
                        />
                      </div>

                      {/* Project Details */}
                      <div className="space-y-4">
                        {/* Description */}
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.longDescription || project.description}
                          </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-foreground">Technologies</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons - Stack on mobile */}
                        <div className="flex flex-col gap-3">
                          <Button className="flex gap-2 w-full justify-center" asChild>
                            <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                              View Source
                            </a>
                          </Button>
                          {project.demoLink && project.demoLink !== "#" ? (
                            <Button variant="outline" className="flex gap-2 w-full justify-center" asChild>
                              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                                Live Demo
                              </a>
                            </Button>
                          ) : (
                            <Button variant="outline" className="flex gap-2 w-full justify-center" disabled>
                              <ExternalLink className="h-4 w-4" />
                              Live Demo
                            </Button>
                          )}
                        </div>

                        {/* Features */}
                        {project.features && project.features.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-foreground">
                              Key Features
                            </h4>
                            <ul className="space-y-1.5 ml-4">
                              {project.features.map((feature, i) => (
                                <li key={i} className="text-xs text-muted-foreground list-disc">
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Challenges */}
                        {project.challenges && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-foreground">
                              Challenges & Solutions
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {project.challenges}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Desktop Layout - Original Two-Column Design */
                    <>
                      <div className="flex flex-col md:flex-row gap-8 mt-4">
                        <div className="relative w-full md:w-1/2 aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={project.image || "/SJ8.jpg"}
                            alt={project.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="w-full md:w-1/2 space-y-4">
                          <p className="text-muted-foreground">{project.longDescription || project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-4">
                            <PreviewTooltip preview={project.sourceLink}>
                              <Button className="flex gap-2" asChild>
                                <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4" />
                                  View Source
                                </a>
                              </Button>
                            </PreviewTooltip>
                            <PreviewTooltip preview={project.demoLink || project.logo || "/SJ8.jpg"}>
                              {project.demoLink && project.demoLink !== "#" ? (
                                <Button variant="outline" className="flex gap-2" asChild>
                                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                    Live Demo
                                  </a>
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  className="flex gap-2"
                                  disabled
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  Live Demo
                                </Button>
                              )}
                            </PreviewTooltip>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-xl font-semibold mb-2">Key Features</h4>
                        <ul className="list-disc list-inside mb-4">
                          {project.features?.map((feature, i) => (
                            <li key={i} className="text-sm text-muted-foreground">
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <h4 className="text-xl font-semibold mb-2">Challenges and Solutions</h4>
                        <p className="text-sm text-muted-foreground">{project.challenges}</p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </section>
  )
}
