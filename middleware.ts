import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (!req.auth) {
    if (
      req.nextUrl.pathname.startsWith("/api") &&
      !req.nextUrl.pathname.startsWith("/api/auth")
    ) {
      return NextResponse.json({ message: "Auth required" }, { status: 401 });
    }
    if (req.nextUrl.pathname !== "/login") {
      const newUrl = new URL("/login", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }
});

export const config = {
  matcher: ["/((?!api/auth|_next|.*\\..*).*)"],
};
