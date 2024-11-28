


import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least three characters long"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Create User (POST)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, name, password } = userSchema.parse(req.body);

      const checkEmail = await db.User.findUnique({
        where: { email },
      });
      if (checkEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const checkName = await db.User.findUnique({
        where: {
          name,
        },
      });
      if (checkName) {
        return res.status(400).json({ message: "UserName already Exists" });
      }

      // Create New User
      const hashedPassword = await hash(password, 10);
      const newUser = await db.User.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      const { password: newUserPassword, ...rest } = newUser;

      return res.status(201).json({ User: rest, message: "User Created Successfully" });
    } catch (error) {
      return res.status(400).json({ message: "Error", error });
    }
  }

  if (req.method === 'GET') {
    try {
      const users = await db.User.findMany({
        select: {
          id: true,
          name : true,
          email: true,
          password: true,
        },
      });

      return res.status(200).json({ users });
    } catch (error) {
      return res.status(400).json({ message: "Error fetching users", error });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
