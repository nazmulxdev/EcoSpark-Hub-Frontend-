"use server";

import { membershipPaymentService } from "@/services/membershipPayment/membershipPayment.service";
import { revalidateTag } from "next/cache";

export const becomeMember = async () => {
  const result = await membershipPaymentService.becomeMember();
  if (result.data) {
    revalidateTag("member", "max");
  }
  return result;
};

export const becomeMemberWithPayLater = async () => {
  const result = await membershipPaymentService.becomeMemberWithPayLater();
  if (result.data) {
    revalidateTag("member", "max");
  }
  return result;
};

export const initiatePayment = async () => {
  const result = await membershipPaymentService.initiatePayment();
  if (result.data) {
    revalidateTag("member", "max");
  }
  return result;
};

export const getMyPaymentInfo = async () => {
  const result = await membershipPaymentService.getMyPaymentInfo();
  return result;
};
