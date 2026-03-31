"use client";

import { motion } from "framer-motion";
import {
  Star,
  TrendingUp,
  Award,
  UserPlus,
  Lightbulb,
  Eye,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
  const stats = [
    {
      title: "Ideas Supported",
      value: "23",
      icon: Lightbulb,
      color: "bg-yellow-500",
      change: "+5 this week",
    },
    {
      title: "Watchlist",
      value: "8",
      icon: Star,
      color: "bg-purple-500",
      change: "+2 new",
    },
    {
      title: "Upvotes Given",
      value: "156",
      icon: TrendingUp,
      color: "bg-green-500",
      change: "+12 this month",
    },
    {
      title: "Impact Points",
      value: "1,234",
      icon: Award,
      color: "bg-blue-500",
      change: "Earn more",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "upvote",
      idea: "Ocean Plastic Cleanup Robot",
      time: "2 hours ago",
      icon: ThumbsUp,
    },
    {
      id: 2,
      type: "watchlist",
      idea: "Solar-Powered Water Purifier",
      time: "1 day ago",
      icon: Star,
    },
    {
      id: 3,
      type: "view",
      idea: "Biodegradable Packaging",
      time: "3 days ago",
      icon: Eye,
    },
  ];

  const recommendedIdeas = [
    {
      id: 1,
      title: "Ocean Plastic Cleanup Robot",
      category: "Waste",
      votes: 456,
      author: "Jane Doe",
    },
    {
      id: 2,
      title: "Solar-Powered Water Purifier",
      category: "Energy",
      votes: 328,
      author: "John Smith",
    },
    {
      id: 3,
      title: "Biodegradable Packaging Solution",
      category: "Waste",
      votes: 267,
      author: "Alice Johnson",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Explore sustainable ideas and make a positive impact on our planet.
          </p>
        </div>
        <Link
          href="/dashboard/become-member"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md whitespace-nowrap"
        >
          <UserPlus className="w-4 h-4" />
          Become a Member
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

      {/* Become Member CTA */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-6">
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

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-zinc-800">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg">
                        <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          You {activity.type}d{" "}
                          <Link
                            href={`/ideas/${activity.id}`}
                            className="text-green-600 hover:underline"
                          >
                            {activity.idea}
                          </Link>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recommended Ideas */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recommended for You
            </h2>
            <Link
              href="/ideas"
              className="text-sm text-green-600 hover:text-green-700 dark:text-green-500 font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedIdeas.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400">
                    {idea.category}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {idea.votes}
                  </div>
                </div>
                <Link
                  href={`/ideas/${idea.id}`}
                  className="text-lg font-semibold text-gray-900 dark:text-white hover:text-green-600 transition-colors"
                >
                  {idea.title}
                </Link>
                <p className="text-sm text-gray-500 mt-2">by {idea.author}</p>
                <Link
                  href={`/ideas/${idea.id}`}
                  className="inline-block mt-4 text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Learn more →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
