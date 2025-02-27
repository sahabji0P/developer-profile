"use client"

import { PreviewTooltip } from "@/components/preview-tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projectsData } from "@/data/projects"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function ShowcaseLayout() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      {projectsData.map((project, index) => (
        <motion.div
          key={project.title}
          className={`rounded-2xl overflow-hidden ${project.featured ? "border-2 border-violet-500/50" : "border-2 border-white/30"
            }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="p-4 cursor-pointer" onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image src={project.logo || "/SJ8.jpg"} alt={project.title} fill className="object-cover" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.shortDescription}</p>
              </div>
              {project.featured && <Badge className="mr-4 bg-primary text-primary-foreground">Featured</Badge>}
              <ChevronDown
                className={`transform transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""}`}
              />
            </div>
          </div>
          <AnimatePresence>
            {expandedIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 pb-4"
              >
                <div className="flex flex-col md:flex-row gap-8 mt-4">
                  <motion.div
                    className="relative w-full md:w-1/2 aspect-video rounded-lg overflow-hidden"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={project.image || "/SJ8.jpg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
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
                        <Button
                          variant="outline"
                          className="flex gap-2"
                          disabled={!project.demoLink}
                        >
                          {project.demoLink ? (
                            <Link href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4" />
                              Live Demo
                            </Link>
                          ) : (
                            <span className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4" />
                              Live Demo
                            </span>
                          )}
                        </Button>
                      </PreviewTooltip>
                    </div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6"
                >
                  <h4 className="text-xl font-semibold mb-2">Key Features</h4>
                  <ul className="list-disc list-inside mb-4">
                    {project.features?.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <h4 className="text-xl font-semibold mb-2">Challenges and Solutions</h4>
                  <p>{project.challenges}</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </section>
  )
}

