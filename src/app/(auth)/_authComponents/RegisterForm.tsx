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
import React, { useActionState } from "react";
import { registerAction } from "../_authActions/authAction";
import { Loader } from "lucide-react";
import Link from "next/link";

const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, false);
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register Your Account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
        <CardAction>
          <Link href="/login">
            <Button variant="link">Sign In</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
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
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profilePhoto">
                Profile Photo URL{" "}
                <span className="text-muted-foreground text-xs">
                  (optional)
                </span>
              </Label>
              <Input
                id="profilePhoto"
                name="profilePhoto"
                type="url"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>

          <CardFooter className="mt-6 flex-col gap-2 p-0">
            <Button type="submit" className="w-full">
              {pending ? <Loader className="animate-spin" /> : "Sign Up"}
            </Button>
            <Button variant="outline" className="w-full">
              Sign Up with Google
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;