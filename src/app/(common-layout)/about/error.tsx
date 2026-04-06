"use client";

import { ErrorPage } from "@/components/shared/Error/ErrorPage";

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      error={error}
      title="Failed to Load Page"
      message="Unable to load the About Us page. Please check your connection and try again."
      reset={reset}
      showHomeButton={true}
    />
  );
}
