"use client"

import { achievementsData } from "@/data/achievements"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef } from "react"

export function AchievementsSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section ref={ref} className="space-y-6 overflow-hidden">
      <h2 className="text-3xl font-bold mb-4">Gallery & Achievements</h2>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          className="flex space-x-6 py-4"
          animate={controls}
          initial="hidden"
          variants={{
            visible: {
              x: [0, -1000],
              transition: {
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              },
            },
            hidden: { x: 0 },
          }}
        >
          {[...achievementsData, ...achievementsData].map((achievement, index) => (
            <div key={index} className="flex-shrink-0 w-64 h-64 relative rounded-lg overflow-hidden group">
              <Image
                src={achievement.image || "/SJ8.jpg"}
                alt={achievement.title}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center text-white p-4">
                  <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

