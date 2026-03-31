"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md space-y-6">
        <div className="inline-flex p-4 bg-error/10 rounded-full">
          <AlertCircle className="w-12 h-12 text-error" />
        </div>

        <div className="space-y-2">
          <h1 className="headline-md">Something went wrong!</h1>
          <p className="text-foreground-muted">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
          <Link href="/" className="btn-secondary">
            <Home className="w-4 h-4" />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
