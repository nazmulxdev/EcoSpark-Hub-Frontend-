import { getDashboardStats } from "@/actions/client/users.client";
import { UserDashboardClient } from "@/components/modules/user/dashboard/UserDashboardClient";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My Dashboard | EcoSpark Hub",
  description: "View your activity and impact on the platform",
};

export default async function UserDashboardPage() {
  const result = await getDashboardStats();

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
            Failed to Load Dashboard
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {result.error.message ||
              "Something went wrong loading your dashboard"}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const data = result.data;

  console.log(data);

  return (
    <div className="space-y-8">
      <UserDashboardClient data={data} />
    </div>
  );
}
