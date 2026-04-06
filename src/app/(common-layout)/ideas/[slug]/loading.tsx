"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export default function IdeaDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back Button Skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
          {/* Hero Image Skeleton */}
          <div className="h-64 md:h-96 bg-gray-200 dark:bg-zinc-800 animate-pulse" />

          <div className="p-6 md:p-8">
            {/* Header Skeleton */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-1 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="h-10 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded mb-4 animate-pulse" />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Stats Bar Skeleton */}
            <div className="flex flex-wrap gap-6 justify-between items-center mb-8 pb-6 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-5 w-8 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-5 w-8 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-9 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-9 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-6 w-40 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Loading Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <div className="bg-white dark:bg-zinc-900 rounded-full shadow-lg p-3 flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <Lightbulb className="w-5 h-5 text-green-500" />
          </motion.div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Loading idea...
          </span>
        </div>
      </motion.div>
    </div>
  );
}
