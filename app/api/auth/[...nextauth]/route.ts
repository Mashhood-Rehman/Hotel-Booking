// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { compare } from "bcrypt";
// import GoogleProvider from "next-auth/providers/google";
// import { db } from "@/lib/db";
// const handler = NextAuth({
//     debug: true, 
//     adapter: PrismaAdapter(db),
//     secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
//       session: { strategy: 'jwt' },
//       pages: {
//         signIn : "/SignIn",
//         error: '/error',
//       },
//       providers: [
//         GoogleProvider({
//           clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
//           clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
//         }),
//         CredentialsProvider({
//           name: "Credentials",
//           credentials: {
//             email: { label: "Email", type: "email", placeholder: "Your Email" },
//             password: { label: "Password", type: "password" },
//           },
//           async authorize(credentials) {
//             if (!credentials?.email || !credentials?.password) {
//               return null;
//             }
//             const existingUser = await db.user.findUnique({
  //               where: { email: credentials?.email },
  //             });
    
  //             if (!existingUser) {
//               return null;
//             }

//             const passwordMatch = await compare(credentials.password, existingUser.password);
//             if (!passwordMatch) {
  //               return null;
  //             }
  
  //             return {
    //               id: `${existingUser.id}`,
    //               name: existingUser.name,
    //               email: existingUser.email,
    //             };
    //           },
    //         }),
//       ],
//       callbacks: {
//         async redirect({ baseUrl, url }) {
//           return url || baseUrl;
//         },
//         async jwt({ token, user }) {
//           if (user) {
//             token.picture = user.image;
//             token.name = user.name;
//             token.email = user.email;
//           }
//           return token;
//         },
//         async session({ session, token }) {
  //           if (session.user) {
    //             session.user.email = token.email;
    //             session.user.name = token.name;
    //             session.user.image = token.picture;
    //           }
    //           return session;
    //         },
    //       },
    // })
    
    // export { handler as GET, handler as POST }
    import { authOptions } from "@/lib/auth";
    import NextAuth from "next-auth";

 const handler= NextAuth(authOptions)
 export { handler as GET, handler as POST }