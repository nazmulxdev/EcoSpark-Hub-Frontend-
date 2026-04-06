import { getMyDraftIdeas } from "@/actions/client/idea.client";
import { DraftIdeasClient } from "@/components/modules/member/idea/DraftIdeasClient";

export const metadata = {
  title: "Draft Ideas | Member Dashboard",
  description: "Continue working on your draft ideas",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function DraftIdeasPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const limit = params.limit ? parseInt(params.limit) : 10;

  const result = await getMyDraftIdeas(page, limit);
  console.log(result);

  if (result.error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-full">
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
            Failed to Load Drafts
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

  const drafts = result.data?.data || [];
  const meta = result.data?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  };

  return (
    <div className="space-y-8">
      <DraftIdeasClient
        initialDrafts={drafts}
        initialMeta={meta}
        currentPage={page}
        currentLimit={limit}
      />
    </div>
  );
}
