"use server";

import { cookies } from "next/headers";
import { prevState, prevUserRegData } from "../_types/type";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const loginAction = async (prevState: prevState, formData: FormData) => {
  const api = process.env.BACKEND_API_URL;
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const response = await fetch(`${api}/api/v1/tdn/auth/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1day
      sameSite: "lax",
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1day
      sameSite: "lax",
    });
    redirect("/dashboard", "replace");
  }

  return result;
};

export const registerAction = async (
  prevState: prevUserRegData,
  formData: FormData,
) => {
  const api = process.env.BACKEND_API_URL;
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const profilePhoto = formData.get("profilePhoto");

  const payload = {
    name,
    email,
    password,
    profilePhoto,
  };

  const response = await fetch(`${api}/api/v1/tdn/auth/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (result.success) {
    redirect("/login", "replace");
  }

  return result;
};
