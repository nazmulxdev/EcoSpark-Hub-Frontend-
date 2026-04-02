"use server";

import { ideaMemberService } from "@/services/member/idea.member.service";

export const memberDashboardData = async () => {
  const result = await ideaMemberService.memberDashboardData();
  return result;
};
