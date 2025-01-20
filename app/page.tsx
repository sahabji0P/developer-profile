"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  DiscIcon as Discord,
  Github,
  MapPin,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";

export default function Home() {
  const socialLinks = [
    {
      icon: <Youtube className="h-8 w-8" />,
      href: "#",
      bgColor: "bg-red-500 hover:bg-red-600",
    },
    {
      icon: <Github className="h-8 w-8" />,
      href: "#",
      bgColor: "bg-green-600 hover:bg-green-700",
    },
    {
      icon: <Discord className="h-8 w-8" />,
      href: "#",
      bgColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: <Twitter className="h-8 w-8" />,
      href: "#",
      bgColor: "bg-black hover:bg-gray-900",
    },
  ];

  return (
    <main className="min-h-screen p-8 mt-10 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 md:grid-cols-[2fr,1fr]"
        >
          <div className="bg-card rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-4">
              {/* <Image
                src="/SJ8.jpg"
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full"
              /> */}

              <Avatar className="size-28 border hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300 ease-in-out">
                <AvatarImage src="/SJ8.jpg" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-3xl font-bold font-space">
                  Hi, I&apos;m Shashwat!
                </h1>
                <p className="text-muted-foreground">
                  I play with data and frameworks.
                </p>
              </div>
            </div>
            <Button variant="link" className="text-primary">
              Contact me →
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`${link.bgColor} rounded-lg p-6 flex items-center justify-center text-white transition-colors`}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-card rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold font-space mb-2">
            I love Open Source.
          </h2>
          <p className="text-muted-foreground">
            I take part in Quira Quests. I love working with Python, Typescript
            and SQL.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-[1fr,2fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-card rounded-lg p-6 flex items-center justify-center gap-2"
          >
            <MapPin className="text-muted-foreground" />
            <span>Khekra, Uttar Pradesh, India</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-card rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Shoot an email</h3>
            <div className="flex gap-2">
              <Input type="email" placeholder="your@email.com" />
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Send Mail
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-sm text-muted-foreground"
        >
          ©️SJ | 2025
        </motion.footer>
      </div>
    </main>
  );
}
