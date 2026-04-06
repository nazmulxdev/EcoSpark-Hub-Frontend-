"use server";

import { cookies } from "next/headers";
import { env } from "@/config/env";
import { revalidateTag } from "next/cache";

export const getWatchlist = async (
  page?: number,
  limit?: number,
  searchTerm?: string,
) => {
  try {
    const cookieStore = await cookies();
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    if (searchTerm) params.append("searchTerm", searchTerm);

    const url = `${env.API_URL}/watchlist${params.toString() ? `?${params.toString()}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
      cache: "no-store",
      next: {
        tags: ["watchlist"],
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

export const addToWatchlist = async (ideaId: string) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/watchlist/add`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ideaId }),
    });

    const data = await res.json();

    if (!data.success) {
      return { data: null, error: data.error };
    }

    revalidateTag("watchlist", "max");
    return { data: data.data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
};

export const removeFromWatchlist = async (ideaId: string) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/watchlist/remove/${ideaId}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
      return { data: null, error: data.error };
    }

    revalidateTag("watchlist", "max");
    return { data: data.data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
};

export const checkInWatchlist = async (ideaId: string) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/watchlist/check/${ideaId}`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
      cache: "no-store",
    });

    const data = await res.json();

    if (!data.success) {
      return { data: false, error: data.error };
    }

    return { data: data.data?.exists || false, error: null };
  } catch (error) {
    console.error(error);
    return { data: false, error };
  }
};
