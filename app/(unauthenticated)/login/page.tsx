"use client";

import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { startTransition, useActionState } from "react";

export default function Login() {
  const [state, action, pending] = useActionState(loginAction, null);

  function onClick() {
    startTransition(() => action());
  }

  return (
    <Card className="max-w-xs mx-auto my-8">
      <CardHeader>
        <CardTitle>Outfit manager</CardTitle>
        <CardDescription>Login</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button onClick={onClick} disabled={pending}>
          Login
        </Button>
      </CardContent>
    </Card>
  );
}
