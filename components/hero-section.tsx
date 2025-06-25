"use client"

import { heroData } from "@/data/hero"
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-16">
      {/* Content Section */}
      <motion.div
        className="flex-1 text-center lg:text-left space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Main Heading */}
        <div className="space-y-4">
          <motion.h1
            className="text-5xl lg:text-7xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hi, I'm{" "}
            <span className="text-primary">{heroData.name}</span>
          </motion.h1>

          <motion.p
            className="text-xl lg:text-2xl text-muted-foreground font-medium max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Developer | Engineer
          </motion.p>
        </div>

        {/* About Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white">About</h2>
          <div className="text-muted-foreground leading-relaxed max-w-2xl space-y-4">
            <p className="text-md">
              I am {heroData.name}, a passionate developer from India, currently pursuing my studies in Computer Science with a specialization in Artificial Intelligence and Machine Learning.
              Although I am primarily a{" "}
              <span className="font-semibold text-primary">Full Stack Developer and AI Engineer</span>,
              specializing in building scalable and robust applications, I also enjoy working on diverse projects.
            </p>
            <p className="text-md">
              Additionally, I have a passion for{" "}
              <span className="font-semibold text-primary">Open Source</span>{" "}
              development and contributing to the developer community, and I have a keen interest in participating in and conducting{" "}
              <span className="font-semibold text-primary"> Research</span> in various areas, particularly in the fields of{" "} <span className="font-semibold text-primary"> Artificial Intelligence and Computer Vision</span>.
            </p>
          </div>
        </motion.div>
      </motion.div >

      {/* Profile Image Section */}
      < motion.div
        className="flex-shrink-0"
        initial={{ opacity: 0, x: 50 }
        }
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
            <Image
              src={heroData.image || "/sj.jpeg"}
              alt={heroData.name}
              width={400}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </ motion.div>
    </div >
  )
}

