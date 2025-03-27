import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/login";  // Ensure you have the correct logic for logging in

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await userLogIn(credentials.email, credentials.password); // Assuming you have implemented userLogIn correctly
        return user || null;
      },
    }),
  ],
  session: { strategy: "jwt" },  // Using JWT-based session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Ensure the user object is added to the token
        token = { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      // Add user data to the session
      if (token) {
        session.user = token as any;  // Make sure `token` is properly typed here
      }
      return session;
    },
  },
};
