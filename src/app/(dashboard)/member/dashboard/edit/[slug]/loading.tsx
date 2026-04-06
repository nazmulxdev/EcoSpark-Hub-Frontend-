"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export default function EditIdeaLoading() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 dark:bg-zinc-800 rounded-2xl mb-4 animate-pulse" />
        <div className="h-8 w-32 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto mb-2 animate-pulse" />
        <div className="h-5 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto animate-pulse" />
      </motion.div>

      {/* Back Link Skeleton */}
      <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded mb-6 animate-pulse" />

      {/* Form Skeleton */}
      <form className="space-y-5">
        {/* Title Field Skeleton */}
        <div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-800 rounded mb-2 animate-pulse" />
          <div className="h-12 w-full bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
        </div>

        {/* Category Field Skeleton */}
        <div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded mb-2 animate-pulse" />
          <div className="h-12 w-full bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
        </div>

        {/* Access Type Buttons Skeleton */}
        <div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded mb-2 animate-pulse" />
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Problem Statement Skeleton */}
        <div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded mb-2 animate-pulse" />
          <div className="h-28 w-full bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
        </div>

        {/* Proposed Solution Skeleton */}
        <div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded mb-2 animate-pulse" />
          <div className="h-32 w-full bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
        </div>

        {/* Description Skeleton */}
        <div>
          <div className="h-4 w-36 bg-gray-200 dark:bg-zinc-800 rounded mb-2 animate-pulse" />
          <div className="h-48 w-full bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
        </div>

        {/* Existing Images Skeleton */}
        <div>
          <div className="h-4 w-28 bg-gray-200 dark:bg-zinc-800 rounded mb-2 animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* New Images Upload Skeleton */}
        <div>
          <div className="h-4 w-40 bg-gray-200 dark:bg-zinc-800 rounded mb-2 animate-pulse" />
          <div className="border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-xl p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div className="h-24 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>

        {/* Info Box Skeleton */}
        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-gray-200 dark:border-zinc-800">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse shrink-0" />
            <div className="flex-1">
              <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded mb-2 animate-pulse" />
              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded mt-1 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Submit Button Skeleton */}
        <div className="h-12 w-full bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
      </form>

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
