import { memberDashboardData } from "@/actions/client/member.client";
import { MemberDashboardClient } from "@/components/modules/member/dashbard/MemberDashbardclient";

export const metadata = {
  title: "Member Dashboard | EcoSpark Hub",
  description: "Manage your ideas and track your impact",
};

export default async function MemberDashboardPage() {
  const result = await memberDashboardData();

  if (result.error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-950/30 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-red-500"
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
          <p className="text-gray-600 dark:text-gray-400">
            {result.error.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  const dashboardData = result.data;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <MemberDashboardClient dashboardData={dashboardData} />
    </div>
  );
}
