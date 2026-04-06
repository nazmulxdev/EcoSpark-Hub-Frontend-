import { env } from "@/config/env";
import { authClient } from "@/lib/auth-client";
import { cookies } from "next/headers";
import { toast } from "sonner";

const authUrl = env.AUTH_URL;
export const authService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${authUrl}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        credentials: "include",
      });

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: `Failed to fetch session: ${res.status}`,
          },
        };
      }

      const data = await res.json();
      if (!data || !data.user) {
        return {
          data: null,
          error: {
            message: "Session is missing",
          },
        };
      }
      return { data, error: null };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: {
          message: "Something went wrong to get session.",
        },
      };
    }
  },
  getCurrentUser: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${authUrl}/me`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        credentials: "include",
      });

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: "Failed to fetch user.",
          },
        };
      }
      const data = await res.json();
      if (!data) {
        return {
          data: null,
          error: {
            message: "User not found.",
          },
        };
      }
      return { data, error: null };
    } catch (error) {
      console.error("Error fetching current user:", error);
      return {
        data: null,
        error: {
          message: "Something went wrong fetching user data.",
        },
      };
    }
  },
  signOut: async function () {
    const toastId = toast.loading("Signing out...");

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully", { id: toastId });
            setTimeout(() => {
              window.location.href = "/";
            }, 500);
          },
          onError: (error) => {
            console.error("Sign out error:", error);
            toast.error("Failed to sign out. Please try again.", {
              id: toastId,
            });
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Something went wrong. Please try again.", { id: toastId });
    }
  },
};
