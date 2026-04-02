import { cookies } from "next/headers";
import { env } from "process";

export const ideaServicePublic = {
  // Payment Methods
  purchaseIdea: async function (ideaId: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/idea-purchase/purchase/${ideaId}`,
        {
          method: "POST",
          headers: {
            Cookie: cookieStore.toString(),
            "Content-Type": "application/json",
          },
          cache: "no-store",
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

  purchaseIdeaWithPayLater: async function (ideaId: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/idea-purchase/purchase-with-pay-later/${ideaId}`,
        {
          method: "POST",
          headers: {
            Cookie: cookieStore.toString(),
            "Content-Type": "application/json",
          },
          cache: "no-store",
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

  initiateIdeaPayment: async function (ideaId: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/idea-purchase/initiate-payment/${ideaId}`,
        {
          method: "POST",
          headers: {
            Cookie: cookieStore.toString(),
            "Content-Type": "application/json",
          },
          cache: "no-store",
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

  // get all public idea

  getAllPublicIdeas: async function (queryParams: string) {
    try {
      const cookieStore = await cookies();
      const url = queryParams
        ? `${env.API_URL}/ideas/public?${queryParams}`
        : `${env.API_URL}/ideas/public`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
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

  // Idea Purchase
  getIdeaPurchase: async function (ideaId: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/idea-purchase/get-idea-purchase/${ideaId}`,
        {
          method: "GET",
          headers: {
            Cookie: cookieStore.toString(),
            "Content-Type": "application/json",
          },
          cache: "no-store",
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

  // ge my purchased idea
  getMyPurchasedIdeas: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/ideas/my-purchased-ideas`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
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

  checkPurchaseStatus: async (ideaId: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/ideas/${ideaId}/purchase-status`,
        {
          method: "GET",
          headers: {
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
        },
      );
      const data = await res.json();

      if (!data.success) {
        return { data: null, error: data.error };
      }

      return { data: data.data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  },
};
