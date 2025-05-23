import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  // Configure authentication providers
  providers: [
    GoogleProvider({
      // Google OAuth credentials from environment variables
      clientId: process.env.GOOGLE_CLIENT_ID!, // Google Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Google Client Secret
    }),
  ],
  // Custom authentication pages
  pages: {
    signIn: '/login', // Redirect to custom login page
  },
  callbacks: {},
});

// Export handler for API routes
export { handler as GET, handler as POST }; // Handle both GET and POST requests
