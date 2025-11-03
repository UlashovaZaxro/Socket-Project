import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { extend } from "zod/mini";

interface jwtWithId extends jwt.JwtPayload{
    userId: string
}


declare namespace Express {
    export interface Request {
        userId?: string;
    }
}

export const routeProtect =  (req: Request, res: Response, next: NextFunction) => {

    if(!req.headers.authorization) {
        res.status(401).json({message: "Token does not exist on request"})
    }

    const token = req.headers.authorization?.split(" ")[1]
    console.log(token);


    try{
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as jwtWithId
        req.userId = decoded.userId
        next();
    } catch(e){
        console.log(e);
        res.status(401).json({message: "token expired or has been changed. Attack detedted!!!"})
    }

};