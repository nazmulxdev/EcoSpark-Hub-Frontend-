"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Lightbulb,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Users,
  Lock,
  FileText,
  ThumbsUp,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Plus,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { formatDistanceToNow } from "date-fns";
import { IdeaStatus, IdeaAccessType } from "@/types/enums";
import { deleteIdea, submitIdeaForReview } from "@/actions/client/idea.client";

interface Idea {
  id: string;
  title: string;
  slug: string;
  description: string;
  problemStatement: string;
  proposedSolution: string;
  status: IdeaStatus;
  accessType: IdeaAccessType;
  price?: number | null;
  rejectionFeedback?: string | null;
  createdAt: string;
  _count?: {
    votes: number;
    comments: number;
  };
  category: {
    name: string;
  };
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface MyIdeasClientProps {
  initialIdeas: Idea[];
  initialMeta: Meta;
  currentPage: number;
  currentLimit: number;
}

export function MyIdeasClient({
  initialIdeas,
  initialMeta,
}: MyIdeasClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);
  const [meta, setMeta] = useState<Meta>(initialMeta);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ideaToDelete, setIdeaToDelete] = useState<{
    slug: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    setIdeas(initialIdeas);
    setMeta(initialMeta);
  }, [initialIdeas, initialMeta]);

  const updateUrl = (params: Record<string, string | number>) => {
    const urlParams = new URLSearchParams();
    if (params.page && Number(params.page) > 1) {
      urlParams.set("page", String(params.page));
    }
    const newUrl = `${pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;
    startTransition(() => router.push(newUrl));
  };

  const goToPage = (page: number) => {
    updateUrl({ page });
  };

  const handleSubmit = async (slug: string, title: string) => {
    setActionLoading(slug);
    const toastId = toast.loading(`Submitting "${title}" for review...`);

    try {
      const result = await submitIdeaForReview(slug);
      if (result.error) {
        toast.error(result.error.message || "Failed to submit idea", {
          id: toastId,
        });
      } else {
        toast.success("Idea submitted for review!", { id: toastId });
        setIdeas(
          ideas.map((idea) =>
            idea.slug === slug
              ? { ...idea, status: IdeaStatus.UNDER_REVIEW }
              : idea,
          ),
        );
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!ideaToDelete) return;

    const { slug, title } = ideaToDelete;
    setActionLoading(slug);
    const toastId = toast.loading(`Deleting "${title}"...`);

    try {
      const result = await deleteIdea(slug);
      if (result.error) {
        toast.error(result.error.message || "Failed to delete idea", {
          id: toastId,
        });
      } else {
        toast.success("Idea deleted successfully!", { id: toastId });
        setIdeas(ideas.filter((idea) => idea.slug !== slug));
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setActionLoading(null);
      setDeleteDialogOpen(false);
      setIdeaToDelete(null);
    }
  };

  const openDeleteDialog = (slug: string, title: string) => {
    setIdeaToDelete({ slug, title });
    setDeleteDialogOpen(true);
  };

  const getStatusConfig = (status: IdeaStatus) => {
    switch (status) {
      case IdeaStatus.APPROVED:
        return {
          label: "Approved",
          icon: CheckCircle,
          color:
            "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
        };
      case IdeaStatus.REJECTED:
        return {
          label: "Rejected",
          icon: XCircle,
          color: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
        };
      case IdeaStatus.UNDER_REVIEW:
        return {
          label: "Under Review",
          icon: Clock,
          color:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
        };
      default:
        return {
          label: "Draft",
          icon: FileText,
          color:
            "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
        };
    }
  };

  const getAccessConfig = (type: IdeaAccessType, price?: number | null) => {
    switch (type) {
      case IdeaAccessType.FREE:
        return { label: "Free", icon: Eye };
      case IdeaAccessType.PAID:
        return {
          label: `Paid${price ? ` ($${price})` : ""}`,
          icon: DollarSign,
        };
      case IdeaAccessType.MEMBER_ONLY:
        return { label: "Members Only", icon: Users };
      default:
        return { label: "Unknown", icon: Lock };
    }
  };

  const stats = {
    total: meta.total,
    approved: ideas.filter((i) => i.status === IdeaStatus.APPROVED).length,
    pending: ideas.filter((i) => i.status === IdeaStatus.UNDER_REVIEW).length,
    draft: ideas.filter((i) => i.status === IdeaStatus.DRAFT).length,
    rejected: ideas.filter((i) => i.status === IdeaStatus.REJECTED).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Ideas
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Manage your submitted sustainability ideas
            </p>
          </div>
          <Link
            href="/member/dashboard/ideas/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Idea
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <Lightbulb className="w-5 h-5 text-blue-500" />
              <span className="text-xl font-bold">{stats.total}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Total</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-xl font-bold">{stats.approved}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Approved</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span className="text-xl font-bold">{stats.pending}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Pending</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <FileText className="w-5 h-5 text-gray-500" />
              <span className="text-xl font-bold">{stats.draft}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Draft</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-xl font-bold">{stats.rejected}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Rejected</p>
          </div>
        </div>

        {/* Ideas List */}
        {ideas.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-12 text-center">
            <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No ideas yet
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create your first idea to share with the community
            </p>
            <Link
              href="/member/dashboard/ideas/create"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />
              Create Idea
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {ideas.map((idea) => {
              const status = getStatusConfig(idea.status);
              const StatusIcon = status.icon;
              const access = getAccessConfig(idea.accessType, idea.price);
              const AccessIcon = access.icon;
              const voteCount = idea._count?.votes || 0;
              const commentCount = idea._count?.comments || 0;
              const isLoading = actionLoading === idea.slug;

              return (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={`${status.color} gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <AccessIcon className="w-3 h-3" />
                          {access.label}
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          {idea.category.name}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white hover:text-green-600 transition-colors">
                        {idea.title}
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
                        {idea.description || idea.problemStatement}
                      </p>

                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-3">
                        <span>
                          Created:{" "}
                          {formatDistanceToNow(new Date(idea.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                        <div className="flex gap-3">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" /> {voteCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" /> {commentCount}
                          </span>
                        </div>
                      </div>

                      {idea.rejectionFeedback && (
                        <div className="mt-3 p-2.5 bg-red-50 dark:bg-red-950/30 rounded-lg text-xs text-red-600">
                          <span className="font-semibold">Feedback:</span>{" "}
                          {idea.rejectionFeedback}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/ideas/${idea.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-500" />
                      </Link>

                      {idea.status === IdeaStatus.DRAFT && (
                        <Link
                          href={`/member/dashboard/edit/${idea.slug}`}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <Edit className="w-4 h-4 text-gray-500" />
                        </Link>
                      )}

                      {idea.status === IdeaStatus.DRAFT && (
                        <button
                          onClick={() => handleSubmit(idea.slug, idea.title)}
                          disabled={isLoading}
                          className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          {isLoading ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      )}

                      {idea.status === IdeaStatus.DRAFT && (
                        <Button
                          onClick={() =>
                            openDeleteDialog(idea.slug, idea.title)
                          }
                          disabled={isLoading}
                          variant="ghost"
                          size="icon"
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="flex justify-between items-center mt-6 pt-2">
            <p className="text-sm text-gray-500">
              Page {meta.page} of {meta.totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={meta.page === 1 || isPending}
                onClick={() => goToPage(meta.page - 1)}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={meta.page === meta.totalPages || isPending}
                onClick={() => goToPage(meta.page + 1)}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Idea"
        description={`Are you sure you want to delete "${ideaToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}
