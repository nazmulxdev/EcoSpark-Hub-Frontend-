"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  XCircle,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { IdeaStatus } from "@/types/enums";
import { Button } from "@/components/ui/button";
import { Idea } from "@/types/idea";

interface ApproveRejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  idea: Idea | null;
  onSubmit: (
    idea: Idea,
    status: IdeaStatus,
    feedback?: string,
  ) => Promise<void>;
  isSubmitting: boolean;
}

export function ApproveRejectModal({
  isOpen,
  onClose,
  idea,
  onSubmit,
  isSubmitting,
}: ApproveRejectModalProps) {
  const [selectedAction, setSelectedAction] = useState<IdeaStatus | null>(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!idea) return;

    if (selectedAction === IdeaStatus.REJECTED && !feedback.trim()) {
      setError("Please provide feedback for rejection");
      return;
    }

    await onSubmit(
      idea,
      selectedAction!,
      selectedAction === IdeaStatus.REJECTED ? feedback : undefined,
    );
  };

  const resetForm = () => {
    setSelectedAction(null);
    setFeedback("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && idea && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-950/50 rounded-xl">
                    <MessageSquare className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Review Idea
                  </h2>
                </div>
                <Button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-5 space-y-5">
                {/* Idea Info */}
                <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {idea.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {idea.description || idea.problemStatement}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    By: {idea.author?.name || "Unknown"} (
                    {idea.author?.email || "No email"})
                  </p>
                </div>

                {/* Action Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Decision
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAction(IdeaStatus.APPROVED);
                        setError("");
                      }}
                      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                        selectedAction === IdeaStatus.APPROVED
                          ? "bg-green-50 border-green-500 text-green-700 dark:bg-green-950/50 dark:border-green-600 dark:text-green-400"
                          : "border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAction(IdeaStatus.REJECTED);
                        setError("");
                      }}
                      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                        selectedAction === IdeaStatus.REJECTED
                          ? "bg-red-50 border-red-500 text-red-700 dark:bg-red-950/50 dark:border-red-600 dark:text-red-400"
                          : "border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>

                {/* Feedback for Rejection */}
                {selectedAction === IdeaStatus.REJECTED && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Feedback (Required)
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => {
                        setFeedback(e.target.value);
                        setError("");
                      }}
                      rows={4}
                      placeholder="Please provide reason for rejection to help the author improve..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    />
                    {error && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {error}
                      </p>
                    )}
                  </div>
                )}

                {/* Warning for Approval */}
                {selectedAction === IdeaStatus.APPROVED && (
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      This idea will be published and visible to all users.
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!selectedAction || isSubmitting}
                    className={`flex-1 px-4 py-2.5 rounded-xl text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedAction === IdeaStatus.APPROVED
                        ? "bg-green-600 hover:bg-green-700"
                        : selectedAction === IdeaStatus.REJECTED
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-gray-400"
                    }`}
                  >
                    {isSubmitting
                      ? "Processing..."
                      : selectedAction === IdeaStatus.APPROVED
                        ? "Approve"
                        : selectedAction === IdeaStatus.REJECTED
                          ? "Reject"
                          : "Select Option"}
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
