"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { certificationsData } from "@/data/certifications"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function CertificationsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="space-y-6">
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Certifications</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Professional certifications and credentials that validate my technical expertise
        </p>
      </div>
      {certificationsData.map((cert, index) => (
        <motion.div
          key={cert.title}
          className={` rounded-2xl overflow-hidden ${cert.proctored ? "border-2 border-violet-500/50" : "border-2 border-white/30"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
        >
          <div
            className="p-6 cursor-pointer flex items-center hover:bg-card/50 transition-colors duration-200"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden p-2 mr-4">
              <Image src={cert.logo || "/SJ8.jpg"} alt={cert.issuer} fill className="object-cover rounded-full" />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold">{cert.title}</h3>
              <p className="text-muted-foreground">{cert.issuer}</p>
              <p className="text-sm text-muted-foreground">Issued: {(cert.issuedDate)}</p>
            </div>
            {cert.proctored && <Badge className="mr-4 bg-primary text-primary-foreground">Proctored</Badge>}
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
                <div className="px-6 pb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  {cert.expiryDate && (
                    <p className="text-sm text-muted-foreground mb-4">
                      Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                    </p>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <a href={cert.verificationLink} target="_blank" rel="noopener noreferrer">
                      Verify Certificate
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </section>
  )
}

