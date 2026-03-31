"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const authClientService = {
  signOut: async function () {
    const toastId = toast.loading("Signing out...");

    try {
      await authClient.signOut();

      toast.success("Signed out successfully", { id: toastId });

      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out. Please try again.", { id: toastId });
    }
  },

  getSession: async function () {
    try {
      const { data, error } = await authClient.getSession();

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Error getting session:", error);
      return {
        data: null,
        error: { message: "Failed to get session" },
      };
    }
  },
};
