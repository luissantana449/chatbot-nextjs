import NextAuth from "next-auth";
import { EgideProvider } from "./egideProvider";

const handler = NextAuth({
  providers: [EgideProvider()],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        return {
          ...user,
          ...token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...token,
        },
        accessToken: token.accessToken,
      };
    },

    redirect({ baseUrl }) {
      return `${baseUrl}/home`;
    },
  },
});

export { handler as GET, handler as POST };
