"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  Lightbulb,
  Search,
  X,
  Eye,
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
  Filter,
  RefreshCw,
  TrendingUp,
  AlertCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { IdeaStatus, IdeaAccessType } from "@/types/enums";
import { ApproveRejectModal } from "./ApproveRejectModal";
import { formatDistanceToNow } from "date-fns";

import { Idea } from "@/types/idea";

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface IdeasClientProps {
  initialIdeas: Idea[];
  initialMeta: Meta;
  currentPage: number;
  currentLimit: number;
  currentSearchTerm: string;
  currentStatus: string;
  currentAccessType: string;
  currentCategoryId: string;
}

export function IdeasClient({
  initialIdeas,
  initialMeta,
  currentSearchTerm,
  currentStatus,
  currentAccessType,
}: IdeasClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(currentSearchTerm);
  const [status, setStatus] = useState(currentStatus);
  const [access, setAccess] = useState(currentAccessType);
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateUrl = (params: Record<string, string | number>) => {
    const urlParams = new URLSearchParams();
    if (params.searchTerm && params.searchTerm !== "")
      urlParams.set("searchTerm", String(params.searchTerm));
    if (params.status && params.status !== "")
      urlParams.set("status", String(params.status));
    if (params.accessType && params.accessType !== "")
      urlParams.set("accessType", String(params.accessType));
    if (params.page && Number(params.page) > 1)
      urlParams.set("page", String(params.page));
    const newUrl = `${pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;
    startTransition(() => router.push(newUrl));
  };

  const handleSearch = () =>
    updateUrl({ searchTerm: search, status, accessType: access, page: 1 });
  const clearSearch = () => {
    setSearch("");
    updateUrl({ searchTerm: "", status, accessType: access, page: 1 });
  };
  const handleStatusChange = (val: string) => {
    const newStatus = val === "all" ? "" : val;
    setStatus(newStatus);
    updateUrl({
      searchTerm: search,
      status: newStatus,
      accessType: access,
      page: 1,
    });
  };
  const handleAccessChange = (val: string) => {
    const newAccess = val === "all" ? "" : val;
    setAccess(newAccess);
    updateUrl({ searchTerm: search, status, accessType: newAccess, page: 1 });
  };
  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setAccess("");
    setShowFilters(false);
    updateUrl({ searchTerm: "", status: "", accessType: "", page: 1 });
  };
  const goToPage = (page: number) =>
    updateUrl({ searchTerm: search, status, accessType: access, page });

  const handleApproveReject = async (
    idea: Idea,
    status: IdeaStatus,
    feedback?: string,
  ) => {
    setIsSubmitting(true);
    const toastId = toast.loading(
      status === IdeaStatus.APPROVED ? "Approving..." : "Rejecting...",
    );
    try {
      const { ideaApproveOrRejectWithFeedback } =
        await import("@/actions/client/admin.client");
      const result = await ideaApproveOrRejectWithFeedback(idea.slug, {
        status,
        rejectionFeedback:
          status === IdeaStatus.REJECTED ? feedback : undefined,
      });
      if (result.error) {
        toast.error(result.error.message, { id: toastId });
      } else {
        toast.success(
          status === IdeaStatus.APPROVED ? "Approved!" : "Rejected!",
          { id: toastId },
        );
        setModalOpen(false);
        setSelectedIdea(null);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusStyle = (s: IdeaStatus) => {
    switch (s) {
      case IdeaStatus.APPROVED:
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400";
      case IdeaStatus.REJECTED:
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400";
      case IdeaStatus.UNDER_REVIEW:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const accessIcon = (type: IdeaAccessType) => {
    switch (type) {
      case IdeaAccessType.FREE:
        return <Eye className="w-3 h-3" />;
      case IdeaAccessType.PAID:
        return <DollarSign className="w-3 h-3" />;
      case IdeaAccessType.MEMBER_ONLY:
        return <Users className="w-3 h-3" />;
      default:
        return <Lock className="w-3 h-3" />;
    }
  };

  const hasFilters = currentSearchTerm || currentStatus || currentAccessType;
  const pendingCount = initialIdeas.filter(
    (i) => i.status === IdeaStatus.UNDER_REVIEW,
  ).length;

  // Calculate total votes and comments safely
  const totalVotes = initialIdeas.reduce(
    (s, i) => s + (i.votes?.length || i._count?.votes || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Idea Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Review and moderate community ideas
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <Lightbulb className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {initialMeta.total}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Total Ideas
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {pendingCount}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Pending Review
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {
                  initialIdeas.filter((i) => i.status === IdeaStatus.APPROVED)
                    .length
                }
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Approved
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalVotes}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Total Votes
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm mb-6 overflow-hidden">
          {/* Search Row */}
          <div className="p-4 border-b border-gray-100 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by title, description, or problem statement..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-9 pr-9 h-11 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 focus:border-green-500 focus:ring-green-500"
                />
                {search && (
                  <Button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSearch}
                  disabled={isPending}
                  className="h-11 px-6 bg-green-600 hover:bg-green-700 text-white whitespace-nowrap"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Search"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-11 gap-2 whitespace-nowrap border-gray-200 dark:border-zinc-700"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
                  />
                </Button>
                {hasFilters && (
                  <Button
                    variant="ghost"
                    onClick={resetFilters}
                    className="h-11 gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="px-4 py-5 bg-gray-50 dark:bg-zinc-800/30 border-b border-gray-100 dark:border-zinc-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Status
                  </label>
                  <Select
                    value={status || "all"}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className="w-full h-11 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value={IdeaStatus.UNDER_REVIEW}>
                        Under Review
                      </SelectItem>
                      <SelectItem value={IdeaStatus.APPROVED}>
                        Approved
                      </SelectItem>
                      <SelectItem value={IdeaStatus.REJECTED}>
                        Rejected
                      </SelectItem>
                      <SelectItem value={IdeaStatus.DRAFT}>Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Access Type
                  </label>
                  <Select
                    value={access || "all"}
                    onValueChange={handleAccessChange}
                  >
                    <SelectTrigger className="w-full h-11 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700">
                      <SelectValue placeholder="All Access" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700">
                      <SelectItem value="all">All Access</SelectItem>
                      <SelectItem value={IdeaAccessType.FREE}>Free</SelectItem>
                      <SelectItem value={IdeaAccessType.PAID}>Paid</SelectItem>
                      <SelectItem value={IdeaAccessType.MEMBER_ONLY}>
                        Members Only
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasFilters && (
            <div className="px-4 py-3 bg-gray-50 dark:bg-zinc-800/20">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                {currentSearchTerm && (
                  <Badge className="gap-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border-0">
                    Search: {currentSearchTerm}
                    <button
                      onClick={clearSearch}
                      className="ml-1.5 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {currentStatus && (
                  <Badge className="gap-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border-0">
                    Status: {currentStatus}
                    <button
                      onClick={() => handleStatusChange("all")}
                      className="ml-1.5 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {currentAccessType && (
                  <Badge className="gap-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border-0">
                    Access: {currentAccessType}
                    <button
                      onClick={() => handleAccessChange("all")}
                      className="ml-1.5 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {(initialMeta.page - 1) * initialMeta.limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {Math.min(
                initialMeta.page * initialMeta.limit,
                initialMeta.total,
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {initialMeta.total}
            </span>{" "}
            ideas
          </p>
          {isPending && (
            <Loader2 className="w-4 h-4 animate-spin text-green-500" />
          )}
        </div>

        {/* Ideas List */}
        {initialIdeas.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-12 text-center">
            <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No ideas found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {hasFilters
                ? "Try adjusting your filters"
                : "No ideas submitted yet"}
            </p>
            {hasFilters && (
              <Button onClick={resetFilters} variant="outline" className="mt-3">
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {initialIdeas.map((idea) => {
              const commentCount =
                idea.comments?.length || idea._count?.comments || 0;
              const voteCount = idea.votes?.length || idea._count?.votes || 0;

              return (
                <div
                  key={idea.id}
                  className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={statusStyle(idea.status)}>
                          {idea.status === IdeaStatus.APPROVED && (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          )}
                          {idea.status === IdeaStatus.REJECTED && (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {idea.status === IdeaStatus.UNDER_REVIEW && (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {idea.status === IdeaStatus.DRAFT && (
                            <FileText className="w-3 h-3 mr-1" />
                          )}
                          {idea.status}
                        </Badge>
                        <Badge variant="outline" className="gap-1 px-3 py-1">
                          {accessIcon(idea.accessType)}
                          {idea.accessType === IdeaAccessType.FREE && "Free"}
                          {idea.accessType === IdeaAccessType.PAID &&
                            `Paid${idea.price ? ` ($${idea.price})` : ""}`}
                          {idea.accessType === IdeaAccessType.MEMBER_ONLY &&
                            "Members Only"}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white hover:text-green-600 transition-colors">
                        {idea.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
                        {idea.description || idea.problemStatement}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400 mt-3">
                        <span>By: {idea.author?.name || "Unknown"}</span>
                        <span>
                          Category: {idea.category?.name || "Uncategorized"}
                        </span>
                        <span>
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
                        <div className="mt-3 p-2.5 bg-red-50 dark:bg-red-950/30 rounded-lg text-xs text-red-600 flex items-start gap-1.5">
                          <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>{idea.rejectionFeedback}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {idea.status === IdeaStatus.UNDER_REVIEW && (
                        <Button
                          size="sm"
                          className="h-9 px-3 bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => {
                            setSelectedIdea(idea);
                            setModalOpen(true);
                          }}
                        >
                          <CheckCircle className="w-3.5 h-3.5 mr-1" /> Review or
                          Reject
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {initialMeta.totalPages > 1 && (
          <div className="flex justify-between items-center mt-6 pt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Page {initialMeta.page} of {initialMeta.totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={initialMeta.page === 1 || isPending}
                onClick={() => goToPage(initialMeta.page - 1)}
                className="h-9"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={
                  initialMeta.page === initialMeta.totalPages || isPending
                }
                onClick={() => goToPage(initialMeta.page + 1)}
                className="h-9"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Approve/Reject Modal */}
      <ApproveRejectModal
        key={selectedIdea?.id || "new"}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedIdea(null);
        }}
        idea={selectedIdea}
        onSubmit={handleApproveReject}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
