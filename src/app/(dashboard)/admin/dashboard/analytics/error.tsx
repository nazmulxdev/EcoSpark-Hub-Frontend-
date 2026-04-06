// app/(dashboard)/admin/dashboard/analysis/error.tsx

"use client";

import { ErrorPage } from "@/components/shared/Error/ErrorPage";

export default function AnalysisError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      error={error}
      title="Failed to Load Analytics"
      message="Unable to load payment analytics. Please check your connection and try again."
      reset={reset}
      showHomeButton={false}
    />
  );
}
