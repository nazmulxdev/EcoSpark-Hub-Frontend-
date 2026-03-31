"use server";

import { authService } from "@/services/auth/auth.service";

export const getAuthSession = async () => {
  return await authService.getSession();
};
