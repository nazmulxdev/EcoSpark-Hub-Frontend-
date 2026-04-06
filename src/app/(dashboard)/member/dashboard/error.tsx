"use client";

import { ErrorPage } from "@/components/shared/Error/ErrorPage";

export default function MemberDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      error={error}
      title="Failed to Load Dashboard"
      message="Unable to load your dashboard. Please check your connection and try again."
      reset={reset}
      showHomeButton={true}
    />
  );
}
