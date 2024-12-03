import { prisma } from "@/lib/db"

export default  async function handler(req,res){
    if(req.method === 'POST'){
        const {email , otp} = req.body
        try {
            const storedOtp = await prisma.otp.findFirst({
                where: {email,otp}
            })
            if (!storedOtp) {
                return res.status(400).json({ message: 'Invalid or expired OTP' });
              }
              await prisma.user.update({
                where: { email },
                data: { emailVerified: new Date() },
              });
              return res.status(200).json({ message: 'OTP verified successfully' });
            } catch (error) {
              console.error('Error verifying OTP:', error);
              return res.status(500).json({ message: 'Failed to verify OTP' });
            }
          } else {
            res.status(405).json({ message: 'Method Not Allowed' });
          }
        }