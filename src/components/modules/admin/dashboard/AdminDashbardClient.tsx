"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  Lightbulb,
  DollarSign,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Star,
  Calendar,
  ChevronRight,
  Wallet,
  CreditCard,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface DashboardStats {
  kpis: {
    totalUsers: number;
    totalMembers: number;
    totalIdeas: number;
    totalVotes: number;
    totalComments: number;
    totalRevenue: number;
    membershipRevenue: number;
    ideaRevenue: number;
  };
  charts: {
    userStatusBreakdown: Array<{ label: string; value: number; color: string }>;
    memberStatusBreakdown: Array<{
      label: string;
      value: number;
      color: string;
    }>;
    ideaStatusBreakdown: Array<{ label: string; value: number; color: string }>;
    ideaAccessTypeBreakdown: Array<{ label: string; value: number }>;
    revenueBreakdown: Array<{ label: string; value: number; color: string }>;
    monthlyRevenueTrend: Array<{
      month: string;
      membershipRevenue: number;
      ideaRevenue: number;
      totalRevenue: number;
    }>;
    topIdeasByEngagement: Array<{
      title: string;
      slug: string;
      votes: number;
      comments: number;
      purchases: number;
    }>;
  };
  pendingMemberApplications: Array<{
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
      createdAt: string;
    };
    membershipPayment: {
      amount: number;
      currency: string;
      status: string;
      createdAt: string;
    };
    createdAt: string;
  }>;
  underReviewIdeas: Array<{
    id: string;
    title: string;
    slug: string;
    author: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    };
    category: {
      id: string;
      name: string;
    };
    _count: {
      votes: number;
      comments: number;
    };
    createdAt: string;
  }>;
}

interface AdminDashboardClientProps {
  stats: DashboardStats;
}

