import { Loader2 } from "lucide-react";

export default function AdminDashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-full mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse mt-2" />
        </div>

        {/* KPIs Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-gray-200 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
                <div className="text-right">
                  <div className="h-8 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Engagement KPIs Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-gray-200 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
                <div className="text-right">
                  <div className="h-8 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section Skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-8 w-20 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
              <div className="h-8 w-24 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart Skeleton */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5">
              <div className="h-6 w-40 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-4" />
              <div className="h-80 bg-gray-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
            </div>

            {/* Top Ideas Skeleton */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5">
              <div className="h-6 w-48 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-4" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-3 rounded-lg">
                    <div className="h-5 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-2" />
                    <div className="flex gap-4">
                      <div className="h-3 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                      <div className="h-3 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5"
              >
                <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-4" />
                <div className="h-48 bg-gray-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Queues Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden"
            >
              <div className="p-5 border-b border-gray-200 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="h-6 w-48 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  </div>
                  <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="h-5 w-40 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-2" />
                        <div className="h-4 w-56 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-2" />
                        <div className="flex gap-3">
                          <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                          <div className="h-3 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="w-16 h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Loading Indicator */}
        <div className="fixed bottom-8 right-8 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-full shadow-lg p-3 flex items-center gap-2">
            <Loader2 className="w-5 h-5 text-green-500 animate-spin" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Loading dashboard...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
