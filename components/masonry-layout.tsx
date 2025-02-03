"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projectsData } from "@/data/projects"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

export function MasonryLayout() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.title}
            className={`break-inside-avoid rounded-xl overflow-hidden ${project.featured ? "border-2 border-red-500" : "border border-border"
              }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.2 },
            }}
          >
            <div className="relative">
              <Image
                src={project.image || "/SJ8.jpg"}
                alt={project.title}
                width={600}
                height={400}
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

