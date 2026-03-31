"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, isActive: boolean) => Promise<boolean>;
  initialData?: {
    name: string;
    isActive: boolean;
  };
  title: string;
  isLoading: boolean;
}

export function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  isLoading,
}: CategoryModalProps) {
  // Initialize state directly from props - this will reset when key changes
  const [name, setName] = useState(initialData?.name || "");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    const success = await onSubmit(name.trim(), isActive);
    if (success) {
      onClose();
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
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 dark:bg-green-950/50 rounded-xl">
                    <FolderTree className="w-5 h-5 text-green-600 dark:text-green-500" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h2>
                </div>
                <Button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </Button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-5 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    placeholder="e.g., Renewable Energy"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                  {error && (
                    <p className="text-sm text-red-500 mt-1.5">{error}</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="isActive"
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    Active (visible to users)
                  </label>
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
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading
                      ? "Saving..."
                      : title === "Create New Category"
                        ? "Create"
                        : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
