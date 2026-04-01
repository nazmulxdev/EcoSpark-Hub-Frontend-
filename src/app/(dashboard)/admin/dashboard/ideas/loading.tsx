export default function IdeasLoading() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl p-6">
            <div className="h-6 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-4" />
            <div className="h-8 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="flex-1 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
        <div className="w-32 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
        <div className="w-32 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-3" />
                <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="w-20 h-8 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
