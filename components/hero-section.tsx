"use client"

import { heroData } from "@/data/hero"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-5 py-16">
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
              I am {heroData.name}, currently a final year Engineering student from India, with majors in Computer Science. Professionally I am a {" "}
              <span className="font-semibold text-primary">Full-Stack Developer and AI Engineer </span>
              specializing in delivering scalable and robust systems.{" "} Additionally I had{" "}

              <Link href="/research/brain-tumor-classification-deit" className="text-primary hover:underline hover:underline-offset-8">
                <span className="font-semibold">Presented a Research Paper on Vision Transformer based system at IEEE Conference (IIT Indore)</span>
              </Link>


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
          <div className="w-56 h-56 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
            <Image
              src={heroData.image || "/sj.jpeg"}
              alt={heroData.name}
              width={200}
              height={200}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </ motion.div>
    </div >
  )
}

