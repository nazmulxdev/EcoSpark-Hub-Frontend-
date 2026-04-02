import * as z from "zod";
import { IdeaAccessType } from "@/types/enums";

export const createIdeaSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must not exceed 100 characters"),

    categoryId: z.string().min(1, "Please select a category"),

    accessType: z.nativeEnum(IdeaAccessType),

    price: z
      .number()
      .optional()
      .nullable()
      .refine(
        (val) => {
          // If accessType is PAID, price must be > 0
          return true; // Will be validated in superRefine
        },
        { message: "Price must be greater than 0 for paid ideas" },
      ),

    problemStatement: z
      .string()
      .min(1, "Problem statement is required")
      .min(20, "Problem statement must be at least 20 characters")
      .max(500, "Problem statement must not exceed 500 characters"),

    proposedSolution: z
      .string()
      .min(1, "Proposed solution is required")
      .min(20, "Proposed solution must be at least 20 characters")
      .max(1000, "Proposed solution must not exceed 1000 characters"),

    description: z
      .string()
      .min(1, "Description is required")
      .min(50, "Description must be at least 50 characters")
      .max(5000, "Description must not exceed 5000 characters"),

    images: z
      .array(z.instanceof(File))
      .max(5, "You can upload maximum 5 images")
      .optional(),
  })
  .superRefine((data, ctx) => {
    // Validate price for PAID access type
    if (data.accessType === IdeaAccessType.PAID) {
      if (!data.price || data.price <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["price"],
          message:
            "Price is required and must be greater than 0 for paid ideas",
        });
      }
    }
  });

export type CreateIdeaFormData = z.infer<typeof createIdeaSchema>;
