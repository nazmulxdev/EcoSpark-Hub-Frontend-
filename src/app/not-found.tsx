"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Leaf, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg relative z-10"
      >
        {/* Animated 404 */}
        <div className="relative mb-8">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, -2, 2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-9xl lg:text-[12rem] font-bold text-green-500/10">
              404
            </div>
          </motion.div>

          <div className="relative z-10">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Leaf className="w-20 h-20 mx-auto text-green-500 mb-4" />
            </motion.div>
            <h1 className="text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              404
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Oops! Page not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Looks like you&apos;ve wandered off the sustainable path. The page
            you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Decorative Element */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-green-500"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-green-500"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg group"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Back to Home
          </Link>
          <Link
            href="/ideas"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-200 group"
          >
            <Compass className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Explore Ideas
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-800">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Need help?{" "}
            <Link
              href="/contact"
              className="text-green-500 hover:underline font-medium"
            >
              Contact support
            </Link>{" "}
            or go back to{" "}
            <Link
              href="/"
              className="text-green-500 hover:underline font-medium"
            >
              homepage
            </Link>
          </p>
        </div>

        {/* Eco Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-100 dark:border-green-900"
        >
          <p className="text-xs text-green-700 dark:text-green-400">
            🌱 Did you know? Every page you visit saves 0.5g of CO2. Even 404
            pages can be eco-friendly!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
