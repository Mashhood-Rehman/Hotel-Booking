import { z } from "zod";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/db";
import crypto from "crypto";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});
const sendResetMail = (email, token) => {
  const resetUrl = `${process.env.NEXTAUTH_URL}/ResetPassword?token=${token}`;
  return transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Password Reset ",
    html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
    `,
  });
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const result = forgotPasswordSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid request" });
      }
      const { email } = result.data;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const token = crypto.randomBytes(32).toString("hex");

      await prisma.passwordReset.create({
        data: {
          token,
          userId: user.id,
        },
      });
      await sendResetMail(email, token);
      res.status(200).json({ message: "Reset email sent" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Invalid request" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
