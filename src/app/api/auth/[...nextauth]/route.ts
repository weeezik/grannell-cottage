import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace this with your desired password
        const validPassword = process.env.MEMBERS_PASSWORD;
        
        if (credentials?.password === validPassword) {
          return { id: "1", name: "Member" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
