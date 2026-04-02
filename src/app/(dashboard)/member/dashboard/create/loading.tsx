import { Loader2 } from "lucide-react";

export default function CreateIdeaLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading form...</p>
      </div>
    </div>
  );
}
