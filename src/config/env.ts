import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BACKEND_URL: z.url(),
    APP_URL: z.url(),
    AUTH_URL: z.url(),
    API_URL: z.url(),
    MEMBERSHIP_PRICE: z.string(),
  },
  client: {
    NEXT_PUBLIC_BACKEND_URL: z.url(),
    NEXT_PUBLIC_APP_URL: z.url(),
    NEXT_PUBLIC_AUTH_URL: z.url(),
    NEXT_PUBLIC_API_URL: z.url(),
    NEXT_PUBLIC_MEMBERSHIP_PRICE: z.string(),
  },
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    AUTH_URL: process.env.AUTH_URL,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    MEMBERSHIP_PRICE: process.env.MEMBERSHIP_PRICE,
    NEXT_PUBLIC_MEMBERSHIP_PRICE: process.env.NEXT_PUBLIC_MEMBERSHIP_PRICE,
  },
});
