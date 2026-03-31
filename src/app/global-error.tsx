"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md space-y-6">
            <div className="space-y-2">
              <h1 className="headline-md">Critical Error</h1>
              <p className="text-foreground-muted">
                Something went terribly wrong. Please try again later.
              </p>
            </div>
            <button onClick={reset} className="btn-primary">
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
