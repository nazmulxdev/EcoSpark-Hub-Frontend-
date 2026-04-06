// components/modules/blog/BlogDetailClient.tsx (FIXED)

"use client";

import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Calendar,
  User,
  Eye,
  Heart,
  Share2,
  Clock,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
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
  author?: {
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

interface BlogDetailClientProps {
  blog: Blog;
}

export function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const router = useRouter();

  const handleShare = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  // Safe access with fallbacks
  const authorName = blog.author?.name || "EcoSpark Admin";
  const viewCount = blog._count?.views || 0;
  const likeCount = blog._count?.likes || 0;
  const publishDate = blog.publishedAt || blog.createdAt;
  const readTimeValue = blog.readTime || "5 min read";
  const coverImageUrl = blog.coverImage;

  const createMarkup = () => {
    return { __html: blog.content || "" };
  };

  // Single line className to avoid hydration mismatch
  const proseClasses =
    "prose prose-lg prose-green dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-xl prose-h3:mt-5 prose-h3:mb-2 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:my-6 prose-ul:my-4 prose-ul:pl-6 prose-ol:my-4 prose-ol:pl-6 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:my-1 prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:pl-4 prose-blockquote:my-4 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-xl prose-pre:overflow-x-auto";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative">
        {coverImageUrl && (
          <div className="relative h-64 md:h-96 w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
            <Image
              src={coverImageUrl}
              alt={blog.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
            />
          </div>
        )}
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {authorName}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDistanceToNow(new Date(publishDate), {
                    addSuffix: true,
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {readTimeValue}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {blog.title}
              </h1>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-between items-center pb-6 mb-6 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {viewCount} views
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {likeCount} likes
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Content - Fixed className with single line */}
              <div
                className={proseClasses}
                dangerouslySetInnerHTML={createMarkup()}
              />

              {/* Share Section */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Share this article
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                        "_blank",
                      );
                    }}
                    className="gap-2"
                  >
                    <FaFacebook className="w-4 h-4" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`,
                        "_blank",
                      );
                    }}
                    className="gap-2"
                  >
                    <FaTwitter className="w-4 h-4" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                        "_blank",
                      );
                    }}
                    className="gap-2"
                  >
                    <FaLinkedin className="w-4 h-4" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="gap-2"
                  >
                    <Link2 className="w-4 h-4" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
