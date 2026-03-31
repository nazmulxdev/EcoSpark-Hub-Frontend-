"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Users, Award, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10"></div>
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto"
          >
            Igniting the next{" "}
            <span className="text-green-600 dark:text-green-500">
              Green Revolution
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
          >
            A collaborative hub for visionaries to share, refine, and scale
            environmental breakthroughs. Join thousands of contributors building
            a cleaner future.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/ideas"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 font-medium shadow-md"
            >
              Explore Ideas
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all duration-200 font-medium"
            >
              Join Community
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Leaf,
              value: "1.2M",
              label: "Kilowatts of energy saved",
              color: "text-green-500",
            },
            {
              icon: Users,
              value: "50K+",
              label: "Community members",
              color: "text-blue-500",
            },
            {
              icon: Award,
              value: "1,200+",
              label: "Sustainable ideas shared",
              color: "text-purple-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-gray-50 dark:bg-zinc-900/50 rounded-xl text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex p-3 bg-green-100 dark:bg-green-950/50 rounded-full mb-4">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
