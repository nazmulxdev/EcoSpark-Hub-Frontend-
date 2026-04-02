// actions/client/comment.client.ts

"use server";

import { cookies } from "next/headers";
import { env } from "@/config/env";
import { revalidateTag } from "next/cache";

export const getComments = async (ideaId: string) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/comments/${ideaId}`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
      next: {
        tags: [`comments-${ideaId}`],
      },
    });
    const data = await res.json();

    if (!data.success) {
      return { data: null, error: data.error };
    }

    return { data: data.data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
};

export const createComment = async (
  ideaId: string,
  content: string,
  parentId?: string,
) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/comments`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ideaId, content, parentId }),
    });
    const data = await res.json();

    if (!data.success) {
      return { data: null, error: data.error };
    }

    revalidateTag(`comments-${ideaId}`, "max");
    return { data: data.data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
};

export const updateComment = async (commentId: string, content: string) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();

    if (!data.success) {
      return { data: null, error: data.error };
    }

    return { data: data.data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
};

export const deleteComment = async (commentId: string, ideaId: string) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    const data = await res.json();

    if (!data.success) {
      return { data: null, error: data.error };
    }

    revalidateTag(`comments-${ideaId}`, "max");
    return { data: data.data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
};
