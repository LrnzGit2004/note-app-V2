import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("Please define the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.");
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  session: {
    strategy: 'database', // ou 'jwt' selon votre configuration
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        sameSite: 'none', // Nécessaire pour les cookies tiers
        path: '/',
        secure: true, // Nécessaire si vous êtes en HTTPS
      },
    },
  },
  // Autres options...
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };