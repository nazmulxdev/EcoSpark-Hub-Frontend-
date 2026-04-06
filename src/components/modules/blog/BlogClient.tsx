// components/modules/blog/BlogClient.tsx (SIMPLIFIED - NO EXTRA PACKAGES)

"use client";

import { useState, useTransition, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  User,
  Eye,
  Heart,
  BookOpen,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  readTime: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  _count?: {
    views: number;
    likes: number;
    comments: number;
  };
}

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
  currentSearchTerm: string;
}

export function BlogClient({
  initialBlogs,
  initialMeta,
  currentSearchTerm,
}: BlogClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(currentSearchTerm);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateUrl = useCallback(
    (params: Record<string, string | number>) => {
      const urlParams = new URLSearchParams();

      if (params.searchTerm && params.searchTerm !== "")
        urlParams.set("searchTerm", String(params.searchTerm));
      if (params.page && Number(params.page) > 1)
        urlParams.set("page", String(params.page));

      const newUrl = `${pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;
      startTransition(() => router.push(newUrl));
    },
    [pathname, router],
  );

  // Debounced search using setTimeout
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      updateUrl({ searchTerm: value, page: 1 });
    }, 500);
  };

  const handleSearch = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    updateUrl({ searchTerm: search, page: 1 });
  };

  const clearSearch = () => {
    setSearch("");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    updateUrl({ searchTerm: "", page: 1 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      handleSearch();
    }
  };

  const goToPage = (page: number) => {
    updateUrl({ searchTerm: search, page });
  };

  const hasFilters = currentSearchTerm;

  if (!initialBlogs || initialBlogs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Discover insights, stories, and ideas about sustainability
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {hasFilters
                ? "Try adjusting your search"
                : "Check back later for new articles"}
            </p>
            {hasFilters && (
              <Button onClick={clearSearch} variant="outline" className="mt-4">
                Clear Search
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Discover insights, stories, and ideas about sustainability and
            eco-friendly living
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={search}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="pl-12 pr-12 h-12 text-base bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                aria-label="Search articles"
              />
              {search && (
                <button
                  onClick={clearSearch}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            <Button
              onClick={handleSearch}
              disabled={isPending}
              className="h-12 px-6 bg-green-600 hover:bg-green-700"
              aria-label="Search"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-gray-500">
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
            articles
          </p>
          {isPending && (
            <Loader2 className="w-4 h-4 animate-spin text-green-500" />
          )}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialBlogs.map((blog, idx) => {
            const authorName = blog.author?.name || "EcoSpark Admin";
            const viewCount = blog._count?.views || 0;
            const likeCount = blog._count?.likes || 0;
            const publishDate = blog.publishedAt || blog.createdAt;
            const readTimeValue = blog.readTime || "5 min read";
            const coverImageUrl = blog.coverImage;
            const blogExcerpt =
              blog.excerpt ||
              (blog.content
                ? blog.content.substring(0, 150)
                : "No description available");

            return (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Link
                  href={`/blog/${blog.slug}`}
                  className="block relative h-48 overflow-hidden"
                  aria-label={`Read article: ${blog.title}`}
                >
                  {coverImageUrl ? (
                    <Image
                      src={coverImageUrl}
                      alt={blog.title}
                      fill
                      priority
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-green-500" />
                    </div>
                  )}
                </Link>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{authorName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {formatDistanceToNow(new Date(publishDate), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>

                  <Link href={`/blogs/${blog.slug}`}>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-green-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                    {blogExcerpt}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{viewCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" />
                        <span>{likeCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{readTimeValue}</span>
                      </div>
                    </div>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="text-sm font-medium text-green-600 hover:text-green-700"
                      aria-label={`Read more about ${blog.title}`}
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Pagination */}
        {initialMeta.totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 pt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={initialMeta.page === 1 || isPending}
                onClick={() => goToPage(initialMeta.page - 1)}
                className="h-9"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <span className="px-4 py-1.5 text-sm text-gray-600 dark:text-gray-400">
                Page {initialMeta.page} of {initialMeta.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={
                  initialMeta.page === initialMeta.totalPages || isPending
                }
                onClick={() => goToPage(initialMeta.page + 1)}
                className="h-9"
                aria-label="Next page"
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
