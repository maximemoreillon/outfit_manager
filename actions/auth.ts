"use server";
import { signIn, signOut } from "@/lib/auth";

export async function logoutAction(_state: unknown) {
  await signOut({ redirectTo: "/login" });
}

export async function loginAction(_state: unknown) {
  await signIn("oidc", { redirectTo: "/" });
}
