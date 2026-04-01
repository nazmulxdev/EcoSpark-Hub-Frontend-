"use server";

import { blogService } from "@/services/admin/blog.service";
import { CreateBlogPayload, UpdateBlogPayload } from "@/types/blog";
import { revalidateTag } from "next/cache";

export const getAllBlogs = async (
  page?: number,
  limit?: number,
  searchTerm?: string,
  isPublished?: string,
) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  if (searchTerm) params.append("searchTerm", searchTerm);
  if (isPublished) params.append("isPublished", isPublished);

  const result = await blogService.getAllBlogs(params.toString());
  return result;
};

export const getBlogBySlug = async (slug: string) => {
  const result = await blogService.getBlogBySlug(slug);
  return result;
};

export const createBlog = async (payload: CreateBlogPayload) => {
  const result = await blogService.createBlog(payload);
  if (result.data) {
    revalidateTag("blogs", "max");
  }
  return result;
};

export const updateBlog = async (slug: string, payload: UpdateBlogPayload) => {
  const result = await blogService.updateBlog(slug, payload);
  if (result.data) {
    revalidateTag("blogs", "max");
  }
  return result;
};

export const deleteBlog = async (slug: string) => {
  const result = await blogService.deleteBlog(slug);
  if (result.data) {
    revalidateTag("blogs", "max");
  }
  return result;
};
