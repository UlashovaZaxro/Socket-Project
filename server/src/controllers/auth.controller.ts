import type {Request, Response} from "express";
import  z from "zod";
import prisma from "../utils/prismaConfig.ts";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.ts";

const registerSchema = z.object({
    fullname : z.string().min(2),
    email: z.email('invalid email'),
    password : z.string().min(5)
})

const loginSchema = z.object({
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

    const hashedPassword = await bcrypt.hash(inputs.password, 10);

    console.log(hashedPassword);

    const newUser =  await prisma.user.create({
        data: {
            fullName: inputs.fullname,
            email: inputs.email,
            passwordHash: hashedPassword
        }
    });

    res.json({message: "seccess", data: newUser})

    

}

export const login = async(req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({massage: "Invalid input"})
    }
    const inputs = result.data;

    const user = await prisma.user.findUnique({
        where: {email: inputs.email}
    });

    if(!user){
        return res.status(404).json({message: "wrong credentials"})
    }

    const checkPassword = await bcrypt.compare(inputs.password, user.passwordHash);
    
    if (!checkPassword) {
        return res.status(400).json({massage: "wrong credentials"})
    }

    const accessToken = generateToken(user.id)

    res.json({message: "seccess", token: accessToken})
}


// export const profile = async(req: Request, res: Response) => {
//     res.json({message: "welcometo profile"})

// }

export const profile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
        }

        const imagePath = `/uploads/${req.file.filename}`;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { profileImage: imagePath },
        });

        res.json({
        message: "Profile image updated successfully",
        user: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating profile image" });
    }
};
