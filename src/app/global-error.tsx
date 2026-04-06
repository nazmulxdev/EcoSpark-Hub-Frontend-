// app/global-error.tsx

"use client";

import { ErrorPage } from "@/components/shared/Error/ErrorPage";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <ErrorPage
          error={error}
          title="Something Went Wrong"
          message="We've encountered an unexpected error. Our team has been notified."
          reset={reset}
          showHomeButton={true}
        />
      </body>
    </html>
  );
}
