"use server";
import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const url = process.env.BACKEND_API_URL;
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return {
      success: false,
      statusCode: 401,
      message: "RefreshToken not found",
    };
  }

  const response = await fetch(`${url}/api/v1/tdn/auth/users/refresh-token`, {
    headers: {
      method: "POST",
      Cookie: `refreshToken=${refreshToken}`,
    },
    cache: "no-cache",
  });

  const result = await response.json();
  return result;
};
