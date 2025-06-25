"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, MessageCircle } from "lucide-react"
import Link from "next/link"

export function ContactSection() {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/sahabji0P",
      label: "GitHub",
      color: "bg-gray-800 hover:bg-gray-700",
      description: "Code & Projects"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/itsshashwatjain/",
      label: "LinkedIn",
      color: "bg-blue-600 hover:bg-blue-700",
      description: "Professional Network"
    },
    {
      icon: Twitter,
      href: "https://twitter.com/itsshashwatj",
      label: "Twitter",
      color: "bg-sky-500 hover:bg-sky-600",
      description: "Thoughts & Updates"
    },
    {
      icon: Mail,
      href: "mailto:shashwatjain2k3@gmail.com",
      label: "Email",
      color: "bg-red-600 hover:bg-red-700",
      description: "Direct Contact"
    },
    {
      icon: MessageCircle,
      href: "#",
      label: "Discord",
      color: "bg-indigo-600 hover:bg-indigo-700",
      description: "Community Chat"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  }

  return (
    <section id="contact-section" className="space-y-8">
      <div className="text-center space-y-3">
        <motion.h2 
          className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let's Connect
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ready to collaborate, share ideas, or just have a chat? Find me on these platforms!
        </motion.p>
      </div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {socialLinks.map((link, index) => (
          <motion.div key={link.label} variants={itemVariants}>
            <Link 
              href={link.href} 
              target={link.href.startsWith('#') ? '_self' : '_blank'}
              rel={link.href.startsWith('#') ? '' : 'noopener noreferrer'}
            >
              <motion.div
                className={`group relative p-6 rounded-2xl ${link.color} text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl bento-card border border-white/10`}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
                    <link.icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{link.label}</h3>
                    <p className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                      {link.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="text-center pt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-muted-foreground">
          Designed by{" "}
          <span className="font-semibold text-primary">
            @shashwat jain
          </span>
        </p>
      </motion.div>
    </section>
  )
}

