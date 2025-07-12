import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      // Custom sendVerificationRequest can be added for branding
    }),
  ],
  callbacks: {
    async signIn({ user, account, email }) {
      // Only allow .edu emails
      if (user?.email && !user.email.endsWith(".edu")) {
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to dashboard after login
      return "/dashboard";
    },
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 