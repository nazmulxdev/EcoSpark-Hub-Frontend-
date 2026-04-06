import Link from "next/link";
import { Lightbulb, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IdeaNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 dark:bg-amber-950/30 rounded-full mb-6">
          <Lightbulb className="w-10 h-10 text-amber-600 dark:text-amber-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Idea Not Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The sustainability idea you&apos;re looking for doesn&apos;t exist or
          has been removed.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/ideas">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Ideas
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-green-600 hover:bg-green-700">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
