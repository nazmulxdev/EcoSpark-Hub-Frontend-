"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm mb-4 animate-pulse" />
          <div className="h-12 w-32 bg-white/20 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-white/20 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Bar Skeleton */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <div className="h-12 w-full bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 animate-pulse" />
            </div>
            <div className="h-12 w-24 bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Results Info Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden"
            >
              {/* Image Skeleton */}
              <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-zinc-800 animate-pulse" />

              <div className="p-5">
                {/* Meta Skeleton */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  </div>
                </div>

                {/* Title Skeleton */}
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded mb-2 animate-pulse" />

                {/* Excerpt Skeleton */}
                <div className="space-y-1 mb-4">
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>

                {/* Footer Skeleton */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-3.5 h-3.5 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                      <div className="h-3 w-8 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3.5 h-3.5 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                      <div className="h-3 w-8 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3.5 h-3.5 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                      <div className="h-3 w-12 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center items-center mt-12 pt-4">
          <div className="flex gap-2">
            <div className="h-9 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="h-9 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
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
            Loading articles...
          </span>
        </div>
      </motion.div>
    </div>
  );
}
