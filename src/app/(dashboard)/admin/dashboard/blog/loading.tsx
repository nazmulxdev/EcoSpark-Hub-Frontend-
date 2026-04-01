import { Loader2, Newspaper } from "lucide-react";

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
              <div className="h-4 w-64 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse mt-2" />
            </div>
            <div className="h-10 w-32 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                <div className="h-8 w-12 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-2" />
            </div>
          ))}
        </div>

        {/* Search and Filter Skeleton */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm mb-6 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="h-11 w-full bg-gray-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
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
          <div className="h-5 w-48 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-5 w-8 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>

        {/* Blog List Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Skeleton */}
                <div className="md:w-48 h-48 bg-gray-200 dark:bg-zinc-800 animate-pulse" />

                {/* Content Skeleton */}
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-6 w-20 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
                        <div className="h-6 w-24 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
                      </div>
                      <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-2" />
                      <div className="space-y-2 mt-2">
                        <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 w-16 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                      <div className="h-8 w-16 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                      <div className="h-8 w-16 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-between items-center mt-6 pt-2">
          <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-9 w-24 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
            <div className="h-9 w-24 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="fixed bottom-8 right-8 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-full shadow-lg p-3 flex items-center gap-2">
            <Loader2 className="w-5 h-5 text-green-500 animate-spin" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Loading blogs...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
