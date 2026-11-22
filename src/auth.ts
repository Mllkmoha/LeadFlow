import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,

  providers: [GitHub, Google],

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email || !account) {
        return false;
      }

      const email = user.email.toLowerCase();

      if (account.provider === "google") {
        if (
          profile?.email_verified !== true ||
          typeof profile.email !== "string" ||
          profile.email.toLowerCase() !== email
        ) {
          return false;
        }
      } else if (account.provider === "github") {
        if (!account.access_token) {
          return false;
        }

        try {
          const response = await fetch("https://api.github.com/user/emails", {
            headers: {
              Authorization: `Bearer ${account.access_token}`,
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
          });

          if (!response.ok) {
            return false;
          }

          const emails = (await response.json()) as {
            email: string;
            verified: boolean;
          }[];

          const isVerified = emails.some(
            (item) => item.email.toLowerCase() === email && item.verified,
          );

          if (!isVerified) {
            return false;
          }
        } catch {
          return false;
        }
      } else {
        return false;
      }

      await prisma.user.upsert({
        where: { email },
        update: { name: user.name },
        create: {
          email,
          name: user.name,
        },
      });

      return true;
    },

    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email.toLowerCase(),
          },
          select: {
            id: true,
          },
        });

        if (dbUser) {
          token.userId = dbUser.id;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId as string;
      }

      return session;
    },
  },
});
