// app/(dashboard)/member/dashboard/watchlist/page.tsx (SIMPLIFIED)

import { getWatchlist } from "@/actions/client/watchlist.client";
import { WatchlistClient } from "@/components/modules/member/wishlist/WatchlistClient";

export const metadata = {
  title: "My Watchlist | EcoSpark Hub",
  description: "View your saved ideas",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function WatchlistPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const limit = 10;

  const result = await getWatchlist(page, limit);

  if (result.error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Failed to Load Watchlist
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {result.error.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  const watchlistItems = result.data?.data || [];
  const meta = result.data?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  };

  return (
    <WatchlistClient
      initialItems={watchlistItems}
      initialMeta={meta}
      currentPage={page}
    />
  );
}
