/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  FolderTree,
  TrendingUp,
  Tag,
  Sparkles,
  Search,
  X,
} from "lucide-react";

import { CategoryModal } from "./CategoryModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/actions/client/admin.client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  ideas?: any[];
  _count?: {
    ideas: number;
  };
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface CategoriesClientProps {
  initialCategories: Category[];
  initialMeta: Meta;
  currentPage: number;
  currentLimit: number;
  currentSearchTerm: string;
}

export function CategoriesClient({
  initialCategories,
  initialMeta,
  currentSearchTerm,
}: CategoriesClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [meta, setMeta] = useState<Meta>(initialMeta);
  const [searchInput, setSearchInput] = useState(currentSearchTerm);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  // Update local state when props change (after navigation)
  useEffect(() => {
    setCategories(initialCategories);
    setMeta(initialMeta);
    setSearchInput(currentSearchTerm);
  }, [initialCategories, initialMeta, currentSearchTerm]);

  const activeCount = categories.filter((c) => c.isActive).length;
  const totalIdeas = categories.reduce((sum, c) => {
    const ideaCount = c.ideas?.length || c._count?.ideas || 0;
    return sum + ideaCount;
  }, 0);

  // Navigate to new URL with params
  const navigateTo = (page: number, searchTerm: string) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (searchTerm && searchTerm.trim())
      params.set("searchTerm", searchTerm.trim());

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    startTransition(() => {
      router.push(newUrl);
    });
  };

  // Handle search - this will trigger a server-side re-fetch
  const handleSearch = () => {
    navigateTo(1, searchInput);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchInput("");
    navigateTo(1, "");
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    navigateTo(newPage, currentSearchTerm);
  };

  const handleCreate = async (name: string, isActive: boolean) => {
    setIsLoading(true);
    const toastId = toast.loading("Creating category...");

    try {
      const result = await createCategory({ name, isActive });

      if (result.error) {
        toast.error(result.error.message || "Failed to create category", {
          id: toastId,
        });
        return false;
      }

      if (result.data) {
        toast.success("Category created successfully!", { id: toastId });
        // Refresh the page to show new data
        router.refresh();
        return true;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
      return false;
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const handleUpdate = async (name: string, isActive: boolean) => {
    if (!selectedCategory) return false;

    setIsLoading(true);
    const toastId = toast.loading("Updating category...");

    try {
      const result = await updateCategory({
        slug: selectedCategory.slug,
        name,
        isActive,
      });

      if (result.error) {
        toast.error(result.error.message || "Failed to update category", {
          id: toastId,
        });
        return false;
      }

      if (result.data) {
        toast.success("Category updated successfully!", { id: toastId });
        // Refresh the page to show updated data
        router.refresh();
        return true;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
      return false;
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    setIsLoading(true);
    const toastId = toast.loading("Deleting category...");

    try {
      const result = await deleteCategory(selectedCategory.slug);

      if (result.error) {
        toast.error(result.error.message || "Failed to delete category", {
          id: toastId,
        });
        return;
      }

      toast.success("Category deleted successfully!", { id: toastId });
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
      // Refresh the page to show updated data
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (category: Category) => {
    const toastId = toast.loading(
      `${category.isActive ? "Deactivating" : "Activating"}...`,
    );

    try {
      const result = await updateCategory({
        slug: category.slug,
        name: category.name,
        isActive: !category.isActive,
      });

      if (result.error) {
        toast.error(result.error.message, { id: toastId });
        return;
      }

      if (result.data) {
        toast.success(
          `Category ${!category.isActive ? "activated" : "deactivated"}`,
          { id: toastId },
        );
        // Refresh the page to show updated data
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const stats = [
    {
      label: "Total Categories",
      value: meta.total,
      icon: FolderTree,
      iconBg: "bg-blue-100 dark:bg-blue-950/50",
      iconColor: "text-blue-600 dark:text-blue-400",
      gradient:
        "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
      border: "border-blue-200 dark:border-blue-800/30",
    },
    {
      label: "Active Categories",
      value: activeCount,
      icon: CheckCircle,
      iconBg: "bg-green-100 dark:bg-green-950/50",
      iconColor: "text-green-600 dark:text-green-400",
      gradient:
        "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
      border: "border-green-200 dark:border-green-800/30",
    },
    {
      label: "Total Ideas",
      value: totalIdeas,
      icon: TrendingUp,
      iconBg: "bg-purple-100 dark:bg-purple-950/50",
      iconColor: "text-purple-600 dark:text-purple-400",
      gradient:
        "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
      border: "border-purple-200 dark:border-purple-800/30",
    },
  ];

  const getCategoryStyles = (isActive: boolean) => {
    if (isActive) {
      return "bg-white dark:bg-zinc-900 border-green-200 dark:border-green-800/30 hover:border-green-300 dark:hover:border-green-700";
    }
    return "bg-gray-50 dark:bg-zinc-900/50 border-gray-200 dark:border-zinc-800 opacity-75 hover:opacity-100";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Categories
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Organize and manage your sustainability topics
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name or slug..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 pr-10"
          />
          {searchInput && (
            <Button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </Button>
          )}
        </div>
        <Button
          onClick={handleSearch}
          disabled={isPending}
          className="bg-green-600 hover:bg-green-700"
        >
          {isPending ? "Searching..." : "Search"}
        </Button>
      </div>

      {/* Search Result Info */}
      {currentSearchTerm && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing results for:{" "}
          <span className="font-medium text-gray-700 dark:text-gray-300">
            &quot;{currentSearchTerm}&quot;
          </span>
          <button
            onClick={handleClearSearch}
            className="ml-2 text-green-600 hover:text-green-700 underline"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 border ${stat.border} shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200 dark:border-zinc-800">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-full mb-4">
            <Tag className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No categories found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {currentSearchTerm
              ? `No results for "${currentSearchTerm}"`
              : "Create your first category to start organizing ideas"}
          </p>
          {!currentSearchTerm && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Category
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => {
            const ideaCount =
              category.ideas?.length || category._count?.ideas || 0;
            const hasIdeas = ideaCount > 0;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`group rounded-2xl p-5 border transition-all duration-300 ${getCategoryStyles(category.isActive)} hover:shadow-lg`}
              >
                {/* Category Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl transition-all group-hover:scale-110 ${
                        category.isActive
                          ? "bg-green-100 dark:bg-green-950/50"
                          : "bg-gray-100 dark:bg-zinc-800"
                      }`}
                    >
                      {category.isActive ? (
                        <Sparkles className="w-5 h-5 text-green-600 dark:text-green-500" />
                      ) : (
                        <FolderTree className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">
                        /{category.slug}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleStatus(category)}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                      category.isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 hover:bg-green-200"
                        : "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </button>
                </div>

                {/* Category Stats */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-1.5 rounded-lg ${
                          hasIdeas
                            ? "bg-purple-50 dark:bg-purple-950/30"
                            : "bg-gray-50 dark:bg-zinc-800"
                        }`}
                      >
                        <TrendingUp
                          className={`w-3 h-3 ${
                            hasIdeas ? "text-purple-500" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Total Ideas
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {ideaCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsEditModalOpen(true);
                      }}
                      variant="ghost"
                      size="sm"
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDeleteModalOpen(true);
                      }}
                      variant="ghost"
                      size="sm"
                      className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      disabled={hasIdeas}
                      title={
                        hasIdeas
                          ? "Cannot delete category with ideas"
                          : "Delete category"
                      }
                    >
                      <Trash2
                        className={`w-4 h-4 ${hasIdeas ? "text-gray-300 dark:text-gray-600" : "text-red-500"}`}
                      />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-4 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
          <div className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {(meta.page - 1) * meta.limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {Math.min(meta.page * meta.limit, meta.total)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {meta.total}
            </span>{" "}
            categories
          </div>
          <div className="flex gap-2">
            <button
              disabled={meta.page === 1 || isPending}
              onClick={() => handlePageChange(meta.page - 1)}
              className="px-3.5 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Previous
            </button>
            <span className="px-3.5 py-2 text-sm text-gray-600 dark:text-gray-400">
              Page {meta.page} of {meta.totalPages}
            </span>
            <button
              disabled={meta.page === meta.totalPages || isPending}
              onClick={() => handlePageChange(meta.page + 1)}
              className="px-3.5 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <CategoryModal
        key={`create-${isCreateModalOpen}`}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        title="Create New Category"
        isLoading={isLoading}
      />

      <CategoryModal
        key={`edit-${selectedCategory?.id || "none"}-${isEditModalOpen}`}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleUpdate}
        initialData={
          selectedCategory
            ? {
                name: selectedCategory.name,
                isActive: selectedCategory.isActive,
              }
            : undefined
        }
        title="Edit Category"
        isLoading={isLoading}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleDelete}
        categoryName={selectedCategory?.name}
        isLoading={isLoading}
      />
    </div>
  );
}
