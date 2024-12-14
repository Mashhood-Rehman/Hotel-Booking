import { prisma } from "@/lib/db";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000);

    try {
      await prisma.otp.create({
        data: {
          email,
          otp,
          expires: expirationTime,
        },
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
      console.error("Error sending OTP:", error);
      return res
        .status(500)
        .json({ message: "Failed to send OTP", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
