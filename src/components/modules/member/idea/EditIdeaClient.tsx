/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Lightbulb,
  ArrowLeft,
  Save,
  Eye,
  DollarSign,
  Users,
  Lock,
  Loader2,
  X,
  Upload,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { updateIdea } from "@/actions/client/idea.client";
import { IdeaAccessType } from "@/types/enums";
import * as z from "zod";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

interface Idea {
  id: string;
  title: string;
  slug: string;
  problemStatement: string;
  proposedSolution: string;
  description: string;
  images?: string[];
  accessType: IdeaAccessType;
  price?: number | null;
  categoryId: string;
  status: string;
  rejectionFeedback?: string | null;
}

interface EditIdeaClientProps {
  idea: Idea;
  categories: Category[];
}

const formSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    categoryId: z.string().min(1, "Please select a category"),
    accessType: z.nativeEnum(IdeaAccessType),
    price: z.string().optional(),
    problemStatement: z
      .string()
      .min(20, "Problem statement must be at least 20 characters"),
    proposedSolution: z
      .string()
      .min(20, "Proposed solution must be at least 20 characters"),
    description: z
      .string()
      .min(50, "Description must be at least 50 characters"),
  })
  .superRefine((data, ctx) => {
    if (
      data.accessType === IdeaAccessType.PAID ||
      data.accessType === IdeaAccessType.MEMBER_ONLY
    ) {
      if (!data.price || data.price === "") {
        ctx.addIssue({
          code: "custom",
          path: ["price"],
          message: "Price is required for paid and member-only ideas",
        });
      } else if (parseFloat(data.price) <= 0) {
        ctx.addIssue({
          code: "custom",
          path: ["price"],
          message: "Price must be greater than 0",
        });
      }
    }
  });

