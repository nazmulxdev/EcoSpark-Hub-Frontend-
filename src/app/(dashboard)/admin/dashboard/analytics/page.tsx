import { getAnalysis } from "@/actions/client/admin.client";
import { AdminAnalysisClient } from "@/components/modules/admin/analysis/AdminAnalysisClient";

export const metadata = {
  title: "Payment Analytics | Admin Dashboard",
  description: "View payment analysis and revenue insights",
};

export default async function AdminAnalysisPage() {
  const result = await getAnalysis();

  if (result.error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-950/30 rounded-full mb-6">
            <svg
              className="w-10 h-10 text-red-600 dark:text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Failed to Load Analytics
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {result.error.message || "Something went wrong"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const data = result.data;

  console.log(data);

  return (
    <div className="space-y-8">
      <AdminAnalysisClient data={data} />
    </div>
  );
}
