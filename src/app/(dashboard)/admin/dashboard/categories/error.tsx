"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, Home, FolderTree } from "lucide-react";
import Link from "next/link";

export default function CategoriesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Categories page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-950/50 rounded-2xl mb-6"
        >
          <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-500" />
        </motion.div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Failed to Load Categories
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error.message ||
            "An unexpected error occurred while loading categories."}
        </p>

        {/* Error Details */}
        <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-4 mb-6">
          <p className="text-sm text-red-700 dark:text-red-400 font-mono break-all">
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
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-6">
          If the problem persists, please contact support or refresh the page.
        </p>

        {/* Decorative */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <FolderTree className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-400">Category Management</span>
        </div>
      </motion.div>
    </div>
  );
}
