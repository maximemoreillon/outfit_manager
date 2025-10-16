"use client";

import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { startTransition, useActionState } from "react";

export default function LogoutButton() {
  const [state, action, pending] = useActionState(logoutAction, null);

  function onClick() {
    startTransition(() => action());
  }

  return (
    <Button onClick={onClick} disabled={pending} variant="ghost" size="icon">
      <LogOut />
    </Button>
  );
}
