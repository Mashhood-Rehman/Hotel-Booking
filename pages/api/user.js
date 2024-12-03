import { db } from "@/lib/db";
import { hash } from "bcrypt";
import * as z from "zod";

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least three characters long"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["OWNER", "ADMIN", "USER"]).default("USER"),
});

// Create User (POST)
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, name, password, role } = userSchema.parse(req.body);

      const checkEmail = await db.user.findUnique({
        where: { email },
      });
      if (checkEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const checkName = await db.user.findUnique({
        where: {
          name,
        },
      });
      if (checkName) {
        return res.status(400).json({ message: "UserName already Exists" });
      }

      // Create New User
      const hashedPassword = await hash(password, 10);
      const newUser = await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
      });
      await sendOtpEmail(email);
      const { password: newUserPassword, ...rest } = newUser;

      return res

        .status(201)
        .json({ User: rest, message: "User Created Successfully" });
    } catch (error) {
      return res.status(400).json({ message: "Error", error });
    }
  }

  if (req.method === "GET") {
    try {
      const users = await db.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          role: true,
        },
      });

      return res.status(200).json({ users });
    } catch (error) {
      return res.status(400).json({ message: "Error fetching users", error });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });

  async function sendOtpEmail(email) {
    const otpResponse = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!otpResponse.ok) throw new Error("Failed to send OTP");
  }
  return otpResponse.json();
}
