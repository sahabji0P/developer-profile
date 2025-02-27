"use client"

import { Button } from "@/components/ui/button"
import { heroData } from "@/data/hero"
import { motion } from "framer-motion"
import { MapPin, Send } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"

export function HeroSection() {
  const [greeting, setGreeting] = useState("Hello")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 rounded-lg ">
      <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
        <Image
          src={heroData.image || "/SJ8.jpg"}
          alt={heroData.name}
          width={200}
          height={200}
          className="rounded-full hover:shadow-lg hover:shadow-foreground/20"
        />
      </motion.div>
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-1">
          {greeting}, I&apos;m
        </h1>
        <motion.p
          whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}
          className="text-primary text-5xl md:text-6xl font-bold mb-2">
          {heroData.name}
        </motion.p>

        <p className="text-muted-foreground font-semibold pb-4">@sahabji0P</p>

        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
          {heroData.tagline.split(" | ").map((tag, index) => (
            <Badge key={index} className="text-sm md:text-xsm font-normal" variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-primary" />
            <span className="text- text-white">{heroData.location}</span>
          </div>
          <Button
            variant="outline"
            className="animate-fade-up hover:bg-violet-500/50 hover:text-white transition-colors"
            onClick={() => {
              const contactSection = document.getElementById("contact-section")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Connect with me <Send className="ml-2 w-4 h-4" />
          </Button>
        </div>

      </div>
    </div>
  )
}

