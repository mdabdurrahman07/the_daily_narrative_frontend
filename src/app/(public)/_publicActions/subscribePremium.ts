"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const subscribePremium = async () => {
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
  const response = await fetch(`${url}/api/v1/tdn/subscription/checkout`, {
    // Authorization: accessToken as unknown as string
    // Authorization: `${accessToken}`
    // Authorization: `Bearer ${accessToken}`
    method: "POST",
    headers: { Cookie: `accessToken=${accessToken}` },
  });

  const result = await response.json();

  if(result.success && result.data.payment_url){
    redirect(result.data.payment_url)
  }
};
