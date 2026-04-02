"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  Lightbulb,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  Lock,
  DollarSign,
  Users,
  ChevronLeft,
  Loader2,
  Sparkles,
  Award,
  Calendar,
  User,
  RefreshCw,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { IdeaAccessType, VoteType } from "@/types/enums";
import { PurchaseModal } from "./PurchaseModal";
import { ResumePaymentModal } from "./ResumePaymentModal";
import {
  addToWatchlist,
  checkInWatchlist,
  removeFromWatchlist,
} from "@/actions/client/watchlist.client";
import { CommentsSection } from "@/components/comment/CommentsSection";
import { VoteButton } from "@/components/vote/VoteButton";

interface Idea {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  problemStatement?: string | null;
  proposedSolution?: string | null;
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
  userVote?: VoteType | null;
  hasAccess?: boolean;
  requiresAccess?: boolean;
  contentLocked?: boolean;
  suggestedAction?: string;
  hasPendingPayment?: boolean;
  pendingPaymentId?: string | null;
  isMember?: boolean;
  isMemberActive?: boolean;
}

interface IdeaDetailClientProps {
  idea: Idea;
  userId?: string;
  userRole?: string;
  isAuthenticated: boolean;
  hasAccess: boolean;
  requiresAccess: boolean;
  membershipPrice?: number;
}

