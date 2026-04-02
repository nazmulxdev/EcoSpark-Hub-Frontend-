"use server";

import { blogService } from "@/services/public/blogs/blog.service";

export const getAllBlogsPublic = async (
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

export const getBlogBySlugPublic = async (slug: string) => {
  const result = await blogService.getBlogBySlug(slug);
  return result;
};
