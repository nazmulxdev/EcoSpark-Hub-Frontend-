"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function DraftIdeasLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-full mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
              <div className="h-8 w-32 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
            </div>
            <div className="h-4 w-64 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-28 bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                <div className="h-7 w-12 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-2" />
            </div>
          ))}
        </div>

        {/* Drafts List Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1">
                  {/* Badges Skeleton */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="h-5 w-16 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
                    <div className="h-5 w-20 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
                    <div className="h-5 w-16 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
                  </div>

                  {/* Title Skeleton */}
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-2" />

                  {/* Description Skeleton */}
                  <div className="space-y-1 mt-2">
                    <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  </div>

                  {/* Meta Skeleton */}
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                      <div className="h-3 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                      <div className="h-3 w-28 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Actions Skeleton */}
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                  <div className="w-8 h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                  <div className="w-20 h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                  <div className="w-8 h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-between items-center mt-6 pt-2">
          <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
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
              <FileText className="w-5 h-5 text-green-500" />
            </motion.div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Loading drafts...
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
