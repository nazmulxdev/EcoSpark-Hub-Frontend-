"use client";

import { useTransition, useRef, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  X,
  Eye,
  ThumbsUp,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw,
  Loader2,
  ChevronDown,
  DollarSign,
  Users,
  Lock,
  Sparkles,
  Lightbulb,
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
import { formatDistanceToNow } from "date-fns";
import { IdeaAccessType } from "@/types/enums";
import Image from "next/image";

interface Idea {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  problemStatement: string | null;
  proposedSolution: string | null;
  status: string;
  accessType: IdeaAccessType;
  price?: number | null;
  createdAt: string;
  images?: string[];
  author: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
  category: {
    id: string;
    name: string;
    slug: string;
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

interface PublicIdeasClientProps {
  initialIdeas: Idea[];
  initialMeta: Meta;
  currentPage: number;
  currentLimit: number;
  currentSearchTerm: string;
  currentAccessType: string;
  currentCategoryId: string;
  currentSortBy: string;
  currentSortOrder: string;
}

export function PublicIdeasClient({
  initialIdeas,
  initialMeta,
  currentSearchTerm,
  currentAccessType,
  currentCategoryId,
  currentPage,
  currentSortBy,
  currentSortOrder,
}: PublicIdeasClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const ideas = initialIdeas;
  const meta = initialMeta;
  const [search, setSearch] = useState(currentSearchTerm);
  const [accessFilter, setAccessFilter] = useState(currentAccessType);
  const [sortBy, setSortBy] = useState(currentSortBy);
  const [sortOrder, setSortOrder] = useState(currentSortOrder);
  const [showFilters, setShowFilters] = useState(false);

  const prevSearchTerm = useRef(currentSearchTerm);
  const prevAccessType = useRef(currentAccessType);
  const prevSortBy = useRef(currentSortBy);
  const prevSortOrder = useRef(currentSortOrder);

  useEffect(() => {
    if (prevSearchTerm.current !== currentSearchTerm) {
      prevSearchTerm.current = currentSearchTerm;
      setTimeout(() => setSearch(currentSearchTerm), 0);
    }
  }, [currentSearchTerm]);

  useEffect(() => {
    if (prevAccessType.current !== currentAccessType) {
      prevAccessType.current = currentAccessType;
      setTimeout(() => setAccessFilter(currentAccessType), 0);
    }
  }, [currentAccessType]);

  useEffect(() => {
    if (prevSortBy.current !== currentSortBy) {
      prevSortBy.current = currentSortBy;
      setTimeout(() => setSortBy(currentSortBy), 0);
    }
  }, [currentSortBy]);

  useEffect(() => {
    if (prevSortOrder.current !== currentSortOrder) {
      prevSortOrder.current = currentSortOrder;
      setTimeout(() => setSortOrder(currentSortOrder), 0);
    }
  }, [currentSortOrder]);

  const updateUrl = (params: Record<string, string | number>) => {
    const urlParams = new URLSearchParams();

    // Preserve existing categoryId if it's not being explicitly changed
    const categoryId =
      params.categoryId !== undefined
        ? String(params.categoryId)
        : currentCategoryId;
    if (categoryId && categoryId !== "")
      urlParams.set("categoryId", categoryId);

    if (params.searchTerm !== undefined ? params.searchTerm : currentSearchTerm)
      urlParams.set(
        "searchTerm",
        String(
          params.searchTerm !== undefined
            ? params.searchTerm
            : currentSearchTerm,
        ),
      );

    // Explicitly handle empty string to remove from URL
    if (params.searchTerm === "") urlParams.delete("searchTerm");

    const accessType =
      params.accessType !== undefined
        ? String(params.accessType)
        : currentAccessType;
    if (accessType && accessType !== "")
      urlParams.set("accessType", accessType);

    const sortByParam =
      params.sortBy !== undefined ? String(params.sortBy) : currentSortBy;
    if (sortByParam && sortByParam !== "createdAt")
      urlParams.set("sortBy", sortByParam);

    const sortOrderParam =
      params.sortOrder !== undefined
        ? String(params.sortOrder)
        : currentSortOrder;
    if (sortOrderParam && sortOrderParam !== "desc")
      urlParams.set("sortOrder", sortOrderParam);

    const pageParam =
      params.page !== undefined ? Number(params.page) : currentPage;
    if (pageParam > 1) urlParams.set("page", String(pageParam));

    const newUrl = `${pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;
    startTransition(() => router.push(newUrl, { scroll: false }));
  };

  const handleSearch = () => {
    updateUrl({
      searchTerm: search,
      accessType: accessFilter,
      sortBy,
      sortOrder,
      page: 1,
    });
  };

  const clearSearch = () => {
    setSearch("");
    updateUrl({
      searchTerm: "",
      accessType: accessFilter,
      sortBy,
      sortOrder,
      page: 1,
    });
  };

  const handleAccessChange = (val: string) => {
    const newAccess = val === "all" ? "" : val;
    setAccessFilter(newAccess);
    updateUrl({
      searchTerm: search,
      accessType: newAccess,
      sortBy,
      sortOrder,
      page: 1,
    });
  };

  const handleSortChange = (val: string) => {
    let newSortBy = "createdAt";
    let newSortOrder = "desc";

    switch (val) {
      case "oldest":
        newSortBy = "createdAt";
        newSortOrder = "asc";
        break;
      case "most_voted":
        newSortBy = "votes";
        newSortOrder = "desc";
        break;
      case "most_commented":
        newSortBy = "comments";
        newSortOrder = "desc";
        break;
    }

    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    updateUrl({
      searchTerm: search,
      accessType: accessFilter,
      sortBy: newSortBy,
      sortOrder: newSortOrder,
      page: 1,
    });
  };

  const resetFilters = () => {
    setSearch("");
    setAccessFilter("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setShowFilters(false);
    updateUrl({
      searchTerm: "",
      accessType: "",
      categoryId: "",
      sortBy: "createdAt",
      sortOrder: "desc",
      page: 1,
    });
  };

  const goToPage = (page: number) => {
    updateUrl({
      searchTerm: search,
      accessType: accessFilter,
      sortBy,
      sortOrder,
      page,
    });
  };

  const getSortValue = () => {
    if (sortBy === "createdAt" && sortOrder === "asc") return "oldest";
    if (sortBy === "votes") return "most_voted";
    if (sortBy === "comments") return "most_commented";
    return "newest";
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

  const hasFilters =
    currentSearchTerm || currentAccessType || currentCategoryId;

  // Try to find the category name from the ideas if currentCategoryId is set
  const activeCategoryName = currentCategoryId
    ? ideas.find((i) => i.category.id === currentCategoryId)?.category.name
    : null;
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "most_voted", label: "Most Voted" },
    { value: "most_commented", label: "Most Commented" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sustainability Ideas
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover innovative solutions from our community of changemakers
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm mb-8 overflow-hidden">
          {/* Search Row */}
          <div className="p-5 border-b border-gray-100 dark:border-zinc-800">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search ideas by title, description, or problem statement..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-12 pr-24 h-12 text-base"
                />
                {search && (
                  <Button
                    onClick={clearSearch}
                    variant="ghost"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </Button>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleSearch}
                  disabled={isPending}
                  className="h-12 px-8 bg-green-600 hover:bg-green-700 text-white"
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
                  className="h-12 gap-2"
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
                    className="h-12 gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
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
            <div className="px-5 py-5 bg-gray-50 dark:bg-zinc-800/30 border-b border-gray-100 dark:border-zinc-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Access Type
                  </label>
                  <Select
                    value={accessFilter || "all"}
                    onValueChange={handleAccessChange}
                  >
                    <SelectTrigger className="w-full h-11 bg-white dark:bg-zinc-900">
                      <SelectValue placeholder="All Access" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-lg rounded-lg">
                      <SelectItem value="all">All Access</SelectItem>
                      <SelectItem value={IdeaAccessType.FREE}>Free</SelectItem>
                      <SelectItem value={IdeaAccessType.PAID}>Paid</SelectItem>
                      <SelectItem value={IdeaAccessType.MEMBER_ONLY}>
                        Members Only
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Sort By
                  </label>
                  <Select
                    value={getSortValue()}
                    onValueChange={handleSortChange}
                  >
                    <SelectTrigger className="w-full h-11 bg-white dark:bg-zinc-900">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-lg rounded-lg">
                      {sortOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasFilters && (
            <div className="px-5 py-3 bg-gray-50 dark:bg-zinc-800/20">
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
                {currentCategoryId && (
                  <Badge className="gap-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border-0">
                    Category: {activeCategoryName || "Active Category"}
                    <button
                      onClick={() => updateUrl({ categoryId: "" })}
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
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {Math.min(meta.page * meta.limit, meta.total)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {meta.total}
            </span>{" "}
            ideas
          </p>
          {isPending && (
            <Loader2 className="w-4 h-4 animate-spin text-green-500" />
          )}
        </div>

        {/* Ideas Grid */}
        {ideas.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-12 text-center">
            <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No ideas found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {hasFilters
                ? "Try adjusting your filters"
                : "Be the first to share an idea!"}
            </p>
            {hasFilters && (
              <Button onClick={resetFilters} variant="outline" className="mt-4">
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea, idx) => {
              const access = getAccessBadge(idea.accessType, idea.price);
              const AccessIcon = access.icon;
              const voteCount = idea._count?.votes || 0;
              const commentCount = idea._count?.comments || 0;
              const imageUrl = idea.images?.[0];

              console.log(voteCount);
              console.log(commentCount);

              return (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={idea.title}
                        fill
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 flex items-center justify-center">
                        <Lightbulb className="w-12 h-12 text-green-500" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge
                        className={`${access.color} gap-1 border-0 shadow-sm`}
                      >
                        <AccessIcon className="w-3 h-3" />
                        {access.label}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-500">
                        {idea.category.name}
                      </span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(idea.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>

                    <Link href={`/ideas/${idea.slug}`}>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-green-600 transition-colors line-clamp-2">
                        {idea.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                      {idea.description ??
                        idea.problemStatement ??
                        "No preview available"}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2 mb-3">
                      {idea.author.image ? (
                        <Image
                          src={idea.author.image}
                          alt={idea.author.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <span className="text-xs font-medium text-green-700 dark:text-green-300">
                            {idea.author.name?.[0]?.toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="text-xs text-gray-500">
                        {idea.author.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-zinc-800">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <ThumbsUp className="w-4 h-4" />
                          {voteCount}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MessageSquare className="w-4 h-4" />
                          {commentCount}
                        </div>
                      </div>
                      <Link
                        href={`/ideas/${idea.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
                      >
                        Read More
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 pt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={meta.page === 1 || isPending}
                onClick={() => goToPage(meta.page - 1)}
                className="h-9"
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
                disabled={meta.page === meta.totalPages || isPending}
                onClick={() => goToPage(meta.page + 1)}
                className="h-9"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
