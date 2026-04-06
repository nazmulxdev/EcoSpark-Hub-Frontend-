"use client";

import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  error?: Error & { digest?: string };
  title?: string;
  message?: string;
  reset?: () => void;
  showHomeButton?: boolean;
}

export function ErrorPage({
  error,
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again.",
  reset,
  showHomeButton = true,
}: ErrorPageProps) {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Error Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-950/30 rounded-2xl mb-4"
        >
          <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-500" />
        </motion.div>

        {/* Error Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
        >
          {title}
        </motion.h2>

        {/* Error Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 dark:text-gray-400 mb-6"
        >
          {message}
        </motion.p>

        {/* Error Details (for development) */}
        {error && process.env.NODE_ENV === "development" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 p-4 bg-gray-100 dark:bg-zinc-800 rounded-lg text-left overflow-auto"
          >
            <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {reset && (
            <Button
              onClick={reset}
              className="bg-green-600 hover:bg-green-700 gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>

          {showHomeButton && (
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
