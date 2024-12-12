import { db } from "@/lib/db";
import * as z from "zod";
import nodemailer from "nodemailer";

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least three characters long"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email } = userSchema.parse(req.body);

      const checkEmail = await db.user.findUnique({ where: { email } });
      if (checkEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expirationTime = new Date(Date.now() + 10 * 60 * 1000);

      await db.otp.create({
        data: { email, otp, expires: expirationTime },
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Your OTP Verification Code",
        text: `Your OTP Verification code is ${otp}`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error in signup:", error);
      return res.status(500).json({ message: `Error: ${error.message}` });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
