"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Crown,
  Sparkles,
  Users,
  Lightbulb,
  TrendingUp,
  Award,
  Shield,
  CreditCard,
  Wallet,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  becomeMember,
  becomeMemberWithPayLater,
  initiatePayment,
} from "@/actions/client/membershipPayment.action";
import { env } from "@/config/env";

interface BecomeMemberClientProps {
  userId: string;
  hasPendingPayment?: boolean;
  pendingPaymentStatus?: string | null;
}

export function BecomeMemberClient({
  userId,
  hasPendingPayment,
  pendingPaymentStatus,
}: BecomeMemberClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"payNow" | "payLater">(
    "payNow",
  );

  const benefits = [
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
    {
      icon: Shield,
      title: "Premium Support",
      description: "Priority support for all your queries",
    },
    {
      icon: Sparkles,
      title: "Exclusive Content",
      description: "Access member-only ideas and resources",
    },
  ];

  const handlePayNow = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Preparing payment...");

    try {
      let result;

      if (hasPendingPayment) {
        // User has pending payment, initiate payment for existing record
        result = await initiatePayment();
      } else {
        // Create new payment and redirect to Stripe
        result = await becomeMember();
      }

      if (result.error) {
        toast.error(result.error.message || "Failed to initiate payment", {
          id: toastId,
        });
        setIsLoading(false);
        return;
      }

      if (result.data?.paymentUrl) {
        toast.success("Redirecting to payment...", { id: toastId });
        window.location.href = result.data.paymentUrl;
      } else {
        toast.error("No payment URL received", { id: toastId });
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
      setIsLoading(false);
    }
  };

  const handlePayLater = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Creating membership request...");

    try {
      const result = await becomeMemberWithPayLater();

      if (result.error) {
        toast.error(
          result.error.message || "Failed to create membership request",
          {
            id: toastId,
          },
        );
        setIsLoading(false);
        return;
      }

      if (result.data) {
        toast.success(
          "Membership request created! Please complete payment to activate.",
          {
            id: toastId,
          },
        );
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    if (selectedOption === "payNow") {
      handlePayNow();
    } else {
      handlePayLater();
    }
  };

  // If this is called for pending payment completion, show only the payment button
  if (hasPendingPayment) {
    return (
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handlePayNow}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md disabled:opacity-50 min-w-[200px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              Complete Payment
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Become a Member
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Unlock premium features and join a community of sustainability
            visionaries
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white text-center">
              <h2 className="text-2xl font-bold">Membership Plan</h2>
              <p className="text-white/80 mt-1">
                One-time payment, lifetime access
              </p>
            </div>
            <div className="p-8 text-center">
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  ${env.NEXT_PUBLIC_MEMBERSHIP_PRICE}
                </span>
                <span className="text-gray-500 dark:text-gray-400"> USD</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                One-time payment for lifetime membership
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            What You&apos;ll Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-zinc-800 hover:shadow-md transition-all"
                >
                  <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-xl w-fit mb-4">
                    <Icon className="w-6 h-6 text-green-600 dark:text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Options */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Choose Payment Option
            </h3>
            <div className="space-y-4">
              <label className="flex items-start gap-4 p-4 border border-gray-200 dark:border-zinc-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all">
                <input
                  type="radio"
                  name="paymentOption"
                  value="payNow"
                  checked={selectedOption === "payNow"}
                  onChange={() => setSelectedOption("payNow")}
                  className="mt-1 w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Pay Now
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Pay immediately with credit card. After payment, admin will
                    review and activate your membership.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-4 border border-gray-200 dark:border-zinc-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all">
                <input
                  type="radio"
                  name="paymentOption"
                  value="payLater"
                  checked={selectedOption === "payLater"}
                  onChange={() => setSelectedOption("payLater")}
                  className="mt-1 w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Wallet className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Pay Later
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Create a membership request. You can complete the payment
                    later from your dashboard.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={isLoading}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {selectedOption === "payNow"
                  ? "Pay Now"
                  : "Create Membership Request"}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Secure payment powered by Stripe. Your information is protected.
          </p>
        </div>
      </div>
    </div>
  );
}
