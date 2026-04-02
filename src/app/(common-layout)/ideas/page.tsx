import { getAllIdeasPublic } from "@/actions/client/idea.client";
import { PublicIdeasClient } from "@/components/modules/ideas/PublicIdeaClient";
import { RefreshButton } from "@/components/ui/refresh-button";

export const metadata = {
  title: "Sustainability Ideas | EcoSpark Hub",
  description: "Explore innovative sustainability ideas from our community",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    searchTerm?: string;
    accessType?: string;
    categoryId?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function PublicIdeasPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const limit = params.limit ? parseInt(params.limit) : 12;
  const searchTerm = params.searchTerm || "";
  const accessType = params.accessType || "";
  const categoryId = params.categoryId || "";
  const sortBy = params.sortBy || "createdAt";
  const sortOrder = params.sortOrder || "desc";

  const result = await getAllIdeasPublic(
    page,
    limit,
    searchTerm,
    "",
    accessType,
    categoryId,
    sortBy,
    sortOrder,
  );

  if (result.error) {
    const errorMessage =
      result.error &&
      typeof result.error === "object" &&
      "message" in result.error
        ? String((result.error as { message: string }).message)
        : "Something went wrong";

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
            Failed to Load Ideas
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {errorMessage}
          </p>
          <RefreshButton />
        </div>
      </div>
    );
  }

  const ideas = result.data?.data || [];
  const meta = result.data?.meta || {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <PublicIdeasClient
        initialIdeas={ideas}
        initialMeta={meta}
        currentPage={page}
        currentLimit={limit}
        currentSearchTerm={searchTerm}
        currentAccessType={accessType}
        currentCategoryId={categoryId}
        currentSortBy={sortBy}
        currentSortOrder={sortOrder}
      />
    </div>
  );
}
