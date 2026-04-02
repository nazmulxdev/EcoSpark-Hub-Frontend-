// components/home/CommunityImpactSection.tsx

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Leaf,
  Users,
  Lightbulb,
  TrendingUp,
  MessageCircle,
  Eye,
  Heart,
  Clock,
  ArrowRight,
  Zap,
  Recycle,
  TreePine,
  Droplets,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample recent activity data (replace with real API data)
const recentActivities = [
  {
    id: 1,
    type: "idea",
    user: { name: "Sarah Chen", avatar: null },
    action: "shared a new idea",
    title: "Community Solar Garden Initiative",
    time: "2 hours ago",
    icon: Lightbulb,
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: 2,
    type: "vote",
    user: { name: "Michael Rodriguez", avatar: null },
    action: "voted on",
    title: "Plastic Waste to Building Materials",
    time: "5 hours ago",
    icon: Heart,
    color: "bg-red-100 text-red-600",
  },
  {
    id: 3,
    type: "comment",
    user: { name: "Emma Watson", avatar: null },
    action: "commented on",
    title: "Urban Rooftop Farming Network",
    time: "1 day ago",
    icon: MessageCircle,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    type: "member",
    user: { name: "David Kim", avatar: null },
    action: "joined the community",
    title: "",
    time: "1 day ago",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
];

// Impact metrics
const impactMetrics = [
  {
    label: "CO₂ Reduced (est.)",
    value: "12,450",
    unit: "kg",
    icon: Leaf,
    trend: "+23%",
  },
  {
    label: "Trees Saved",
    value: "2,340",
    unit: "",
    icon: TreePine,
    trend: "+15%",
  },
  {
    label: "Water Conserved",
    value: "89,500",
    unit: "L",
    icon: Droplets,
    trend: "+31%",
  },
  {
    label: "Waste Recycled",
    value: "15,200",
    unit: "kg",
    icon: Recycle,
    trend: "+42%",
  },
];

export function CommunityImpactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [counts, setCounts] = useState({
    co2: 0,
    trees: 0,
    water: 0,
    waste: 0,
  });

  // Animate counter when in view
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      const co2Step = 12450 / steps;
      const treesStep = 2340 / steps;
      const waterStep = 89500 / steps;
      const wasteStep = 15200 / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setCounts({
          co2: Math.min(Math.floor(co2Step * currentStep), 12450),
          trees: Math.min(Math.floor(treesStep * currentStep), 2340),
          water: Math.min(Math.floor(waterStep * currentStep), 89500),
          waste: Math.min(Math.floor(wasteStep * currentStep), 15200),
        });
        if (currentStep >= steps) clearInterval(interval);
      }, stepTime);
    }
  }, [isInView]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section ref={ref} className=" bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-950/50 rounded-2xl mb-4">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Community Impact
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              See how our community is making a real difference for the planet
            </p>
          </motion.div>
        </div>

        {/* Impact Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {impactMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            let currentValue = 0;
            if (metric.label.includes("CO₂")) currentValue = counts.co2;
            else if (metric.label.includes("Trees"))
              currentValue = counts.trees;
            else if (metric.label.includes("Water"))
              currentValue = counts.water;
            else if (metric.label.includes("Waste"))
              currentValue = counts.waste;

            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-zinc-800/50 dark:to-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 text-center hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-950/50 rounded-xl mb-4">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {currentValue.toLocaleString()}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    {metric.unit}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {metric.label}
                </div>
                <div className="text-xs text-green-600 mt-2">
                  {metric.trend}
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-50 dark:bg-zinc-800/30 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h3>
              <Link href="/ideas">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${activity.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-gray-900 dark:text-white">
                          {activity.user.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {activity.action}
                        </span>
                        {activity.title && (
                          <Link
                            href={`/ideas/${activity.title.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-sm text-green-600 hover:underline truncate"
                          >
                            {activity.title}
                          </Link>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Top Contributors / Leaders */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-50 dark:bg-zinc-800/30 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Top Contributors This Month
            </h3>

            <div className="space-y-4">
              {[
                {
                  name: "Dr. James Wilson",
                  ideas: 12,
                  votes: 234,
                  avatar: null,
                },
                { name: "Priya Sharma", ideas: 8, votes: 189, avatar: null },
                { name: "Marcus Thompson", ideas: 6, votes: 156, avatar: null },
                { name: "Elena Petrova", ideas: 5, votes: 98, avatar: null },
              ].map((contributor, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-xs font-bold text-green-700 dark:text-green-300">
                        {idx + 1}
                      </span>
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={contributor.avatar || undefined} />
                      <AvatarFallback className="bg-green-100 text-green-700 text-xs">
                        {getInitials(contributor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white">
                        {contributor.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {contributor.ideas} ideas • {contributor.votes} votes
                      </p>
                    </div>
                  </div>
                  {idx === 0 && (
                    <div className="px-2 py-1 bg-yellow-100 dark:bg-yellow-950/50 rounded-full">
                      <span className="text-xs font-medium text-yellow-700">
                        🏆 Top
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-zinc-700"></div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/register">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 gap-2">
              <Leaf className="w-5 h-5" />
              Join the Movement
              <TrendingUp className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
