"use server"
import { cookies } from "next/headers";

export const getSubscriptionStatus = async () => {
  const url = process.env.BACKEND_API_URL;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "User not logged in",
    };
  }
  const response = await fetch(`${url}/api/v1/tdn/subscription/s`, {
    // Authorization: accessToken as unknown as string
    // Authorization: `${accessToken}`
    // Authorization: `Bearer ${accessToken}`
    headers: { Cookie: `accessToken=${accessToken}` },
  });

  const result = await response.json();

  return result;
};
