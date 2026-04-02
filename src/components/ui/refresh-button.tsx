"use client";

export function RefreshButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      Try Again
    </button>
  );
}