export function IdeaDetailClient({
  idea,
  userRole,
  isAuthenticated,
  hasAccess,
  requiresAccess,
  membershipPrice = 20,
}: IdeaDetailClientProps) {
  const router = useRouter();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isTogglingWatchlist, setIsTogglingWatchlist] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isResumePaymentModalOpen, setIsResumePaymentModalOpen] =
    useState(false);

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      if (isAuthenticated && idea.id) {
        const result = await checkInWatchlist(idea.id);
        if (result.data !== undefined && result.data !== null) {
          setIsInWatchlist(result.data);
        }
      }
    };

    checkWatchlistStatus();
  }, [isAuthenticated, idea.id]);

  const isMember = userRole === "MEMBER";
  const isLocked = !hasAccess && requiresAccess;
  const suggestedAction = idea.suggestedAction;
  const hasPendingPayment = idea.hasPendingPayment;

  const handleDirectPurchase = () => {
    setIsPurchaseModalOpen(true);
  };

  const handleResumePayment = () => {
    setIsResumePaymentModalOpen(true);
  };

  const handleToggleWatchlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to save ideas");
      router.push(`/login?redirect=/ideas/${idea.slug}`);
      return;
    }

    setIsTogglingWatchlist(true);
    const toastId = toast.loading(
      isInWatchlist ? "Removing from watchlist..." : "Adding to watchlist...",
    );

    try {
      let result;
      if (isInWatchlist) {
        result = await removeFromWatchlist(idea.id);
      } else {
        result = await addToWatchlist(idea.id);
      }

      if (result.error) {
        toast.error(result.error.message || "Failed to update watchlist", {
          id: toastId,
        });
        return;
      }

      toast.success(
        isInWatchlist ? "Removed from watchlist" : "Added to watchlist",
        { id: toastId },
      );
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsTogglingWatchlist(false);
    }
  };

  const getAccessBadge = () => {
    switch (idea.accessType) {
      case IdeaAccessType.FREE:
        return {
          label: "Free",
          icon: Eye,
          color:
            "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
        };
      case IdeaAccessType.PAID:
        return {
          label: `Paid${idea.price ? ` ($${idea.price})` : ""}`,
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
          color: "bg-gray-100 text-gray-700",
        };
    }
  };

  const access = getAccessBadge();
  const AccessIcon = access.icon;
  const voteCount = idea._count?.votes || 0;
  const commentCount = idea._count?.comments || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        {/* Main Content */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
          {/* Hero Section */}
          <div className="relative">
            {idea.images && idea.images.length > 0 && (
              <div className="h-64 md:h-96 overflow-hidden">
                <img
                  src={idea.images[0]}
                  alt={idea.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className={`${access.color} gap-1 px-3 py-1.5 shadow-sm`}>
                <AccessIcon className="w-3 h-3" />
                {access.label}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-sm text-gray-500">
                  {idea.category.name}
                </span>
                <span className="text-xs text-gray-300">•</span>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(idea.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {idea.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  By {idea.author.name}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDistanceToNow(new Date(idea.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap gap-6 justify-between items-center mb-8 pb-6 border-b border-gray-100 dark:border-zinc-800">
              <VoteButton
                ideaId={idea.id}
                initialVotes={voteCount}
                initialUserVote={idea.userVote || null}
              />
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-gray-500" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {voteCount}
                  </span>
                  <span className="text-sm text-gray-500">Votes</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-gray-500" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {commentCount}
                  </span>
                  <span className="text-sm text-gray-500">Comments</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleToggleWatchlist}
                  disabled={isTogglingWatchlist}
                  variant="outline"
                  className="gap-2"
                >
                  {isTogglingWatchlist ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                  {isInWatchlist ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Locked Content Message */}
            {isLocked && (
              <div className="mb-8 p-8 bg-gray-50 dark:bg-zinc-800/50 rounded-xl text-center">
                {hasPendingPayment || suggestedAction === "complete_payment" ? (
                  <>
                    <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-950/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-10 h-10 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      Pending Payment
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      You have a pending payment for this idea. Complete your
                      payment to get access.
                    </p>
                    <Button
                      onClick={handleResumePayment}
                      className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 px-8 py-3"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Complete Payment
                    </Button>
                  </>
                ) : suggestedAction === "buy_membership_or_idea" ? (
                  <>
                    <div className="w-20 h-20 bg-purple-100 dark:bg-purple-950/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-purple-600 dark:text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      Members Only Content
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      This idea is exclusively for members. Become a member to
                      access this and many more premium ideas.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/dashboard/become-member">
                        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6 py-3">
                          <Users className="w-4 h-4 mr-2" />
                          Become a Member (${membershipPrice})
                        </Button>
                      </Link>
                      <Button
                        onClick={handleDirectPurchase}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3"
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Purchase Only (${idea.price})
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-amber-100 dark:bg-amber-950/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="w-10 h-10 text-amber-600 dark:text-amber-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      Premium Content Locked
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      This idea is available for purchase. Get lifetime access
                      to view the complete solution.
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${idea.price}
                      </span>
                      <span className="text-gray-500">USD</span>
                    </div>
                    <Button
                      onClick={handleDirectPurchase}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-3"
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Purchase Now
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Full Content (if unlocked) */}
            {hasAccess && (
              <div className="space-y-8">
                {/* Problem Statement */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-green-500" />
                    Problem Statement
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {idea.problemStatement}
                  </p>
                </div>

                {/* Proposed Solution */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-green-500" />
                    Proposed Solution
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {idea.proposedSolution}
                  </p>
                </div>

                {/* Detailed Description */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-500" />
                    Detailed Description
                  </h2>
                  <div className="prose prose-green dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {idea.description}
                    </p>
                  </div>
                </div>

                {/* Additional Images */}
                {idea.images && idea.images.length > 1 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      Gallery
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {idea.images.slice(1).map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${idea.title} - ${idx + 2}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <CommentsSection ideaId={idea.id} initialCount={commentCount} />
        </div>
      </div>

      {/* Modals */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        idea={{
          id: idea.id,
          title: idea.title,
          price: idea.price || 0,
          slug: idea.slug,
        }}
        onPurchaseComplete={() => {
          router.refresh();
        }}
      />

      <ResumePaymentModal
        isOpen={isResumePaymentModalOpen}
        onClose={() => setIsResumePaymentModalOpen(false)}
        idea={{
          id: idea.id,
          title: idea.title,
          slug: idea.slug,
        }}
      />
    </div>
  );
}
