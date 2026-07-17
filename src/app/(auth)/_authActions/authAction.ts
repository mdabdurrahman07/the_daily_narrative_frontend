"use server";

import { prevState } from "../_types/type";

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

  return result;
};
