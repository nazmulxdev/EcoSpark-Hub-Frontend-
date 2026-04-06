"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function BlogDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* Back Button Skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>

      <div className="relative">
        {/* Cover Image Skeleton */}
        <div className="h-64 md:h-96 bg-gray-200 dark:bg-zinc-800 animate-pulse" />

        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Meta Info Skeleton */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>

              {/* Title Skeleton */}
              <div className="space-y-3 mb-6">
                <div className="h-10 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-10 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>

              {/* Stats Bar Skeleton */}
              <div className="flex flex-wrap justify-between items-center pb-6 mb-6 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-12 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-12 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-9 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>

              {/* Content Skeleton */}
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>

              {/* Share Section Skeleton */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
                <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded mb-4 animate-pulse" />
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-9 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse"
                    />
                  ))}
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
            <BookOpen className="w-5 h-5 text-green-500" />
          </motion.div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Loading article...
          </span>
        </div>
      </motion.div>
    </div>
  );
}
