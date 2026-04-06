"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Bookmark,
  Eye,
  ThumbsUp,
  MessageSquare,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  DollarSign,
  Users,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { IdeaAccessType } from "@/types/enums";
import { removeFromWatchlist } from "@/actions/client/watchlist.client";

interface WatchlistItem {
  id: string;
  idea: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    accessType: IdeaAccessType;
    price?: number | null;
    createdAt: string;
    images?: string[];
    category: {
      name: string;
    };
    author: {
      name: string;
    };
    _count?: {
      votes: number;
      comments: number;
    };
  };
  createdAt: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface WatchlistClientProps {
  initialItems: WatchlistItem[];
  initialMeta: Meta;
  currentPage: number;
}

export function WatchlistClient({
  initialItems,
  initialMeta,
}: WatchlistClientProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [meta, setMeta] = useState(initialMeta);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = async (watchlistId: string, ideaId: string) => {
    setRemovingId(watchlistId);
    const toastId = toast.loading("Removing from watchlist...");

    try {
      const result = await removeFromWatchlist(ideaId);

      if (result.error) {
        toast.error(result.error.message || "Failed to remove", {
          id: toastId,
        });
        return;
      }

      toast.success("Removed from watchlist", { id: toastId });

      setItems((prev) => prev.filter((item) => item.id !== watchlistId));
      setMeta((prev) => ({ ...prev, total: prev.total - 1 }));

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setRemovingId(null);
    }
  };

  const getAccessBadge = (type: IdeaAccessType, price?: number | null) => {
    switch (type) {
      case IdeaAccessType.FREE:
        return {
          label: "Free",
          icon: Eye,
          color:
            "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
        };
      case IdeaAccessType.PAID:
        return {
          label: `Paid${price ? ` ($${price})` : ""}`,
          icon: DollarSign,
          color:
            "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
        };
      case IdeaAccessType.MEMBER_ONLY:
        return {
          label: "Members Only",
          icon: Users,
          color:
            "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
        };
      default:
        return {
          label: "Unknown",
          icon: Lock,
          color:
            "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
        };
    }
  };

  const goToPage = (page: number) => {
    router.push(`/member/dashboard/watchlist?page=${page}`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-full mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-full mb-4">
            <Bookmark className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Save interesting ideas to read them later
          </p>
          <Link href="/ideas">
            <Button className="bg-green-600 hover:bg-green-700">
              Browse Ideas
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-green-500" />
          My Watchlist
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {meta.total} saved {meta.total === 1 ? "idea" : "ideas"}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const idea = item.idea;
          const access = getAccessBadge(idea.accessType, idea.price);
          const AccessIcon = access.icon;
          const voteCount = idea._count?.votes || 0;
          const commentCount = idea._count?.comments || 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge className={`${access.color} gap-1 border-0`}>
                      <AccessIcon className="w-3 h-3" />
                      {access.label}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {idea.category.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(idea.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  <Link href={`/ideas/${idea.slug}`}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-green-600 transition-colors line-clamp-1">
                      {idea.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                    {idea.description || "No description available"}
                  </p>

                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span>By {idea.author.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {voteCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {commentCount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemove(item.id, idea.id)}
                    disabled={removingId === item.id}
                    className="h-9 px-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    {removingId === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/ideas/${idea.slug}`}>View Idea</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Simple Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 pt-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page === 1}
              onClick={() => goToPage(meta.page - 1)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <span className="px-4 py-1.5 text-sm text-gray-600 dark:text-gray-400">
              Page {meta.page} of {meta.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page === meta.totalPages}
              onClick={() => goToPage(meta.page + 1)}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
