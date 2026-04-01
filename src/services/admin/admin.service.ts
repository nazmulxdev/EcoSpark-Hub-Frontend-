import { IdeaStatus } from "@/types/enums";
import {
  IChangeIdeaStatus,
  ICreateCategory,
  IUpdateCategory,
} from "@/types/interrfaces";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { env } from "process";

export const adminService = {
  //   create category

  createCategory: async function (payload: ICreateCategory) {
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

  updateCategory: async function (payload: IUpdateCategory) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/category/${payload.slug}`, {
        method: "PATCH",
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

  getAllCatgory: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();

      const url = `${env.API_URL}/category${queryParams ? `?${queryParams}` : ""}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: {
          tags: ["category"],
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
  getCategoryBySlug: async function (slug: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/category/${slug}`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: {
          tags: ["category"],
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

  // idea approve or reject with feedback

  ideaApproveOrRejectWithFeedback: async function (
    slug: string,
    payload: IChangeIdeaStatus,
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/admin/ideas/${slug}/status`, {
        method: "PATCH",
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
      revalidateTag("ideas", "max");
      return { data: data.data, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: error,
      };
    }
  },

  // get all idea with query

  getAllIdea: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();

      const url = `${env.API_URL}/ideas${queryParams ? `?${queryParams}` : ""}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: {
          tags: ["ideas"],
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

  // dashboard stats

  getDashboardStats: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/admin/dashboard`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
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

  // Users
  getAllUsers: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/admin/users`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: {
          tags: ["admin-users"],
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

  changeUserStatus: async function (
    userId: string,
    payload: { userStatus: string },
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/admin/users/${userId}/status`, {
        method: "PATCH",
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

      return { data: data.data, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: error,
      };
    }
  },

  // Members
  getAllMembers: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/admin/members`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: {
          tags: ["admin-members"],
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

  changeMemberStatus: async function (
    memberId: string,
    payload: { status: string },
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/admin/members/${memberId}/status`,
        {
          method: "PATCH",
          headers: {
            Cookie: cookieStore.toString(),
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: JSON.stringify(payload),
        },
      );
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

  // Ideas
  getAllIdeasForAdmin: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/admin/ideas`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: {
          tags: ["admin-ideas"],
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

  changeIdeaStatus: async function (
    slug: string,
    payload: { status: string; rejectionFeedback?: string },
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/admin/ideas/${slug}/status`, {
        method: "PATCH",
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
