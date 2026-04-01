"use client";

import {
  DollarSign,
  CreditCard,
  Wallet,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AnalysisData {
  membership: {
    totalRevenue: number;
    breakdown: Array<{
      status: string;
      count: number;
      revenue: number;
    }>;
  };
  idea: {
    totalRevenue: number;
    breakdown: Array<{
      status: string;
      count: number;
      revenue: number;
    }>;
  };
  totalRevenue: number;
}

interface AdminAnalysisClientProps {
  data: AnalysisData;
}

export function AdminAnalysisClient({ data }: AdminAnalysisClientProps) {
  // Safely access data with fallbacks
  const membershipData = data?.membership || { totalRevenue: 0, breakdown: [] };
  const ideaData = data?.idea || { totalRevenue: 0, breakdown: [] };
  const totalRevenue = data?.totalRevenue || 0;

  const COLORS = {
    paid: "#22c55e",
    pending: "#f59e0b",
    failed: "#ef4444",
    refunded: "#8b5cf6",
    membership: "#6366f1",
    idea: "#0ea5e9",
  };

  // Prepare membership data for pie chart
  const membershipPieData =
    membershipData.breakdown?.map((item) => ({
      name: item.status,
      value: item.revenue || 0,
      count: item.count || 0,
    })) || [];

  // Prepare idea data for pie chart (handle empty array)
  const ideaPieData =
    ideaData.breakdown?.map((item) => ({
      name: item.status,
      value: item.revenue || 0,
      count: item.count || 0,
    })) || [];

  // Prepare bar chart data
  const barChartData = [
    {
      name: "Membership",
      revenue: membershipData.totalRevenue || 0,
      count:
        membershipData.breakdown?.reduce((sum, i) => sum + (i.count || 0), 0) ||
        0,
    },
    {
      name: "Ideas",
      revenue: ideaData.totalRevenue || 0,
      count:
        ideaData.breakdown?.reduce((sum, i) => sum + (i.count || 0), 0) || 0,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Payment Analytics
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Revenue insights and payment analysis
          </p>
        </div>

        {/* Total Revenue Card */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Total Revenue</p>
                <p className="text-4xl font-bold mt-2">
                  {formatCurrency(totalRevenue)}
                </p>
                <p className="text-sm opacity-80 mt-2">
                  Combined revenue from all sources
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <DollarSign className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Membership Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl">
                    <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Membership Revenue
                    </h2>
                    <p className="text-sm text-gray-500">
                      Total: {formatCurrency(membershipData.totalRevenue)}
                    </p>
                  </div>
                </div>
                {membershipData.totalRevenue > 0 && (
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="text-sm">+100%</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              {membershipPieData.length > 0 ? (
                <>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={membershipPieData}
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
                          {membershipPieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.name === "PAID"
                                  ? COLORS.paid
                                  : entry.name === "PENDING"
                                    ? COLORS.pending
                                    : entry.name === "FAILED"
                                      ? COLORS.failed
                                      : COLORS.refunded
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => formatCurrency(value as number)}
                          contentStyle={{
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Breakdown List */}
                  <div className="mt-6 space-y-2">
                    {membershipPieData.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor:
                                item.name === "PAID"
                                  ? COLORS.paid
                                  : item.name === "PENDING"
                                    ? COLORS.pending
                                    : item.name === "FAILED"
                                      ? COLORS.failed
                                      : COLORS.refunded,
                            }}
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatCurrency(item.value)}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({item.count} payments)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500 text-center">
                    No membership payments yet
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Ideas Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-50 dark:bg-cyan-950/30 rounded-xl">
                    <Wallet className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Ideas Revenue
                    </h2>
                    <p className="text-sm text-gray-500">
                      Total: {formatCurrency(ideaData.totalRevenue)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {ideaPieData.length > 0 ? (
                <>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={ideaPieData}
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
                          {ideaPieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.name === "PAID"
                                  ? COLORS.paid
                                  : entry.name === "PENDING"
                                    ? COLORS.pending
                                    : entry.name === "FAILED"
                                      ? COLORS.failed
                                      : COLORS.refunded
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => formatCurrency(value as number)}
                          contentStyle={{
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Breakdown List */}
                  <div className="mt-6 space-y-2">
                    {ideaPieData.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor:
                                item.name === "PAID"
                                  ? COLORS.paid
                                  : item.name === "PENDING"
                                    ? COLORS.pending
                                    : item.name === "FAILED"
                                      ? COLORS.failed
                                      : COLORS.refunded,
                            }}
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatCurrency(item.value)}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({item.count} purchases)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500 text-center">
                    No idea payments yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Revenue Comparison Chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-xl">
                <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Revenue Comparison
                </h2>
                <p className="text-sm text-gray-500">
                  Membership vs Ideas revenue
                </p>
              </div>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  formatter={(value) => formatCurrency(value as number)}
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill={COLORS.membership}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Table */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Membership Summary
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Revenue</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(membershipData.totalRevenue)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Payments</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {membershipData.breakdown?.reduce(
                      (sum, i) => sum + (i.count || 0),
                      0,
                    ) || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Successful Payments
                  </span>
                  <span className="font-medium text-green-600">
                    {membershipData.breakdown?.find((i) => i.status === "PAID")
                      ?.count || 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ideas Summary
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Revenue</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(ideaData.totalRevenue)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Purchases</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {ideaData.breakdown?.reduce(
                      (sum, i) => sum + (i.count || 0),
                      0,
                    ) || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Successful Purchases
                  </span>
                  <span className="font-medium text-green-600">
                    {ideaData.breakdown?.find((i) => i.status === "PAID")
                      ?.count || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
