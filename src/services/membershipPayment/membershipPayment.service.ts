import { cookies } from "next/headers";
import { env } from "process";

export const membershipPaymentService = {
  becomeMember: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/be-member/become-member-with-stripe`,
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

  becomeMemberWithPayLater: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/be-member/become-member-with-pay-later`,
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

  initiatePayment: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/be-member/initiate-payment`, {
        method: "POST",
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

  getMyPaymentInfo: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/be-member/my-payment-info`, {
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
};
