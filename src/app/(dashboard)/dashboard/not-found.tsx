import Link from "next/link";
import { Home, LayoutDashboard, AlertTriangle } from "lucide-react";

export default function UserDashboardNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-100 dark:bg-yellow-950/30 rounded-full mb-6">
          <AlertTriangle className="w-12 h-12 text-yellow-600 dark:text-yellow-500" />
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Dashboard Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The dashboard page you&apos;re looking for doesn&apos;t exist or you
          may not have access.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md"
          >
            <LayoutDashboard className="w-4 h-4" />
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
