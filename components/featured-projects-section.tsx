"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projectsData } from "@/data/projects"

export function FeaturedProjectsSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.title}
            className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card ${
              project.featured ? "border-2 border-red-500" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative overflow-hidden">
              <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="space-y-2">
                  <h3 className="text-white text-xl font-semibold">{project.title}</h3>
                  <p className="text-white text-sm">{project.description}</p>
                </div>
              </div>
              {project.featured && (
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">Featured</Badge>
              )}
            </div>
            <div className="p-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                    Source Code
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

