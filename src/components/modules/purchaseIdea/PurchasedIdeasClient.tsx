// components/dashboard/member/PurchasedIdeasClient.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Eye,
  ThumbsUp,
  MessageSquare,
  Calendar,
  User,
  DollarSign,
  Lock,
  Sparkles,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { IdeaAccessType } from "@/types/enums";

interface PurchasedIdea {
  id: string;
  ideaId: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  idea: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    problemStatement: string | null;
    proposedSolution: string | null;
    accessType: IdeaAccessType;
    price: number | null;
    createdAt: string;
    images?: string[];
    category: {
      name: string;
    };
    author: {
      name: string;
      email: string;
    };
    _count?: {
      votes: number;
      comments: number;
    };
  };
}

interface PurchasedIdeasClientProps {
  initialPurchases: PurchasedIdea[];
}

export function PurchasedIdeasClient({
  initialPurchases,
}: PurchasedIdeasClientProps) {
  const [purchases] = useState(initialPurchases);

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
          label: `Premium`,
          icon: DollarSign,
          color:
            "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
        };
      case IdeaAccessType.MEMBER_ONLY:
        return {
          label: "Members Only",
          icon: Lock,
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

  if (purchases.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-full mb-4">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            No purchased ideas yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Browse and purchase premium ideas to access them here
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-green-500" />
          My Purchased Ideas
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          You have purchased {purchases.length}{" "}
          {purchases.length === 1 ? "idea" : "ideas"}
        </p>
      </div>

      <div className="space-y-4">
        {purchases.map((purchase, idx) => {
          const idea = purchase.idea;
          const access = getAccessBadge(idea.accessType, idea.price);
          const AccessIcon = access.icon;
          const voteCount = idea._count?.votes || 0;
          const commentCount = idea._count?.comments || 0;
          const imageUrl = idea.images?.[0];

          return (
            <motion.div
              key={purchase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                {imageUrl ? (
                  <div className="md:w-48 h-48 md:h-auto overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={idea.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 flex items-center justify-center">
                    <Lightbulb className="w-12 h-12 text-green-500" />
                  </div>
                )}

                {/* Content Section */}
                <div className="flex-1 p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge className={`${access.color} gap-1 border-0`}>
                      <AccessIcon className="w-3 h-3" />
                      {access.label}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {idea.category.name}
                    </span>
                  </div>

                  <Link href={`/ideas/${idea.slug}`}>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-green-600 transition-colors mb-2">
                      {idea.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                    {idea.description || idea.problemStatement}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      By {idea.author.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Purchased{" "}
                      {formatDistanceToNow(new Date(purchase.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
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
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-3 h-3" />
                      <span>Purchased for ${purchase.amount}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button
                      asChild
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Link href={`/ideas/${idea.slug}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Idea
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Purchase Stats Card */}
      <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Spent
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${purchases.reduce((sum, p) => sum + Number(p.amount), 0)}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            You have lifetime access to all purchased ideas
          </div>
        </div>
      </div>
    </div>
  );
}
