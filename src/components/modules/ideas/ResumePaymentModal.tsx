"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCw, AlertCircle, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { initiateIdeaPayment } from "@/actions/client/idea.client";
import { Button } from "@/components/ui/button";

interface ResumePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  idea: {
    id: string;
    title: string;
    slug: string;
  };
}

export function ResumePaymentModal({
  isOpen,
  onClose,
  idea,
}: ResumePaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleResumePayment = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Resuming payment...");

    try {
      const result = await initiateIdeaPayment(idea.id);

      if (result.error) {
        toast.error(result.error.message || "Failed to resume payment", {
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
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-950/30 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Complete Your Payment
                  </h2>
                </div>
                <Button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </Button>
              </div>

              <div className="p-5 space-y-5">
                <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-4 text-center">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {idea.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    You have a pending payment for this idea. Click below to
                    complete your purchase.
                  </p>
                </div>

                <button
                  onClick={handleResumePayment}
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Complete Payment
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  You will be redirected to Stripe to complete your payment
                  securely.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
