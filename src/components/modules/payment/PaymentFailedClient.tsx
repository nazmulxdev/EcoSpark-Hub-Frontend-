"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  XCircle,
  AlertCircle,
  RefreshCw,
  Home,
  CreditCard,
  HelpCircle,
  Mail,
} from "lucide-react";
import { initiatePayment } from "@/actions/client/membershipPayment.action";

interface PaymentFailedClientProps {
  sessionId?: string;
  errorMessage?: string;
  userName: string;
}

export function PaymentFailedClient({
  sessionId,
  errorMessage,
  userName,
}: PaymentFailedClientProps) {
  const router = useRouter();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    const toastId = toast.loading("Preparing payment...");

    try {
      const result = await initiatePayment();

      if (result.error) {
        toast.error(result.error.message || "Failed to initiate payment", {
          id: toastId,
        });
        setIsRetrying(false);
        return;
      }

      if (result.data?.paymentUrl) {
        toast.success("Redirecting to payment...", { id: toastId });
        window.location.href = result.data.paymentUrl;
      } else {
        toast.error("No payment URL received", { id: toastId });
        setIsRetrying(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
      setIsRetrying(false);
    }
  };

  const commonErrors = [
    {
      code: "card_declined",
      message: "Your card was declined. Please try a different card.",
    },
    {
      code: "insufficient_funds",
      message: "Insufficient funds. Please check your balance.",
    },
    {
      code: "expired_card",
      message: "Your card has expired. Please use a different card.",
    },
    {
      code: "incorrect_cvc",
      message: "Incorrect CVC code. Please check and try again.",
    },
  ];

  const getErrorMessage = () => {
    if (errorMessage) return errorMessage;
    return "Your payment could not be processed. Please try again or contact support.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Error Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 dark:bg-red-950/50 rounded-full mb-6">
            <XCircle className="w-12 h-12 text-red-600 dark:text-red-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Payment Failed
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We couldn&apos;t process your payment, {userName}.
          </p>
        </motion.div>

        {/* Error Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold">Payment Error</h2>
                <p className="text-white/80 text-sm">
                  Please review the details below
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Error Details
              </p>
              <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                <p className="text-red-600 dark:text-red-400">
                  {getErrorMessage()}
                </p>
              </div>
            </div>

            {sessionId && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Session ID
                </p>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
                  {sessionId}
                </p>
              </div>
            )}

            <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Common Issues
              </p>
              <ul className="space-y-2">
                {commonErrors.map((err, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <AlertCircle className="w-3 h-3 mt-0.5 text-red-500" />
                    <span>{err.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-green-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Need Help?
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            If you continue to experience issues, please contact our support
            team for assistance.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <Mail className="w-4 h-4" />
              Contact Support
            </Link>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRetrying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Try Again
              </>
            )}
          </button>
          <Link
            href="/dashboard/become-member"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
          >
            <CreditCard className="w-4 h-4" />
            Choose Different Payment Method
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Membership Offer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Still want to become a member?{" "}
            <Link
              href="/dashboard/become-member"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Try again
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
