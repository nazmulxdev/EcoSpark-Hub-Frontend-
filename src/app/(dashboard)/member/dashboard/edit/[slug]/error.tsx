"use client";

import { ErrorPage } from "@/components/shared/Error/ErrorPage";

export default function EditIdeaError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      error={error}
      title="Failed to Load Idea"
      message="Unable to load the idea for editing. Please check your connection and try again."
      reset={reset}
      showHomeButton={false}
    />
  );
}
