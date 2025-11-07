import type {Request, Response} from "express";
import prisma from "../utils/prismaConfig.ts";

export const getUsers = async (req: Request, res: Response) => {

    const users = await prisma.user.findMany({
        where: {
            id: {not: req.userId}
        }
    })


    return res.json({message: "seccess", users: users})
}