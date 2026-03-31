"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Eye,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  Plus,
  FileText,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function MemberDashboard() {
  const stats = [
    {
      title: "My Ideas",
      value: "12",
      icon: Lightbulb,
      color: "bg-yellow-500",
      change: "+3 this month",
    },
    {
      title: "Total Views",
      value: "2,345",
      icon: Eye,
      color: "bg-blue-500",
      change: "+432 this week",
    },
    {
      title: "Votes Received",
      value: "456",
      icon: ThumbsUp,
      color: "bg-green-500",
      change: "+89 this month",
    },
    {
      title: "Comments",
      value: "89",
      icon: MessageSquare,
      color: "bg-purple-500",
      change: "+12 new",
    },
  ];

  const recentIdeas = [
    {
      id: 1,
      title: "Ocean Plastic Cleanup Robot",
      status: "APPROVED",
      views: 1234,
      votes: 89,
      date: "2024-03-15",
    },
    {
      id: 2,
      title: "Solar-Powered Water Purifier",
      status: "UNDER_REVIEW",
      views: 567,
      votes: 34,
      date: "2024-03-10",
    },
    {
      id: 3,
      title: "Biodegradable Packaging Solution",
      status: "DRAFT",
      views: 0,
      votes: 0,
      date: "2024-03-05",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400";
      case "UNDER_REVIEW":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400";
      case "DRAFT":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <ThumbsUp className="w-3 h-3" />;
      case "UNDER_REVIEW":
        return <Clock className="w-3 h-3" />;
      case "DRAFT":
        return <FileText className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Member Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Track your ideas and community impact.
          </p>
        </div>
        <Link
          href="/member/dashboard/ideas/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          New Idea
        </Link>
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
              <div
                className={`p-3 rounded-xl ${stat.color} bg-opacity-10 w-fit mb-4`}
              >
                <Icon
                  className={`w-6 h-6 ${stat.color.replace("bg-", "text-")}`}
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {stat.title}
              </p>
              <p className="text-xs text-green-600 dark:text-green-500 mt-2">
                {stat.change}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Ideas */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              My Recent Ideas
            </h2>
            <Link
              href="/member/dashboard/ideas"
              className="text-sm text-green-600 hover:text-green-700 dark:text-green-500 font-medium"
            >
              View all →
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-zinc-800">
          {recentIdeas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <Link
                    href={`/ideas/${idea.id}`}
                    className="text-lg font-semibold text-gray-900 dark:text-white hover:text-green-600 transition-colors"
                  >
                    {idea.title}
                  </Link>
                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(idea.status)}`}
                    >
                      {getStatusIcon(idea.status)}
                      {idea.status}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Eye className="w-3 h-3" />
                      {idea.views} views
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <ThumbsUp className="w-3 h-3" />
                      {idea.votes} votes
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(idea.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {idea.status === "DRAFT" && (
                    <>
                      <Link
                        href={`/member/dashboard/ideas/edit/${idea.id}`}
                        className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Edit
                      </Link>
                      <button className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        Submit
                      </button>
                    </>
                  )}
                  {idea.status === "UNDER_REVIEW" && (
                    <span className="px-3 py-1.5 text-sm bg-yellow-100 text-yellow-700 rounded-lg">
                      Pending Review
                    </span>
                  )}
                  {idea.status === "APPROVED" && (
                    <Link
                      href={`/ideas/${idea.id}`}
                      className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      View Live
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/member/dashboard/ideas/create"
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-6 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Create New Idea
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Share your sustainable solution with the community
          </p>
        </Link>

        <Link
          href="/member/dashboard/drafts"
          className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-2xl p-6 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              View Drafts
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Continue working on your unpublished ideas
          </p>
        </Link>

        <Link
          href="/member/dashboard/analytics"
          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl p-6 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              View Analytics
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track your idea&apos;s performance and impact
          </p>
        </Link>
      </div>
    </div>
  );
}
