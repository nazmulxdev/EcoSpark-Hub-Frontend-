import { usersService } from "@/services/users/users.service";

export const getDashboardStats = async () => {
  const result = await usersService.getDashboardStats();
  return result;
};
