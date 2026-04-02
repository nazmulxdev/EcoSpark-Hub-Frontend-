"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, DollarSign, CreditCard, Lock, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  purchaseIdea,
  purchaseIdeaWithPayLater,
} from "@/actions/client/idea.client";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  idea: {
    id: string;
    title: string;
    price: number;
    slug: string;
  };
  onPurchaseComplete?: () => void;
}

export function PurchaseModal({
  isOpen,
  onClose,
  idea,
  onPurchaseComplete,
}: PurchaseModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"payNow" | "payLater">(
    "payNow",
  );

  const handlePurchase = async () => {
    setIsLoading(true);
    const toastId = toast.loading(
      paymentMethod === "payNow"
        ? "Preparing checkout..."
        : "Creating payment record...",
    );

    try {
      let result;
      if (paymentMethod === "payNow") {
        result = await purchaseIdea(idea.id);
      } else {
        result = await purchaseIdeaWithPayLater(idea.id);
      }

      if (result.error) {
        toast.error(result.error.message || "Failed to process", {
          id: toastId,
        });
        setIsLoading(false);
        return;
      }

      console.log(result);

      if (paymentMethod === "payNow" && result.data?.paymentUrl) {
        toast.success("Redirecting to payment...", { id: toastId });
        window.location.href = result.data.paymentUrl;
      } else {
        toast.success(
          "Payment record created! You can complete payment later from your dashboard.",
          { id: toastId },
        );
        onPurchaseComplete?.();
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-xl">
                    <DollarSign className="w-5 h-5 text-green-600 dark:text-green-500" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Purchase Idea
                  </h2>
                </div>
                <Button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-5 space-y-5">
                <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {idea.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-500">
                      ${idea.price}
                    </span>
                    <span className="text-sm text-gray-500">USD</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Payment Option
                  </label>
                  <div className="w-full">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("payNow")}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all w-full ${
                        paymentMethod === "payNow"
                          ? "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400"
                          : "border-gray-200 dark:border-zinc-700 hover:border-green-500"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="text-sm font-medium">Pay Now</span>
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-blue-600 dark:text-blue-500 mt-0.5" />
                    <p className="text-xs text-blue-700 dark:text-blue-500">
                      {paymentMethod === "payNow"
                        ? "Your payment is secure and encrypted. After purchase, you'll have lifetime access to this idea."
                        : "Create a payment record now and complete payment later. You can pay from your dashboard anytime."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePurchase}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all shadow-md disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : paymentMethod === "payNow" ? (
                      `Pay $${idea.price}`
                    ) : (
                      "Create Payment Record"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
