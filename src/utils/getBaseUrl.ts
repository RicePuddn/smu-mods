import { env } from "@/env";

export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL && env.NEXT_PUBLIC_NODE_ENV == "production")
    return `https://smumods.johnnyknl.me`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
