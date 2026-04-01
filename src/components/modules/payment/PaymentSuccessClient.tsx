/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Crown,
  Sparkles,
  ArrowRight,
  LayoutDashboard,
  Award,
  TrendingUp,
  Users,
  Lightbulb,
  Clock,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

interface PaymentSuccessClientProps {
  paymentId?: string;
  sessionId?: string;
  userName: string;
  paymentStatus?: string;
  memberStatus?: string;
}

export function PaymentSuccessClient({
  paymentId,
  userName,
  paymentStatus,
  memberStatus,
}: PaymentSuccessClientProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  // Check if payment is PAID
  const isPaid = paymentStatus === "PAID";
  // Check if member is APPROVED by admin
  const isApproved = memberStatus === "APPROVED";

  // Determine the actual status
  const isActive = isPaid && isApproved;
  useEffect(() => {
    // Trigger confetti animation only if payment is PAID
    if (isPaid) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isPaid]);

  useEffect(() => {
    if (isActive) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push("/member/dashboard/become-member");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isActive, router]);

  const features = [
    {
      icon: Lightbulb,
      title: "Post Your Ideas",
      description: "Share your sustainability ideas with the community",
    },
    {
      icon: TrendingUp,
      title: "Get Featured",
      description: "Your best ideas can be featured on the homepage",
    },
    {
      icon: Award,
      title: "Earn Rewards",
      description: "Get recognized and rewarded for your contributions",
    },
    {
      icon: Users,
      title: "Community Access",
      description: "Connect with like-minded sustainability enthusiasts",
    },
  ];

  // Show error if payment is not PAID
  if (!isPaid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 dark:bg-red-950/50 rounded-full mb-6">
              <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Payment Not Completed
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Your payment could not be verified. Please contact support.
            </p>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard/become-member"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md"
            >
              Try Again
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center mb-8"
        >
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
              isActive
                ? "bg-green-100 dark:bg-green-950/50"
                : "bg-yellow-100 dark:bg-yellow-950/50"
            }`}
          >
            {isActive ? (
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-500" />
            ) : (
              <Clock className="w-12 h-12 text-yellow-600 dark:text-yellow-500" />
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {isActive ? "Payment Successful! 🎉" : "Payment Received!"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {isActive
              ? `Thank you, ${userName}! Your membership is now active.`
              : `Thank you, ${userName}! Your payment has been received. Your membership is pending admin approval.`}
          </p>
        </motion.div>

        {/* Membership Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 overflow-hidden mb-8"
        >
          <div
            className={`p-6 text-white ${
              isActive
                ? "bg-gradient-to-r from-green-600 to-emerald-600"
                : "bg-gradient-to-r from-yellow-600 to-amber-600"
            }`}
          >
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold">EcoSpark Hub Member</h2>
                <p className="text-white/80 text-sm">
                  {isActive ? "Active Membership" : "Pending Approval"}
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                <Sparkles className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Member Since
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                {isActive ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Clock className="w-5 h-5 text-yellow-500" />
                )}
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <p
                    className={`font-medium ${
                      isActive
                        ? "text-green-600 dark:text-green-500"
                        : "text-yellow-600 dark:text-yellow-500"
                    }`}
                  >
                    {isActive ? "Active" : "Pending Admin Approval"}
                  </p>
                </div>
              </div>
            </div>
            {paymentId && (
              <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Transaction ID
                </p>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
                  {paymentId}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Pending Approval Info */}
        {!isActive && isPaid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-5 mb-8 border border-yellow-200 dark:border-yellow-800"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-1">
                  Membership Pending Approval
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-500">
                  Your payment has been received successfully! Our admin team
                  will review your membership application and activate it soon.
                  You will receive a notification once approved.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            {isActive ? "What's Next?" : "Next Steps"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800"
                >
                  <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <Icon className="w-5 h-5 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isActive
                        ? feature.description
                        : `After approval, you can ${feature.description.toLowerCase()}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={isActive ? "/member/dashboard" : "/dashboard"}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md"
          >
            <LayoutDashboard className="w-4 h-4" />
            {isActive ? "Go to Member Dashboard" : "Go to Dashboard"}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/ideas"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Explore Ideas
          </Link>
        </motion.div>

        {/* Auto-redirect Message */}
        {isActive && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6"
          >
            Redirecting to member dashboard in {countdown} seconds...
          </motion.p>
        )}
      </div>
    </div>
  );
}
