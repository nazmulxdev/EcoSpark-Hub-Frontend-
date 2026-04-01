/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import {
  Mail,
  Calendar,
  ThumbsUp,
  MessageSquare,
  ShoppingBag,
  Star,
  ArrowRight,
  Crown,
  TrendingUp,
  Clock,
  AlertCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Role } from "@/types/enums";

interface UserDashboardData {
  profile: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: Role;
    userStatus: string;
    createdAt: string;
    membershipPayment: {
      id: string;
      status: string;
      amount: string;
    } | null;
    member: {
      id: string;
      status: string;
      joinedAt: string | null;
    } | null;
  };
  stats: {
    totalVotes: number;
    totalComments: number;
    totalPurchases: number;
    totalWatchlist: number;
  };
  recentActivity: {
    purchases: any[];
    votes: any[];
    comments: Array<{
      id: string;
      content: string;
      createdAt: string;
      idea: {
        id: string;
        title: string;
        slug: string;
      };
    }>;
    watchlist: any[];
  };
}

interface UserDashboardClientProps {
  data: UserDashboardData | null;
}

export function UserDashboardClient({ data }: UserDashboardClientProps) {
  // Safely access data with fallbacks
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Data Available
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Unable to load dashboard data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const { profile, stats, recentActivity } = data;

  // Determine membership status
  const isMember = profile?.role === Role.MEMBER;
  const hasPendingPayment =
    profile?.membershipPayment?.status === "PENDING" ||
    profile?.membershipPayment?.status === "UNPAID";
  const hasPaidButNotApproved =
    profile?.membershipPayment?.status === "PAID" && !isMember;
  const hasNoPayment = !profile?.membershipPayment;

  // Member application status
  const memberApplicationStatus = profile?.member?.status;
  const isMemberPending = memberApplicationStatus === "PENDING";
  const isMemberRejected = memberApplicationStatus === "REJECTED";

  const formatDate = (date: string) => {
    if (!date) return "Unknown";
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const statsCards = [
    {
      title: "Votes Given",
      value: stats?.totalVotes ?? 0,
      icon: ThumbsUp,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Comments",
      value: stats?.totalComments ?? 0,
      icon: MessageSquare,
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-950/30",
    },
    {
      title: "Purchases",
      value: stats?.totalPurchases ?? 0,
      icon: ShoppingBag,
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      title: "Watchlist",
      value: stats?.totalWatchlist ?? 0,
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-50 dark:bg-yellow-950/30",
    },
  ];

  const comments = recentActivity?.comments ?? [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, {profile?.name || "User"}! Here&apos;s your activity
            summary.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
              {profile?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile?.name || "Unknown"}
                </h2>
                {/* Role Badge */}
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    isMember
                      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {isMember ? "Member" : "User"}
                </span>
                {/* Status Badge */}
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    profile?.userStatus === "ACTIVE"
                      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                  }`}
                >
                  {profile?.userStatus || "Unknown"}
                </span>
                {/* Payment Status Badge */}
                {hasPendingPayment && (
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400">
                    Payment Pending
                  </span>
                )}
                {hasPaidButNotApproved && (
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                    Awaiting Approval
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {profile?.email || "No email"}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {formatDate(profile?.createdAt)}
                </div>
              </div>
            </div>

            {/* Action Button based on membership status */}
            {!isMember && hasPendingPayment && (
              <Link
                href="/dashboard/become-member"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-xl hover:from-yellow-700 hover:to-amber-700 transition-all shadow-md whitespace-nowrap"
              >
                <Clock className="w-4 h-4" />
                Complete Payment
              </Link>
            )}
            {!isMember && hasPaidButNotApproved && (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 rounded-xl whitespace-nowrap">
                <Clock className="w-4 h-4" />
                Pending Approval
              </div>
            )}
            {!isMember && hasNoPayment && (
              <Link
                href="/dashboard/become-member"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md whitespace-nowrap"
              >
                <Crown className="w-4 h-4" />
                Become a Member
              </Link>
            )}
          </div>
        </div>

        {/* Pending Approval Info Banner */}
        {hasPaidButNotApproved && (
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 mb-8 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-400">
                  Membership Pending Approval
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-500">
                  Your payment has been received! Our admin team will review
                  your membership application and activate it soon. You&apos;ll
                  receive a notification once approved.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pending Payment Info Banner */}
        {hasPendingPayment && (
          <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-4 mb-8 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-400">
                  Complete Your Payment
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-500">
                  You have a pending membership payment. Please complete the
                  payment to activate your membership.
                </p>
                <Link
                  href="/dashboard/become-member"
                  className="inline-block mt-2 text-sm font-medium text-yellow-700 dark:text-yellow-500 hover:underline"
                >
                  Complete Payment →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Become Member CTA (for non-members with no payment) */}
        {!isMember && hasNoPayment && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  🚀 Unlock Premium Features
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Become a member to post your own ideas, get featured, and earn
                  rewards!
                </p>
              </div>
              <Link
                href="/dashboard/become-member"
                className="px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all text-center whitespace-nowrap"
              >
                Become a Member →
              </Link>
            </div>
          </div>
        )}

        {/* Member Benefits Card (for members) */}
        {isMember && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  🎉 You&apos;re a Member!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Enjoy premium features, post your ideas, and connect with the
                  community!
                </p>
              </div>
              <Link
                href="/member/dashboard"
                className="px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all text-center whitespace-nowrap"
              >
                Go to Member Dashboard →
              </Link>
            </div>
          </div>
        )}

        {/* Recent Activity Section */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Comments */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Recent Comments
                </h3>
              </div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-zinc-800">
              {comments.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No comments yet. Start engaging with ideas!
                </div>
              ) : (
                comments.slice(0, 5).map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">
                      {comment.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <Link
                        href={`/ideas/${comment.idea?.slug || "#"}`}
                        className="text-green-600 hover:text-green-700 hover:underline"
                      >
                        on &apos;{comment.idea?.title || "Unknown Idea"}&apos;
                      </Link>
                      <span>{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            {comments.length > 0 && (
              <div className="p-4 border-t border-gray-100 dark:border-zinc-800 text-center">
                <Link
                  href="/dashboard/activity"
                  className="text-sm text-green-600 hover:text-green-700 inline-flex items-center gap-1"
                >
                  View all comments <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>

          {/* Your Impact */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Your Impact
                </h3>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Ideas Supported
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {stats?.totalVotes ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Comments Made
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {stats?.totalComments ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Ideas Purchased
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {stats?.totalPurchases ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Saved to Watchlist
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {stats?.totalWatchlist ?? 0}
                </span>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-zinc-800 text-center">
              <Link
                href="/watchlist"
                className="text-sm text-green-600 hover:text-green-700 inline-flex items-center gap-1"
              >
                View your watchlist <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
