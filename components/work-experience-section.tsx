"use client"

import { workExperienceData } from "@/data/work-experience"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function WorkExperienceSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <div className="text-center space-y-3 mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Work Experience</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          My professional journey and contributions across different organizations
        </p>
      </div>
      {workExperienceData.map((experience, index) => (
        <motion.div
          key={experience.company}
          className={`rounded-2xl overflow-hidden ${experience.isPresent ? "border-2 border-emerald-500/50" : "border border-border"
            }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
        >
          <div
            className="p-4 cursor-pointer flex items-center hover:bg-card/50 transition-colors duration-200"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div className="bg-white rounded-full p-2 mr-4 flex-shrink-0">
              <Image src={experience.logo || "/SJ8.jpg"} alt={experience.company} width={50} height={40} className="rounded-full" />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{experience.role}</h3>
              <p className="text-sm text-muted-foreground">{experience.company}</p>
              <p className="text-xs text-muted-foreground">{experience.period}</p>
            </div>
            <ChevronDown
              className={`transform transition-transform duration-200 ease-out ${expandedIndex === index ? "rotate-180" : ""}`}
              style={{ willChange: 'transform' }}
            />
          </div>
          <AnimatePresence mode="wait">
            {expandedIndex === index && (
              <motion.div
                initial={{ maxHeight: 0, opacity: 0 }}
                animate={{ maxHeight: 500, opacity: 1 }}
                exit={{ maxHeight: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
                style={{ willChange: 'max-height, opacity' }}
              >
                <div className="px-4 pb-4">
                  <p className="text-sm mb-2">{experience.description}</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {experience.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.2 }}
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

