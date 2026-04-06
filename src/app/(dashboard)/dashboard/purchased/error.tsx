"use client";

import { ErrorPage } from "@/components/shared/Error/ErrorPage";

export default function PurchasedIdeasError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      error={error}
      title="Failed to Load Purchased Ideas"
      message="Unable to load your purchased ideas. Please check your connection and try again."
      reset={reset}
      showHomeButton={false}
    />
  );
}
