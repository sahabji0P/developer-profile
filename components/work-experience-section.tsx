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
      <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
      {workExperienceData.map((experience, index) => (
        <motion.div
          key={experience.company}
          className={`rounded-lg overflow-hidden ${experience.isPresent ? "border-2 border-primary" : "border border-border"
            }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div
            className="p-4 cursor-pointer flex items-center"
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
              className={`transform transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""}`}
            />
          </div>
          <AnimatePresence>
            {expandedIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 pb-4"
              >
                <p className="text-sm mb-2">{experience.description}</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {experience.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

