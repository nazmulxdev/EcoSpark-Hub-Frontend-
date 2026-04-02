/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  FileText,
  Edit,
  Trash2,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Eye,
  Send,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { formatDistanceToNow } from "date-fns";
import { deleteIdea, submitIdeaForReview } from "@/actions/client/idea.client";

interface Draft {
  id: string;
  title: string;
  slug: string;
  description: string;
  problemStatement: string;
  proposedSolution: string;
  status: string;
  accessType: string;
  createdAt: string;
  updatedAt: string;
  category: {
    name: string;
  };
  _count?: {
    votes: number;
    comments: number;
  };
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface DraftIdeasClientProps {
  initialDrafts: Draft[];
  initialMeta: Meta;
  currentPage: number;
  currentLimit: number;
}

export function DraftIdeasClient({
  initialDrafts,
  initialMeta,
}: DraftIdeasClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [drafts, setDrafts] = useState<Draft[]>(initialDrafts);
  const [meta, setMeta] = useState<Meta>(initialMeta);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [draftToDelete, setDraftToDelete] = useState<{
    slug: string;
    title: string;
  } | null>(null);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [draftToSubmit, setDraftToSubmit] = useState<{
    slug: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    setDrafts(initialDrafts);
    setMeta(initialMeta);
  }, [initialDrafts, initialMeta]);

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

  const handleSubmit = async () => {
    if (!draftToSubmit) return;

    const { slug, title } = draftToSubmit;
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
        setDrafts(drafts.filter((draft) => draft.slug !== slug));
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setActionLoading(null);
      setSubmitDialogOpen(false);
      setDraftToSubmit(null);
    }
  };

  const handleDelete = async () => {
    if (!draftToDelete) return;

    const { slug, title } = draftToDelete;
    setActionLoading(slug);
    const toastId = toast.loading(`Deleting "${title}"...`);

    try {
      const result = await deleteIdea(slug);
      if (result.error) {
        toast.error(result.error.message || "Failed to delete draft", {
          id: toastId,
        });
      } else {
        toast.success("Draft deleted successfully!", { id: toastId });
        setDrafts(drafts.filter((draft) => draft.slug !== slug));
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setActionLoading(null);
      setDeleteDialogOpen(false);
      setDraftToDelete(null);
    }
  };

  const openDeleteDialog = (slug: string, title: string) => {
    setDraftToDelete({ slug, title });
    setDeleteDialogOpen(true);
  };

  const openSubmitDialog = (slug: string, title: string) => {
    setDraftToSubmit({ slug, title });
    setSubmitDialogOpen(true);
  };

  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const stats = {
    total: meta.total,
    lastUpdated:
      drafts.length > 0
        ? Math.max(...drafts.map((d) => new Date(d.updatedAt).getTime()))
        : null,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-xl">
                <FileText className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Draft Ideas
              </h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Continue working on your draft ideas before submitting for review
            </p>
          </div>
          <Link
            href="/member/dashboard/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Idea
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg">
                <FileText className="w-5 h-5 text-gray-500" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Total Drafts</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {drafts.length}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Pending Completion</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.lastUpdated
                  ? formatDate(new Date(stats.lastUpdated).toISOString())
                  : "N/A"}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Last Updated</p>
          </div>
        </div>

        {/* Drafts List */}
        {drafts.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-full mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No drafts yet
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create a new idea and save it as draft to continue later
            </p>
            <Link
              href="/member/dashboard/create"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create New Idea
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {drafts.map((draft) => {
              const isLoading = actionLoading === draft.slug;

              return (
                <motion.div
                  key={draft.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 gap-1">
                          <FileText className="w-3 h-3" />
                          Draft
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          {draft.category.name}
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          {draft.accessType?.replace("_", " ") || "Free"}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white hover:text-green-600 transition-colors">
                        {draft.title}
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
                        {draft.description || draft.problemStatement}
                      </p>

                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Last updated: {formatDate(draft.updatedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Created: {formatDate(draft.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/ideas/${draft.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-500" />
                      </Link>

                      <Link
                        href={`/member/dashboard/edit/${draft.slug}`}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Edit className="w-4 h-4 text-gray-500" />
                      </Link>

                      <button
                        onClick={() =>
                          openSubmitDialog(draft.slug, draft.title)
                        }
                        disabled={isLoading}
                        className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-1"
                      >
                        {isLoading ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Send className="w-3 h-3" />
                        )}
                        Submit
                      </button>

                      <Button
                        onClick={() =>
                          openDeleteDialog(draft.slug, draft.title)
                        }
                        disabled={isLoading}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
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
        title="Delete Draft"
        description={`Are you sure you want to delete "${draftToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        isLoading={actionLoading !== null}
      />

      {/* Submit Confirmation Dialog */}
      <ConfirmDialog
        open={submitDialogOpen}
        onOpenChange={setSubmitDialogOpen}
        onConfirm={handleSubmit}
        title="Submit for Review"
        description={`Are you ready to submit "${draftToSubmit?.title}" for review? Once submitted, you cannot edit until the review is complete.`}
        confirmText="Submit"
        cancelText="Cancel"
        variant="default"
        isLoading={actionLoading !== null}
      />
    </div>
  );
}
