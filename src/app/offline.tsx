import Link from "next/link";
import { WifiOff, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-zinc-800 rounded-full mb-6">
          <WifiOff className="w-12 h-12 text-gray-500 dark:text-gray-400" />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          You&apos;re Offline
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          It looks like you&apos;ve lost your internet connection. Please check
          your connection and try again.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Previously loaded content note */}
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-8">
          Previously loaded content may still be available
        </p>
      </div>
    </div>
  );
}
