// app/(dashboard)/admin/dashboard/users/loading.tsx

"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

export default function UsersLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-full mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse mt-2" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                <div className="h-8 w-12 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-2" />
            </div>
          ))}
        </div>

        {/* Search Bar Skeleton */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm mb-6 overflow-hidden">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="h-11 w-full bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-11 w-20 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                <div className="h-11 w-24 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Info Skeleton */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>

        {/* Table Skeleton */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-zinc-800/50 border-b">
                <tr>
                  {[
                    "User",
                    "Role",
                    "Status",
                    "Joined",
                    "Member Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-full" />
                        <div>
                          <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded" />
                          <div className="h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded mt-1" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 rounded-full" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 rounded-full" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 w-28 bg-gray-200 dark:bg-zinc-800 rounded-full" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <div className="h-8 w-20 bg-gray-200 dark:bg-zinc-800 rounded" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              <Users className="w-5 h-5 text-green-500" />
            </motion.div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Loading users...
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
