"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { heroData } from "@/data/hero"

export function HeroSection() {
  const [greeting, setGreeting] = useState("Hello")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 rounded-lg">
      <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
        <Image
          src={heroData.image || "/placeholder.svg"}
          alt={heroData.name}
          width={200}
          height={200}
          className="rounded-full"
        />
      </motion.div>
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {greeting}, I&apos;m {heroData.name}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-4">{heroData.tagline}</p>
        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
          <MapPin className="text-primary" />
          <span>{heroData.location}</span>
        </div>
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
          onClick={() => {
            const contactSection = document.getElementById("contact-section")
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          Connect with me
        </Button>
      </div>
    </div>
  )
}

