"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, Upload, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Blog } from "@/types/blog";
import Image from "next/image";

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog | null;
  onSubmit: (data: {
    title: string;
    content: string;
    coverImage?: File | string;
    isPublished: boolean;
  }) => Promise<boolean>;
  isSubmitting: boolean;
}

export function BlogModal({
  isOpen,
  onClose,
  blog,
  onSubmit,
  isSubmitting,
}: BlogModalProps) {
  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState(
    blog?.coverImage || "",
  );
  const [existingCoverImage, setExistingCoverImage] = useState(
    blog?.coverImage || "",
  );
  const [isPublished, setIsPublished] = useState(blog?.isPublished || false);
  const [errors, setErrors] = useState<
    Partial<Record<"title" | "content" | "coverImage", string>>
  >({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors({
          ...errors,
          coverImage: "Please select an image file",
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          coverImage: "Image size should be less than 5MB",
        });
        return;
      }

      setCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
      setErrors({ ...errors, coverImage: undefined });
    }
  };

  const handleRemoveImage = () => {
    setCoverImageFile(null);
    setCoverImagePreview("");
    setExistingCoverImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string; content?: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Use existing cover image URL or new file
    const coverImage = coverImageFile || existingCoverImage;

    await onSubmit({
      title: title.trim(),
      content: content.trim(),
      coverImage: coverImage || undefined,
      isPublished,
    });
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[90vh] overflow-y-auto z-50"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-xl">
                    <ImageIcon className="w-5 h-5 text-green-600 dark:text-green-500" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {blog ? "Edit Blog Post" : "Create New Blog Post"}
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
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setErrors({ ...errors, title: undefined });
                    }}
                    placeholder="Enter blog title"
                    className={
                      errors.title ? "border-red-500 focus:border-red-500" : ""
                    }
                    disabled={isSubmitting}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Slug will be auto-generated from the title
                  </p>
                </div>

                {/* Cover Image Upload - Single image only */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cover Image
                  </label>

                  {/* Image Preview */}
                  {coverImagePreview && (
                    <div className="relative mb-3 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700 aspect-video w-full">
                      <Image
                        src={coverImagePreview}
                        alt="Cover preview"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 800px"
                        priority
                      />
                      <Button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors z-10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {/* Upload Area - Single file only */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="cover-image-upload"
                        disabled={isSubmitting}
                      />
                      <label
                        htmlFor="cover-image-upload"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl cursor-pointer hover:border-green-500 transition-colors bg-gray-50 dark:bg-zinc-800"
                      >
                        <Upload className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {coverImageFile
                            ? coverImageFile.name
                            : "Choose a cover image"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: JPG, PNG, GIF. Max size: 5MB. Single
                    image only.
                  </p>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content *
                  </label>
                  <Textarea
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      setErrors({ ...errors, content: undefined });
                    }}
                    placeholder="Write your blog content here..."
                    rows={12}
                    className={`font-mono text-sm resize-y ${errors.content ? "border-red-500 focus:border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.content && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.content}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Supports HTML formatting
                  </p>
                </div>

                {/* Publish Status */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="isPublished"
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    Publish immediately
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Saving..." : blog ? "Update" : "Create"}
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
