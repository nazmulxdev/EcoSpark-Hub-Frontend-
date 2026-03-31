"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  Lightbulb,
  TrendingUp,
  ThumbsUp,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12%",
      icon: Users,
      color: "bg-blue-500",
      href: "/admin/dashboard/users",
    },
    {
      title: "Active Members",
      value: "1,234",
      change: "+8%",
      icon: UserCheck,
      color: "bg-green-500",
      href: "/admin/dashboard/members",
    },
    {
      title: "Total Ideas",
      value: "456",
      change: "+23%",
      icon: Lightbulb,
      color: "bg-yellow-500",
      href: "/admin/dashboard/ideas",
    },
    {
      title: "Pending Approval",
      value: "23",
      change: "+2",
      icon: Clock,
      color: "bg-orange-500",
      href: "/admin/dashboard/ideas?status=pending",
    },
  ];

  const pendingIdeas = [
    {
      id: 1,
      title: "Ocean Plastic Cleanup Robot",
      author: "Jane Doe",
      submitted: "2024-03-15",
      category: "Waste",
    },
    {
      id: 2,
      title: "Solar-Powered Water Purifier",
      author: "John Smith",
      submitted: "2024-03-14",
      category: "Energy",
    },
    {
      id: 3,
      title: "Biodegradable Packaging Solution",
      author: "Alice Johnson",
      submitted: "2024-03-13",
      category: "Waste",
    },
    {
      id: 4,
      title: "Vertical Farming System",
      author: "Bob Williams",
      submitted: "2024-03-12",
      category: "Agriculture",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Emma Watson",
      email: "emma@example.com",
      role: "MEMBER",
      joined: "2024-03-15",
    },
    {
      id: 2,
      name: "Liam Chen",
      email: "liam@example.com",
      role: "USER",
      joined: "2024-03-14",
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      email: "sofia@example.com",
      role: "MEMBER",
      joined: "2024-03-13",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here&apos;s what&apos;s happening with your platform
          today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <Link href={stat.href} className="block">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                    <Icon
                      className={`w-6 h-6 ${stat.color.replace("bg-", "text-")}`}
                    />
                  </div>
                  <span className="text-sm text-green-600 dark:text-green-500 font-medium">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.title}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Ideas */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Pending Approval
                </h2>
              </div>
              <Link
                href="/admin/dashboard/ideas?status=pending"
                className="text-sm text-green-600 hover:text-green-700 dark:text-green-500 font-medium"
              >
                View all →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-zinc-800">
            {pendingIdeas.map((idea) => (
              <div
                key={idea.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link
                      href={`/admin/dashboard/ideas/${idea.id}`}
                      className="font-medium text-gray-900 dark:text-white hover:text-green-600"
                    >
                      {idea.title}
                    </Link>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm text-gray-500">
                        by {idea.author}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600">
                        {idea.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {idea.submitted}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className="p-1.5 rounded-lg bg-green-100 dark:bg-green-950 text-green-600 hover:bg-green-200 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950 text-red-600 hover:bg-red-200 transition-colors">
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Users
                </h2>
              </div>
              <Link
                href="/admin/dashboard/users"
                className="text-sm text-green-600 hover:text-green-700 dark:text-green-500 font-medium"
              >
                View all →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-zinc-800">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.role === "MEMBER"
                          ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {user.role}
                    </span>
                    <span className="text-xs text-gray-500">{user.joined}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <ThumbsUp className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Total Votes
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            12,345
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Across all ideas
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Total Comments
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            4,567
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Community discussions
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Engagement Rate
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            67%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            +12% from last month
          </p>
        </div>
      </div>
    </div>
  );
}
