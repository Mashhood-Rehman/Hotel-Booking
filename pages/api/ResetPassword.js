import { prisma } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6),
});
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { token, newPassword } = resetPasswordSchema.parse(req.body);
      const resetRequest = await prisma.passwordReset.findUnique({
        where: { token },
        include: { user: true },
      });
      if (!resetRequest) {
        return res.status(404).json({ message: "Invalid or expired token" });
      }
      const tokenAge = (new Date() - resetRequest.createdAt) / (1000 * 60 * 60);
      if (tokenAge > 1) {
        return res.status(400).json({ message: "Token has expired" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: resetRequest.userId },
        data: { password: hashedPassword },
      });
      await prisma.passwordReset.delete({
        where: { token },
      });
      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Invalid request" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
