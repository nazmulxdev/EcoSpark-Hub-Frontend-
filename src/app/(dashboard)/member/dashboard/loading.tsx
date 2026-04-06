// app/(dashboard)/member/dashboard/loading.tsx

"use client";

import { motion } from "framer-motion";
import { Award, Lightbulb } from "lucide-react";

export default function MemberDashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Section Skeleton */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse mt-2" />
          </div>
          <div className="h-10 w-32 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Member Status Card Skeleton */}
      <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
            <div>
              <div className="h-4 w-28 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-6 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-1" />
            </div>
          </div>
          <div className="h-4 w-28 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-8 w-12 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-2" />
              </div>
              <div className="w-11 h-11 bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Idea Status Chart Skeleton */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5">
          <div className="h-6 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-8 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2 animate-pulse" />
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800">
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-8 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Recent Ideas Skeleton */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-28 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="h-8 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-3 rounded-lg">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div className="flex-1">
                    <div className="h-5 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <div className="h-5 w-20 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
                      <div className="h-5 w-16 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
                      <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-12 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-12 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-4 text-center"
          >
            <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-full mx-auto mb-2 animate-pulse" />
            <div className="h-5 w-28 bg-gray-200 dark:bg-zinc-800 rounded mx-auto mb-1 animate-pulse" />
            <div className="h-3 w-32 bg-gray-200 dark:bg-zinc-800 rounded mx-auto animate-pulse" />
          </div>
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
            <Award className="w-5 h-5 text-green-500" />
          </motion.div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </span>
        </div>
      </motion.div>
    </div>
  );
}
