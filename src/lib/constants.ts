// uses next runtime env package to make env variables available

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_API_URL ||
  "https://portal.tradebrains.in/api/assignment";

export const WEBAPP_URL =
  process.env.NEXT_PUBLIC_WEBAPP_URL ||
  process.env.NEXT_WEBAPP_URL ||
  "http://localhost:3000";

export const AXIOS_TIMEOUT = parseInt(
  process.env.NEXT_PUBLIC_AXIOS_TIMEOUT || "10000",
  10
);
export const AXIOS_BASE_URL =
  process.env.NEXT_WEBAPP_URL ||
  process.env.NEXT_PUBLIC_AXIOS_BASE_URL ||
  "https://api.example.com";