export function EditIdeaClient({ idea, categories }: EditIdeaClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    idea.images || [],
  );
  const [removeExistingImages, setRemoveExistingImages] = useState<string[]>(
    [],
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState({
    title: idea.title,
    categoryId: idea.categoryId,
    accessType: idea.accessType,
    price: idea.price ? idea.price.toString() : "",
    problemStatement: idea.problemStatement,
    proposedSolution: idea.proposedSolution,
    description: idea.description,
  });

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const validateForm = () => {
    const result = formSchema.safeParse(formValues);

    if (!result.success) {
      const newErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0] as string] = issue.message;
        }
      });

      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Updating your idea...");

    try {
      const payload: any = {
        title: formValues.title,
        problemStatement: formValues.problemStatement,
        proposedSolution: formValues.proposedSolution,
        description: formValues.description,
        categoryId: formValues.categoryId,
        accessType: formValues.accessType,
        images: images,
      };

      // Remove images that were deleted
      if (removeExistingImages.length > 0) {
        payload.removeImages = removeExistingImages;
      }

      if (
        (formValues.accessType === IdeaAccessType.PAID ||
          formValues.accessType === IdeaAccessType.MEMBER_ONLY) &&
        formValues.price
      ) {
        payload.price = parseFloat(formValues.price);
      }

      const result = await updateIdea(idea.slug, payload);

      if (result.error) {
        toast.error(result.error.message || "Failed to update idea", {
          id: toastId,
        });
        setIsLoading(false);
        return;
      }

      toast.success("Idea updated successfully!", {
        id: toastId,
      });
      router.push("/member/dashboard/drafts");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (existingImages.length + images.length + files.length > 3) {
      toast.error("You can upload maximum 3 images");
      return;
    }

    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`"${file.name}" is not a valid image file`);
        return;
      }
      if (file.size > 1.2 * 1024 * 1024) {
        toast.error(`"${file.name}" exceeds 1.2 MB limit`);
        return;
      }
      validFiles.push(file);
      validPreviews.push(URL.createObjectURL(file));
    });

    if (validFiles.length > 0) {
      setImages((prev) => [...prev, ...validFiles]);
      setImagePreviews((prev) => [...prev, ...validPreviews]);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeExistingImage = (imageUrl: string) => {
    setRemoveExistingImages((prev) => [...prev, imageUrl]);
    setExistingImages((prev) => prev.filter((img) => img !== imageUrl));
  };

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAccessTypeChange = (type: IdeaAccessType) => {
    setFormValues((prev) => ({
      ...prev,
      accessType: type,
      price: type === IdeaAccessType.FREE ? "" : prev.price,
    }));
  };

  const showPrice =
    formValues.accessType === IdeaAccessType.PAID ||
    formValues.accessType === IdeaAccessType.MEMBER_ONLY;

  const getAccessTypeIcon = (type: IdeaAccessType) => {
    switch (type) {
      case IdeaAccessType.FREE:
        return <Eye className="w-4 h-4" />;
      case IdeaAccessType.PAID:
        return <DollarSign className="w-4 h-4" />;
      case IdeaAccessType.MEMBER_ONLY:
        return <Users className="w-4 h-4" />;
      default:
        return <Lock className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 sm:mb-8"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-3 sm:mb-4">
          <Lightbulb className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Edit Idea
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
          Update your sustainable solution
        </p>
      </motion.div>

      {/* Back Link */}
      <Link
        href="/member/dashboard/ideas"
        className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4 sm:mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to My Ideas
      </Link>

      {/* Status Banner */}
      {idea.status === "REJECTED" && idea?.rejectionFeedback && (
        <div className="mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="p-1 bg-red-100 dark:bg-red-900/50 rounded-full shrink-0">
              <X className="w-4 h-4 text-red-600 dark:text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-red-800 dark:text-red-400">
                Rejection Feedback
              </h3>
              <p className="text-xs sm:text-sm text-red-700 dark:text-red-500 mt-1">
                {idea?.rejectionFeedback}
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                Please update your idea based on the feedback above and resubmit
                for review.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <FieldGroup>
          {/* Title */}
          <Field>
            <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Title *
            </FieldLabel>
            <div className="relative group">
              <Lightbulb className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
              <Input
                value={formValues.title}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Give your idea a catchy title"
                className="pl-10 h-10 sm:h-12 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base"
              />
            </div>
            {errors.title && (
              <p className="text-xs sm:text-sm text-red-500 mt-1">
                {errors.title}
              </p>
            )}
          </Field>

          {/* Category */}
          <Field>
            <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Category *
            </FieldLabel>
            <Select
              value={formValues.categoryId}
              onValueChange={(val) =>
                setFormValues((prev) => ({ ...prev, categoryId: val }))
              }
            >
              <SelectTrigger className="h-10 sm:h-12 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors text-sm sm:text-base">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg max-h-[200px] sm:max-h-[300px]">
                {categories.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors text-sm sm:text-base"
                  >
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-xs sm:text-sm text-red-500 mt-1">
                {errors.categoryId}
              </p>
            )}
          </Field>

          {/* Access Type */}
          <Field>
            <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Access Type *
            </FieldLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {[
                IdeaAccessType.FREE,
                IdeaAccessType.MEMBER_ONLY,
                IdeaAccessType.PAID,
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleAccessTypeChange(type)}
                  className={`flex items-center justify-center gap-2 p-2 sm:p-3 rounded-xl border transition-all text-sm sm:text-base ${
                    formValues.accessType === type
                      ? "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 shadow-sm"
                      : "border-gray-200 dark:border-zinc-700 hover:border-green-500 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  {getAccessTypeIcon(type)}
                  <span className="font-medium capitalize">
                    {type.replace("_", " ")}
                  </span>
                </button>
              ))}
            </div>
          </Field>

          {/* Price */}
          {showPrice && (
            <Field>
              <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Price (USD) *
              </FieldLabel>
              <div className="relative group">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                <Input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formValues.price}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  placeholder="Enter price"
                  className="pl-10 h-10 sm:h-12 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base"
                />
              </div>
              {errors.price && (
                <p className="text-xs sm:text-sm text-red-500 mt-1">
                  {errors.price}
                </p>
              )}
            </Field>
          )}

          {/* Problem Statement */}
          <Field>
            <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Problem Statement *
            </FieldLabel>
            <textarea
              rows={4}
              value={formValues.problemStatement}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  problemStatement: e.target.value,
                }))
              }
              placeholder="What problem does your idea solve?"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none resize-none text-sm sm:text-base"
            />
            {errors.problemStatement && (
              <p className="text-xs sm:text-sm text-red-500 mt-1">
                {errors.problemStatement}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formValues.problemStatement.length}/500 characters (minimum 20)
            </p>
          </Field>

          {/* Proposed Solution */}
          <Field>
            <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Proposed Solution *
            </FieldLabel>
            <textarea
              rows={5}
              value={formValues.proposedSolution}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  proposedSolution: e.target.value,
                }))
              }
              placeholder="How does your idea solve the problem?"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none resize-none text-sm sm:text-base"
            />
            {errors.proposedSolution && (
              <p className="text-xs sm:text-sm text-red-500 mt-1">
                {errors.proposedSolution}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formValues.proposedSolution.length}/1000 characters (minimum 20)
            </p>
          </Field>

          {/* Description */}
          <Field>
            <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Detailed Description *
            </FieldLabel>
            <textarea
              rows={8}
              value={formValues.description}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Provide a detailed explanation of your idea..."
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none resize-none text-sm sm:text-base"
            />
            {errors.description && (
              <p className="text-xs sm:text-sm text-red-500 mt-1">
                {errors.description}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formValues.description.length}/5000 characters (minimum 50)
            </p>
          </Field>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div>
              <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Current Images
              </FieldLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3  gap-3 sm:gap-4">
                {existingImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-square group"
                  >
                    <Image
                      src={img}
                      alt={`Current image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg border border-gray-200 dark:border-zinc-700"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 150px"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(img)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                      aria-label="Remove image"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Click the trash icon to remove images. New images will replace
                removed ones.
              </p>
            </div>
          )}

          {/* New Images Upload */}
          <div>
            <FieldLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Add New Images (Optional, max 3 total)
            </FieldLabel>
            <div className="border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-4 sm:p-6 bg-gray-50 dark:bg-zinc-800/50">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-square group"
                  >
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover rounded-lg border border-gray-200 dark:border-zinc-700"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 150px"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                      aria-label="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {existingImages.length + images.length < 3 && (
                  <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg cursor-pointer hover:border-green-500 transition-colors bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800">
                    <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1 text-center px-1">
                      Add Image
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-gray-500 text-center">
                {existingImages.length + images.length >= 3
                  ? "Maximum 3 images reached."
                  : `Upload up to ${3 - (existingImages.length + images.length)} more images. JPG, PNG, GIF. Max 1.2MB each. (${existingImages.length + images.length}/3)`}
              </p>
            </div>
          </div>
        </FieldGroup>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3 sm:p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-2 sm:gap-3">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-blue-800 dark:text-blue-400">
                What happens next?
              </h3>
              <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-500 mt-1">
                After updating your idea, you can submit it for review again.
                Admin will review your updated idea and either approve it or
                provide feedback.
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
              Saving Changes...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
