/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { env } from "process";

export const blogService = {
  getAllBlogs: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const url = `${env.API_URL}/blog/public${queryParams ? `?${queryParams}` : ""}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
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
};
