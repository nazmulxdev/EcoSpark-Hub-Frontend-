import { Loader2 } from "lucide-react";

export default function BecomeMemberLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gray-200 dark:bg-zinc-800 rounded-2xl mx-auto mb-6 animate-pulse" />
          <div className="h-10 w-64 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Pricing Card Skeleton */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="h-24 bg-gray-200 dark:bg-zinc-800 animate-pulse" />
            <div className="p-8 text-center">
              <div className="h-12 w-32 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto mb-4 animate-pulse" />
              <div className="h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto animate-pulse" />
            </div>
          </div>
        </div>

        {/* Benefits Grid Skeleton */}
        <div className="mb-12">
          <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-zinc-800"
              >
                <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl mb-4 animate-pulse" />
                <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded mb-2 animate-pulse" />
                <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Payment Options Skeleton */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6">
            <div className="h-6 w-48 bg-gray-200 dark:bg-zinc-800 rounded mb-4 animate-pulse" />
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 border border-gray-200 dark:border-zinc-700 rounded-xl"
                >
                  <div className="w-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mt-1" />
                  <div className="flex-1">
                    <div className="h-5 w-24 bg-gray-200 dark:bg-zinc-800 rounded mb-1 animate-pulse" />
                    <div className="h-3 w-48 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="text-center">
          <div className="w-48 h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl mx-auto animate-pulse" />
        </div>

        {/* Loading Indicator */}
        <div className="fixed bottom-8 right-8 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-full shadow-lg p-3 flex items-center gap-2">
            <Loader2 className="w-5 h-5 text-green-500 animate-spin" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Loading...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
