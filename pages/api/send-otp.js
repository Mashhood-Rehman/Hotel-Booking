import { prisma } from "@/lib/db";
import crypto from "crypto";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();

    try {
      // Store OTP in database
      await prisma.otp.create({
        data: {
          email,
          otp,
        },
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      transporter.verify((error, success) => {
        if (error) {
          console.log("SMTP connection error:", error);
          return res
            .status(500)
            .json({ message: "SMTP connection error", error: error.message });
        } else {
          console.log("SMTP connection successful", success);
        }
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Your OTP Verification Code",
        text: `Your OTP Verification code is ${otp}`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res
        .status(500)
        .json({ message: "Failed to send OTP", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
