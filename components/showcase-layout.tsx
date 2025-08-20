"use client"

import { PreviewTooltip } from "@/components/preview-tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projectsData } from "@/data/projects"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function ShowcaseLayout() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="space-y-6">
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pb-2">Projects</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A showcase of my technical skills through real-world applications and innovative solutions
        </p>
      </div>
      {projectsData.map((project, index) => (
        <motion.div
          key={project.title}
          className={`rounded-2xl overflow-hidden ${project.featured ? "border-2 border-violet-500/50" : "border-2 border-white/30"
            }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
        >
          <div className="p-4 cursor-pointer hover:bg-card/50 transition-colors duration-200" onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 overflow-hidden">
                <Image src={project.logo || "/SJ8.jpg"} alt={project.title} width={50} height={50} className="object-contain w-full h-full" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.shortDescription}</p>
              </div>
              {project.featured && <Badge className="mr-4 bg-primary text-primary-foreground">Featured</Badge>}
              <ChevronDown
                className={`transform transition-transform duration-200 ease-out ${expandedIndex === index ? "rotate-180" : ""}`}
                style={{ willChange: 'transform' }}
              />
            </div>
          </div>
          <AnimatePresence mode="wait">
            {expandedIndex === index && (
              <motion.div
                initial={{ maxHeight: 0, opacity: 0 }}
                animate={{ maxHeight: 800, opacity: 1 }}
                exit={{ maxHeight: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
                style={{ willChange: 'max-height, opacity' }}
              >
                <div className="px-4 pb-4">
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </section>
  )
}
