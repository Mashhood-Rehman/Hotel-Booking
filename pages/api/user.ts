import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod" 


const userSchema = z.object({
    name: z.string().min(3, "Name must be atleast three characters long"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })

export default  async function POST(req: NextApiRequest, res: NextApiResponse) {
        try {
            const {email , name , password} = userSchema.parse(req.body);
            const checkEmail = await db.User.findUnique({
                where: {email}
            })
                if(checkEmail) {
                    return    res.status(400).json({ message: "Email already in use" });
                }

                const checkName = await db.User.findUnique({

                    where: {
                        name
                    }
                })
                if(checkName){
                    return    res.status(400).json({ message: "UserName already Exists" });

                }
            
          
          
          

            // Create New User
            const hashedPasword = await hash(password, 10)
                const newUser = await db.User.create({
                    data :{ 
                        name,
                        email,
                        password : hashedPasword
                    }
                })
                // const {password:newUserPassword , ...rest} =  newUser

            return res.status(201).json({User : newUser , message: "User Created Successfully"} )

        } catch (error) {
            return res.status(400).json({message: "Error" , error} ) 
        }
}

