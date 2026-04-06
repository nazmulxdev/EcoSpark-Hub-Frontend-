/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { env } from "process";
import { CreateBlogPayload, UpdateBlogPayload } from "@/types/blog";

export const blogService = {
  getAllBlogs: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const url = `${env.API_URL}/blog${queryParams ? `?${queryParams}` : ""}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        credentials: "include",
        next: {
          tags: ["blogs"],
        },
      });
      const data = await res.json();

      if (!data.success) {
        return {
          data: null,
          error: data.error,
        };
      }

      return { data: data.data, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: error,
      };
    }
  },

  getBlogBySlug: async function (slug: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/blog/${slug}`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        credentials: "include",
        next: {
          tags: ["blogs"],
        },
      });
      const data = await res.json();

      if (!data.success) {
        return {
          data: null,
          error: data.error,
        };
      }

      return { data: data.data, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: error,
      };
    }
  },

  createBlog: async function (payload: CreateBlogPayload) {
    try {
      const cookieStore = await cookies();

      // Create FormData for multipart/form-data upload
      const formData = new FormData();

      // Wrap the JSON data in a "data" field as your validator expects
      const jsonData = {
        title: payload.title,
        content: payload.content,
        isPublished: payload.isPublished,
      };

      formData.append("data", JSON.stringify(jsonData));

      // If coverImage is a File, append it directly
      if (payload.coverImage instanceof File) {
        formData.append("coverImage", payload.coverImage);
      }

      const res = await fetch(`${env.API_URL}/blog/create`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
        },
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        return {
          data: null,
          error: data.error,
        };
      }
      return { data: data.data, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: error,
      };
    }
  },

  updateBlog: async function (slug: string, payload: UpdateBlogPayload) {
    try {
      const cookieStore = await cookies();

      // Create FormData for multipart/form-data upload
      const formData = new FormData();

      // Wrap the JSON data in a "data" field as your validator expects
      const jsonData: any = {};
      if (payload.title !== undefined) jsonData.title = payload.title;
      if (payload.content !== undefined) jsonData.content = payload.content;
      if (payload.isPublished !== undefined)
        jsonData.isPublished = payload.isPublished;

      if (Object.keys(jsonData).length > 0) {
        formData.append("data", JSON.stringify(jsonData));
      }

      // If coverImage is a File, append it directly
      if (payload.coverImage instanceof File) {
        formData.append("coverImage", payload.coverImage);
      }

      const res = await fetch(`${env.API_URL}/blog/${slug}`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
        },
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        return {
          data: null,
          error: data.error,
        };
      }
      return { data: data.data, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: error,
      };
    }
  },

  deleteBlog: async function (slug: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/blog/${slug}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();

      if (!data.success) {
        return {
          data: null,
          error: data.error,
        };
      }
      return { data: data.data, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: error,
      };
    }
  },
};
