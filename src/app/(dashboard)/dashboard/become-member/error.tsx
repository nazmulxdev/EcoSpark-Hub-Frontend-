"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Home, Crown } from "lucide-react";

export default function BecomeMemberError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Become member page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Animated Icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="absolute inset-0 bg-red-100 dark:bg-red-950/50 rounded-full animate-ping opacity-75" />
          <div className="relative inline-flex items-center justify-center w-24 h-24 bg-red-100 dark:bg-red-950/30 rounded-full">
            <Crown className="w-12 h-12 text-red-600 dark:text-red-500" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Membership Error
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error.message ||
            "An unexpected error occurred while processing your membership request."}
        </p>

        {/* Error Details */}
        <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-4 mb-6">
          <p className="text-xs text-red-700 dark:text-red-400 font-mono break-all">
            {error.stack?.split("\n")[0] || "Unknown error"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
