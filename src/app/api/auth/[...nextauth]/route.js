import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from "next-auth/providers/google";
import clientPromise from '@/app/utils/MongoClient';
import { MongoDBAdapter } from "@auth/mongodb-adapter";

// Function to check if environment variables are defined
const checkEnvVariables = () => {
  const requiredVars = [
    'EMAIL_SERVER_HOST',
    'EMAIL_SERVER_PORT',
    'EMAIL_SERVER_USER',
    'EMAIL_SERVER_PASSWORD',
    'EMAIL_FROM'
  ];

  requiredVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });
};

checkEnvVariables();

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Customize the sign-in page
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Add any custom sign-in logic here
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Redirect user after sign in
      const specificUrl = '/chat';
      return specificUrl;
    },
    async session({ session, token }) {
      // Add user ID to session object
      return session;
    },
    async jwt({ token, user }) {
      // Persist user ID in token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

// Export NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
