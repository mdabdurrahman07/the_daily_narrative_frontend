import { cookies } from "next/headers";

export const getMe = async () => {
  const api = process.env.BACKEND_API_URL;

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 500,
      message: "user not loggedIn"
    }
  }

  const response = await fetch(`${api}/api/v1/tdn/auth/users/me`, {
    headers: {
      // Authorization: accessToken as unknown as string
      // Authorization: `${accessToken}`
      // Authorization: `Bearer ${accessToken}`
      Cookie: `accessToken=${accessToken}`,
    },
  });

  const result = await response.json();

  return result;
};
