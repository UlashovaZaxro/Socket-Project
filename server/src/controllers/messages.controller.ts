import type {Request, Response} from "express";
import prisma from "../utils/prismaConfig.ts";

export const getUsers = async (req: Request, res: Response) => {

    const users = await prisma.user.findMany({
        where: {
            id: {not: req.userId}
        }
    })
    


    return res.json({message: "seccess", users: users})
};


export const newMessage = async (req: Request, res: Response) => {
    // res.json({message: "seccess from newMessage controller!"});
    
    const senderId = req.userId; 
    const receiverId = req.params.id; 
    const content = req.body.message;

    // if (!senderId) return res.status(401).json({ message: "Unauthorized" });
    // if (!receiverId) return res.status(400).json({ message: "Receiver ID is required" });
    // if (!content) return res.status(400).json({ message: "Message content is required" });

    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);
    console.log("Message Content:", content);

    const newMessage = await prisma.message.create({
        data: {
            senderId,
            receiverId,
            content,
        },
    });

    res.json({message: "Message sent successfully", content: newMessage}); 
};

export const getMessage = async (req: Request, res: Response) => {
    const senderId = req.userId;
    const receiverId = req.params.id;

    const allMessages = await prisma.message.findMany({
        where: {
            OR: [
                {
                    senderId: senderId, 
                    receiverId: receiverId
                },
                {
                    senderId: receiverId, 
                    receiverId: senderId
                },
            ]
        }
    });

    res.json({message: "Messages fetched successfully", allMessages});
};