"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  categoryName?: string;
  isLoading: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  categoryName,
  isLoading,
}: DeleteConfirmModalProps) {
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
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 dark:bg-red-950/50 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-500" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Delete Category
                  </h2>
                </div>
                <Button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </Button>
              </div>

              <div className="p-5">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    &apos;{categoryName}&apos;
                  </span>
                  ?
                </p>
                <p className="text-sm text-red-600 dark:text-red-500 mb-6">
                  This action cannot be undone. Ideas linked to this category
                  will lose their category association.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Deleting..." : "Delete Category"}
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
