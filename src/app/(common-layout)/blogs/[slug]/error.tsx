"use client";

import { ErrorPage } from "@/components/shared/Error/ErrorPage";

export default function BlogDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      error={error}
      title="Failed to Load Article"
      message="Unable to load the blog article. Please check your connection and try again."
      reset={reset}
      showHomeButton={true}
    />
  );
}
