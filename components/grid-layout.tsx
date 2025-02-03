"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projectsData } from "@/data/projects"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

export function GridLayout() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.title}
            className={`rounded-xl overflow-hidden ${project.featured ? "border-2 border-red-500" : "border border-border"
              }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="relative aspect-video">
              <Image src={project.image || "/SJ8.jpg"} alt={project.title} fill className="object-cover" />
              {project.featured && <Badge className="absolute top-2 right-2 bg-red-500 text-white">Featured</Badge>}
            </div>
            <div className="p-6 bg-card">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-4">
                <Button size="sm" className="flex gap-2">
                  <Github className="h-4 w-4" />
                  Source
                </Button>
                <Button size="sm" variant="outline" className="flex gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

