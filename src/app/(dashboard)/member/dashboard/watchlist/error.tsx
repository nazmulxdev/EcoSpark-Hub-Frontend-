"use client";

import { ErrorPage } from "@/components/shared/Error/ErrorPage";

export default function WatchlistError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      error={error}
      title="Failed to Load Watchlist"
      message="Unable to load your saved ideas. Please check your connection and try again."
      reset={reset}
      showHomeButton={false}
    />
  );
}
