"use client";

import { motion } from "framer-motion";
import { FolderTree } from "lucide-react";

export default function CategoriesLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse mt-2" />
        </div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-8 w-12 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
            <div className="h-8 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-2" />
            <div className="h-3 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-2" />
          </div>
        ))}
      </div>

      {/* Categories Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
                <div>
                  <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-1" />
                </div>
              </div>
              <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
              <div className="flex-1">
                <div className="h-3 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-1" />
                <div className="h-4 w-12 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
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
            <FolderTree className="w-5 h-5 text-green-500" />
          </motion.div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Loading categories...
          </span>
        </div>
      </motion.div>
    </div>
  );
}
