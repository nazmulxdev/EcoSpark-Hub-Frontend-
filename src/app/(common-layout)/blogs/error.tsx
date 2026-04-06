"use client";

import { ErrorPage } from "@/components/shared/Error/ErrorPage";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      error={error}
      title="Failed to Load Blog"
      message="Unable to load blog articles. Please check your connection and try again."
      reset={reset}
      showHomeButton={true}
    />
  );
}
