import { cookies } from "next/headers";

export const getPremiumNews = async () => {
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
  const response = await fetch(`${url}/api/v1/tdn/premium`, {
    // Authorization: accessToken as unknown as string
    // Authorization: `${accessToken}`
    // Authorization: `Bearer ${accessToken}`
    headers: { Cookie: `accessToken=${accessToken}` },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 6, //6 hours,
      tags: ["premium-posts"],
    },
  });

  const result = response.json();

  return result;
};
