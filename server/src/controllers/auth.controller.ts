import type {Request, Response} from "express";
import  z from "zod";
import prisma from "../utils/prismaConfig.ts";

const registerSchema = z.object({
    fullname : z.string().min(2),
    email: z.email('invalid email'),
    password : z.string().min(5)
})

export const register = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({massage: "Invalid input"})
    }
    const inputs = result.data;

    const user = await prisma.user.findUnique({
        where: {email: inputs.email}
    })

    if(user){
        return res.status(409).json({message:'this email already exist'})
    }

    console.log(user);


    res.send({message: "Success Gaga"});
}