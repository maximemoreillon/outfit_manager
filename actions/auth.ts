"use server";
import { signIn, signOut } from "@/lib/auth";

export async function logoutAction(state: any) {
  await signOut({ redirectTo: "/login" });
}

export async function loginAction(state: any) {
  //await signIn("auth0", { redirectTo: "/" });
  await signIn("oidc", { redirectTo: "/" });
}
