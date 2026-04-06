"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  Newspaper,
  Search,
  X,
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw,
  Loader2,
  ChevronDown,
  Calendar,
  Image as ImageIcon,
  Globe,
  FileText,
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
import { BlogModal } from "./BlogModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { formatDistanceToNow } from "date-fns";

import { Blog } from "@/types/blog";
import Image from "next/image";

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface BlogClientProps {
  initialBlogs: Blog[];
  initialMeta: Meta;
  currentPage: number;
  currentLimit: number;
  currentSearchTerm: string;
  currentIsPublished: string;
}

export function BlogClient({
  initialBlogs,
  initialMeta,
  currentSearchTerm,
  currentIsPublished,
}: BlogClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [meta, setMeta] = useState<Meta>(initialMeta);
  const [search, setSearch] = useState(currentSearchTerm);
  const [isPublishedFilter, setIsPublishedFilter] =
    useState(currentIsPublished);
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync props with state
  useEffect(() => {
    setBlogs(initialBlogs);
    setMeta(initialMeta);
  }, [initialBlogs, initialMeta]);

  useEffect(() => {
    setSearch(currentSearchTerm);
    setIsPublishedFilter(currentIsPublished);
  }, [currentSearchTerm, currentIsPublished]);

  // Update URL and fetch new data
  const updateUrl = (params: Record<string, string | number>) => {
    const urlParams = new URLSearchParams();

    if (params.searchTerm && params.searchTerm !== "")
      urlParams.set("searchTerm", String(params.searchTerm));
    if (params.isPublished !== undefined && params.isPublished !== "")
      urlParams.set("isPublished", String(params.isPublished));
    if (params.page && Number(params.page) > 1)
      urlParams.set("page", String(params.page));

    const newUrl = `${pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;
    startTransition(() => router.push(newUrl));
  };

  // Search handler
  const handleSearch = () => {
    updateUrl({ searchTerm: search, isPublished: isPublishedFilter, page: 1 });
  };

  // Clear search
  const clearSearch = () => {
    setSearch("");
    updateUrl({ searchTerm: "", isPublished: isPublishedFilter, page: 1 });
  };

  // Published filter
  const handlePublishedFilterChange = (val: string) => {
    const newValue = val === "all" ? "" : val;
    setIsPublishedFilter(newValue);
    updateUrl({ searchTerm: search, isPublished: newValue, page: 1 });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setIsPublishedFilter("");
    setShowFilters(false);
    updateUrl({ searchTerm: "", isPublished: "", page: 1 });
  };

  // Pagination
  const goToPage = (page: number) => {
    updateUrl({ searchTerm: search, isPublished: isPublishedFilter, page });
  };

  // Toggle publish status
  const handleTogglePublish = async (blog: Blog) => {
    setIsSubmitting(true);
    const newStatus = !blog.isPublished;
    const toastId = toast.loading(
      newStatus ? "Publishing blog..." : "Unpublishing blog...",
    );

    try {
      const { updateBlog } = await import("@/actions/client/blog.client");
      const result = await updateBlog(blog.slug, { isPublished: newStatus });

      if (result.error) {
        toast.error(result.error.message || "Failed to update blog status", {
          id: toastId,
        });
        return;
      }

      toast.success(
        newStatus
          ? "Blog published successfully!"
          : "Blog unpublished successfully!",
        { id: toastId },
      );

      // Update local state
      setBlogs(
        blogs.map((b) =>
          b.id === blog.id
            ? {
                ...b,
                isPublished: newStatus,
                publishedAt: newStatus ? new Date().toISOString() : null,
              }
            : b,
        ),
      );
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveBlog = async (data: {
    title: string;
    content: string;
    coverImage?: File | string;
    isPublished: boolean;
  }) => {
    setIsSubmitting(true);
    const toastId = toast.loading(
      selectedBlog ? "Updating blog..." : "Creating blog...",
    );

    try {
      const { createBlog, updateBlog } =
        await import("@/actions/client/blog.client");

      let result;
      if (selectedBlog) {
        result = await updateBlog(selectedBlog.slug, data);
      } else {
        result = await createBlog(data);
      }

      if (result.error) {
        toast.error(result.error.message || "Failed to save blog", {
          id: toastId,
        });
        return false;
      }

      toast.success(
        selectedBlog
          ? "Blog updated successfully!"
          : "Blog created successfully!",
        { id: toastId },
      );
      setModalOpen(false);
      setSelectedBlog(null);
      router.refresh();
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlog = async () => {
    if (!selectedBlog) return;

    setIsSubmitting(true);
    const toastId = toast.loading("Deleting blog...");

    try {
      const { deleteBlog } = await import("@/actions/client/blog.client");
      const result = await deleteBlog(selectedBlog.slug);

      if (result.error) {
        toast.error(result.error.message || "Failed to delete blog", {
          id: toastId,
        });
        return;
      }

      toast.success("Blog deleted successfully!", { id: toastId });
      setDeleteModalOpen(false);
      setSelectedBlog(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasFilters = currentSearchTerm || currentIsPublished;
  const publishedCount = blogs.filter((b) => b.isPublished).length;
  const draftCount = blogs.filter((b) => !b.isPublished).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Blog Management
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
                Create and manage blog posts for the community
              </p>
            </div>
            <Button
              onClick={() => {
                setSelectedBlog(null);
                setModalOpen(true);
              }}
              className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5 h-auto"
            >
              <Plus className="w-4 h-4 mr-1 sm:mr-2" />
              New Post
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-1.5 sm:p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {meta.total}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
              Total Posts
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-1.5 sm:p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {publishedCount}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
              Published
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-1.5 sm:p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {draftCount}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
              Drafts
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-1.5 sm:p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {
                  blogs.filter(
                    (b) =>
                      b.publishedAt &&
                      new Date(b.publishedAt) >
                        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                  ).length
                }
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
              This Week
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm mb-4 sm:mb-6 overflow-hidden">
          {/* Search Row */}
          <div className="p-3 sm:p-4 border-b border-gray-100 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by title or content..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-9 pr-9 h-10 sm:h-11 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 text-sm"
                />
                {search && (
                  <Button
                    onClick={clearSearch}
                    variant="ghost"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-gray-600" />
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSearch}
                  disabled={isPending}
                  className="h-10 sm:h-11 px-4 sm:px-6 bg-green-600 hover:bg-green-700 text-white whitespace-nowrap text-sm"
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
                  className="h-10 sm:h-11 gap-1 sm:gap-2 whitespace-nowrap border-gray-200 dark:border-zinc-700 text-sm"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
                  />
                </Button>
                {hasFilters && (
                  <Button
                    variant="ghost"
                    onClick={resetFilters}
                    className="h-10 sm:h-11 gap-1 sm:gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span className="hidden sm:inline">Reset</span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="px-3 sm:px-4 py-4 sm:py-5 bg-gray-50 dark:bg-zinc-800/30 border-b border-gray-100 dark:border-zinc-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Status
                  </label>
                  <Select
                    value={isPublishedFilter || "all"}
                    onValueChange={handlePublishedFilterChange}
                  >
                    <SelectTrigger className="w-full h-10 sm:h-11 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 text-sm">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700">
                      <SelectItem value="all">All Posts</SelectItem>
                      <SelectItem value="true">Published</SelectItem>
                      <SelectItem value="false">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasFilters && (
            <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 dark:bg-zinc-800/20">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm text-gray-500">
                  Active filters:
                </span>
                {currentSearchTerm && (
                  <Badge className="gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border-0">
                    Search: {currentSearchTerm}
                    <button
                      onClick={clearSearch}
                      className="ml-1 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {currentIsPublished && (
                  <Badge className="gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border-0">
                    Status:{" "}
                    {currentIsPublished === "true" ? "Published" : "Draft"}
                    <button
                      onClick={() => handlePublishedFilterChange("all")}
                      className="ml-1 hover:text-red-500"
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
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {(meta.page - 1) * meta.limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {Math.min(meta.page * meta.limit, meta.total)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {meta.total}
            </span>{" "}
            posts
          </p>
          {isPending && (
            <Loader2 className="w-4 h-4 animate-spin text-green-500" />
          )}
        </div>

        {/* Blogs List */}
        {blogs.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-8 sm:p-12 text-center">
            <Newspaper className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-1">
              No blog posts found
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {hasFilters
                ? "Try adjusting your filters"
                : "Create your first blog post"}
            </p>
            {!hasFilters && (
              <Button
                onClick={() => {
                  setSelectedBlog(null);
                  setModalOpen(true);
                }}
                className="mt-3 sm:mt-4 bg-green-600 hover:bg-green-700 text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
            )}
            {hasFilters && (
              <Button
                onClick={resetFilters}
                variant="outline"
                className="mt-3 sm:mt-4 text-sm"
              >
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Cover Image */}
                  <div className="relative w-full md:w-40 lg:w-48 h-48 md:h-auto bg-gray-100 dark:bg-zinc-800 overflow-hidden shrink-0">
                    {blog.coverImage ? (
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 192px"
                        priority={false}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                          <Badge
                            className={
                              blog.isPublished
                                ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 text-xs"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400 text-xs"
                            }
                          >
                            {blog.isPublished ? (
                              <>
                                <Globe className="w-3 h-3 mr-1" />
                                Published
                              </>
                            ) : (
                              <>
                                <FileText className="w-3 h-3 mr-1" />
                                Draft
                              </>
                            )}
                          </Badge>
                          {blog.publishedAt && (
                            <Badge variant="outline" className="gap-1 text-xs">
                              <Calendar className="w-3 h-3" />
                              {formatDistanceToNow(new Date(blog.publishedAt), {
                                addSuffix: true,
                              })}
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white hover:text-green-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1 sm:mt-2">
                          {blog.content
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 100)}
                          ...
                        </p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 mt-2 sm:mt-3">
                          <span className="truncate max-w-[150px] sm:max-w-none">
                            Slug: /{blog.slug}
                          </span>
                          <span>
                            Created:{" "}
                            {formatDistanceToNow(new Date(blog.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                          <span>
                            Updated:{" "}
                            {formatDistanceToNow(new Date(blog.updatedAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 shrink-0">
                        {/* Publish/Draft Toggle Button */}
                        <Button
                          variant={blog.isPublished ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleTogglePublish(blog)}
                          disabled={isSubmitting}
                          className={`h-8 px-2 sm:px-3 text-xs sm:text-sm ${
                            blog.isPublished
                              ? "border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                              : "bg-green-600 hover:bg-green-700 text-white"
                          }`}
                        >
                          {blog.isPublished ? (
                            <>
                              <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                              Draft
                            </>
                          ) : (
                            <>
                              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                              Publish
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedBlog(blog);
                            setModalOpen(true);
                          }}
                          className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                        >
                          <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />{" "}
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedBlog(blog);
                            setDeleteModalOpen(true);
                          }}
                          className="h-8 px-2 sm:px-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs sm:text-sm"
                        >
                          <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />{" "}
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mt-4 sm:mt-6 pt-2">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1">
              Page {meta.page} of {meta.totalPages}
            </p>
            <div className="flex gap-2 order-1 sm:order-2">
              <Button
                variant="outline"
                size="sm"
                disabled={meta.page === 1 || isPending}
                onClick={() => goToPage(meta.page - 1)}
                className="h-8 sm:h-9 text-xs sm:text-sm"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={meta.page === meta.totalPages || isPending}
                onClick={() => goToPage(meta.page + 1)}
                className="h-8 sm:h-9 text-xs sm:text-sm"
              >
                Next <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Blog Modal */}
      <BlogModal
        key={selectedBlog?.id || "new"}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedBlog(null);
        }}
        blog={selectedBlog}
        onSubmit={handleSaveBlog}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedBlog(null);
        }}
        onConfirm={handleDeleteBlog}
        itemName={selectedBlog?.title}
        itemType="blog"
        isLoading={isSubmitting}
      />
    </div>
  );
}
