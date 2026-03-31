"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Leaf,
  Sparkles,
  TrendingUp,
  Users,
  Lightbulb,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Members",
      gradient: "from-yellow-400 to-orange-400",
    },
    {
      icon: Lightbulb,
      value: "1,200+",
      label: "Sustainable Ideas",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      icon: TrendingUp,
      value: "1.2M",
      label: "Energy Saved (kWh)",
      gradient: "from-green-400 to-emerald-400",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 overflow-hidden">
        {/* Simple Gradient Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Simple Floating Blobs */}
        <div className="absolute top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full min-h-screen">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="relative">
                <Leaf className="w-10 h-10 drop-shadow-lg" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight">
                  EcoSpark Hub
                </span>
                <p className="text-xs text-white/80 mt-0.5">
                  Sustainable Future Initiative
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Main Content */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">
                  Join the Green Revolution
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Ignite Change,
                <br />
                <span className="text-yellow-300">Shape Tomorrow</span>
              </h1>

              <p className="text-white/90 text-lg leading-relaxed">
                Join a global community of innovators, environmentalists, and
                dreamers working together to create a sustainable future for
                generations to come.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/40"
                    />
                  ))}
                </div>
                <span className="text-sm text-white/80">
                  Join 50,000+ members
                </span>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="flex justify-center mb-3">
                      <div
                        className={`p-2 bg-gradient-to-br ${stat.gradient} rounded-full bg-white/10 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-white/80 mt-1">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4 text-sm text-white/70">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Secure Platform</span>
              </div>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Verified Ideas</span>
              </div>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>Active Community</span>
              </div>
            </div>
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} EcoSpark Hub. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto"
      >
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                EcoSpark Hub
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Join the sustainability movement
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white dark:bg-zinc-900/80 rounded-2xl shadow-2xl p-8 lg:p-10 backdrop-blur-sm border border-gray-100 dark:border-zinc-800">
            {children}
          </div>

          {/* Additional Info */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-green-500 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-green-500 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
