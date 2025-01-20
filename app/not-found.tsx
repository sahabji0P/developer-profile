"use client";

import { motion } from "framer-motion";
import { Construction, FileTextIcon, HomeIcon, MoveLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// 404 Not Found Page
export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div 
        className="text-center max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={childVariants}
          className="text-9xl font-bold text-primary mb-4"
        >
          404
        </motion.div>
        <motion.h1 
          variants={childVariants}
          className="text-4xl font-bold mb-4"
        >
          Page Not Found
        </motion.h1>
        <motion.p 
          variants={childVariants}
          className="text-muted-foreground mb-8"
        >
          Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
        </motion.p>
        <motion.div 
          variants={childVariants}
          className="space-x-4"
        >
          <Button asChild>
            <Link href="/" className="inline-flex items-center">
              <HomeIcon className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blog" className="inline-flex items-center">
              <FileTextIcon className="mr-2 h-4 w-4" />
              Blogging
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Under Development Page


