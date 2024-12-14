
// import { type NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { db } from "./db";
// import { compare, hash } from "bcrypt";
// import GoogleProvider from "next-auth/providers/google";
// import md5 from "md5";
// import bcrypt from "bcrypt"
// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(db),
//   secret: process.env.NEXTAUTH_SECRET,
//   session: { strategy: "jwt" },
//   pages: {
//     signIn: "/SignIn",
//     error: "/error",
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       async profile(profile) {
        
//         return {
          
//           id: profile.sub,
//           email: profile.email,
//           name: profile.name,
//           image: profile.picture,
//         };
//       },
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "Your Email" },
//         password: { label: "Password", type: "password", placeholder: "Your Password*" },
//       },

     

//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }


//         const existingUser = await db.user.findUnique({
//           where: { email: credentials.email },
//         });
        

//         if (!existingUser) {
//           const gravatarHash = md5(credentials.email.trim().toLowerCase());
//           const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`;
//           const hashedPassword = await hash(credentials.password, 10);

//           const newUser = await db.user.create({
//             data: {
//               email: credentials.email,
//               password: hashedPassword,
//               image: gravatarUrl,
//               role: "USER", 
//             },
//           });

//           return {
//             id: `${newUser.id}`,
//             email: newUser.email,
//             name: newUser.name || "New User",
//             image: newUser.image,
//             role: newUser.role,
//           };
//         }
      
//         // Handle login if user already exists
//         const passwordMatch = await compare(credentials.password, existingUser.password as string);

//         if (!passwordMatch) {
//           throw new Error("Password is incorrect or invalid");
//         }

//         return {
//           id: `${existingUser.id}`,
//           email: existingUser.email,
//           name: existingUser.name || "Existing User",
//           image: existingUser.image,
//           role: existingUser.role,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.picture = user.image;
//         token.name = user.name;
//         token.email = user.email;
//         if ('role' in user) {
//           token.role = user.role || "USER";
//         }
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.email = token.email ?? null;
//         session.user.name = token.name ?? null;
//         session.user.image = token.picture ?? null;
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//   },
// };

import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare, hash } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import md5 from "md5";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/SignIn",
    error: "/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your Email" },
        password: { label: "Password", type: "password", placeholder: "Your Password*" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          throw new Error("No user with this email");
        }

        const passwordMatch = await compare(credentials.password, existingUser.password as string);

        if (!passwordMatch) {
          throw new Error("Password is incorrect or invalid");
        }

        return {
          id: `${existingUser.id}`,
          email: existingUser.email,
          name: existingUser.name || "Existing User",
          image: existingUser.image,
          role: existingUser.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.picture = user.image;
        token.name = user.name;
        token.email = user.email;
        if ('role' in user) {
          token.role = user.role || "USER";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email ?? null;
        session.user.name = token.name ?? null;
        session.user.image = token.picture ?? null;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
