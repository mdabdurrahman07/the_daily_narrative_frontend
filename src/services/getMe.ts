"use server"
import { cookies } from "next/headers";
import { IUser } from "@/app/(public)/_types/types";

type GetMeResult =
  | IUser
  | { success: false; statusCode: number; message: string };

export const getMe = async (): Promise<GetMeResult> => {
  const api = process.env.BACKEND_API_URL;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "User not logged in",
    };
  }

  const response = await fetch(`${api}/api/v1/tdn/auth/users/me`, {
    // Authorization: accessToken as unknown as string
    // Authorization: `${accessToken}`
    // Authorization: `Bearer ${accessToken}`
    headers: { Cookie: `accessToken=${accessToken}`},
    cache: "force-cache",
    next:{
      revalidate: 60 * 60 * 24, //1day
      tags: ["myProfile"]
    }
  });

  const result = await response.json();
  return result;
};
