// app/(dashboard)/admin/dashboard/analysis/loading.tsx

"use client";

import { motion } from "framer-motion";
import { BarChart3, DollarSign, CreditCard, Wallet } from "lucide-react";

export default function AnalysisLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-full mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-9 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          <div className="h-5 w-64 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse mt-2" />
        </div>

        {/* Total Revenue Card Skeleton */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-24 bg-white/30 rounded animate-pulse" />
                <div className="h-10 w-32 bg-white/30 rounded animate-pulse mt-2" />
                <div className="h-4 w-40 bg-white/30 rounded animate-pulse mt-2" />
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <DollarSign className="w-8 h-8 text-white/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Membership Card Skeleton */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl">
                    <CreditCard className="w-5 h-5 text-indigo-600/50 dark:text-indigo-400/50" />
                  </div>
                  <div>
                    <div className="h-5 w-40 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-28 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-1" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-gray-200 dark:bg-zinc-800 animate-pulse" />
              </div>
              <div className="mt-6 space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-zinc-800 animate-pulse" />
                      <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                      <div className="h-3 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ideas Card Skeleton */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-50 dark:bg-cyan-950/30 rounded-xl">
                  <Wallet className="w-5 h-5 text-cyan-600/50 dark:text-cyan-400/50" />
                </div>
                <div>
                  <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-28 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-1" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-gray-200 dark:bg-zinc-800 animate-pulse" />
              </div>
              <div className="mt-6 space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-zinc-800 animate-pulse" />
                      <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                      <div className="h-3 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Comparison Chart Skeleton */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-xl">
                <BarChart3 className="w-5 h-5 text-purple-600/50 dark:text-purple-400/50" />
              </div>
              <div>
                <div className="h-5 w-40 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-1" />
              </div>
            </div>
          </div>

          <div className="h-80 flex items-center justify-center">
            <div className="w-full h-64 flex items-end gap-8 justify-center">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-20 h-48 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                  <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Summary Table Skeleton */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex justify-between">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                      <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
              <BarChart3 className="w-5 h-5 text-green-500" />
            </motion.div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Loading analytics...
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
