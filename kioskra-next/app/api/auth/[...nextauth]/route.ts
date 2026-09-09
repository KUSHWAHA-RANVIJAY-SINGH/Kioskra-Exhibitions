import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "kiskora@gmail.com" &&
          credentials?.password === "KISkora@123"
        ) {
          return { id: "1", name: "Admin", email: "kiskora@gmail.com" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "9a48f438a2e1d7cf9d921bb27181c0db9f5a04dc17ffb2a9e334df5a04dc5678",
});

export { handler as GET, handler as POST };
