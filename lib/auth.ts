import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Auth0],
  // providers: [],
  // TODO: Check how this works:
  pages: {
    signIn: "/login",
  },
});
