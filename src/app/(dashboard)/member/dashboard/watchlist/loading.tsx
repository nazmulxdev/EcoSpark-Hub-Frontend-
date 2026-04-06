"use client";

import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";

export default function WatchlistLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-7 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>
        <div className="h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-1" />
      </div>

      {/* Watchlist Items Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-4"
          >
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Badges Skeleton */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <div className="h-5 w-16 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
                  <div className="h-3 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>

                {/* Title Skeleton */}
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-2" />

                {/* Description Skeleton */}
                <div className="space-y-1 mt-1">
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>

                {/* Meta Skeleton */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="h-3 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-12 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="h-3 w-12 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex gap-2">
                <div className="h-9 w-9 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                <div className="h-9 w-24 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center items-center mt-8 pt-4">
        <div className="flex gap-2">
          <div className="h-9 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-9 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
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
            <Bookmark className="w-5 h-5 text-green-500" />
          </motion.div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Loading watchlist...
          </span>
        </div>
      </motion.div>
    </div>
  );
}
