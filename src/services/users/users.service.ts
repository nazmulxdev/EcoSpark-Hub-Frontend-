import { cookies } from "next/headers";
import { env } from "process";

export const usersService = {
  getDashboardStats: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/users/dashboard`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
        next: {
          tags: ["admin-dashboard"],
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
