"use server";

import { adminService } from "@/services/admin/admin.service";
import { ICreateCategory, IUpdateCategory } from "@/types/interrfaces";
import { revalidateTag } from "next/cache";

export const createCategory = async (payload: ICreateCategory) => {
  const result = await adminService.createCategory(payload);
  if (result.data) {
    revalidateTag("category", "max");
  }
  return result;
};

export const updateCategory = async (payload: IUpdateCategory) => {
  const result = await adminService.updateCategory(payload);
  if (result.data) {
    revalidateTag("category", "max");
  }
  return result;
};

export const deleteCategory = async (slug: string) => {
  const result = await adminService.deleteCategory(slug);
  if (result.data) {
    revalidateTag("category", "max");
  }
  return result;
};

export const getCategoryBySlug = async (slug: string) => {
  const result = await adminService.getCategoryBySlug(slug);
  return result;
};

export const getAllCatgory = async (
  page?: number,
  limit?: number,
  searchTerm?: string,
) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  if (searchTerm) params.append("searchTerm", searchTerm);
  console.log(params.toString());

  const result = await adminService.getAllCatgory(params.toString());
  return result;
};
