import process from "node:process";

export const cookieDefaultOptions = {
  sameSite: "lax",
  path: "/",
  httpOnly: false,
  secrets: (process.env.COOKIE_SECRET?.split(" ") as string[]) || ["SECR3T"],
  secure: process.env.NODE_ENV === "production",
} as const;
