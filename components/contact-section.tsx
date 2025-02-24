"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", { name, email, message })
  }

  return (
    <section id="contact-section" className="space-y-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Got Something! Let's Talk</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <div>
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 transition-all duration-300 focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 transition-all duration-300 focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <Textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full p-2 h-32 transition-all duration-300 focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
      <p className="text-center text-muted-foreground mt-6">
        For casual chat, DM me on{" "}
        <a href="https://twitter.com/itsshashwatj" className="font-bold hover:underline">
          X
        </a>{" "}
        or{" "}
        <a href="https://www.linkedin.com/in/itsshashwatjain" className="font-bold hover:underline">
          LinkedIn
        </a>
        .
      </p>
    </section>
  )
}

