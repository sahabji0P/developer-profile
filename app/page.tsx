"use client"

import { AchievementsSection } from "@/components/achievements-section"
import { CertificationsSection } from "@/components/certifications-section"
import { ContactSection } from "@/components/contact-section"
import { EducationSection } from "@/components/education-section"
import { HeroSection } from "@/components/hero-section"
import { ShowcaseLayout } from "@/components/showcase-layout"
import { SocialLinksSection } from "@/components/social-links-section"
import { WorkExperienceSection } from "@/components/work-experience-section"
import { motion, useScroll, useSpring } from "framer-motion"

function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-50" style={{ scaleX }} />
}

export default function Home() {
  return (


    <main className="min-h-screen p-4 sm:p-8 pb-32 text-foreground relative">
      <ProgressBar />
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-16 relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8 h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className=" p-6 rounded-lg shadow-md"
            >
              <HeroSection />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-6 h-full"
            >
              <SocialLinksSection />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className=" p-6 rounded-lg shadow-md">
            <WorkExperienceSection />
          </div>
          <div className=" p-6 rounded-lg shadow-md">
            <EducationSection />
          </div>
        </motion.div>

        {[
          { Component: ShowcaseLayout, className: "col-span-full" },
          { Component: CertificationsSection, className: "col-span-full" },
          { Component: AchievementsSection, className: "col-span-full" },
          { Component: ContactSection, className: "col-span-full" },
        ].map(({ Component, className }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className={`p-6 rounded-lg shadow-md ${className}`}
          >
            <Component />
          </motion.div>
        ))}
      </div>
    </main>
  )
}

