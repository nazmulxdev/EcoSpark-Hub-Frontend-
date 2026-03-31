import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { env } from "process";

export const adminService = {
  //   create category

  createCategory: async function (payload: {
    name: string;
    description: string;
  }) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/category/create`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!data.success) {
        return {
          data: null,
          error: data.error,
        };
      }
      revalidateTag("category", "max");
      return { data: data.data, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: error,
      };
    }
  },

  //   update category

  updateCategory: async function (payload: {
    slug: string;
    name?: string;
    description?: string;
  }) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/category/${payload.slug}`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          name: payload.name,
          description: payload.description,
        }),
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

  //   delete category

  deleteCategory: async function (slug: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/category/${slug}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
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
