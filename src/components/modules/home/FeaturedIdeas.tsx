// components/home/FeaturedIdeas.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ThumbsUp,
  MessageSquare,
  ArrowRight,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface FeaturedIdeasProps {
  ideas: Idea[];
}

export function FeaturedIdeas({ ideas }: FeaturedIdeasProps) {
  if (!ideas || ideas.length === 0) {
    return null;
  }

  const getAccessBadge = (type: IdeaAccessType, price?: number | null) => {
    switch (type) {
      case IdeaAccessType.FREE:
        return {
          label: "Free",
          color:
            "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
        };
      case IdeaAccessType.PAID:
        return {
          label: `Premium $${price}`,
          color:
            "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
        };
      case IdeaAccessType.MEMBER_ONLY:
        return {
          label: "Members Only",
          color:
            "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
        };
      default:
        return {
          label: "Free",
          color:
            "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
        };
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-950/50 rounded-full mb-4">
            <Sparkles className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Featured Sustainability Ideas
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover innovative solutions from our community of changemakers
          </p>
        </div>

        {/* Ideas Grid - Max 6 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.slice(0, 6).map((idea, idx) => {
            const access = getAccessBadge(idea.accessType, idea.price);
            const voteCount = idea._count?.votes || 0;
            const commentCount = idea._count?.comments || 0;
            const imageUrl = idea.images?.[0];

            return (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-gray-50 dark:bg-zinc-800/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <Link
                  href={`/ideas/${idea.slug}`}
                  className="block relative h-48 overflow-hidden"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={idea.title}
                      fill
                      priority
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
                      {access.label}
                    </Badge>
                  </div>
                </Link>

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

                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                    {idea.description ||
                      idea.problemStatement ||
                      "No description available"}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-2 mb-3">
                    {idea.author.image ? (
                      <Image
                        src={idea.author.image}
                        alt={idea.author.name}
                        width={20}
                        height={20}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <span className="text-xs font-medium text-green-700 dark:text-green-300">
                          {idea.author.name?.[0]?.toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="text-xs text-gray-500">
                      {idea.author.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-zinc-700">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{voteCount}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MessageSquare className="w-4 h-4" />
                        <span>{commentCount}</span>
                      </div>
                    </div>
                    <Link
                      href={`/ideas/${idea.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/ideas">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 gap-2">
              View All Ideas
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
