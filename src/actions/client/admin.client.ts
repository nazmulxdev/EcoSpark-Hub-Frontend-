"use server";

import { adminService } from "@/services/admin/admin.service";
import {
  IChangeIdeaStatus,
  ICreateCategory,
  IUpdateCategory,
} from "@/types/interrfaces";
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

export const getAllIdea = async (
  page?: number,
  limit?: number,
  searchTerm?: string,
  status?: string,
  accessType?: string,
  categoryId?: string,
) => {
  const params = new URLSearchParams();

  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  if (searchTerm && searchTerm.trim())
    params.append("searchTerm", searchTerm.trim());
  if (status && status.trim()) params.append("status", status.trim());
  if (accessType && accessType.trim())
    params.append("accessType", accessType.trim());
  if (categoryId && categoryId.trim())
    params.append("categoryId", categoryId.trim());

  console.log("API Params:", params.toString());

  const result = await adminService.getAllIdea(params.toString());
  return result;
};

export const ideaApproveOrRejectWithFeedback = async (
  slug: string,
  payload: IChangeIdeaStatus,
) => {
  const result = await adminService.ideaApproveOrRejectWithFeedback(
    slug,
    payload,
  );
  if (result.data) {
    revalidateTag("ideas", "max");
  }
  return result;
};

// Dashboard
export const getDashboardStats = async () => {
  const result = await adminService.getDashboardStats();
  return result;
};

// Users
export const getAllUsers = async () => {
  const result = await adminService.getAllUsers();
  return result;
};

export const changeUserStatus = async (
  userId: string,
  payload: { userStatus: string },
) => {
  const result = await adminService.changeUserStatus(userId, payload);
  if (result.data) {
    revalidateTag("admin-users", "max");
  }
  return result;
};

// Members
export const getAllMembers = async () => {
  const result = await adminService.getAllMembers();
  return result;
};

export const changeMemberStatus = async (
  memberId: string,
  payload: { status: string },
) => {
  const result = await adminService.changeMemberStatus(memberId, payload);
  if (result.data) {
    revalidateTag("admin-members", "max");
  }
  return result;
};

// Ideas
export const getAllIdeasForAdmin = async () => {
  const result = await adminService.getAllIdeasForAdmin();
  return result;
};

export const changeIdeaStatus = async (
  slug: string,
  payload: { status: string; rejectionFeedback?: string },
) => {
  const result = await adminService.changeIdeaStatus(slug, payload);
  if (result.data) {
    revalidateTag("admin-ideas", "max");
  }
  return result;
};
