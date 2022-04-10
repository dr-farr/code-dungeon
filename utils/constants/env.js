export const BACKEND_URL = process.env.NEXT_PUBLIC_NHOST_BACKEND_URL;
export const CLIENT_URL =
  process.env.VERCEL_ENV === "production"
    ? process.env.VERCEL_URL
    : "http://localhost:3000";

const env = { CLIENT_URL, BACKEND_URL };
export default env;
