// src/app/api/auth/[...nextauth].ts
//All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',  // Custom sign-in page with tabs
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',  // Use JWT for session handling
  },
});
