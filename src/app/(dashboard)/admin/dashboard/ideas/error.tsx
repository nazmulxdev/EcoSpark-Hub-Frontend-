"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function IdeasError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Ideas page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-950/30 rounded-full mb-6">
          <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Failed to Load Ideas
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error.message || "An unexpected error occurred while loading ideas."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
