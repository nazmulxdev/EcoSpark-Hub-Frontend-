import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditIdeaNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 dark:bg-amber-950/30 rounded-full mb-6">
          <FileQuestion className="w-10 h-10 text-amber-600 dark:text-amber-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Idea Not Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The idea you&apos;re trying to edit doesn&apos;t exist or has already
          been submitted for review.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/member/dashboard/ideas">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to My Ideas
            </Button>
          </Link>
          <Link href="/member/dashboard/create">
            <Button className="bg-green-600 hover:bg-green-700">
              Create New Idea
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
