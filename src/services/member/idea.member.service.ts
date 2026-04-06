/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { env } from "process";
import { CreateIdeaPayload, UpdateIdeaPayload } from "@/types/idea";

export const ideaMemberService = {
  // Public: Get all ideas
  getAllIdeas: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const url = `${env.API_URL}/ideas${queryParams ? `?${queryParams}` : ""}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
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

  // Public: Get single idea by slug
  getIdeaBySlug: async function (slug: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/ideas/${slug}`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
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

  // Member: Get my ideas
  getMyIdeas: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const url = `${env.API_URL}/ideas/my-ideas${queryParams ? `?${queryParams}` : ""}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
        next: {
          tags: ["my-ideas"],
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

  // Member: Get my draft ideas
  getMyDraftIdeas: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const url = `${env.API_URL}/ideas/my-draft-ideas${queryParams ? `?${queryParams}` : ""}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
        next: {
          tags: ["my-drafts"],
        },
      });
      const data = await res.json();

      if (!data.success) {
        return {
          data: null,
          error: data.error,
        };
      }

      console.log(data);
      return { data: data.data, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: error,
      };
    }
  },

  // Member: Get single idea (my own)
  getMyIdeaBySlug: async function (slug: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/ideas/my-ideas/${slug}`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
        next: {
          tags: ["my-ideas"],
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

  // Member: Create idea
  createIdea: async function (payload: CreateIdeaPayload) {
    try {
      const cookieStore = await cookies();
      const formData = new FormData();

      // Wrap JSON data in "data" field
      const jsonData = {
        title: payload.title,
        problemStatement: payload.problemStatement,
        proposedSolution: payload.proposedSolution,
        description: payload.description,
        accessType: payload.accessType,
        categoryId: payload.categoryId,
        price: payload.price,
      };

      if (payload?.price) {
        jsonData.price = Number(payload.price);
      }

      formData.append("data", JSON.stringify(jsonData));

      // Append images
      if (payload.images && payload.images.length > 0) {
        payload.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      const res = await fetch(`${env.API_URL}/ideas`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: formData,
      });
      let data;
      try {
        data = await res.json();
      } catch (err) {
        return {
          data: null,
          error: {
            message: `Server returned non-JSON response: ${res.status} ${res.statusText}`,
            status: res.status,
          },
        };
      }

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

  // Member: Update idea
  updateIdea: async function (slug: string, payload: UpdateIdeaPayload) {
    try {
      const cookieStore = await cookies();
      const formData = new FormData();

      const jsonData: any = {};
      if (payload.title) jsonData.title = payload.title;
      if (payload.problemStatement)
        jsonData.problemStatement = payload.problemStatement;
      if (payload.proposedSolution)
        jsonData.proposedSolution = payload.proposedSolution;
      if (payload.description) jsonData.description = payload.description;
      if (payload.accessType) jsonData.accessType = payload.accessType;
      if (payload.categoryId) jsonData.categoryId = payload.categoryId;
      if (payload.price !== undefined) jsonData.price = payload.price;

      formData.append("data", JSON.stringify(jsonData));

      // Append images
      if (payload.images && payload.images.length > 0) {
        payload.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      const res = await fetch(`${env.API_URL}/ideas/${slug}`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: formData,
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

  // Member: Delete idea
  deleteIdea: async function (slug: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/ideas/${slug}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
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

  // Member: Submit idea for review
  submitIdeaForReview: async function (slug: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/ideas/${slug}/submit`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: "UNDER_REVIEW" }),
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

  // member dashbaord rute
  memberDashboardData: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/member/dashboard`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
        next: {
          tags: ["member-dashboard"],
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
