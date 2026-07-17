"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useEffect } from "react";
import { loginAction } from "../_authActions/authAction";
import { Loader } from "lucide-react";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, false);
//   const router = useRouter()
  useEffect(() => {
    // if (!state) return;
    // if (state.success) {
    //   toast.success(state.message || "Login Successful");
    // //   router.push("/dashboard")
    // } else {
    //   toast.error(state.message || "Login Failed");
    // }
  }, [state]);
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>

          <CardFooter className="mt-6 flex-col gap-2 p-0">
            <Button type="submit" className="w-full">
              {pending ? <Loader className="animate-spin" /> : "Login"}
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
