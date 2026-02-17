import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";

const { AUTH_OIDC_CLIENT_ID, AUTH_OIDC_CLIENT_SECRET, AUTH_OIDC_ISSUER } =
  process.env;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Auth0
    {
      id: "oidc",
      name: "OIDC",
      type: "oidc",
      issuer: AUTH_OIDC_ISSUER,
      clientId: AUTH_OIDC_CLIENT_ID,
      clientSecret: AUTH_OIDC_CLIENT_SECRET,
    },
  ],
  // providers: [],
  // TODO: Check how this works:
  pages: {
    signIn: "/login",
  },
});
