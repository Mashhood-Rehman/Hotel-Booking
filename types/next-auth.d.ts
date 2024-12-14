// next-auth.d.ts
import NextAuth from "next-auth";
import { Role } from '@prisma/client'; // Import the Role enum from Prisma
declare module "next-auth" {
  interface Session {
    user: {
      name: string | null;
      email: string | null;
      image: string | null;
      role: Role | string;  // Add the role to the user object
    };
  }

  interface JWT {
    role: Role | string;  // Add role to the JWT token
  }
}
