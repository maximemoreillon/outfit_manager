import NextAuth from "next-auth";

const { AUTH_OIDC_CLIENT_ID, AUTH_OIDC_CLIENT_SECRET, AUTH_OIDC_ISSUER } =
  process.env;

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
      session.user.id = token.sub ?? "";
      return session;
    },
  },
});

export async function getAuthenticatedUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}
