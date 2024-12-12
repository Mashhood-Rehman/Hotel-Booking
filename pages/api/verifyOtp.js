import { db } from "@/lib/db";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, otp, name, password } = req.body;
    console.log(req.body);
    try {
      const otpEntry = await db.otp.findFirst({
        where: { email, otp },
        orderBy: { createdAt: "desc" },
      });

      if (!otpEntry) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }
      if (new Date() > new Date(otpEntry.expires)) {
        return res.json({ message: "OTP has expired" }, { status: 400 });
      }
      if (!name || !password) {
        return res
          .status(400)
          .json({ message: "Name and password are required" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await db.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: "USER",
          emailVerified: new Date(),
        },
      });
      console.log(user);

      await db.otp.deleteMany({ where: { email } });

      return res
        .status(200)
        .json({ message: "User created successfully", user });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return res.status(500).json({ message: `Error: ${error.message}` });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
