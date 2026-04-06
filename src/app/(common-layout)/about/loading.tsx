"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-6 animate-pulse" />
          <div className="h-12 w-64 bg-white/20 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-white/20 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>

      {/* Mission Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="h-6 w-24 bg-gray-200 dark:bg-zinc-800 rounded-full mb-4 animate-pulse" />
            <div className="h-10 w-80 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-4 animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
            <div className="mt-4 space-y-3">
              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white dark:bg-zinc-900 rounded-xl shadow-md mb-3 animate-pulse" />
                    <div className="h-7 w-16 bg-gray-200 dark:bg-zinc-800 rounded mx-auto mt-2 animate-pulse" />
                    <div className="h-3 w-20 bg-gray-200 dark:bg-zinc-800 rounded mx-auto mt-1 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section Skeleton */}
      <div className="bg-white dark:bg-zinc-900 border-y border-gray-100 dark:border-zinc-800 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-5 w-96 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-200 dark:bg-zinc-800 rounded-xl mb-4 animate-pulse" />
                <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded mx-auto mb-2 animate-pulse" />
                <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded mx-auto mt-1 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <div className="h-10 w-40 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-5 w-96 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6"
            >
              <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-4 animate-pulse" />
              <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded mb-2 animate-pulse" />
              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded mt-1 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section Skeleton */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm mb-6 animate-pulse" />
          <div className="h-10 w-64 bg-white/20 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-5 w-96 bg-white/20 rounded-lg mx-auto mb-8 animate-pulse" />
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="h-11 w-40 bg-white/20 rounded-lg animate-pulse" />
            <div className="h-11 w-32 bg-white/20 rounded-lg animate-pulse" />
          </div>
          <div className="h-4 w-80 bg-white/20 rounded-lg mx-auto mt-6 animate-pulse" />
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
            <Leaf className="w-5 h-5 text-green-500" />
          </motion.div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Loading about us...
          </span>
        </div>
      </motion.div>
    </div>
  );
}
