"use server";

import { ideaMemberService } from "@/services/member/idea.member.service";
import { CreateIdeaPayload, UpdateIdeaPayload } from "@/types/idea";
import { revalidateTag } from "next/cache";

// Get all ideas (public)
export const getAllIdeas = async (
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

  const result = await ideaMemberService.getAllIdeas(params.toString());
  return result;
};

// Get single idea (public)
export const getIdeaBySlug = async (slug: string) => {
  const result = await ideaMemberService.getIdeaBySlug(slug);
  return result;
};

// Member: Get my ideas
export const getMyIdeas = async (page?: number, limit?: number) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());

  const result = await ideaMemberService.getMyIdeas(params.toString());
  return result;
};

// Member: Get my draft ideas
export const getMyDraftIdeas = async (page?: number, limit?: number) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());

  const result = await ideaMemberService.getMyDraftIdeas(params.toString());
  return result;
};

// Member: Create idea
export const createIdea = async (payload: CreateIdeaPayload) => {
  const result = await ideaMemberService.createIdea(payload);
  if (result.data) {
    revalidateTag("my-ideas", "max");
    revalidateTag("my-drafts", "max");
  }
  return result;
};

// Member: Update idea
export const updateIdea = async (slug: string, payload: UpdateIdeaPayload) => {
  const result = await ideaMemberService.updateIdea(slug, payload);
  if (result.data) {
    revalidateTag("my-ideas", "max");
    revalidateTag("my-drafts", "max");
  }
  return result;
};

// Member: Delete idea
export const deleteIdea = async (slug: string) => {
  const result = await ideaMemberService.deleteIdea(slug);
  if (result.data) {
    revalidateTag("my-ideas", "max");
    revalidateTag("my-drafts", "max");
  }
  return result;
};

// Member: Submit idea for review
export const submitIdeaForReview = async (slug: string) => {
  const result = await ideaMemberService.submitIdeaForReview(slug);
  if (result.data) {
    revalidateTag("my-ideas", "max");
    revalidateTag("my-drafts", "max");
  }
  return result;
};

// Get single idea (member's own)
export const getMyIdeaBySlug = async (slug: string) => {
  const result = await ideaMemberService.getMyIdeaBySlug(slug);
  return result;
};
