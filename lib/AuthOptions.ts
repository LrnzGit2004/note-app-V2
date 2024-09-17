import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { signIn } from "next-auth/react";




export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 10000, // 10 secondes
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Vérifiez si account est défini
      if (!account) {
        console.error("Account is null or undefined");
        return false; // Bloquer la connexion
      }
  
      console.log("User:", user);
      console.log("Account:", account);
      console.log("Profile:", profile);
  
      // Vérifiez que providerAccountId est accessible
      const providerAccountId = account.providerAccountId;
      const provider = account.provider;
  
      if (!providerAccountId || !provider) {
        console.error("ProviderAccountId or provider is missing");
        return false; // Bloquer la connexion
      }
  
      const existingUser = await prisma.account.findUnique({
        where: {
          providerId_providerAccountId: {
            providerAccountId: providerAccountId,
            providerId: provider,
          },
        },
      });
  
      console.log("Existing User:", existingUser);
  
      return existingUser ? true : false;
    },
  },
};
