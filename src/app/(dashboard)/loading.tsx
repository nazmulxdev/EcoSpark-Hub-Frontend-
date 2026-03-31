"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
            <Leaf className="w-16 h-16 text-green-500 relative z-10" />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-gray-900 dark:text-white mb-3"
        >
          Loading Dashboard
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 mb-6"
        >
          Preparing your workspace...
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto h-1 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            animate={{
              width: ["0%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
          />
        </div>

        {/* Loading Dots */}
        <div className="flex items-center justify-center gap-1 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -5, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 bg-green-500 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
