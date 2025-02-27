"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MaintenancePage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="max-w-md text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Journal is Under Maintenance
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          I am currently working on updates to improve reading experience.
          Please check back soon!
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="hover:bg-violet-500/50 hover:text-white transition-colors"
        >
          Go Back Home
        </Button>
      </motion.div>
    </div>
  );
}
