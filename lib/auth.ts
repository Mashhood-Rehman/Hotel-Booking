import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";
export const authOptions: NextAuthOptions = {
        adapter :  PrismaAdapter(db),
        session : {strategy :'jwt'},
    pages: {
        signIn: "/SignIn",
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          
          credentials: {
            username: { label: "Email", type: "email", placeholder: "Your Email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
      if(!credentials?CredentialsProvider.email || !credentials?.password){
        return null
      }
      const existingUser = await db.username.findUnique({
        where :  {email : credentials?.email}
      })
      if(!existingUser){
        return null
      }

      const passwordMatch = await compare(credentials.password,existingUser.password)
         if(!passwordMatch){
            return null
         }
         return {
            id : `${existingUser.id}`,
            name : existingUser.name,
            email : existingUser.email
         }
          }
        })
      ]

}