"use server";

import { cookies } from "next/headers";
import { env } from "@/config/env";
import { VoteType } from "@/types/enums";
import { revalidateTag } from "next/cache";

export const castVote = async (ideaId: string, type: VoteType) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/votes`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ideaId, type }),
      cache: "no-store",
    });
    const data = await res.json();

    if (!data.success) {
      return { data: null, error: data.error };
    }

    revalidateTag(`votes-${ideaId}`, "max");
    revalidateTag(`ideas-${ideaId}`, "max");

    return { data: data.data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
};

export const getVoteStatus = async (ideaId: string) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/votes/status/${ideaId}`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
      next: {
        tags: [`votes-${ideaId}`],
      },
    });
    const data = await res.json();

    if (!data.success) {
      return { data: null, error: data.error };
    }

    return { data: data.data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
};
