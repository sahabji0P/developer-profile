"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { educationData } from "@/data/education"

export function EducationSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      {educationData.map((education, index) => (
        <motion.div
          key={education.institution}
          className={`rounded-lg overflow-hidden ${
            education.isPresent ? "border-2 border-primary" : "border border-border"
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
              <Image src={education.logo || "/placeholder.svg"} alt={education.institution} width={40} height={40} />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{education.degree}</h3>
              <p className="text-sm text-muted-foreground">{education.institution}</p>
              <p className="text-xs text-muted-foreground">{education.period}</p>
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
                <p className="text-sm mb-2">{education.description}</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {education.achievements.map((achievement, i) => (
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