export function AdminDashboardClient({ stats }: AdminDashboardClientProps) {
  const [activeChart, setActiveChart] = useState<"revenue" | "engagement">(
    "revenue",
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (date: string) => {
    return format(new Date(date), "MMM d, yyyy");
  };

  // Format month for chart
  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split("-");
    return format(new Date(parseInt(year), parseInt(month) - 1), "MMM yyyy");
  };

  const COLORS = {
    green: "#22c55e",
    yellow: "#f59e0b",
    red: "#ef4444",
    blue: "#3b82f6",
    purple: "#8b5cf6",
    indigo: "#6366f1",
    cyan: "#06b6d4",
    pink: "#ec489a",
  };

  const KPIs = [
    {
      title: "Total Users",
      value: stats.kpis.totalUsers,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
      href: "/admin/dashboard/users",
    },
    {
      title: "Total Members",
      value: stats.kpis.totalMembers,
      icon: UserCheck,
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-950/30",
      href: "/admin/dashboard/members",
    },
    {
      title: "Total Ideas",
      value: stats.kpis.totalIdeas,
      icon: Lightbulb,
      color: "text-yellow-500",
      bg: "bg-yellow-50 dark:bg-yellow-950/30",
      href: "/admin/dashboard/ideas",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(stats.kpis.totalRevenue),
      icon: DollarSign,
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950/30",
      href: "/admin/dashboard/analytics",
    },
  ];

  const EngagementKPIs = [
    {
      title: "Total Votes",
      value: stats.kpis.totalVotes,
      icon: ThumbsUp,
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-950/30",
    },
    {
      title: "Total Comments",
      value: stats.kpis.totalComments,
      icon: MessageSquare,
      color: "text-cyan-500",
      bg: "bg-cyan-50 dark:bg-cyan-950/30",
    },
    {
      title: "Membership Revenue",
      value: formatCurrency(stats.kpis.membershipRevenue),
      icon: CreditCard,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      title: "Idea Revenue",
      value: formatCurrency(stats.kpis.ideaRevenue),
      icon: Wallet,
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-950/30",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here&apos;s what&apos;s happening on your platform.
          </p>
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {KPIs.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <Link
                key={idx}
                href={kpi.href}
                className="group bg-white dark:bg-zinc-900 rounded-xl p-5 border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${kpi.bg}`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {kpi.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {kpi.title}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-end text-xs text-green-600">
                  <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Engagement KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {EngagementKPIs.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-gray-200 dark:border-zinc-800 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${kpi.bg}`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {kpi.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {kpi.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Analytics
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveChart("revenue")}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  activeChart === "revenue"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setActiveChart("engagement")}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  activeChart === "engagement"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
                }`}
              >
                Engagement
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend Chart */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Revenue Trend (Last 6 Months)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={stats.charts.monthlyRevenueTrend.map((item) => ({
                      ...item,
                      month: formatMonth(item.month),
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => formatCurrency(value as number)}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="membershipRevenue"
                      name="Membership"
                      stroke={COLORS.indigo}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ideaRevenue"
                      name="Ideas"
                      stroke={COLORS.cyan}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalRevenue"
                      name="Total"
                      stroke={COLORS.green}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Ideas by Engagement */}
            {activeChart === "engagement" ? (
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Top Ideas by Engagement
                </h3>
                <div className="space-y-4">
                  {stats.charts.topIdeasByEngagement.map((idea, idx) => (
                    <Link
                      key={idx}
                      href={`/ideas/${idea.slug}`}
                      target="_blank"
                      className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {idea.title}
                          </p>
                          <div className="flex gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" /> {idea.votes}{" "}
                              votes
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />{" "}
                              {idea.comments} comments
                            </span>
                            {idea.purchases > 0 && (
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />{" "}
                                {idea.purchases} purchases
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-500" />
                  Revenue Breakdown
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={stats.charts.revenueBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent ? percent * 100 : 0).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {stats.charts.revenueBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => formatCurrency(value as number)}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {stats.charts.revenueBreakdown.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium ml-auto">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Status Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* User Status */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                User Status
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={stats.charts.userStatusBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      dataKey="value"
                      label={({ percent }) =>
                        `${(percent ? percent * 100 : 0).toFixed(0)}%`
                      }
                    >
                      {stats.charts.userStatusBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 space-y-1">
                {stats.charts.userStatusBreakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.label}
                    </span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Member Status */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-green-500" />
                Member Applications
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={stats.charts.memberStatusBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      dataKey="value"
                      label={({ percent }) =>
                        `${(percent ? percent * 100 : 0).toFixed(0)}%`
                      }
                    >
                      {stats.charts.memberStatusBreakdown.map(
                        (entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ),
                      )}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 space-y-1">
                {stats.charts.memberStatusBreakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.label}
                    </span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Idea Status */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Idea Status
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={stats.charts.ideaStatusBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      dataKey="value"
                      label={({ percent }) =>
                        `${(percent ? percent * 100 : 0).toFixed(0)}%`
                      }
                    >
                      {stats.charts.ideaStatusBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 space-y-1">
                {stats.charts.ideaStatusBreakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.label}
                    </span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Queues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Member Applications */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-5 border-b border-gray-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-lg font-semibold">
                    Pending Member Applications
                  </h2>
                </div>
                <Link
                  href="/admin/dashboard/members?status=pending"
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  View all →
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-zinc-800">
              {stats.pendingMemberApplications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No pending member applications
                </div>
              ) : (
                stats.pendingMemberApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {app.user.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {app.user.email}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span>Applied: {formatDate(app.createdAt)}</span>
                          <span>
                            Amount: ${app.membershipPayment?.amount || 0}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/admin/dashboard/members/${app.id}`}
                        className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Ideas Under Review */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-5 border-b border-gray-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-lg font-semibold">Ideas Under Review</h2>
                </div>
                <Link
                  href="/admin/dashboard/ideas?status=UNDER_REVIEW"
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  View all →
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-zinc-800">
              {stats.underReviewIdeas.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No ideas pending review
                </div>
              ) : (
                stats.underReviewIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {idea.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          by {idea.author.name}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span>Category: {idea.category.name}</span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" /> {idea._count.votes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />{" "}
                            {idea._count.comments}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/admin/dashboard/ideas/${idea.slug}`}
                        className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
