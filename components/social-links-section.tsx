"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Youtube } from "lucide-react"




export function SocialLinksSection() {

  const socialLinksData = [
    { icon: Github, href: "github.com/sahabji0P", label: "GitHub", color: "bg-green-600" },
    { icon: Youtube, href: "#", label: "YouTube", color: "bg-red-500" },
    { icon: Twitter, href: "twitter.com/itsshashwatj", label: "Twitter", color: "bg-cyan-600" },
    { icon: Linkedin, href: "#", label: "Email", color: "bg-blue-500" },
  ]


  return (
    <div className="grid grid-cols-2 gap-4">
      {socialLinksData.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.href}
          className={`flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg ${link.color} hover:opacity-90 transition-all duration-300`}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.1 }}
        >
          <link.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          <span className="sr-only">{link.label}</span>
        </motion.a>
      ))}
    </div>
  )
}

