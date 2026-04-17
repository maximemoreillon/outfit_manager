import NextAuth from "next-auth";

const {
  AUTH_OIDC_CLIENT_ID,
  AUTH_OIDC_CLIENT_SECRET,
  AUTH_OIDC_ISSUER,
  AUTH_USER_ID_CLAIM = "sub",
} = process.env;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "oidc",
      name: "OIDC",
      type: "oidc",
      issuer: AUTH_OIDC_ISSUER,
      clientId: AUTH_OIDC_CLIENT_ID,
      clientSecret: AUTH_OIDC_CLIENT_SECRET,
    },
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token }) {
      return token;
    },
    session({ session, token }) {
      const claim = (token as Record<string, unknown>)[AUTH_USER_ID_CLAIM];
      session.user.id = typeof claim === "string" ? claim : (token.sub ?? "");
      return session;
    },
  },
});

export async function getAuthenticatedUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}
