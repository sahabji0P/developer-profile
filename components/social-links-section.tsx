"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, MailIcon, Twitter } from "lucide-react"
import Link from "next/link"




export function SocialLinksSection() {

  const socialLinksData = [
    { icon: Github, href: "https://github.com/sahabji0P", label: "GitHub", color: "bg-green-600" },
    { icon: MailIcon, href: "mailto:shashwatjain2k3@gmail.com", label: "YouTube", color: "bg-red-500" },
    { icon: Twitter, href: "https://twitter.com/itsshashwatj", label: "Twitter", color: "bg-cyan-600" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/itsshashwatjain/", label: "Email", color: "bg-blue-500" },
  ]


  return (
    <div className="p-4 grid grid-cols-2 gap-3 md:gap-8">
      {socialLinksData.map((link, index) => (
        <Link key={link.label} href={link.href} target="_blank" >
          <motion.div


            className={`flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl ${link.color} hover:opacity-90`}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <link.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            <span className="sr-only">{link.label}</span>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}

