/* eslint-disable @typescript-eslint/no-explicit-any */
// components/dashboard/member/MemberDashboardClient.tsx

"use client";

import Link from "next/link";
import {
  Lightbulb,
  Award,
  Eye,
  ThumbsUp,
  MessageSquare,
  DollarSign,
  Bookmark,
  ShoppingBag,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { IdeaAccessType } from "@/types/enums";

interface DashboardData {
  profile: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: string;
    userStatus: string;
    createdAt: string;
    member: {
      id: string;
      status: string;
      joinedAt: string;
      isActive: boolean;
      membershipPayment: {
        amount: string;
        currency: string;
        status: string;
      };
    };
  };
  kpis: {
    totalIdeas: number;
    totalVotes: number;
    totalComments: number;
    totalPurchases: number;
    totalWatchlists: number;
    totalRevenueEarned: number;
  };
  charts: {
    ideaStatusBreakdown: Array<{
      label: string;
      value: number;
      color: string;
    }>;
  };
  recentIdeas: Array<{
    id: string;
    title: string;
    slug: string;
    status: string;
    accessType: IdeaAccessType;
    price: string | null;
    createdAt: string;
    _count: {
      votes: number;
      comments: number;
      purchases: number;
    };
  }>;
  recentPurchases: Array<any>;
}

interface MemberDashboardClientProps {
  dashboardData: DashboardData;
}

export function MemberDashboardClient({
  dashboardData,
}: MemberDashboardClientProps) {
  const { profile, kpis, charts, recentIdeas } = dashboardData;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return {
          label: "Approved",
          icon: CheckCircle,
          color:
            "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
        };
      case "REJECTED":
        return {
          label: "Rejected",
          icon: XCircle,
          color: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
        };
      case "UNDER_REVIEW":
        return {
          label: "Under Review",
          icon: Clock,
          color:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
        };
      case "DRAFT":
        return {
          label: "Draft",
          icon: Lightbulb,
          color:
            "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
        };
      default:
        return {
          label: status,
          icon: Lightbulb,
          color: "bg-gray-100 text-gray-700",
        };
    }
  };

  const getAccessBadge = (type: IdeaAccessType, price?: string | null) => {
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
          label: `Premium $${price}`,
          icon: DollarSign,
          color:
            "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
        };
      case IdeaAccessType.MEMBER_ONLY:
        return {
          label: "Members Only",
          icon: Eye,
          color:
            "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
        };
      default:
        return {
          label: "Unknown",
          icon: Eye,
          color: "bg-gray-100 text-gray-700",
        };
    }
  };

  const kpiCards = [
    {
      title: "Total Ideas",
      value: kpis.totalIdeas,
      icon: Lightbulb,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
      link: "/member/dashboard/ideas",
    },
    {
      title: "Total Votes",
      value: kpis.totalVotes,
      icon: ThumbsUp,
      color:
        "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
      link: "/member/dashboard/ideas",
    },
    {
      title: "Total Comments",
      value: kpis.totalComments,
      icon: MessageSquare,
      color:
        "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400",
      link: "/member/dashboard/ideas",
    },
    {
      title: "Total Purchases",
      value: kpis.totalPurchases,
      icon: ShoppingBag,
      color:
        "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
      link: "/member/dashboard/purchased",
    },
    {
      title: "Watchlist",
      value: kpis.totalWatchlists,
      icon: Bookmark,
      color: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
      link: "/member/dashboard/watchlist",
    },
    {
      title: "Revenue Earned",
      value: `$${kpis.totalRevenueEarned}`,
      icon: DollarSign,
      color:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
      link: "/member/dashboard/purchased",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {profile.name}!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Member since{" "}
              {new Date(profile.member.joinedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/member/dashboard/ideas/new">
              <Button className="bg-green-600 hover:bg-green-700">
                <Lightbulb className="w-4 h-4 mr-2" />
                New Idea
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Member Status Card */}
      <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Membership Status
              </p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                {profile.member.status === "APPROVED"
                  ? "Active Member"
                  : "Pending"}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {profile.member.isActive
              ? "✅ Account Active"
              : "⏳ Account Inactive"}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link key={idx} href={card.link}>
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {card.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Idea Status Chart */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Idea Status
          </h3>
          <div className="space-y-3">
            {charts.ideaStatusBreakdown.map((item) => {
              const total = charts.ideaStatusBreakdown.reduce(
                (sum, i) => sum + i.value,
                0,
              );
              const percentage = total > 0 ? (item.value / total) * 100 : 0;
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.label}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.value}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Ideas</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {kpis.totalIdeas}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Ideas */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Ideas
            </h3>
            <Link href="/member/dashboard/ideas">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {recentIdeas.length === 0 ? (
            <div className="text-center py-8">
              <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No ideas yet</p>
              <Link href="/member/dashboard/ideas/new">
                <Button variant="outline" size="sm" className="mt-3">
                  Create Your First Idea
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentIdeas.slice(0, 5).map((idea) => {
                const status = getStatusBadge(idea.status);
                const StatusIcon = status.icon;
                const access = getAccessBadge(idea.accessType, idea.price);
                const AccessIcon = access.icon;

                return (
                  <Link
                    key={idea.id}
                    href={`/member/dashboard/ideas/${idea.slug}`}
                  >
                    <div className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                            {idea.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge
                              className={`${status.color} gap-1 border-0 text-xs`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {status.label}
                            </Badge>
                            <Badge
                              className={`${access.color} gap-1 border-0 text-xs`}
                            >
                              <AccessIcon className="w-3 h-3" />
                              {access.label}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDistanceToNow(new Date(idea.createdAt), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {idea._count.votes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {idea._count.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/member/dashboard/create">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-4 text-center hover:shadow-md transition-all">
            <div className="p-2 bg-green-100 dark:bg-green-950/30 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
              <Lightbulb className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              Submit New Idea
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              Share your eco-friendly idea
            </p>
          </div>
        </Link>
        <Link href="/member/dashboard/watchlist">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-4 text-center hover:shadow-md transition-all">
            <div className="p-2 bg-purple-100 dark:bg-purple-950/30 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
              <Bookmark className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              View Watchlist
            </h4>
            <p className="text-xs text-gray-500 mt-1">Saved ideas for later</p>
          </div>
        </Link>
        <Link href="/member/dashboard/purchased">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-4 text-center hover:shadow-md transition-all">
            <div className="p-2 bg-amber-100 dark:bg-amber-950/30 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              Purchased Ideas
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              Access your premium content
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
