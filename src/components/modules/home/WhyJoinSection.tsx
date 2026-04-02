// components/home/WhyJoinSection.tsx

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Leaf,
  Users,
  Lightbulb,
  Award,
  TrendingUp,
  MessageCircle,
  Globe,
  Rocket,
  Shield,
  Heart,
  Sparkles,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhyJoinSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const benefits = [
    {
      title: "Share Your Ideas",
      description:
        "Post your sustainability ideas and get feedback from like-minded individuals.",
      icon: Lightbulb,
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
    },
    {
      title: "Get Community Feedback",
      description:
        "Receive votes and comments to improve and validate your ideas.",
      icon: MessageCircle,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
    },
    {
      title: "Earn Recognition",
      description: "Top ideas get featured and recognized by the community.",
      icon: Award,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
    },
    {
      title: "Access Premium Content",
      description:
        "Members get exclusive access to premium sustainability ideas.",
      icon: Rocket,
      color:
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400",
    },
    {
      title: "Build Your Network",
      description:
        "Connect with environmental experts and sustainability enthusiasts.",
      icon: Users,
      color:
        "bg-green-100 text-green-600 dark:bg-green-950/50 dark:text-green-400",
    },
    {
      title: "Make Real Impact",
      description: "Your ideas can inspire real-world sustainable solutions.",
      icon: Globe,
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
    },
  ];

  const stats = [
    { value: "500+", label: "Ideas Shared", icon: Lightbulb },
    { value: "50+", label: "Active Members", icon: Users },
    { value: "1,000+", label: "Community Votes", icon: TrendingUp },
    { value: "10+", label: "Countries", icon: Globe },
  ];

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-950/50 rounded-2xl mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Join EcoSpark Hub?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join a growing community of changemakers who are passionate about
              creating a sustainable future
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-4 text-center hover:shadow-md transition-all"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-950/50 rounded-lg mb-2">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                className="group bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${benefit.color} mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonial / Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-8 md:p-10 text-center border border-green-100 dark:border-green-800/50"
        >
          <div className="absolute top-4 left-4 text-6xl text-green-300 dark:text-green-800/30 font-serif">
            &quot;
          </div>
          <div className="relative z-10">
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic max-w-3xl mx-auto mb-6">
              EcoSpark Hub gave me the platform to share my composting idea.
              Within weeks, I connected with three local organizations
              interested in implementing it!
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center">
                <span className="text-sm font-bold text-green-700 dark:text-green-300">
                  SN
                </span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Sarah N.
                </p>
                <p className="text-sm text-gray-500">Community Member</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 text-6xl text-green-300 dark:text-green-800/30 font-serif">
            &quot;
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-12"
        >
          <Link href="/register">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 gap-2 px-8"
            >
              <Sparkles className="w-5 h-5" />
              Join Our Community
              <Rocket className="w-5 h-5" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Free to join • No credit card required • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
