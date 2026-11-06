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
  // API routes are always checked (even when the path contains a dot, e.g. image
  // filenames). Pages skip Next internals and static files from /public.
  matcher: ["/api/((?!auth/).*)", "/((?!api/|_next/|.*\\..*).*)"],
};
